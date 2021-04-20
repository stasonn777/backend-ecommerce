const express = require('express')
const router = express.Router()

//Upload endpoint
router.post('/uploads', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({msg: 'Np files uploaded'})
  }

  const file = req.files.file

  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if (err) {
      log.error(err)
      return res.status(500), send(err)
    }

    res.json({filename: file.name, filepath: `/uploads/${file.name}`})
  })
})

module.exports = router