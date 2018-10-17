"use strict";

const assert = require("assert");
const path = require("path");
const ReadText = require(path.resolve("./readText"));
const SummaryReport = require(path.resolve("./summaryReport"));

describe("ReadText Stream Test", function() {
  describe("Falsy value is passed into ReadTextStream", function() {
    const ReadTextStream = new ReadText();
    it("should throw error message when empty chunk passed to stream", function() {
      assert.throws(
        () => {
          ReadTextStream.write();
        },
        /Empty chunk passed/,
        "incorrect error thrown on empty chunk"
      );
    });
  });

  describe("ReadText Stream is passed text line Hii", function() {
    const ReadTextStream = new ReadText();
    it("should return 1 line read and 3 bytes when text is Hii", function() {
      ReadTextStream.write("Hii");
      assert.equal(
        ReadTextStream.obj.number_of_lines,
        1,
        "number of lines should be 1"
      );
      assert.equal(
        ReadTextStream.obj.total_length_in_bytes,
        3,
        "total_length_in_bytes should be 3"
      );
    });
  });

  describe("ReadText Stream is passed Hii\\nHello hello", function() {
    const ReadTextStream = new ReadText();
    it("should return 2 lines read and 15 bytes when text is Hii\\nHello hello", function() {
      ReadTextStream.write("Hii\nHello hello");
      assert.equal(
        ReadTextStream.obj.number_of_lines,
        2,
        "number of lines should be 2"
      );
      assert.equal(
        ReadTextStream.obj.total_length_in_bytes,
        15,
        "total_length_in_bytes should be 15"
      );
    });
  });

  describe("ReadText Stream is passed chinese text ⺄⺅⺇⺋⺋", function() {
    const ReadTextStream = new ReadText();
    it("should return 1 line read and 15 bytes when text is ⺄⺅⺇⺋⺋", function() {
      ReadTextStream.write("⺄⺅⺇⺋⺋");
      assert.equal(
        ReadTextStream.obj.number_of_lines,
        1,
        "number of lines should be 1"
      );
      assert.equal(
        ReadTextStream.obj.total_length_in_bytes,
        15,
        "total_length_in_bytes should be 15"
      );
    });
  });
});

describe("SummaryReport Stream Test", function() {
  // base case input is empty
  describe("SummaryReport is passed an obj with base case of 0 for all params", function() {
    const obj = {
      total_length_in_bytes: 0,
      number_of_lines: 0,
      elapsed_time: 0
    };
    it("should return 0 lines and 0 bytes/s when the input is empty", function() {
      const SummaryReportStream = new SummaryReport();
      SummaryReportStream.write(obj);
      const msg = SummaryReportStream.read().toString();
      assert.equal(
        msg,
        `0 lines read and growth of file is 0.00 bytes/s\n`,
        "number of lines should be 0, growth 0.00 bytes/s"
      );
    });
  });

  // test with 1 line
  describe("SummaryReport Stream is passed an obj with total_length_in_bytes: 50, number_of_lines: 1 and elapsed_time: 150", function() {
    const obj = {
      total_length_in_bytes: 50,
      number_of_lines: 1,
      elapsed_time: 150
    };
    it(`should return ${
      obj.number_of_lines
    } lines read and growth of file is ${(
      obj.total_length_in_bytes /
      (obj.elapsed_time / 1000)
    ).toFixed(2)} bytes/s`, function() {
      const SummaryReportStream = new SummaryReport();
      SummaryReportStream.write(obj);
      const msg = SummaryReportStream.read().toString();
      assert.equal(
        msg,
        `${obj.number_of_lines} lines read and growth of file is ${(
          obj.total_length_in_bytes /
          (obj.elapsed_time / 1000)
        ).toFixed(2)} bytes/s\n`,
        `lines or growth of file incorrect`
      );
    });
  });

  // test 10 lines
  describe("SummaryReport Stream is passed an obj with total_length_in_bytes: 4000, number_of_lines: 10 and elapsed_time: 0", function() {
    const obj = {
      total_length_in_bytes: 4000,
      number_of_lines: 10,
      elapsed_time: 0
    };
    it(`should return 10 lines and ${(
      obj.total_length_in_bytes /
      (obj.elapsed_time / 1000)
    ).toFixed(2)} bytes/s when the input is empty`, function() {
      const SummaryReportStream = new SummaryReport();
      SummaryReportStream.write(obj);
      const msg = SummaryReportStream.read().toString();
      assert.equal(
        msg,
        `${obj.number_of_lines} lines read and growth of file is ${(
          obj.total_length_in_bytes / 1
        ).toFixed(2)} bytes/s\n`,
        "lines or growth of file incorrect"
      );
    });
  });

  // Test when the object is falsy
  describe("Test when the falsy value passed to SummaryReportStream", function() {
    it(`should return error message: Empty chunk passed in SummaryReport Stream`, function() {
      const SummaryReportStream = new SummaryReport();
      assert.throws(
        () => {
          SummaryReportStream.write();
        },
        /Empty chunk passed in SummaryReport Stream/,
        "error message wasn't thrown on falsy object passed to stream"
      );
    });
  });
});
