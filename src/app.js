const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { PORT } = require('./configs')
const router = require('./routers')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.get('/health', (req, res) => {
    res.status(200).send('OK')
})

console.log('☄', 'Base Route', '/api')
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
