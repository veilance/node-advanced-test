const { Transform } = require("stream");

class SummaryReport extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    if (!chunk) {
      throw new Error("Empty chunk passed in SummaryReport Stream");
    }
    
    let time_in_seconds = chunk.elapsed_time / 1000 
    if (time_in_seconds === 0) {
      time_in_seconds = 1 
    }
    const growthRate = (
        chunk.total_length_in_bytes /
        time_in_seconds
      ).toFixed(2)

    const number_lines = chunk.number_of_lines;
    this.push(
      `${number_lines} lines read and growth of file is ${growthRate} bytes/s\n`
    );
    callback();
  }
}

module.exports = SummaryReport;
