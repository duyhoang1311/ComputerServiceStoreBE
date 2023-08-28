const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DichVuSchema = new Schema({
    tendichvu: {
        type: String,
        required: true
    },
    mota: {
        type: String,
        required: true
    },
    chiphi: {
        type: String,
        required: true
    },
    tgdukien: {
        type: Number,
        required: true
    },
    tgbaohanh: {
        type: String,
        required: true
    },
    loaidichvu: {
        type: Schema.Types.ObjectId,
        ref: 'loaidichvu'
    }
})

module.exports = mongoose.model('dichvu', DichVuSchema);