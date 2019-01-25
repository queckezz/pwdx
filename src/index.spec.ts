import pwdx, { PasswordConfig } from '.'

const masterPassword = 'test'

test('generates a consistent password', () => {
  const config: PasswordConfig = {
    env: 'ssh',
    service: 'github.com',
    account: 'queckezz',
    length: 16,
    hasSymbols: true,
    hasDigits: true
  }

  expect(pwdx(masterPassword, config)).toEqual(pwdx(masterPassword, config))
})

test('env, service, account and masterpassword changes the password', () => {
  let defaultConfig: PasswordConfig = {
    env: 'ssh',
    service: 'github.com',
    account: 'queckezz',
    length: 8,
    hasSymbols: true,
    hasDigits: true
  }

  const defaultPw = pwdx(masterPassword, defaultConfig)

  expect(defaultPw).not.toBe(
    pwdx(masterPassword, { ...defaultConfig, env: 'web' })
  )

  expect(defaultPw).not.toEqual(
    pwdx(masterPassword, { ...defaultConfig, service: 'google.com' })
  )

  expect(defaultPw).not.toEqual(
    pwdx(masterPassword, { ...defaultConfig, account: 'test-user' })
  )

  expect(defaultPw).not.toEqual(pwdx('test-new', defaultConfig))
})

test('can vary in length', () => {
  expect(
    pwdx(masterPassword, {
      env: 'ssh',
      service: 'github.com',
      account: 'queckezz',
      length: 8,
      hasSymbols: true,
      hasDigits: true
    }).length
  ).toBe(8)

  expect(
    pwdx(masterPassword, {
      env: 'ssh',
      service: 'github.com',
      account: 'queckezz',
      length: 16,
      hasSymbols: true,
      hasDigits: true
    }).length
  ).toBe(16)
})
