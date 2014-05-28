# task-rev
> Static asset revisioning by appending content hash to filenames.

## The "rev" task

### Usage Examples

```js
var rev = new (require('task-rev'))
rev.run(inputs, options, logger)
```

### Options

#### options.length
Type: `number`
Default: `8`

The number of characters of the file content hash append to the file name.

#### options.encoding
Type: `string`
Default: `'utf8'`

The encoding of the file contents.

#### options.algorithm
Type: `string`
Default: `'md5'`

`algorithm` is dependent on the available algorithms supported by the version of OpenSSL on the platform. Examples are `'sha1'`, `'md5'`, `'sha256'`, `'sha512'`, etc. On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.

#### options.template
Type: `string`
Default: `'{h}.{b}{e}'`

`{h}` is file hash value, `{b}` is file basename, `{e}` is file extname.

## Release History


## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
