/* eslint-disable */

// ## Usando técnica secreta de engenharia reversa para gerar token de tradução vadido para Google Translate

/**
 * @description Generate token for Google Translate
 * @param {string} text
 * @returns string
 * @author @DIEGOHORVATTI
 * 
*/
export const fetchToken = (text) => generateToken(text)

const window = { TKK: '422854.923862967' }

function generateToken(srt) {
  let b
  if (yr !== null) b = yr
  else {
    b = () => String.fromCharCode(84)
    var c = () => String.fromCharCode(75)
    b = [b(), b()]
    b[1] = c()
    b = (yr = window[b.join(c())] || '') || ''
  }

  let d = () => String.fromCharCode(116)
  var c = () => String.fromCharCode(107)
  d = [d(), d()]

  d[1] = c()
  c = '&' + d.join('') + '='
  d = b.split('.')
  b = Number(d[0]) || 0

  for (var e = [], f = 0, g = 0; g < srt.length; g++) {
    let l = srt.charCodeAt(g)
    l < 128
      ? (e[f++] = l)
      : (l < 2048
        ? (e[f++] = (l >> 6) | 192)
        : ((l & 64512) === 55296 && g + 1 < srt.length && (srt.charCodeAt(g + 1) & 64512) === 56320
          ? ((l = 65536 + ((l & 1023) << 10) + (srt.charCodeAt(++g) & 1023)),
            (e[f++] = (l >> 18) | 240),
            (e[f++] = ((l >> 12) & 63) | 128))
          : (e[f++] = (l >> 12) | 224),
          (e[f++] = ((l >> 6) & 63) | 128)),
        (e[f++] = (l & 63) | 128))
  }
  srt = b
  for (f = 0; f < e.length; f++) (srt += e[f]), (srt = encodeToken(srt, '+-a^+6'))
  srt = encodeToken(srt, '+-3^+b+-f')
  srt ^= Number(d[1]) || 0
  srt < 0 && (srt = (srt & 2147483647) + 2147483648)
  srt %= 1e6

  const token = c + (srt.toString() + '.' + (srt ^ b))

  return token.replace('&tk=', '')
}

var yr = null

const encodeToken = (input, tokenArray) => {
  for (let c = 0; c < tokenArray.length - 2; c += 3) {
    var d = tokenArray.charAt(c + 2)
    var d = d >= 'a' ? d.charCodeAt(0) - 87 : Number(d)
    var d = tokenArray.charAt(c + 1) === '+' ? input >>> d : input << d

    input = tokenArray.charAt(c) === '+' ? (input + d) & 4294967295 : input ^ d
  }

  return input
}
