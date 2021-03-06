// Generated by CoffeeScript 1.10.0
var Generator, stream, util;

stream = require('stream');

util = require('util');

module.exports = function() {
  var callback, data, generator, options;
  if (arguments.length === 2) {
    options = arguments[0];
    callback = arguments[1];
  } else if (arguments.length === 1) {
    if (typeof arguments[0] === 'function') {
      options = {};
      callback = arguments[0];
    } else {
      options = arguments[0];
    }
  } else if (arguments.length === 0) {
    options = {};
  }
  generator = new Generator(options);
  if (callback) {
    data = [];
    generator.on('readable', function() {
      var d, results;
      results = [];
      while (d = generator.read()) {
        results.push(data.push(options.objectMode ? d : d.toString()));
      }
      return results;
    });
    generator.on('error', callback);
    generator.on('end', function() {
      return callback(null, options.objectMode ? data : data.join(''));
    });
  }
  return generator;
};

Generator = function(options1) {
  var base, base1, base2, base3, base4, base5, base6, i, j, len, ref, v;
  this.options = options1 != null ? options1 : {};
  stream.Readable.call(this, this.options);
  if ((base = this.options).columns == null) {
    base.columns = 8;
  }
  if ((base1 = this.options).max_word_length == null) {
    base1.max_word_length = 16;
  }
  if ((base2 = this.options).fixed_size == null) {
    base2.fixed_size = false;
  }
  if ((base3 = this.options).end == null) {
    base3.end = null;
  }
  if ((base4 = this.options).seed == null) {
    base4.seed = false;
  }
  if ((base5 = this.options).length == null) {
    base5.length = -1;
  }
  if ((base6 = this.options).delimiter == null) {
    base6.delimiter = ',';
  }
  this._ = {
    fixed_size_buffer: '',
    count_written: 0,
    count_created: 0
  };
  if (typeof this.options.columns === 'number') {
    this.options.columns = new Array(this.options.columns);
  }
  ref = this.options.columns;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    v = ref[i];
    if (v == null) {
      v = 'ascii';
    }
    if (typeof v === 'string') {
      this.options.columns[i] = Generator[v];
    }
  }
  return this;
};

util.inherits(Generator, stream.Readable);

module.exports.Generator = Generator;

Generator.prototype.random = function() {
  if (this.options.seed) {
    return this.options.seed = this.options.seed * Math.PI * 100 % 100 / 100;
  } else {
    return Math.random();
  }
};

Generator.prototype.end = function() {
  return this.push(null);
};

Generator.prototype._read = function(size) {
  var column, data, header, j, k, l, len, len1, len2, len3, length, line, lineLength, m, ref;
  data = [];
  length = this._.fixed_size_buffer.length;
  if (length) {
    data.push(this._.fixed_size_buffer);
  }
  while (true) {
    if ((this._.count_created === this.options.length) || (this.options.end && Date.now() > this.options.end)) {
      if (data.length) {
        if (this.options.objectMode) {
          for (j = 0, len = data.length; j < len; j++) {
            line = data[j];
            this._.count_written++;
            this.push(line);
          }
        } else {
          this._.count_written++;
          this.push(data.join(''));
        }
      }
      return this.push(null);
    }
    line = [];
    ref = this.options.columns;
    for (k = 0, len1 = ref.length; k < len1; k++) {
      header = ref[k];
      line.push("" + (header(this)));
    }
    if (this.options.objectMode) {
      lineLength = 0;
      for (l = 0, len2 = line.length; l < len2; l++) {
        column = line[l];
        lineLength += column.length;
      }
    } else {
      line = "" + (this._.count_created === 0 ? '' : '\n') + (line.join(this.options.delimiter));
      lineLength = line.length;
    }
    this._.count_created++;
    if (length + lineLength > size) {
      if (this.options.objectMode) {
        data.push(line);
        for (m = 0, len3 = data.length; m < len3; m++) {
          line = data[m];
          this._.count_written++;
          this.push(line);
        }
      } else {
        if (this.options.fixed_size) {
          this._.fixed_size_buffer = line.substr(size - length);
          data.push(line.substr(0, size - length));
        } else {
          data.push(line);
        }
        this._.count_written++;
        this.push(data.join(''));
      }
      break;
    }
    length += lineLength;
    data.push(line);
  }
};

Generator.ascii = function(gen) {
  var char, column, j, nb_chars, ref;
  column = [];
  for (nb_chars = j = 0, ref = Math.ceil(gen.random() * gen.options.max_word_length); 0 <= ref ? j < ref : j > ref; nb_chars = 0 <= ref ? ++j : --j) {
    char = Math.floor(gen.random() * 32);
    column.push(String.fromCharCode(char + (char < 16 ? 65 : 97 - 16)));
  }
  return column.join('');
};

Generator.int = function(gen) {
  return Math.floor(gen.random() * Math.pow(2, 52));
};

Generator.bool = function(gen) {
  return Math.floor(gen.random() * 2);
};
