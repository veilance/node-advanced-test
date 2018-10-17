const { Transform } = require("stream");

class ReadText extends Transform {
  constructor(options) {
    super({ objectMode: true });
    this.obj = {
      elapsed_time: 0,
      total_length_in_bytes: 0,
      number_of_lines: 0
    };
    this.start_time = new Date();
  }

  _transform(chunk, encoding, callback) {
    if (!chunk) {
      this.push(this.obj);
    } else {
      // changes according to the time in (ms)
      this.obj.elapsed_time = new Date() - this.start_time;

      // adds the number of bytes of the chunk to the object
      this.obj.total_length_in_bytes += Buffer.byteLength(chunk, encoding);

      // converts the chunk to a string, trims the whitespace and splits on any line break on multiple platforms (unix and Windows)
      this.obj.number_of_lines += chunk
        .toString(encoding)
        .trim()
        .split(/\r\n|[\n\r\u0085\u2028\u2029]/g).length;
      // pushes the object to the next stream to consume
      this.push(this.obj);
      callback();
    }
  }
}

module.exports = ReadText;
