import Twit, { Params, Callback } from 'twit'

import { keys } from './config'
import { likeTweet, retweetTweet } from './utils'

import { GetResponse } from './typings/GetResponse'

const twit = new Twit({
  consumer_key: keys.apiKey,
  consumer_secret: keys.apiSecretKey,
  access_token: keys.accessToken,
  access_token_secret: keys.accessTokenSecret,
})

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
