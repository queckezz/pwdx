// https://github.com/noseglid/base85/blob/master/lib/alphabets.js#L202

const alphabetUpperLower = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const symbols = [
  '!',
  '#',
  '$',
  '%',
  '&',
  '(',
  ')',
  '*',
  '+',
  '-',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '^',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~'
]

export type CharsetOpts = {
  hasSymbols: boolean
  hasDigits: boolean
}

export default function getCharset(opts: CharsetOpts): string[] {
  let charset = alphabetUpperLower

  if (opts.hasDigits) {
    charset = [...charset, ...digits]
  }

  if (opts.hasSymbols) {
    charset = [...charset, ...symbols]
  }

  return charset
}
