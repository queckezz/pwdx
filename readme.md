# pwdx [![NPM version][version-image]][version-url]

A _simple_, _stateless_ and _reproducable_ password generator made for developers

**Why would I want this?** - You want to memorize one password but you don't trust every provider for keeping their passwords secure. Countless times [big providers](https://money.cnn.com/2017/10/03/technology/business/yahoo-breach-3-billion-accounts/index.html) have been hacked and your password is now exposed to the public. Once that happens, a hacker can login to all your other accounts because you likely have the same password. This module gives a reliable way to create a different password for each service but still allows the use of one master password.

## How it works

Generates a stateless password from the following properties

- **environment** - Can be either `ssh` or `web`. If you have more viable use cases that make sense like `tv`, `desktop`, feel free to open an issue and we can discuss it.
- **service** - A service name like `google.com` or `your-company`
- **account** - An account name like `bob`
- **masterPassword** - A Password which you should have memorized and not saved anywhere (except physically)

The password **is reproducable** given these properties but **cannot** be reproduced with one part missing. It cannot be reverse-engineered.

## Installation

The package can be installed via your favourite node package manager:

```bash
$ npm install pwdx
```

## CLI Usage

```bash
$ pwdx web google.com bob@gmail.com
? master password: ****

> Your generated password is: hFuUpOyHDFSKN5LD
> Serializable string (save to your password list): web/google.com/bob@gmail.com/16/digits:true/symbols:true
```

Besides your newly generated password, it also generates a serializable string which you can save to a google docs sheet or whatever you use to store notes (If you don't have one, try [Notion](https://www.notion.so/)!) and then use it to recreate the password using the CLI:

```bash
$ pwdx web/google.com/bob@gmail.com/16/digits:true/symbols:true
? master password: ****
> Your generated password is: hFuUpOyHDFSKN5LD
```

There are different properties to modify the password:

- **--length** (default: 16) - Password length
- **--no-digits** (default: false) - Disable generating a password with digits
- **--no-symbols** (default: false) - Disable generating a password with symbols

These properties are stored in the serializable string aswell so it is completely reproducible! :sparkles:

```
$ pwdx web google.com bob@gmail.com --no-symbols --length=6
? master password: ****
> Your generated password is: hFHrp8
> Serializable string (save to your password list): web/google.com/bob@gmail.com/6/digits:true/symbols:false
```

## Algorithm

The password encryption process is using the [pbkdf2](https://wikipedia.org/wiki/PBKDF2) algorithm from the standard node [crypto](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback) package. The generated buffer is then mapped onto a base85 (with default settings) charset to generate your password.

## Author

**pwdx** © [Fabian Eichenberger](https://github.com/queckezz), Released under the [MIT](./license) License.<br>
Authored and maintained by Fabian Eichenberger with help from contributors ([list](https://github.com/queckezz/pwdx/contributors)).

> GitHub [@queckezz](https://github.com/queckezz) · Twitter [@queckezz](https://twitter.com/queckezz)

[version-image]: https://img.shields.io/npm/v/pwdx.svg?style=flat-square
[version-url]: https://npmjs.org/package/pwdx
