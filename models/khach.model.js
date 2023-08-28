const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KhachSchema = new Schema({
    hoten: {
        type: String,
        required: true,
    },
    ngaysinh: {
        type: Date,
        required: true,
    },
    gioitinh: {
        type: Boolean,
        required: true,
    },
    sdt: {
        type: String,
        required: true,
        validate: {
            validator: (phonenum) => /^[0-9]{10}$/.test(phonenum),
            message: (props) => `${props.value} không phải là số hợp lệ`,
        },
    },
    email: {
        type: String,
        required: true,
        uniquue: true,
        validate: {
            validator: (v) => /\S+@\S+\.\S+/.test(v),
            message: (props) => `${props.value} không phải email hợp lệ`,
        },
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
});

module.exports = mongoose.model('khach', KhachSchema);
