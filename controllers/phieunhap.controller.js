const argon2 = require('argon2');
const PhieuNhap = require('../models/phieunhap.model');
const DichVuModel = require('../models/dichvu.model');
const KhachModel = require('../models/khach.model')

class PhieuNhapController {
    async taoPhieuNhap(req, res) {
        try {
            const { KhachHang, tenMayTinh, moTaLoi, matKhauMayTinh, DichVu } = req.body;
            console.log(req.body);

            const checkKhachHang = await KhachModel.findById(KhachHang);

            if(!checkKhachHang){
                return res.json({ success: false, message: 'Khách hàng không tồn tại' });
            }

            if (!tenMayTinh) {
                return res.json({ success: false, message: 'Vui lòng nhập tên máy tính' });
            }

            // Mã hóa mật khẩu máy tính nếu có
            let hashedMK;
            if (matKhauMayTinh) {
                hashedMK = await argon2.hash(matKhauMayTinh);
            }

            // Kiểm tra nhiều dịch vụ có tồn tại
            const checkDichVu = [];
            for (const id of DichVu) {
                console.log(id);
                const dichVu = await DichVuModel.findById(id);
                if (!dichVu) {
                    return res.json({ success: false, message: `Không tồn tại dịch vụ với ID ${id}` });
                }
                checkDichVu.push(dichVu);
            }

            const newPhieuNhap = new PhieuNhap({
                KhachHang: checkKhachHang,
                tenMayTinh,
                moTaLoi,
                matKhauMayTinh: hashedMK,
                DichVu: checkDichVu,
            });
            const phieuNhapDaTao = await newPhieuNhap.save();

            res.json({ success: true, message: 'Tạo phiếu nhập thành công', phieuNhapDaTao });
        } catch (error) {
            res.json({ success: false, message: 'Tạo phiếu nhập thất bại', error });
        }
    }

    async getAllPhieuNhap(req, res) {
        try {
            const allPhieuNhap = await PhieuNhap.find();
            res.json({ success: true, message: 'Lấy tất cả phiếu nhập thành công', data: allPhieuNhap });
        } catch (error) {
            res.json({ success: false, message: 'Không thể lấy tất cả phiếu nhập', error });
        }
    }
}

module.exports = new PhieuNhapController();
