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
            enum: ['ngày', 'giờ'],
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
            enum: ['ngày', 'tháng'],
        },
    },
    loaidichvu: {
        type: String,
        enum: ['Dịch vụ lẻ', 'Combo'],
    },
});

module.exports = mongoose.model('dichvu', DichVuSchema);
