SET DEFINE OFF;
-- ============================================================
-- DỮ LIỆU MẪU (INSERT)
-- ============================================================

-- Danh mục
INSERT INTO DANHMUC (Madanhmuc, TenDM, MoTa) VALUES ('DM1', 'Hàng Mới Về', 'Sản phẩm mới cập nhật');
INSERT INTO DANHMUC (Madanhmuc, TenDM, MoTa) VALUES ('DM2', 'Bán Chạy Nhất', 'Sản phẩm bán chạy');
INSERT INTO DANHMUC (Madanhmuc, TenDM, MoTa) VALUES ('DM3', 'Giày Sneaker', 'Giày sneaker các loại');
INSERT INTO DANHMUC (Madanhmuc, TenDM, MoTa) VALUES ('DM4', 'Quần Áo Streetwear', 'Thời trang đường phố');
INSERT INTO DANHMUC (Madanhmuc, TenDM, MoTa) VALUES ('DM5', 'Phụ Kiện', 'Túi, mũ, tất');

-- Thương hiệu
INSERT INTO THUONGHIEU (Mathuonghieu, TenTH, QuocGia, MoTa) VALUES ('TH1', 'Nike', 'Mỹ', 'Thương hiệu thể thao hàng đầu');
INSERT INTO THUONGHIEU (Mathuonghieu, TenTH, QuocGia, MoTa) VALUES ('TH2', 'Jordan', 'Mỹ', 'Dòng giày huyền thoại');
INSERT INTO THUONGHIEU (Mathuonghieu, TenTH, QuocGia, MoTa) VALUES ('TH3', 'adidas', 'Đức', 'Thương hiệu thể thao từ Đức');
INSERT INTO THUONGHIEU (Mathuonghieu, TenTH, QuocGia, MoTa) VALUES ('TH4', 'New Balance', 'Mỹ', 'Giày chất lượng cao');
INSERT INTO THUONGHIEU (Mathuonghieu, TenTH, QuocGia, MoTa) VALUES ('TH5', 'Converse', 'Mỹ', 'Giày canvas cổ điển');

-- Người dùng (mật khẩu = SHA256 '123456')
INSERT INTO NGUOIDUNG (Manguoidung, TenND, Email, MatKhau, SoDienThoai, DiaChi, VaiTro) VALUES ('ND1001', 'Nguyễn Văn An', 'an.nguyen@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0901234567', '123 Nguyễn Huệ, Q1, TP.HCM', 'KHACHHANG');
INSERT INTO NGUOIDUNG (Manguoidung, TenND, Email, MatKhau, SoDienThoai, DiaChi, VaiTro) VALUES ('ND1002', 'Trần Thị Bích', 'bich.tran@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0902345678', '456 Lê Lợi, Q1, TP.HCM', 'KHACHHANG');
INSERT INTO NGUOIDUNG (Manguoidung, TenND, Email, MatKhau, SoDienThoai, DiaChi, VaiTro) VALUES ('ND1003', 'Lê Hoàng Cường', 'cuong.le@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0903456789', '789 Trần Hưng Đạo, Q5, TP.HCM', 'KHACHHANG');
INSERT INTO NGUOIDUNG (Manguoidung, TenND, Email, MatKhau, SoDienThoai, DiaChi, VaiTro) VALUES ('ND1004', 'Phạm Minh Đức', 'duc.pham@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0904567890', '321 Hai Bà Trưng, Q3, TP.HCM', 'KHACHHANG');
INSERT INTO NGUOIDUNG (Manguoidung, TenND, Email, MatKhau, SoDienThoai, DiaChi, VaiTro) VALUES ('ND1005', 'Hoàng Thị Lan', 'lan.hoang@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0905678901', '654 CMT8, Q10, TP.HCM', 'KHACHHANG');
INSERT INTO NGUOIDUNG (Manguoidung, TenND, Email, MatKhau, SoDienThoai, DiaChi, VaiTro) VALUES ('ND1010', 'Admin', 'admin@sneakershop.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0910000000', '1 Đại Cồ Việt, HN', 'ADMIN');

