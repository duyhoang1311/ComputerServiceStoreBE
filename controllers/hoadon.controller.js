const moment = require('moment');
const KhachModel = require('../models/khach.model');
const PhieuNhapModel = require('../models/phieunhap.model');
const HoaDonModel = require('../models/hoadon.model');
const sendMail = require('../services/EmailService.service');

class HoaDonController {
    async lapHoaDon(req, res) {
        try {
            const { khachhang, idnhanvien, phieunhap, tongchiphi, ngayDuKienTraMay, trangthai, ngaytao } = req.body;
            // console.log(req.body);

            const checkKhach = await KhachModel.findById(khachhang);

            if (!checkKhach) {
                return res.json({ success: false, message: 'Không tìm thấy khách hàng' });
            }
            console.log(checkKhach);

            const checkPhieuNhap = await PhieuNhapModel.findById(phieunhap);

            if (!checkPhieuNhap) {
                return res.json({ success: false, message: 'Phiếu nhập không tồn tại' });
            }

            const listDichVu = checkPhieuNhap.DichVu;

            console.log('Danh sách dịch vụ: ' + listDichVu);

            const finalChiPhi = listDichVu.reduce((total, dichvu) => {
                return total + dichvu.chiphi;
            }, 0);

            console.log(finalChiPhi);

            let maxNgayDuKien = 0;

            for (const dvu of listDichVu) {
                if (dvu.tgdukien.unit === 'ngay' && dvu.tgdukien.value > maxNgayDuKien) {
                    maxNgayDuKien = dvu.tgdukien.value;
                    console.log('maxNgayDuKien: ' + maxNgayDuKien);
                }
            }

            const resultNgayTraMay = new Date(ngaytao);

            resultNgayTraMay.setDate(resultNgayTraMay.getDate() + maxNgayDuKien);
            console.log('Ngày dự kiến trả máy: ' + resultNgayTraMay);

            const newHoaDon = new HoaDonModel({
                khachhang: checkKhach,
                idnhanvien,
                ngaytao,
                phieunhap: checkPhieuNhap,
                ngayDuKienTraMay: resultNgayTraMay,
                tongchiphi: finalChiPhi,
                trangthai,
            });

            moment.locale('vi');

            const formatDate = moment(ngaytao).format('DD/MM/YYYY');
            const formatNgayDuKien = moment(resultNgayTraMay).format('DD/MM/YYYY');
            console.log('formatNgayDuKien: ' + formatNgayDuKien);
            const chiTietHoaDon = listDichVu.map((dv) => {
                return `${dv.tendichvu} - ${dv.chiphi.toLocaleString('da-DK')} VNĐ`;
            });

            await sendMail({
                email: checkKhach.email,
                subject: 'Computer Service Store - Hóa đơn được xác nhận',
                html: `
                    <div style="font-size: 16px; font-weight: 400; font-family: Arial, sans-serif; margin: 0; padding: 10px; background-color: #f5f5f5;">
                        <h1 style="color: #333;">Đơn hàng của bạn đang được xử lý</h1>
                        <p>Xin chào ${checkKhach.hoten},</p>
                        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Dưới đây là thông tin hóa đơn mà chúng tôi đã lập từ phiếu nhập của bạn:</p>

                        <h2>Thông tin Hóa Đơn </h2>
                        <span style="font-weight: bold;">Ngày nhập:<strong> ${formatDate}</span><br>
                        <span style="font-weight: bold;">Ngày dự kiến hoàn thành:<strong> ${formatNgayDuKien}</span>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 10px;">Khách hàng:<strong> ${checkKhach.hoten}</li>
                            <li style="margin-bottom: 10px;">Email:<strong> ${checkKhach.email}</li>
                            <li style="margin-bottom: 10px;">Tên máy tính:<strong> ${checkPhieuNhap.tenMayTinh}</li>
                            <li style="margin-bottom: 10px;">Mô tả lỗi:<strong> ${checkPhieuNhap.moTaLoi}</li>
                            <li style="margin-bottom: 10px;">Tình trạng: <strong> ${newHoaDon.trangthai}</li>
                        </ul>

                        <h2>Chi Tiết Hóa Đơn</h2>
                        <ul style="list-style: none; padding: 0; border-bottom:1px solid rgba(0,0,0,0.12);">
                            ${chiTietHoaDon
                                .map((item) => `<li style="margin-bottom: 10px;"><strong>${item}</li>`)
                                .join('')}
                        </ul>

                        <div style="text-align: right;">Tổng chi phí hóa đơn: <strong> ${newHoaDon.tongchiphi.toLocaleString(
                            'da-DK',
                        )} VNĐ</div>

                        <p>Cảm ơn bạn đã lựa chọn chúng tôi.</p>

                        <p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu bổ sung, xin vui lòng liên hệ với chúng tôi.</p>

                        <p>Trân trọng,</p>
                        <p>Computer Service Store</p>
                    </div>

                `,
            });
            const resultHoaDon = await newHoaDon.save();

            res.json({ success: true, message: 'Lập hóa đơn thành công', resultHoaDon });
        } catch (error) {
            res.json({ success: true, message: 'Không thể lập hóa đơn', error });
        }
    }
}

module.exports = new HoaDonController();
