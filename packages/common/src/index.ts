import Twit, { Params, Callback } from 'twit'

import { keys } from './config'

export const twit = new Twit({
  consumer_key: keys.apiKey,
  consumer_secret: keys.apiSecretKey,
  access_token: keys.accessToken,
  access_token_secret: keys.accessTokenSecret,
})

export { keys } from './config'
export { Twit, Params, Callback }
