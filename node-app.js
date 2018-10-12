const readText = require('./readText')
const summaryReport = require('./summaryReport')

process.stdin
  .pipe(readText)
  .pipe(summaryReport)
  .pipe(process.stdout);