const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
 
 const upload = (app) => {
  app.use(fileUpload())
  app.use('/uploads', express.static('uploads'));
  app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({msg: 'Np files uploaded'})
  }
  const file = req.files.file
  const configFile = path.join(__dirname, `../uploads/${file.name}`)
  file.mv(configFile, (err) => {
    if (err) {
      log.error(err)
      return res.status(500), send(err)
    }
    res.json({filename: file.name, filepath: `/uploads/${file.name}`})
  })
})
}

module.exports = upload