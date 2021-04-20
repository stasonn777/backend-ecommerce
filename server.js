const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const fileUpload = require('express-fileupload')

const app = express()

// Connect DB
connectDB()

// cors
app.use(cors({ origin: true, credentials: true }));

// File fileUpload
app.use(fileUpload())
app.use('/uploads', express.static('uploads'));

app.post('/upload', (req, res) => {
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


// Init middleware
app.use(express.json({ extended: false }))

// app.get('/', (req, res) =>
//   res.json({ msg: 'This is my first Back-End project' })
// )

// Define routes
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/users', require('./routes/users'))
app.use('/api/customers', require('./routes/customers'))
app.use('/api/auth', require('./routes/userAuth'))
app.use('/api/account', require('./routes/customerauth'))
// app.use('/uploads', require('./routes/fileUpload'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Srver started on ${PORT}`))
