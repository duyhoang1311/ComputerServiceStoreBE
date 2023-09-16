const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const KhachSchema = require('./khach.model').schema;
const DichVuSchema = require('./dichvu.model').schema;

const PhieuNhapSchema = new Schema({
    KhachHang: KhachSchema,

    ngayNhap: {
        type: Date,
        default: Date.now,
    },
    tenMayTinh: {
        type: String,
        required: true,
    },
    moTaLoi: {
        type: String,
    },
    matKhauMayTinh: {
        type: String,
    },

    DichVu: [DichVuSchema],
});

module.exports = mongoose.model('phieunhap', PhieuNhapSchema);
