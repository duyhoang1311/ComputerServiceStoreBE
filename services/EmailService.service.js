const moment = require('moment');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const HoaDonModel = require('../models/hoadon.model');
const KhachModel = require('../models/khach.model');
require('dotenv').config();

const sendMail = async ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        secure: true,
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: '"ComputerServiceStore" <process.env.EMAIL_USER>',
        to: email,
        subject: subject,
        html: html,
    };

    const result = await transporter.sendMail(message);
    return result;
};

const task = cron.schedule('49 15 * * *', async () => {
    moment.locale('vi');

    const ngayHomSau = moment().add(1, 'days').startOf('day');
    const ngayMot = moment().add(2, 'days').startOf('day');
    console.log('ngayHomSau ' + ngayHomSau );
    console.log('ngayMot ' + ngayMot );

    const ngayHomSauFormatted = moment(ngayHomSau).utc().format('YYYY-MM-DDTHH:mm:ss.SSS+00:00');
    const ngayMotFormatted = moment(ngayMot).utc().format('YYYY-MM-DDTHH:mm:ss.SSS+00:00');
    console.log(ngayHomSauFormatted);

    const listHoaDon = await HoaDonModel.find({
        ngayDuKienTraMay: {
            $gte: moment(ngayHomSauFormatted).utc().toDate(),
            $lt: moment(ngayMotFormatted).utc().toDate(),
        },
    });
    console.log(listHoaDon);

    for (const hoadon of listHoaDon) {
        const checkKhach = await KhachModel.findById(hoadon.khachhang);
        const formatNgayDuKien = moment(hoadon.ngayDuKienTraMay).format('DD/MM/YYYY');

        await sendMail({
            email: checkKhach.email,
            subject: 'Thông báo lấy máy tính',
            html: `
                <div>
                    <p>Xin chào <strong>${checkKhach.hoten}</strong>,</p>
                    <p>Chúng tôi nhắc bạn đến việc lấy máy tính vào ngày <strong>${formatNgayDuKien}. </p>

                    <p>Vui lòng đến cửa hàng của chúng tôi vào thời gian đã hẹn.</p>
                    <p>Xin cảm ơn!</p>

                    <p>Computer Service Store</p>
                </div>
            `,
        });
    }
});

task.start();

module.exports = sendMail;
