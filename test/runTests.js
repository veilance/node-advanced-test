"use strict";

const assert = require("assert");
const path = require("path");
const ReadText = require(path.resolve("./readText"));


describe("ReadText Stream Test", function() {
  describe("ReadText Stream number of lines", function() {
    const ReadTextStream = new ReadText();
    it("should return 0 when the number lines is 0", function() {
      ReadTextStream.write();
      assert.equal(
        ReadTextStream.obj.number_of_lines,
        0,
        "number of lines should be 0"
      );
    });
  });

  describe("ReadText Stream number of lines", function() {
    const ReadTextStream = new ReadText();
    it("should return 1 when the number lines is 1", function() {
      ReadTextStream.write("Hii");
      assert.equal(
        ReadTextStream.obj.number_of_lines,
        1,
        "number of lines should be 1"
      );
    });
  });
});
