import { TranslationOptions, translatte } from './shared/translatte'

const MAX_RETRIES = 3

export const serviceTranslatte = async ({ text, to, from }: TranslationOptions) => {
  let attempts = 0

  while (attempts < MAX_RETRIES) {
    try {
      const translatedText = await translatte({ text, to, from })

      return translatedText
    } catch (error) {
      attempts++

      console.error(`Attempt ${attempts} failed:`, error)
    }
  }

  return text
}
