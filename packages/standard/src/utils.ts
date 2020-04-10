import chalk from 'chalk'
import { Twit } from '@parabains-bot/common'

export function likeTweet(twit: Twit, id: string) {
  twit.post('favorites/create', { id }, (error, data) => {
    if (error) {
      console.log(
        chalk.red(
          `Error liking tweet ${id} because ${error.message.toLowerCase()}`,
        ),
      )
    }
  })
}

export function retweetTweet(twit: Twit, id: string) {
  twit.post('statuses/retweet', { id }, (error, data) => {
    if (error) {
      console.log(
        chalk.red(
          `Error retweeting tweet ${id} because ${error.message.toLowerCase()}`,
        ),
      )
    }
  })
}

export function sanatizeText(value: string): string {
  const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
  const unwantedCharsRegex = /,|!|\?|"|'|:|\.|;|&|#/g
  const urlRegex = /(https?:\/\/)(\w\.\w+\/+\w+)+/g
  return value
    .replace(/\r?\n/g, ' ') // remove new lines
    .replace(emojiRegex, '') // remove emojis
    .replace(urlRegex, '') // remove urls
    .replace(unwantedCharsRegex, '') // remove unwanted chars
}
