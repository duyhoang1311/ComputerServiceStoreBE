const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const KhachSchema = require('./khach.model').schema;
const DichVuSchema = require('./dichvu.model').schema;

const HoaDonSchema = new Schema(
    {
        khach: {
            type: KhachSchema,
        },
        idnhanvien: {
            type: Schema.Types.ObjectId,
            ref: 'nhanvien',
        },
        dichvu: [DichVuSchema],
        ngaytao: {
            type: Date,
            required: true,
        },
        tongchiphi: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('hoadon', HoaDonSchema);
