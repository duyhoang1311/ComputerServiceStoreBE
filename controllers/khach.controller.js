const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Khach = require('../models/khach.model');

class KhachController {
    async khachdangky(req, res) {
        const { username, email, password, hoten, ngaysinh, gioitinh, sdt } = req.body;

        // input validation
        if (!username || !email || !password)
            return res.status(400).json({ success: false, message: 'Chưa nhập username hoặc password' });
        try {
            const user = await User.findOne({ username });

            if (user) return res.json({ success: false, message: 'Tên tài khoản đã tồn tại' });
            const hasdedPassword = await argon2.hash(password);
            const newUser = await User.create({
                username,
                khach: true,
                password: hasdedPassword,
            });
            // const getUser = await newUser.save();

            const newKhach = await Khach.create({
                email,
                hoten,
                ngaysinh,
                gioitinh,
                sdt,
                user: newUser._id,
            });

            // const getKhach = newKhach.save();

            res.json({ success: true, message: 'Tạo tài khoản thành công', newUser, newKhach });
        } catch (error) {
            res.json({ message: 'fail', error });
        }
    }

    async khachdangnhap(req, res) {
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
                        khach: user.khach
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2h' },
                );
                return res.status(200).json({ success: true, message: 'Đăng nhập thành công', user, accessToken });
            }
        } catch (error) {
            res.json({success:false, error});
        }
    }
}

module.exports = new KhachController();
