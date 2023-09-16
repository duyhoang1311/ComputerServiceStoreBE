const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Khach = require('../models/khach.model');

class KhachController {
    async khachDangKy(req, res) {
        const { username, email, password, hoten, ngaysinh, gioitinh, sdt } = req.body;

        // input validation
        if (!username || !email || !password)
            return res.status(400).json({ success: false, message: 'Chưa nhập username hoặc password' });
        try {
            const alreadyUser = await User.findOne({ username });
            const alreadyEmail = await Khach.findOne({ email });

            if (alreadyUser) return res.json({ success: false, message: 'Tên tài khoản đã tồn tại' });
            if (alreadyEmail) return res.json({ success: false, message: 'Email đã được sử dụng' });

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

    async khachDangNhap(req, res) {
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

    async layTatCaKhach(req, res) {
        try {
            const allKhach = await Khach.find();
            res.json({ success: true, messag: 'Lấy tất cả khách thành công', data: allKhach });
        } catch (err) {
            res.json({ success: false, message: 'Không thể lấy tất cả khách', err });
        }
    }

    // [DELETE] /khach/:_id
    async xoaKhach(req, res) {
        try {
            const deletedKhach = await Khach.findByIdAndDelete(req.params._id, req.body);

            if (!deletedKhach) {
                return res.json({ success: false, message: 'Không tìm thấy khách để xóa' });
            }

            const deletedUser = await User.findByIdAndDelete(deletedKhach.user);

            res.json({ success: true, message: 'Xóa khách thành công', deletedKhach });
        } catch (err) {
            res.json({ success: false, message: 'Không thể xóa khách', err });
        }
    }

    //[UPDATE] /khach/:_id
    async capNhatKhach(req, res) {
        try {
            const khachHangId = req.params._id;
            const updatedKhachData = req.body;

            if (req.userId !== khachHangId) {
                return res
                    .status(403)
                    .json({ success: false, message: 'Bạn không thể truy cập thông tin của người khác' });
            }

            const updatedKhach = await Khach.updateOne
            (
                { _id: khachHangId }, 
                updatedKhachData, 
                { new: true }
            );

            if (!updatedKhach) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy khách hàng để cập nhật' });
            }

            res.json({ success: true, message: 'Cập nhật thông tin khách hàng thành công', updatedKhach });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Không thể cập nhật thông tin khách hàng', error });
        }
    }
}

module.exports = new KhachController();
