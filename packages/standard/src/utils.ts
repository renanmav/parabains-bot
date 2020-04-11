import chalk from 'chalk'
import { Twit } from '@parabains-bot/common'

import { Response as PostMediaChunkedResponse } from './typings/PostMediaChunked'

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

interface SendReplyWithMediaArgs {
  filePath: string
  profileName: string
  message: string
  statusId: string
}

export function sendReplyWithMedia(
  twit: Twit,
  { filePath, profileName, message, statusId }: SendReplyWithMediaArgs,
  isProd: boolean,
) {
  twit.postMediaChunked(
    {
      file_path: filePath,
    },
    (_, data) => {
      const { media_id_string: mediaId } = data as PostMediaChunkedResponse
      const params = {
        status: `@${profileName} ${message}`,
        media_ids: [mediaId],
        in_reply_to_status_id: statusId,
      }
      twit.post('statuses/update', params, (err, result) => {
        if (err || !result)
          throw new Error(
            `Error creating reply to https://twitter.com/${profileName}/${statusId}` +
              !isProd &&
              `\n\nerr: ${JSON.stringify(err)}` +
                `\n\nresult: ${JSON.stringify(result)}`,
          )
      })
    },
  )
}
