const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const KhachSchema = require('./khach.model').schema;
const PhieuNhapSchema = require('./phieunhap.model').schema;

const HoaDonSchema = new Schema(
    {
        khachhang: {
            type: KhachSchema,
        },
        idnhanvien: {
            type: Schema.Types.ObjectId,
            ref: 'nhanvien',
        },
        phieunhap: PhieuNhapSchema,
        ngaytao: {
            type: Date,
            required: true
        },
        tongchiphi: {
            type: Number,
        },
        ngayDuKienTraMay: {
            type: Date,
        },
        trangthai: {
            type: String,
            enum: ['chưa thanh toán', 'đã thanh toán', 'đã hủy'],
            default: 'chưa thanh toán',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('hoadon', HoaDonSchema);
