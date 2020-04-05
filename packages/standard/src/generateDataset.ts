import path from 'path'
import fs from 'fs'
import { twit, Params, Callback } from '@parabains-bot/common'

import { GetResponse } from './typings/GetResponse'

const q = 'Hoje é meu aniversário'

const twitterOptions: Params = {
  q,
  count: 100,
  result_type: 'recent',
}

const callback: Callback = (error, data) => {
  if (error) return

  if (data) {
    const { statuses } = data as GetResponse['data']

    const dataset: [string, string, number][] = []

    const rtTweetPattern = /^RT\s@\w+:/

    for (const tweet of statuses) {
      const record: [string, string, number?] = [
        `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        String(tweet.text).replace('\n', ' '),
      ]

      if (tweet.text.match(rtTweetPattern)) {
        record.push(0)
      } else {
        record.push(1)
      }

      dataset.push(record as [string, string, number])
    }

    const csvContent =
      'url;text;is_birthday\n' +
      dataset.map((e) => e.join(';').replace('\n', ' ')).join('\n')

    fs.writeFileSync(
      path.resolve(
        __dirname,
        '..',
        '..',
        'standard-classifier',
        'standard.csv',
      ),
      csvContent,
    )
  }
}

twit.get('search/tweets', twitterOptions, callback)
