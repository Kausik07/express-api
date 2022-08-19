const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { PORT } = require('./configs')
const connectMongo = require('./services/mongodb.service')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).send('OK')
})

console.log('☄', 'Base Route', '/api')
const router = require('./routers')
app.use('/api', router)

app.use((err, req, res, next) => {
    console.log('💀', 'Error')
    res.status(500).json({
        status: "error",
        message: err.message,
        error: true,
    })
})

app.listen(PORT, () => {
    connectMongo()
    console.log(`🚀 API listening on port ${PORT}`)
})
