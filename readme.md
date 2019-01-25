# pwdx [![NPM version][version-image]][version-url]

Generates a stateless password from the following properties

- **environment** - Can be either `ssh` or `web` [Open an issue]() if you have more use cases that make sense like `tv`, `desktop` or something
- **service** - A service name like `google.com` or `your-company`
- **account** - An account name like `bob`
- **masterPassword** - A Password which you should have memorized and not saved anywhere (except physically)

The password is reproducable given these properties but **cannot** be reproduced with one part missing. It cannot be reverse-engineered.

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

Besides your new generated password, it also generates a serializable string which you can save to your a google docs sheet or whatever you use to store notes (Try [Notion](https://www.notion.so/)!) and then use it to recreate the password using the cli:

```bash
$ pwdx web/google.com/bob@gmail.com/16/digits:true/symbols:true
? master password: ****
> Your generated password is: hFuUpOyHDFSKN5LD
```

If you want you can also modify different generation attributes like the following:

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

The password encryption process is using the [pbkdf2](https://wikipedia.org/wiki/PBKDF2) algorithm from standard node [crypto](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback) package. The generated buffer is then mapped onto a base85 (with default settings) charset to generate your password.

## Author

**pwdx** © [Fabian Eichenberger](https://github.com/queckezz), Released under the [MIT](./license) License.<br>
Authored and maintained by Fabian Eichenberger with help from contributors ([list](https://github.com/queckezz/pwdx/contributors)).

> GitHub [@queckezz](https://github.com/queckezz) · Twitter [@queckezz](https://twitter.com/queckezz)

[version-image]: https://img.shields.io/npm/v/pwdx.svg?style=flat-square
[version-url]: https://npmjs.org/package/pwdx
