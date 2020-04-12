import * as tf from '@tensorflow/tfjs'

import { vocabulary, oov_token, padding_max_len } from './__generated__/config'

function word_preprocessor(word: string): string {
  word = word.replace(/[-|.|,|\?|\!]+/g, '')
  word = word.replace(/\d+/g, '1')
  word = word.toLowerCase()
  if (word != '') {
    return word
  } else {
    return '.'
  }
}

function make_sequences(phrase_array: string[]): number[][] {
  const sequences: number[][] = []

  phrase_array.forEach((phrase) => {
    const phrase_preprocesseded = word_preprocessor(phrase)

    let sequence: number[] = []

    phrase_preprocesseded.split(' ').forEach((word) => {
      const id = vocabulary[word]

      if (id == undefined) {
        sequence.push(vocabulary[oov_token])
      } else {
        sequence.push(id)
      }
    })

    // pad sequence
    if (sequence.length < padding_max_len) {
      const pad_array = Array(padding_max_len - sequence.length)
      pad_array.fill(0)
      sequence = sequence.concat(pad_array)
    }

    sequences.push(sequence)
  })

  return sequences
}

export const handler = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body)

    const sequences = make_sequences(body['data'])

    const model = await tf.loadLayersModel(
      'https://parabains-bot.s3.amazonaws.com/model.json',
    )

    const predictions = model.predict(
      tf.tensor2d(sequences, undefined, 'int32'),
    ) as tf.Tensor<tf.Rank>

    const predictions_array = predictions.arraySync() as number[][]

    const results: number[] = predictions_array.map((pred) => pred[0])

    const payload = JSON.stringify({ predictions: results })

    callback(null, { statusCode: 200, body: payload })
  } catch (e) {
    callback(Error(e))
  }
}
