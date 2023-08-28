const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoaiDichVuSchema = new Schema({
    tenloai: {
        type: String,
        required: true
    },
    mota: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('loaidichvu', LoaiDichVuSchema);
