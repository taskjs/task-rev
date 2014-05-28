var Execution = require('execution');
var Record = require('record');
var path = require('path');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        length: {
            label: 'Length',
            default: 8,
            type: 'number'
        },
        template: {
            label: 'Template',
            default: '{h}.{b}{e}',
            type: 'string',
            placeholder: '{h} is file hash value, {b} is file basename, {e} is file extname.'
        },
        algorithm: {
            label: 'Algorithm',
            type: 'string',
            default: 'md5',
            placeholder: 'the given algorithm which used to generate hash digests'
        },
        encoding: {
            label: 'Encoding',
            type: 'select',
            default: 'utf8',
            options: ['utf8', 'ascii', 'binary']
        }
    },
    run: function (inputs, options, logger, settings) {
        return this._run(inputs, options, logger, settings);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var crypto = require('crypto');

        inputs = inputs.map(function(file){
            var contents = file.contents.toString();
            var md5 = crypto.createHash(options.algorithm).update(contents, options.encoding).digest('hex');
            var hash = md5.slice(0, options.length);
            var ext = path.extname(file.path);
            var basename = path.basename(file.path, ext);
            var filename = options.template.replace('{h}', hash).replace('{b}', basename).replace('{e}', ext);

            var filepath = path.join(path.dirname(file.path), filename);

            return new Record({
                contents: contents,
                path: filepath
            })

        });

        resolve(inputs);
    }
})
