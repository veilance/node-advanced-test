const { Transform } = require("stream");
const start_time = new Date();
const obj = {
  elapsed_time: 0,
  total_length_in_bytes: 0,
  number_of_lines: 0
};

const ReadText = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    // changes according to the time in (ms)
    obj.elapsed_time = new Date() - start_time;

    // adds the number of bytes of the chunk to the object
    obj.total_length_in_bytes += Buffer.byteLength(chunk, encoding);

    // converts the chunk to a string, trims the whitespace and splits on any line break on multiple platforms (unix and Windows)
    obj.number_of_lines += chunk
      .toString(encoding)
      .trim()
      .split(/\r\n|[\n\r\u0085\u2028\u2029]/g).length;

    // pushes the object to the next stream to consume
    this.push(obj);
    callback();
  }
});

module.exports = ReadText;