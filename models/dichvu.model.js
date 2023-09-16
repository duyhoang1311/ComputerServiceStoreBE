const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DichVuSchema = new Schema({
    tendichvu: {
        type: String,
        required: true,
    },
    mota: {
        type: String,
        required: true,
    },
    chiphi: {
        type: Number,
        required: true,
    },
    tgdukien: {
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            enum: ['ngay', 'gio'],
        },
    },
    tgbaohanh: {
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            enum: ['ngay', 'thang'],
        },
    },
    loaidichvu: {
        type: String,
        required: true,
        enum: ['Dịch vụ lẻ', 'Combo'],
    },
});

module.exports = mongoose.model('dichvu', DichVuSchema);
