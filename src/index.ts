import Twit from 'twit'

import { keys } from './config'

const twit = new Twit({
  consumer_key: keys.apiKey,
  consumer_secret: keys.apiSecretKey,
  access_token: keys.accessToken,
  access_token_secret: keys.accessTokenSecret,
})

export default twit
