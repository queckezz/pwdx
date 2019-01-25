import { pbkdf2Sync as pbkdf2 } from 'crypto'
import getCharset, { CharsetOpts } from './charset'

export type EnvType = 'web' | 'ssh'

export type PasswordConfig = CharsetOpts & {
  env: EnvType
  service: string
  account: string
  length: number
}

type Salt = [EnvType, string, string]

export default function createPassword(
  masterPassword: string,
  config: PasswordConfig
): string {
  const charset = getCharset({
    hasDigits: config.hasDigits,
    hasSymbols: config.hasSymbols
  })

  const buf = pbkdf2(
    masterPassword,
    getSalt(config).join(''),
    10 ^ 5,
    config.length,
    'sha256'
  )

  const password = Array.from(buf)
    .map(byte => charset[byte % charset.length])
    .join('')

  return password
}

function getSalt(config: PasswordConfig, delimiter: string = ''): Salt {
  return [config.env, config.service, config.account]
}

export function encodeSerializableString(config: PasswordConfig): string {
  return [
    ...getSalt(config),
    config.length,
    'digits:' + String(config.hasDigits),
    'symbols:' + String(config.hasSymbols)
  ].join('/')
}

export function decodeSerializableString(
  serializedString: string
): PasswordConfig {
  const tokens = serializedString.split('/')

  return {
    env: tokens[0] as EnvType,
    service: tokens[1],
    account: tokens[2],
    length: ~~tokens[3],
    hasDigits: tokens[4].split(':')[1] == 'true',
    hasSymbols: tokens[5].split(':')[1] == 'true'
  }
}
