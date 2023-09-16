const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const NhanVien = require('../models/nhanvien.model');

class NhanVienController {
    async nvdangky(req, res) {
        const { username, email, password, hoten, ngaysinh, gioitinh, sdt } = req.body;

        // input validation
        if (!username || !email || !password)
            return res.status(400).json({ success: false, message: 'Chưa nhập username hoặc password' });
        try {
            const alreadyUser = await User.findOne({ username });
            const alreadyEmail = await NhanVien.findOne({ email });

            if (alreadyUser) return res.json({ success: false, message: 'Tên tài khoản đã tồn tại' });
            if (alreadyEmail) return res.json({ success: false, message: 'Email đã được sử dụng' });

            const hasdedPassword = await argon2.hash(password);
            const newUser = await User.create({
                username,
                nhanvien: true,
                password: hasdedPassword,
            });
            // const getUser = await newUser.save();

            const newNhanVien = await NhanVien.create({
                email,
                hoten,
                ngaysinh,
                gioitinh,
                sdt,
                user: newUser._id,
            });

            res.json({ success: true, message: 'Tạo tài khoản thành công', newUser, newNhanVien });
        } catch (error) {
            res.json({ message: 'fail', error });
        }
    }

    async nvdangnhap(req, res) {
        const { username, password } = req.body;
        // input validation
        if (!username || !password)
            return res.status(400).json({ success: false, message: 'Chưa nhập username hoặc password' });
        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ success: false, message: 'Tài khoản không tồn tại' });
            }
            const validPassword = await argon2.verify(user.password, password);

            if (!validPassword) {
                return res.status(404).json({ success: false, message: 'Tài khoản hay mật khẩu không hợp lệ' });
            }

            if (user && validPassword) {
                //Return token
                const accessToken = jwt.sign(
                    {
                        userId: user._id,
                        nhanvien: user.nhanvien,
                        khach: user.khach,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2d' },
                );
                return res.status(200).json({ success: true, message: 'Đăng nhập thành công', user, accessToken });
            }
        } catch (error) {
            res.json({ success: false, error });
        }
    }

    async getallnv(req, res) {
        try {
            const nv = await User.find({ nhanvien: true });
            res.json({ success: true, message: 'Get all nhanvien successfully', nv });
        } catch (err) {
            res.json({ success: false, message: 'Cannot get all nhanvien', err });
        }
    }
}

module.exports = new NhanVienController();
