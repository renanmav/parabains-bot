/* eslint-disable no-console */
import chalk from 'chalk'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

import { twit, Params, Callback } from '@parabains-bot/common'

import { GetResponse } from './typings/GetResponse'
import { likeTweet, sanatizeText, sendReplyWithMedia } from './utils'
import './assets/parabains.gif'

if (!process.env.PREDICT_URL)
  throw new Error('Missing PREDICT_URL environment variable')
if (!process.env.THRESHOLD)
  throw new Error('Missing THRESHOLD environment variable')
if (!process.env.ABSOLUTELY_SURE_THRESHOLD)
  throw new Error('Missing ABSOLUTELY_SURE_THRESHOLD environment variable')

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

    const predictTweets = statuses.reduce<{
      texts: string[]
      ids: string[]
      usernames: string[]
    }>(
      (result, tweet) => ({
        texts: [...result.texts, sanatizeText(tweet.text)],
        ids: [...result.ids, tweet.id_str],
        usernames: [...result.usernames, tweet.user.screen_name],
      }),
      { texts: [], ids: [], usernames: [] },
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
        !isProd &&
          console.info(
            chalk.yellow(`[${prediction}]`),
            predictTweets.texts[index],
          )

        // Normal threshold
        if (parseFloat(process.env.THRESHOLD!) <= prediction) {
          !isProd && console.log(chalk.green('Vou dar like'))

          likeTweet(twit, predictTweets.ids[index])
        } else {
          !isProd && console.log(chalk.red('Não vou dar like'))
        }

        // // Absolutely sure threshold
        if (parseFloat(process.env.ABSOLUTELY_SURE_THRESHOLD!) <= prediction) {
          !isProd &&
            console.log(chalk.green('Tenho certeza absoluta, vou responder'))

          sendReplyWithMedia(
            twit,
            {
              filePath: './src/assets/parabains.gif',
              message: 'Parabains',
              profileName: predictTweets.usernames[index],
              statusId: predictTweets.ids[index],
            },
            isProd,
          )
          likeTweet(twit, predictTweets.ids[index])
        } else {
          !isProd && console.log(chalk.red('Nao vou responder'))
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const handler = async () => {
  await twit.get('search/tweets', twitterOptions, callback)
}
