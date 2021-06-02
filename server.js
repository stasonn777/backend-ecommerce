const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
// const fileUpload = require('express-fileupload')
const upload = require('./utils/fileUpload')

const app = express()

// Connect DB
connectDB()

// cors
app.use(cors({ origin: true, credentials: true }));

// File fileUpload
upload(app)

// Init middleware
app.use(express.json({ extended: false }))

// Define routes
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/users', require('./routes/users'))
app.use('/api/customers', require('./routes/customers'))
app.use('/api/auth', require('./routes/userAuth'))
app.use('/api/account', require('./routes/customerauth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Srver started on ${PORT}`))
