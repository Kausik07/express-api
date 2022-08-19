const mongoose = require('mongoose');
const { MONGODB_URI } = require('../configs')

module.exports = async () => {
    const mongo_url = process.env.MONGODB_URI || MONGODB_URI;
    await mongoose.connect(
        mongo_url,
        () => console.log('Connected to MongoDB 🍀')
    )
}