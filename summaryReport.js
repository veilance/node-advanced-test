const { Transform } = require("stream");

const SummaryReport = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const growthRate =
      (chunk.total_length_in_bytes / (chunk.elapsed_time / 1000)).toFixed(2)
    const number_lines = chunk.number_of_lines;
    this.push(
      `${number_lines} lines read and growth of file is ${growthRate} bytes/s` +
        "\n"
    );
    callback();
  }
});

module.exports = SummaryReport;