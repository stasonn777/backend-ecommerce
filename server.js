const express = require('express')

const app = express()

app.get('/', (req, res) =>
  res.json({ msg: 'This is my first Back-End project' })
)

// Define routes
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/users', require('./routes/users'))
app.use('/api/customers', require('./routes/customers'))
app.use('/api/auth', require('./routes/userAuth'))
app.use('/api/account', require('./routes/customerAuth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Srver started on ${PORT}`))
