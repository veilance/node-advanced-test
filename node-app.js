const ReadText = require('./readText')
const SummaryReport = require('./summaryReport')

const readTextStream = new ReadText()
const writeSummaryReportStream = new SummaryReport()

process.stdin
  .pipe(readTextStream)
  .pipe(writeSummaryReportStream)
  .pipe(process.stdout);