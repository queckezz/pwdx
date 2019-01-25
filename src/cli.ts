import arg from 'arg'
import prompts from 'prompts'
import genpw, {
  EnvType,
  encodeSerializableString,
  decodeSerializableString,
  PasswordConfig
} from '.'

const args = arg({
  '--help': Boolean,
  '--version': Number,
  '--length': Number,
  '--no-digits': Boolean,
  '--no-symbols': Boolean,

  '-h': '--help',
  '-l': '--length'
})

if (args['--help']) {
  printAndExit(
    `
    Description
      Generates a stateless password
    Usage
      $ genpw <environment> <service> <account>

    <environment> One of 'ssh' or 'web'
    <service> The service name
    <account> The account name

    Options
      -h, --help Displays this message
      -l, --length Sets the length of the password (defaults to length=16)
  `,
    0
  )
}

prompts({
  type: 'password',
  name: 'masterPassword',
  message: 'Master password?'
}).then(({ masterPassword }) => {
  const config: PasswordConfig = {
    env: args._[0] as EnvType,
    service: args._[1],
    account: args._[2],
    length: args['--length'] || 16,
    hasDigits: !args['--no-digits'],
    hasSymbols: !args['--no-symbols']
  }

  if (args._.length == 3) {
    const pw = genpw(masterPassword, config)

    console.log('> Your generated password is:', pw)
    console.log(
      '> Serializable string (save to your password list):',
      encodeSerializableString(config)
    )
  }

  if (args._.length == 1) {
    console.log('> Regenerating password from serializable string...')
    const config = decodeSerializableString(args._[0])
    const pw = genpw(masterPassword, config)
    console.log('> Your generated password is:', pw)
  }
})

function printAndExit(message: string, code = 1) {
  if (code === 0) {
    console.log(message)
  } else {
    console.error(message)
  }

  process.exit(code)
}
