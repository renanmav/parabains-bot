import chalk from 'chalk'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

import { twit, Params, Callback } from '@parabains-bot/common'

import { GetResponse } from './typings/GetResponse'
import { likeTweet, sanatizeText } from './utils'

if (!process.env.PREDICT_URL)
  throw new Error('Missing PREDICT_URL environment variable')
if (!process.env.THRESHOLD)
  throw new Error('Missing THRESHOLD environment variable')

const isProd = process.env.NODE_ENV === 'production'

const q = 'Hoje é meu aniversário'

const twitterOptions: Params = {
  q,
  count: 5,
  result_type: 'recent',
}

const callback: Callback = async (error, data) => {
  if (error) return

  if (data) {
    const { statuses } = data as GetResponse['data']

    const predictTweets = statuses.reduce<{ texts: string[]; ids: string[] }>(
      (result, tweet) => ({
        texts: [...result.texts, sanatizeText(tweet.text)],
        ids: [...result.ids, tweet.id_str],
      }),
      { texts: [], ids: [] },
    )

    const body = JSON.stringify({
      data: predictTweets.texts,
    })

    try {
      const result = await fetch(process.env.PREDICT_URL!, {
        method: 'POST',
        body,
      })
      const json = (await result.json()) as { predictions: number[] }

      if (!json.predictions) {
        !isProd && console.info(predictTweets)
        throw new Error('Missing predictions\n\n' + JSON.stringify(json))
      }

      for (const [index, prediction] of json.predictions.entries()) {
        !isProd && console.info(predictTweets.texts[index])

        if (parseFloat(process.env.THRESHOLD!) <= prediction) {
          !isProd && console.log(chalk.green('Vou interagir'))
          likeTweet(twit, predictTweets.ids[index])
        } else {
          !isProd && console.log(chalk.red('Nao vou interagir'))
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
}

twit.get('search/tweets', twitterOptions, callback)