-- Sản phẩm (20 sản phẩm)
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1001', 'Nike Air Jordan 1 Retro Chicago', 'DM1', 'TH2', 6475000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4fde2cc9-99ff-469a-81b3-e74ffe5be20f/AIR+JORDAN+4+RETRO.png', 50);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1002', 'adidas Samba OG White Green', 'DM1', 'TH3', 3975000, 4725000, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/94ae4c48-4647-4eae-8301-6bd0b50ba81a/TENNIS+CLASSIC+CS+STYLE.png', 35);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1003', 'New Balance 550 White Grey', 'DM1', 'TH4', 3725000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8b837a52-4418-43b1-9ec3-b865042a409b/TENNIS+CLASSIC+CS+PRM+%28TERRY%29.png', 40);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1004', 'Nike Dunk Low Panda', 'DM1', 'TH1', 3475000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/29ae8373-4463-48c7-9956-63300e6218c5/NIKE+DUNK+LOW.png', 60);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1005', 'Nike Air Max 90 Infrared', 'DM2', 'TH1', 5725000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ca9fcdc0-a84e-478e-b370-2d396d50e369/AIR+MAX+95+BIG+BUBBLE.png', 25);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1006', 'Asics GEL-KAYANO 14', 'DM2', 'TH3', 4725000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0bf16e28-22e6-4c40-bf76-b38a14b184f9/G.T.+CUT+4+VW.png', 30);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1007', 'adidas Yeezy Boost 350 V2', 'DM2', 'TH3', 7475000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/de772a38-6a2d-4a2d-a40f-9446a43a5f83/JA+3+KOOL+AID.png', 10);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1008', 'Nike Air Force 1 Triple White', 'DM2', 'TH1', 2975000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/857770a5-33de-4f3d-882d-8c2bc8234a79/AIR+FORCE+1+%2707.png', 80);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1009', 'Jordan 4 Retro Military Black', 'DM3', 'TH2', 6225000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ba9c1273-c857-431c-8ec7-f97aa861ed69/AIR+JORDAN+1+RETRO+LOW+OG.png', 20);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1010', 'Salomon XT-6 Black', 'DM3', 'TH3', 6725000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d6c5beef-1ed9-4b35-925f-6dc63b6ae69a/NIKE+ACG+ZEGAMA+TRAIL.png', 15);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1011', 'ON Cloudtilt Eclipse', 'DM3', 'TH3', 4725000, 5725000, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f9a1f279-7cb2-4934-a325-b62a68269fc4/NIKE+PEGASUS+PREMIUM.png', 22);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1012', 'Converse Chuck 70 High', 'DM3', 'TH5', 2475000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d0e0df7b-e2a0-4e04-aaed-59dacae250d4/NIKE+VOMERO+PREMIUM.png', 45);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1013', 'Nike Tech Fleece Joggers', 'DM4', 'TH1', 2975000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31313d8b-c313-4270-91d8-f03d8078f960/AIR+JORDAN+3+RETRO+OG.png', 55);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1014', 'Stussy Basic Tee Black', 'DM4', 'TH3', 1475000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4c66c037-f50e-4de0-b7ae-39288003a0e0/NIKE+ACG+PEGASUS+TRAIL.png', 100);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1015', 'Essentials Hoodie Oatmeal', 'DM4', 'TH3', 3725000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2d8b3ec5-9e42-463f-86c4-f110ee6d7ac8/AIR+MAX+95+BB+TECH.png', 30);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1016', 'Carhartt Detroit Jacket', 'DM4', 'TH3', 4975000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/37255fa7-9512-4e59-97fe-631af32c8056/NIKE+SHOX+R4+JEWEL+QS.png', 18);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1017', 'Jordan 4 Thunder', 'DM3', 'TH2', 6975000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/70d4e6c1-9d72-453f-9996-4017791e1f88/PHANTOM+6+HIGH+ELITE+FG+LV8.png', 12);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1018', 'adidas Forum Low', 'DM3', 'TH3', 2725000, 3225000, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/93a1bdf0-4400-4218-bc42-3a93389a4684/SABRINA+3++NRG.png', 40);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong, TrangThai) VALUES ('SP1019', 'Nike Blazer Mid 77', 'DM2', 'TH1', 2725000, NULL, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4c7f7ef9-0f0b-4e1c-96bd-12f0859042e6/LEBRON+XXIII.png', 0, 'HETHANG');
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1020', 'New Balance 2002R', 'DM3', 'TH4', 4475000, 4975000, 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b596fa86-9e1f-4629-99a0-0f17b8b963d3/AIR+FORCE+1+%2707.png', 28);

