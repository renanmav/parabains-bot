import { Twit } from '@parabains-bot/common'

import { Tweet } from './typings/GetResponse'

export function likeTweet(twit: Twit, tweet: Tweet) {
  twit.post('favorites/create', { id: tweet.id_str }, (error, data) => {
    if (error) {
      console.log(
        `Error liking tweet ${
          tweet.id_str
        } because ${error.message.toLowerCase()}`,
      )
    }
  })
}

export function retweetTweet(twit: Twit, tweet: Tweet) {
  twit.post('statuses/retweet', { id: tweet.id_str }, (error, data) => {
    if (error) {
      console.log(
        `Error retweeting tweet ${
          tweet.id_str
        } because ${error.message.toLowerCase()}`,
      )
    }
  })
}
