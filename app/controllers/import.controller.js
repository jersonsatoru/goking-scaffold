const csv = require('csv-parser')
const fs = require('fs')
const repositoryUser = require('../repository/user.repository')

// import file CSV
exports.importCSV = (req, res) => {
  const results = []
  fs.createReadStream('https://starbem.s3.amazonaws.com/csv/modelo-b2b.csv')
    //fs.createReadStream('./import.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const fields = { national_registration: req.body.national_registration }
      repositoryUser.importCreate(results, fields)
      res.status(200).send({
        status: true,
        message: 'CSV file successfully processed',
      })
    })
}