-- Đơn hàng mẫu
INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TongTien, Thue, TongCong, TrangThai) VALUES ('DH1001', 'ND1001', 'Nguyễn Văn An', '0901234567', '123 Nguyễn Huệ, Q1', 'TP.HCM', 6475000, 518000, 6993000, 'DAGIAO');
INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TongTien, Thue, TongCong, TrangThai) VALUES ('DH1002', 'ND1002', 'Trần Thị Bích', '0902345678', '456 Lê Lợi, Q1', 'TP.HCM', 7450000, 596000, 8046000, 'DAGIAO');
INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TongTien, Thue, TongCong, TrangThai) VALUES ('DH1003', 'ND1003', 'Lê Hoàng Cường', '0903456789', '789 THĐ, Q5', 'TP.HCM', 11200000, 896000, 12096000, 'DANGIAO');

-- Chi tiết đơn hàng
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT1', 'DH1001', 'SP1001', 'US 9', 1, 6475000, 6475000);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT2', 'DH1002', 'SP1002', 'US 8', 1, 3975000, 3975000);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT3', 'DH1002', 'SP1004', 'US 9.5', 1, 3475000, 3475000);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT4', 'DH1003', 'SP1009', 'US 10', 1, 6225000, 6225000);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT5', 'DH1003', 'SP1012', 'US 8', 2, 2475000, 4950000);

-- Thanh toán
INSERT INTO THANHTOAN (Mathanhtoan, Madonhang, PhuongThuc, SoTien, TrangThai, MaGiaoDich) VALUES ('TT1', 'DH1001', 'VNPAY', 6993000, 'DATHANHTOAN', 'TXN20260401120001');
INSERT INTO THANHTOAN (Mathanhtoan, Madonhang, PhuongThuc, SoTien, TrangThai, MaGiaoDich) VALUES ('TT2', 'DH1002', 'MOMO', 8046000, 'DATHANHTOAN', 'TXN20260401130002');
INSERT INTO THANHTOAN (Mathanhtoan, Madonhang, PhuongThuc, SoTien, TrangThai) VALUES ('TT3', 'DH1003', 'COD', 12096000, 'DATHANHTOAN');

-- Đánh giá
INSERT INTO DANHGIA (Madanhgia, Masanpham, Manguoidung, SoSao, BinhLuan) VALUES ('DG1', 'SP1001', 'ND1001', 5, 'Giày rất đẹp, chất lượng tuyệt vời!');
INSERT INTO DANHGIA (Madanhgia, Masanpham, Manguoidung, SoSao, BinhLuan) VALUES ('DG2', 'SP1002', 'ND1002', 4, 'Samba OG classic, đi rất êm.');
INSERT INTO DANHGIA (Madanhgia, Masanpham, Manguoidung, SoSao, BinhLuan) VALUES ('DG3', 'SP1005', 'ND1004', 5, 'Air Max 90 huyền thoại!');

-- Khuyến mãi
INSERT INTO KHUYENMAI VALUES ('KM1', 'Giảm giá mùa hè', 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + 30, 'DANGCHAY');
INSERT INTO KHUYENMAI VALUES ('KM2', 'Flash Sale', 25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + 7, 'DANGCHAY');

-- Voucher
INSERT INTO VOUCHER VALUES ('GIAM10', 10, NULL, 200, 50, CURRENT_TIMESTAMP + 30);
INSERT INTO VOUCHER VALUES ('GIAM50K', NULL, 50000, 500, 100, CURRENT_TIMESTAMP + 60);

-- Nhà cung cấp
INSERT INTO NHACUNGCAP VALUES ('NC1', 'Nike Vietnam', '0281234567', '123 Nguyễn Huệ, Q1, TP.HCM', 'HOATDONG');
INSERT INTO NHACUNGCAP VALUES ('NC2', 'Adidas Vietnam', '0282345678', '456 Lê Lợi, Q1, TP.HCM', 'HOATDONG');

-- Bảng mã lỗi
INSERT INTO BANG_MA_LOI VALUES (-20001, 'Mật khẩu cũ không đúng!', 'Lỗi khi người dùng đổi mật khẩu nhập sai mật khẩu cũ.');
INSERT INTO BANG_MA_LOI VALUES (-20002, 'Không tìm thấy người dùng!', 'Lỗi khi thao tác trên một người dùng không tồn tại.');
INSERT INTO BANG_MA_LOI VALUES (-20003, 'Không đủ tồn kho!', 'Lỗi khi đặt hàng nhưng số lượng tồn kho của sản phẩm không đủ.');
INSERT INTO BANG_MA_LOI VALUES (-20004, 'Không tìm thấy sản phẩm!', 'Lỗi khi thao tác trên một sản phẩm không tồn tại.');
INSERT INTO BANG_MA_LOI VALUES (-20005, 'Lỗi hệ thống không xác định!', 'Lỗi bắt catch Exception OTHERS chung.');

COMMIT;
