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
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1001', 'Nike Air Jordan 1 Retro High OG Chicago', 'DM1', 'TH2', 259, NULL, 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop', 50);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1002', 'adidas Samba OG White Green', 'DM1', 'TH3', 159, 189, 'https://images.unsplash.com/photo-1608231387042-66d6306a5933?w=600&h=600&fit=crop', 35);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1003', 'New Balance 550 White Grey', 'DM1', 'TH4', 149, NULL, 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop', 40);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1004', 'Nike Dunk Low Panda', 'DM1', 'TH1', 139, NULL, 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop', 60);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1005', 'Nike Air Max 90 Infrared', 'DM2', 'TH1', 229, NULL, 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop', 25);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1006', 'Asics GEL-KAYANO 14', 'DM2', 'TH3', 189, NULL, 'https://images.unsplash.com/photo-1600185365926-3e5931e4e271?w=600&h=600&fit=crop', 30);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1007', 'adidas Yeezy Boost 350 V2', 'DM2', 'TH3', 299, NULL, 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=600&fit=crop', 10);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1008', 'Nike Air Force 1 Triple White', 'DM2', 'TH1', 119, NULL, 'https://images.unsplash.com/photo-1549298916-b41d502d2e28?w=600&h=600&fit=crop', 80);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1009', 'Jordan 4 Retro Military Black', 'DM3', 'TH2', 249, NULL, 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&h=600&fit=crop', 20);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1010', 'Salomon XT-6 Black', 'DM3', 'TH3', 269, NULL, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop', 15);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1011', 'ON Cloudtilt Eclipse', 'DM3', 'TH3', 189, 229, 'https://images.unsplash.com/photo-1542291026-7eec264fd278?w=600&h=600&fit=crop', 22);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1012', 'Converse Chuck 70 High', 'DM3', 'TH5', 99, NULL, 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&h=600&fit=crop', 45);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1013', 'Nike Tech Fleece Joggers', 'DM4', 'TH1', 119, NULL, 'https://images.unsplash.com/photo-1556906781-9a412961c42c?w=600&h=600&fit=crop', 55);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1014', 'Stussy Basic Tee Black', 'DM4', 'TH3', 59, NULL, 'https://images.unsplash.com/photo-1521572163474-6864f9cf9ab1?w=600&h=600&fit=crop', 100);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1015', 'Essentials Hoodie Oatmeal', 'DM4', 'TH3', 149, NULL, 'https://images.unsplash.com/photo-1578768079470-0a4536cc5e21?w=600&h=600&fit=crop', 30);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1016', 'Carhartt Detroit Jacket', 'DM4', 'TH3', 199, NULL, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop', 18);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1017', 'Jordan 4 Thunder', 'DM3', 'TH2', 279, NULL, 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop', 12);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1018', 'adidas Forum Low', 'DM3', 'TH3', 109, 129, 'https://images.unsplash.com/photo-1608231387042-66d6306a5933?w=600&h=600&fit=crop', 40);
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong, TrangThai) VALUES ('SP1019', 'Nike Blazer Mid 77', 'DM2', 'TH1', 109, NULL, 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop', 0, 'HETHANG');
INSERT INTO SANPHAM (Masanpham, TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong) VALUES ('SP1020', 'New Balance 2002R', 'DM3', 'TH4', 179, 199, 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop', 28);

-- Đơn hàng mẫu
INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TongTien, Thue, TongCong, TrangThai) VALUES ('DH1001', 'ND1001', 'Nguyễn Văn An', '0901234567', '123 Nguyễn Huệ, Q1', 'TP.HCM', 259, 20.72, 279.72, 'DAGIAO');
INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TongTien, Thue, TongCong, TrangThai) VALUES ('DH1002', 'ND1002', 'Trần Thị Bích', '0902345678', '456 Lê Lợi, Q1', 'TP.HCM', 298, 23.84, 321.84, 'DAGIAO');
INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TongTien, Thue, TongCong, TrangThai) VALUES ('DH1003', 'ND1003', 'Lê Hoàng Cường', '0903456789', '789 THĐ, Q5', 'TP.HCM', 448, 35.84, 483.84, 'DANGIAO');

-- Chi tiết đơn hàng
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT1', 'DH1001', 'SP1001', 'US 9', 1, 259, 259);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT2', 'DH1002', 'SP1002', 'US 8', 1, 159, 159);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT3', 'DH1002', 'SP1004', 'US 9.5', 1, 139, 139);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT4', 'DH1003', 'SP1009', 'US 10', 1, 249, 249);
INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia, ThanhTien) VALUES ('CT5', 'DH1003', 'SP1012', 'US 8', 2, 99, 198);

-- Thanh toán
INSERT INTO THANHTOAN (Mathanhtoan, Madonhang, PhuongThuc, SoTien, TrangThai, MaGiaoDich) VALUES ('TT1', 'DH1001', 'VNPAY', 279.72, 'DATHANHTOAN', 'TXN20260401120001');
INSERT INTO THANHTOAN (Mathanhtoan, Madonhang, PhuongThuc, SoTien, TrangThai, MaGiaoDich) VALUES ('TT2', 'DH1002', 'MOMO', 321.84, 'DATHANHTOAN', 'TXN20260401130002');
INSERT INTO THANHTOAN (Mathanhtoan, Madonhang, PhuongThuc, SoTien, TrangThai) VALUES ('TT3', 'DH1003', 'COD', 483.84, 'DATHANHTOAN');

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

COMMIT;
