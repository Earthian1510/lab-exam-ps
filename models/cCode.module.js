const mongoose = require('mongoose')

const cCodeSchema = new mongoose.Schema({
    srNo: Number,
    code: String,
})

const CCode = mongoose.model('CCode', cCodeSchema)
module.exports = {CCode}

