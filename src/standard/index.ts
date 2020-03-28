import { Params, Callback } from 'twit'

import twit from '../index'

import { GetResponse } from './typings/GetResponse'
import { likeTweet, retweetTweet } from './utils'

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

    for (const tweet of statuses) {
      likeTweet(twit, tweet)
      retweetTweet(twit, tweet)
    }
  }
}

twit.get('search/tweets', twitterOptions, callback)
