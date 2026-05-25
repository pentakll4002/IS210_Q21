SET DEFINE OFF;
-- ============================================================
-- TRIGGERS TỰ ĐỘNG TẠO ID
-- ============================================================
CREATE OR REPLACE TRIGGER TRG_NGUOIDUNG_ID BEFORE INSERT ON NGUOIDUNG FOR EACH ROW
BEGIN IF :NEW.Manguoidung IS NULL THEN :NEW.Manguoidung := 'ND' || SEQ_NGUOIDUNG.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_DANHMUC_ID BEFORE INSERT ON DANHMUC FOR EACH ROW
BEGIN IF :NEW.Madanhmuc IS NULL THEN :NEW.Madanhmuc := 'DM' || SEQ_DANHMUC.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_THUONGHIEU_ID BEFORE INSERT ON THUONGHIEU FOR EACH ROW
BEGIN IF :NEW.Mathuonghieu IS NULL THEN :NEW.Mathuonghieu := 'TH' || SEQ_THUONGHIEU.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_SANPHAM_ID BEFORE INSERT ON SANPHAM FOR EACH ROW
BEGIN IF :NEW.Masanpham IS NULL THEN :NEW.Masanpham := 'SP' || SEQ_SANPHAM.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_DONHANG_ID BEFORE INSERT ON DONHANG FOR EACH ROW
BEGIN IF :NEW.Madonhang IS NULL THEN :NEW.Madonhang := 'DH' || SEQ_DONHANG.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_CHITIET_ID BEFORE INSERT ON CHITIETDONHANG FOR EACH ROW
BEGIN IF :NEW.Machitiet IS NULL THEN :NEW.Machitiet := 'CT' || SEQ_CHITIET.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_THANHTOAN_ID BEFORE INSERT ON THANHTOAN FOR EACH ROW
BEGIN IF :NEW.Mathanhtoan IS NULL THEN :NEW.Mathanhtoan := 'TT' || SEQ_THANHTOAN.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_DANHGIA_ID BEFORE INSERT ON DANHGIA FOR EACH ROW
BEGIN IF :NEW.Madanhgia IS NULL THEN :NEW.Madanhgia := 'DG' || SEQ_DANHGIA.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_GIOHANG_ID BEFORE INSERT ON GIOHANG FOR EACH ROW
BEGIN IF :NEW.MaGioHang IS NULL THEN :NEW.MaGioHang := 'GH' || SEQ_GIOHANG.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_CTGH_ID BEFORE INSERT ON CHITIETGIOHANG FOR EACH ROW
BEGIN IF :NEW.MaCTGH IS NULL THEN :NEW.MaCTGH := 'CG' || SEQ_CTGH.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_KM_ID BEFORE INSERT ON KHUYENMAI FOR EACH ROW
BEGIN IF :NEW.MaKhuyenMai IS NULL THEN :NEW.MaKhuyenMai := 'KM' || SEQ_KHUYENMAI.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_SPKM_ID BEFORE INSERT ON SANPHAM_KHUYENMAI FOR EACH ROW
BEGIN IF :NEW.MaSPKM IS NULL THEN :NEW.MaSPKM := 'SK' || SEQ_SPKM.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_VND_ID BEFORE INSERT ON VOUCHER_NGUOIDUNG FOR EACH ROW
BEGIN IF :NEW.MaVND IS NULL THEN :NEW.MaVND := 'VN' || SEQ_VND.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_TT_ID BEFORE INSERT ON TINTUC FOR EACH ROW
BEGIN IF :NEW.MaTinTuc IS NULL THEN :NEW.MaTinTuc := 'TT' || SEQ_TINTUC.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_BLTT_ID BEFORE INSERT ON BINHLUAN_TINTUC FOR EACH ROW
BEGIN IF :NEW.MaBLTT IS NULL THEN :NEW.MaBLTT := 'BL' || SEQ_BLTT.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_LH_ID BEFORE INSERT ON LIENHE FOR EACH ROW
BEGIN IF :NEW.MaLienHe IS NULL THEN :NEW.MaLienHe := 'LH' || SEQ_LIENHE.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_NCC_ID BEFORE INSERT ON NHACUNGCAP FOR EACH ROW
BEGIN IF :NEW.MaNCC IS NULL THEN :NEW.MaNCC := 'NC' || SEQ_NCC.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_PN_ID BEFORE INSERT ON PHIEUNHAP FOR EACH ROW
BEGIN IF :NEW.MaPN IS NULL THEN :NEW.MaPN := 'PN' || SEQ_PN.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_CTPN_ID BEFORE INSERT ON CHITIETPHIEUNHAP FOR EACH ROW
BEGIN IF :NEW.MaCTPN IS NULL THEN :NEW.MaCTPN := 'CP' || SEQ_CTPN.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_LSTK_ID BEFORE INSERT ON LICHSUTIMKIEM FOR EACH ROW
BEGIN IF :NEW.MaLSTK IS NULL THEN :NEW.MaLSTK := 'LS' || SEQ_LSTK.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_SPYT_ID BEFORE INSERT ON SANPHAM_YEUTHICH FOR EACH ROW
BEGIN IF :NEW.MaSPYT IS NULL THEN :NEW.MaSPYT := 'YT' || SEQ_SPYT.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_TB_ID BEFORE INSERT ON THONGBAO FOR EACH ROW
BEGIN IF :NEW.MaTB IS NULL THEN :NEW.MaTB := 'TB' || SEQ_TB.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_DCGH_ID BEFORE INSERT ON DIACHI_GIAOHANG FOR EACH ROW
BEGIN IF :NEW.MaDCGH IS NULL THEN :NEW.MaDCGH := 'DC' || SEQ_DCGH.NEXTVAL; END IF; END;
/
CREATE OR REPLACE TRIGGER TRG_KC_ID BEFORE INSERT ON KICHCO_SANPHAM FOR EACH ROW
BEGIN IF :NEW.MaKichCo IS NULL THEN :NEW.MaKichCo := 'KC' || SEQ_KICHCO.NEXTVAL; END IF; END;
/

-- ============================================================
-- TRIGGERS NGHIỆP VỤ
-- ============================================================

-- T1: Tự động tính thành tiền chi tiết đơn hàng
CREATE OR REPLACE TRIGGER TRG_TINH_THANHTIEN
BEFORE INSERT OR UPDATE OF SoLuong, DonGia
ON CHITIETDONHANG
FOR EACH ROW
BEGIN
    IF :NEW.SoLuong <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001,'So luong phai lon hon 0');
    END IF;

    IF :NEW.DonGia <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002,'Don gia phai lon hon 0');
    END IF;

    :NEW.ThanhTien := :NEW.SoLuong * :NEW.DonGia;
END;
/

-- Test T1
SHOW ERRORS TRIGGER TRG_TINH_THANHTIEN;
-- Kiểm tra lỗi soLuong <= 0
SET SERVEROUTPUT ON;
BEGIN
    INSERT INTO CHITIETDONHANG 
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES 
        ('CTE001', 'DH1001', 'SP1001', 'US 9', -1, 259);

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
END;
/
-- Kiểm tra lỗi DonGia <= 0
BEGIN
    INSERT INTO CHITIETDONHANG 
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES 
        ('CTE002', 'DH1001', 'SP1001', 'US 9', 1, -259);

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
END;
/
-- Kiểm tra trigger tự tính thành tiền
INSERT INTO CHITIETDONHANG 
    (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
VALUES 
    ('CTE003', 'DH1001', 'SP1001', 'US 9', 2, 259);

SELECT Machitiet, SoLuong, DonGia, ThanhTien
FROM CHITIETDONHANG
WHERE Machitiet = 'CTE003';

-- T2: Trừ tồn kho khi đặt hàng
CREATE OR REPLACE TRIGGER TRG_TRU_TONKHO
AFTER INSERT ON CHITIETDONHANG
FOR EACH ROW
DECLARE
    v_sl NUMBER;
BEGIN
    SELECT SoLuong
    INTO v_sl
    FROM SANPHAM
    WHERE Masanpham = :NEW.Masanpham
    FOR UPDATE;

    IF v_sl < :NEW.SoLuong THEN
        RAISE_APPLICATION_ERROR(-20003,'So luong ton kho khong du');
    END IF;

    UPDATE SANPHAM
    SET SoLuong = SoLuong - :NEW.SoLuong,
        NgayCapNhat = CURRENT_TIMESTAMP
    WHERE Masanpham = :NEW.Masanpham;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20004,'San pham khong ton tai');
END;
/

-- Test T2
SHOW ERRORS TRIGGER TRG_TRU_TONKHO;
SET SERVEROUTPUT ON;
-- Kiểm tra trường hợp tồn kho đủ và bị trừ đúng
DECLARE
    v_mact      VARCHAR2(10);
    v_masp      VARCHAR2(10);
    v_dongia    NUMBER;
    v_before    NUMBER;
    v_after     NUMBER;
BEGIN
    SAVEPOINT sp_test_t2_ok;

    SELECT Masanpham, Gia, SoLuong
    INTO v_masp, v_dongia, v_before
    FROM (
        SELECT Masanpham, Gia, SoLuong
        FROM SANPHAM
        WHERE SoLuong >= 1
        ORDER BY Masanpham
    )
    WHERE ROWNUM = 1;

    v_mact := 'T2' || LPAD(SEQ_CHITIET.NEXTVAL, 7, '0');

    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DH1001', v_masp, 'US 9', 1, v_dongia);

    SELECT SoLuong
    INTO v_after
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet test = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('Ma san pham       = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('Ton kho truoc     = ' || v_before);
    DBMS_OUTPUT.PUT_LINE('Ton kho sau       = ' || v_after);
    DBMS_OUTPUT.PUT_LINE('So luong da tru   = ' || (v_before - v_after));

    IF v_after = v_before - 1 THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: TRIGGER TRU TON KHO DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: TRIGGER TRU TON KHO SAI');
    END IF;

    ROLLBACK TO sp_test_t2_ok;
END;
/
SET SERVEROUTPUT ON;
-- Kiểm tra lỗi -20003 khi tồn kho không đủ
DECLARE
    v_mact      VARCHAR2(10);
    v_masp      VARCHAR2(10);
    v_dongia    NUMBER;
    v_stock     NUMBER;
BEGIN
    SAVEPOINT sp_test_t2_err03;

    SELECT Masanpham, Gia, SoLuong
    INTO v_masp, v_dongia, v_stock
    FROM (
        SELECT Masanpham, Gia, SoLuong
        FROM SANPHAM
        ORDER BY Masanpham
    )
    WHERE ROWNUM = 1;

    v_mact := 'T2' || LPAD(SEQ_CHITIET.NEXTVAL, 7, '0');
    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DH1001', v_masp, 'US 9', v_stock + 1, v_dongia);

    DBMS_OUTPUT.PUT_LINE('KHONG DUNG: Insert thanh cong, trigger khong bat loi ton kho');
    ROLLBACK TO sp_test_t2_err03;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t2_err03;
END;
/

-- T3: Cộng lại tồn kho khi hủy
CREATE OR REPLACE TRIGGER TRG_CONG_LAI_TONKHO
AFTER DELETE ON CHITIETDONHANG
FOR EACH ROW
BEGIN
    UPDATE SANPHAM
    SET SoLuong = SoLuong + :OLD.SoLuong,
        NgayCapNhat = CURRENT_TIMESTAMP
    WHERE Masanpham = :OLD.Masanpham;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20005,'Khong tim thay san pham');
    END IF;
END;
/

-- Test T3
SHOW ERRORS TRIGGER TRG_CONG_LAI_TONKHO;
SET SERVEROUTPUT ON;
-- Kiểm tra DELETE chi tiết đơn hàng thì tồn kho được cộng lại
DECLARE
    v_mact          VARCHAR2(10);
    v_masp          VARCHAR2(10);
    v_sl_chitiet    NUMBER;
    v_tonkho_truoc  NUMBER;
    v_tonkho_sau    NUMBER;
BEGIN
    SAVEPOINT sp_test_t3;

    SELECT Machitiet, Masanpham, SoLuong, TonKho
    INTO v_mact, v_masp, v_sl_chitiet, v_tonkho_truoc
    FROM (
        SELECT ct.Machitiet,
               ct.Masanpham,
               ct.SoLuong,
               sp.SoLuong AS TonKho
        FROM CHITIETDONHANG ct
        JOIN SANPHAM sp ON ct.Masanpham = sp.Masanpham
        ORDER BY ct.Machitiet
    )
    WHERE ROWNUM = 1;

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet bi xoa = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('Ma san pham         = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('So luong chi tiet   = ' || v_sl_chitiet);
    DBMS_OUTPUT.PUT_LINE('Ton kho truoc xoa   = ' || v_tonkho_truoc);

    DELETE FROM CHITIETDONHANG
    WHERE Machitiet = v_mact;

    SELECT SoLuong
    INTO v_tonkho_sau
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ton kho sau xoa     = ' || v_tonkho_sau);
    DBMS_OUTPUT.PUT_LINE('So luong duoc cong  = ' || (v_tonkho_sau - v_tonkho_truoc));

    IF v_tonkho_sau = v_tonkho_truoc + v_sl_chitiet THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: TRIGGER T3 CONG LAI TON KHO DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: TRIGGER T3 SAI');
    END IF;

    ROLLBACK TO sp_test_t3;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t3;
END;
/
SET SERVEROUTPUT ON;

-- Kiểm tra phối hợp giữa T2 và T3
DECLARE
    v_mact          VARCHAR2(10);
    v_masp          VARCHAR2(10);
    v_dongia        NUMBER;
    v_sl_dat        NUMBER := 2;
    v_tonkho_truoc  NUMBER;
    v_tonkho_insert NUMBER;
    v_tonkho_delete NUMBER;
BEGIN
    SAVEPOINT sp_test_t3_full;

    SELECT Masanpham, Gia, SoLuong
    INTO v_masp, v_dongia, v_tonkho_truoc
    FROM (
        SELECT Masanpham, Gia, SoLuong
        FROM SANPHAM
        WHERE SoLuong >= v_sl_dat
        ORDER BY Masanpham
    )
    WHERE ROWNUM = 1;

    v_mact := 'T3' || LPAD(SEQ_CHITIET.NEXTVAL, 8, '0');

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet test   = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('Ma san pham        = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('Ton kho ban dau    = ' || v_tonkho_truoc);

    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DH1001', v_masp, 'US 9', v_sl_dat, v_dongia);

    SELECT SoLuong
    INTO v_tonkho_insert
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ton kho sau INSERT = ' || v_tonkho_insert);

    DELETE FROM CHITIETDONHANG
    WHERE Machitiet = v_mact;

    SELECT SoLuong
    INTO v_tonkho_delete
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ton kho sau DELETE = ' || v_tonkho_delete);

    IF v_tonkho_insert = v_tonkho_truoc - v_sl_dat
       AND v_tonkho_delete = v_tonkho_truoc THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: T2 VA T3 HOAT DONG DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: T2 HOAC T3 DANG SAI');
    END IF;

    ROLLBACK TO sp_test_t3_full;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t3_full;
END;
/

-- T4: Cập nhật trạng thái sản phẩm
CREATE OR REPLACE TRIGGER TRG_CAPNHAT_TRANGTHAI_SP
BEFORE UPDATE OF SoLuong
ON SANPHAM
FOR EACH ROW
BEGIN
    IF :NEW.SoLuong < 0 THEN
        RAISE_APPLICATION_ERROR(-20006,'So luong khong duoc am');
    ELSIF :NEW.SoLuong = 0 THEN
        :NEW.TrangThai := 'HETHANG';
    ELSE
        :NEW.TrangThai := 'CONHANG';
    END IF;
END;
/

-- Test T4
SHOW ERRORS TRIGGER TRG_CAPNHAT_TRANGTHAI_SP;
SET SERVEROUTPUT ON;
DECLARE
    v_masp       VARCHAR2(10) := 'SP1001';
    v_soluong    NUMBER;
    v_trangthai  VARCHAR2(20);
BEGIN
    SAVEPOINT sp_test_t4_het_hang;

    UPDATE SANPHAM
    SET SoLuong = 0
    WHERE Masanpham = v_masp;

    SELECT SoLuong, TrangThai
    INTO v_soluong, v_trangthai
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ma san pham  = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('So luong     = ' || v_soluong);
    DBMS_OUTPUT.PUT_LINE('Trang thai   = ' || v_trangthai);

    IF v_soluong = 0 AND v_trangthai = 'HETHANG' THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - SoLuong = 0 thi TrangThai = HETHANG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;
    ROLLBACK TO sp_test_t4_het_hang;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_masp       VARCHAR2(10) := 'SP1001';
    v_soluong    NUMBER;
    v_trangthai  VARCHAR2(20);
BEGIN
    SAVEPOINT sp_test_t4_con_hang;

    UPDATE SANPHAM
    SET SoLuong = 10
    WHERE Masanpham = v_masp;

    SELECT SoLuong, TrangThai
    INTO v_soluong, v_trangthai
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ma san pham  = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('So luong     = ' || v_soluong);
    DBMS_OUTPUT.PUT_LINE('Trang thai   = ' || v_trangthai);

    IF v_soluong = 10 AND v_trangthai = 'CONHANG' THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - SoLuong > 0 thi TrangThai = CONHANG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;
    ROLLBACK TO sp_test_t4_con_hang;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_masp       VARCHAR2(10) := 'SP1001';
    v_soluong    NUMBER;
    v_trangthai  VARCHAR2(20);
BEGIN
    SAVEPOINT sp_test_t4_am;

    UPDATE SANPHAM
    SET SoLuong = -1
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('KHONG DUNG: Update thanh cong voi SoLuong am');
    ROLLBACK TO sp_test_t4_am;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t4_am;

        SELECT SoLuong, TrangThai
        INTO v_soluong, v_trangthai
        FROM SANPHAM
        WHERE Masanpham = v_masp;

        DBMS_OUTPUT.PUT_LINE('Sau rollback:');
        DBMS_OUTPUT.PUT_LINE('So luong     = ' || v_soluong);
        DBMS_OUTPUT.PUT_LINE('Trang thai   = ' || v_trangthai);
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mact       VARCHAR2(10);
    v_masp       VARCHAR2(10) := 'SP1001';
    v_dongia     NUMBER;
    v_soluong    NUMBER;
    v_trangthai  VARCHAR2(20);
BEGIN
    SAVEPOINT sp_test_t2_t4;

    UPDATE SANPHAM
    SET SoLuong = 1
    WHERE Masanpham = v_masp;

    SELECT Gia
    INTO v_dongia
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    v_mact := 'T4' || LPAD(SEQ_CHITIET.NEXTVAL, 8, '0');
    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DH1001', v_masp, 'US 9', 1, v_dongia);

    SELECT SoLuong, TrangThai
    INTO v_soluong, v_trangthai
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet test = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('Ma san pham      = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('So luong sau dat = ' || v_soluong);
    DBMS_OUTPUT.PUT_LINE('Trang thai       = ' || v_trangthai);

    IF v_soluong = 0 AND v_trangthai = 'HETHANG' THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - T2 tru ton kho va T4 cap nhat HETHANG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;

    ROLLBACK TO sp_test_t2_t4;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t2_t4;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mact       VARCHAR2(10);
    v_masp       VARCHAR2(10) := 'SP1001';
    v_dongia     NUMBER;
    v_soluong    NUMBER;
    v_trangthai  VARCHAR2(20);
BEGIN
    SAVEPOINT sp_test_t3_t4;

    UPDATE SANPHAM
    SET SoLuong = 1
    WHERE Masanpham = v_masp;

    SELECT Gia
    INTO v_dongia
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    v_mact := 'T4' || LPAD(SEQ_CHITIET.NEXTVAL, 8, '0');
    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DH1001', v_masp, 'US 9', 1, v_dongia);

    DELETE FROM CHITIETDONHANG
    WHERE Machitiet = v_mact;

    SELECT SoLuong, TrangThai
    INTO v_soluong, v_trangthai
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('Ma san pham       = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('So luong sau xoa  = ' || v_soluong);
    DBMS_OUTPUT.PUT_LINE('Trang thai        = ' || v_trangthai);

    IF v_soluong = 1 AND v_trangthai = 'CONHANG' THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - T3 cong ton kho va T4 cap nhat CONHANG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;

    ROLLBACK TO sp_test_t3_t4;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t3_t4;
END;
/

-- T5: Cập nhật tổng tiền đơn hàng
CREATE OR REPLACE TRIGGER TRG_CAPNHAT_TONGTIEN_DH
FOR INSERT OR DELETE OR UPDATE
ON CHITIETDONHANG
COMPOUND TRIGGER

    TYPE t_madh_set IS TABLE OF BOOLEAN INDEX BY VARCHAR2(10);
    g_madh_set t_madh_set;

    PROCEDURE add_madh(p_madh VARCHAR2) IS
    BEGIN
        IF p_madh IS NOT NULL THEN
            g_madh_set(p_madh) := TRUE;
        END IF;
    END;

AFTER EACH ROW IS
BEGIN
    IF INSERTING THEN
        add_madh(:NEW.Madonhang);
    ELSIF DELETING THEN
        add_madh(:OLD.Madonhang);
    ELSE
        add_madh(:OLD.Madonhang);
        add_madh(:NEW.Madonhang);
    END IF;
END AFTER EACH ROW;

AFTER STATEMENT IS
    v_madh VARCHAR2(10);
BEGIN
    v_madh := g_madh_set.FIRST;

    WHILE v_madh IS NOT NULL LOOP
        UPDATE DONHANG
        SET TongTien = (
                SELECT NVL(SUM(ThanhTien), 0)
                FROM CHITIETDONHANG
                WHERE Madonhang = v_madh
            ),
            Thue = (
                SELECT NVL(SUM(ThanhTien), 0) * 0.08
                FROM CHITIETDONHANG
                WHERE Madonhang = v_madh
            ),
            TongCong = (
                SELECT NVL(SUM(ThanhTien), 0) * 1.08
                FROM CHITIETDONHANG
                WHERE Madonhang = v_madh
            ),
            NgayCapNhat = CURRENT_TIMESTAMP
        WHERE Madonhang = v_madh;

        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20007, 'Don hang khong ton tai');
        END IF;

        v_madh := g_madh_set.NEXT(v_madh);
    END LOOP;
END AFTER STATEMENT;
END TRG_CAPNHAT_TONGTIEN_DH;
/

-- Test T5
SET SERVEROUTPUT ON;
DECLARE
    v_mact         VARCHAR2(10);
    v_gia          NUMBER;
    v_tongtien     NUMBER;
    v_thue         NUMBER;
    v_tongcong     NUMBER;
BEGIN
    SAVEPOINT sp_test_t5_insert;

    INSERT INTO DONHANG
        (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho,
         TongTien, PhiShip, Thue, TongCong, TrangThai)
    VALUES
        ('DHT5TEST', 'ND1001', 'Test T5', '0900000000', 'Dia chi test', 'TP.HCM',
         0, 0, 0, 0, 'CHOXULY');

    SELECT Gia
    INTO v_gia
    FROM SANPHAM
    WHERE Masanpham = 'SP1001';

    v_mact := 'T5' || LPAD(SEQ_CHITIET.NEXTVAL, 8, '0');
    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DHT5TEST', 'SP1001', 'US 9', 2, v_gia);

    SELECT TongTien, Thue, TongCong
    INTO v_tongtien, v_thue, v_tongcong
    FROM DONHANG
    WHERE Madonhang = 'DHT5TEST';

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet test = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('Don gia          = ' || v_gia);
    DBMS_OUTPUT.PUT_LINE('So luong         = 2');
    DBMS_OUTPUT.PUT_LINE('TongTien         = ' || v_tongtien);
    DBMS_OUTPUT.PUT_LINE('Thue             = ' || v_thue);
    DBMS_OUTPUT.PUT_LINE('TongCong         = ' || v_tongcong);

    IF v_tongtien = 2 * v_gia
       AND v_thue = v_tongtien * 0.08
       AND v_tongcong = v_tongtien * 1.08 THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA INSERT: DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA INSERT: SAI');
    END IF;

    ROLLBACK TO sp_test_t5_insert;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t5_insert;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mact         VARCHAR2(10);
    v_gia          NUMBER;
    v_tongtien     NUMBER;
    v_thue         NUMBER;
    v_tongcong     NUMBER;
BEGIN
    SAVEPOINT sp_test_t5_update;

    INSERT INTO DONHANG
        (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho,
         TongTien, PhiShip, Thue, TongCong, TrangThai)
    VALUES
        ('DHT5TEST', 'ND1001', 'Test T5', '0900000000', 'Dia chi test', 'TP.HCM',
         0, 0, 0, 0, 'CHOXULY');

    SELECT Gia
    INTO v_gia
    FROM SANPHAM
    WHERE Masanpham = 'SP1001';

    v_mact := 'T5' || LPAD(SEQ_CHITIET.NEXTVAL, 8, '0');
    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DHT5TEST', 'SP1001', 'US 9', 1, v_gia);

    UPDATE CHITIETDONHANG
    SET SoLuong = 3,
        DonGia = v_gia
    WHERE Machitiet = v_mact;

    SELECT TongTien, Thue, TongCong
    INTO v_tongtien, v_thue, v_tongcong
    FROM DONHANG
    WHERE Madonhang = 'DHT5TEST';

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet test = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('Don gia          = ' || v_gia);
    DBMS_OUTPUT.PUT_LINE('So luong sau sua = 3');
    DBMS_OUTPUT.PUT_LINE('TongTien         = ' || v_tongtien);
    DBMS_OUTPUT.PUT_LINE('Thue             = ' || v_thue);
    DBMS_OUTPUT.PUT_LINE('TongCong         = ' || v_tongcong);

    IF v_tongtien = 3 * v_gia
       AND v_thue = v_tongtien * 0.08
       AND v_tongcong = v_tongtien * 1.08 THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA UPDATE: DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA UPDATE: SAI');
    END IF;

    ROLLBACK TO sp_test_t5_update;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t5_update;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mact         VARCHAR2(10);
    v_gia          NUMBER;
    v_tongtien     NUMBER;
    v_thue         NUMBER;
    v_tongcong     NUMBER;
BEGIN
    SAVEPOINT sp_test_t5_delete;

    INSERT INTO DONHANG
        (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho,
         TongTien, PhiShip, Thue, TongCong, TrangThai)
    VALUES
        ('DHT5TEST', 'ND1001', 'Test T5', '0900000000', 'Dia chi test', 'TP.HCM',
         0, 0, 0, 0, 'CHOXULY');

    SELECT Gia
    INTO v_gia
    FROM SANPHAM
    WHERE Masanpham = 'SP1001';

    v_mact := 'T5' || LPAD(SEQ_CHITIET.NEXTVAL, 8, '0');
    INSERT INTO CHITIETDONHANG
        (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
    VALUES
        (v_mact, 'DHT5TEST', 'SP1001', 'US 9', 2, v_gia);

    DELETE FROM CHITIETDONHANG
    WHERE Machitiet = v_mact;

    SELECT TongTien, Thue, TongCong
    INTO v_tongtien, v_thue, v_tongcong
    FROM DONHANG
    WHERE Madonhang = 'DHT5TEST';

    DBMS_OUTPUT.PUT_LINE('Ma chi tiet test = ' || v_mact);
    DBMS_OUTPUT.PUT_LINE('TongTien sau xoa = ' || v_tongtien);
    DBMS_OUTPUT.PUT_LINE('Thue sau xoa     = ' || v_thue);
    DBMS_OUTPUT.PUT_LINE('TongCong sau xoa = ' || v_tongcong);

    IF v_tongtien = 0
       AND v_thue = 0
       AND v_tongcong = 0 THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA DELETE: DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA DELETE: SAI');
    END IF;

    ROLLBACK TO sp_test_t5_delete;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t5_delete;
END;
/

UPDATE DONHANG dh
SET TongTien = (
        SELECT NVL(SUM(ct.ThanhTien), 0)
        FROM CHITIETDONHANG ct
        WHERE ct.Madonhang = dh.Madonhang
    ),
    Thue = (
        SELECT NVL(SUM(ct.ThanhTien), 0) * 0.08
        FROM CHITIETDONHANG ct
        WHERE ct.Madonhang = dh.Madonhang
    ),
    TongCong = (
        SELECT NVL(SUM(ct.ThanhTien), 0) * 1.08
        FROM CHITIETDONHANG ct
        WHERE ct.Madonhang = dh.Madonhang
    ),
    NgayCapNhat = CURRENT_TIMESTAMP;
COMMIT;

-- T6: Tính thành tiền cho phiếu nhập
CREATE OR REPLACE TRIGGER TRG_TINH_THANHTIEN_PN
BEFORE INSERT OR UPDATE OF SoLuong, DonGiaNhap
ON CHITIETPHIEUNHAP
FOR EACH ROW
BEGIN
    IF :NEW.SoLuong <= 0 THEN
        RAISE_APPLICATION_ERROR(-20008,'So luong nhap phai lon hon 0');
    END IF;

    IF :NEW.DonGiaNhap <= 0 THEN
        RAISE_APPLICATION_ERROR(-20009,'Don gia nhap phai lon hon 0');
    END IF;
    :NEW.ThanhTien := :NEW.SoLuong * :NEW.DonGiaNhap;
END;
/

-- Test T6
SHOW ERRORS TRIGGER TRG_TINH_THANHTIEN_PN;
SET SERVEROUTPUT ON;
DECLARE
    v_mactpn VARCHAR2(10);
BEGIN
    SAVEPOINT sp_test_t6_sl;

    INSERT INTO PHIEUNHAP (MaPN, MaNCC, TongTien)
    VALUES ('PNT6TEST', 'NC1', 0);

    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');
    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, 'PNT6TEST', 'SP1001', -1, 100);

    DBMS_OUTPUT.PUT_LINE('KHONG DUNG: Insert thanh cong voi SoLuong <= 0');
    ROLLBACK TO sp_test_t6_sl;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t6_sl;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mactpn VARCHAR2(10);
BEGIN
    SAVEPOINT sp_test_t6_gia;

    INSERT INTO PHIEUNHAP (MaPN, MaNCC, TongTien)
    VALUES ('PNT6TEST', 'NC1', 0);

    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');
    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, 'PNT6TEST', 'SP1001', 1, -100);

    DBMS_OUTPUT.PUT_LINE('KHONG DUNG: Insert thanh cong voi DonGiaNhap <= 0');
    ROLLBACK TO sp_test_t6_gia;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t6_gia;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mactpn    VARCHAR2(10);
    v_soluong   NUMBER;
    v_dongia    NUMBER;
    v_thanhtien NUMBER;
BEGIN
    SAVEPOINT sp_test_t6_ok;

    INSERT INTO PHIEUNHAP (MaPN, MaNCC, TongTien)
    VALUES ('PNT6TEST', 'NC1', 0);

    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');
    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, 'PNT6TEST', 'SP1001', 5, 120);

    SELECT SoLuong, DonGiaNhap, ThanhTien
    INTO v_soluong, v_dongia, v_thanhtien
    FROM CHITIETPHIEUNHAP
    WHERE MaCTPN = v_mactpn;

    DBMS_OUTPUT.PUT_LINE('MaCTPN     = ' || v_mactpn);
    DBMS_OUTPUT.PUT_LINE('SoLuong    = ' || v_soluong);
    DBMS_OUTPUT.PUT_LINE('DonGiaNhap = ' || v_dongia);
    DBMS_OUTPUT.PUT_LINE('ThanhTien  = ' || v_thanhtien);

    IF v_thanhtien = v_soluong * v_dongia THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - Trigger tu tinh ThanhTien');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;

    ROLLBACK TO sp_test_t6_ok;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t6_ok;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mactpn    VARCHAR2(10);
    v_soluong   NUMBER;
    v_dongia    NUMBER;
    v_thanhtien NUMBER;
BEGIN
    SAVEPOINT sp_test_t6_update;

    INSERT INTO PHIEUNHAP (MaPN, MaNCC, TongTien)
    VALUES ('PNT6TEST', 'NC1', 0);

    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');
    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, 'PNT6TEST', 'SP1001', 2, 100);

    UPDATE CHITIETPHIEUNHAP
    SET SoLuong = 3,
        DonGiaNhap = 150
    WHERE MaCTPN = v_mactpn;

    SELECT SoLuong, DonGiaNhap, ThanhTien
    INTO v_soluong, v_dongia, v_thanhtien
    FROM CHITIETPHIEUNHAP
    WHERE MaCTPN = v_mactpn;

    DBMS_OUTPUT.PUT_LINE('MaCTPN sau update = ' || v_mactpn);
    DBMS_OUTPUT.PUT_LINE('SoLuong           = ' || v_soluong);
    DBMS_OUTPUT.PUT_LINE('DonGiaNhap        = ' || v_dongia);
    DBMS_OUTPUT.PUT_LINE('ThanhTien         = ' || v_thanhtien);

    IF v_soluong = 3
       AND v_dongia = 150
       AND v_thanhtien = 450 THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA UPDATE: DUNG');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA UPDATE: SAI');
    END IF;

    ROLLBACK TO sp_test_t6_update;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t6_update;
END;
/

-- T7: Cập nhật tổng tiền phiếu nhập + cộng tồn kho khi nhập hàng
CREATE OR REPLACE TRIGGER TRG_CAPNHAT_PN_TONKHO
AFTER INSERT ON CHITIETPHIEUNHAP
FOR EACH ROW
BEGIN
    UPDATE PHIEUNHAP
    SET TongTien = NVL(TongTien,0) + :NEW.ThanhTien
    WHERE MaPN = :NEW.MaPN;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20010,'Phieu nhap khong ton tai');
    END IF;

    UPDATE SANPHAM
    SET SoLuong = SoLuong + :NEW.SoLuong,
        NgayCapNhat = CURRENT_TIMESTAMP
    WHERE Masanpham = :NEW.MaSanPham;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20011,'San pham khong ton tai');
    END IF;
END;
/

-- Test T7
SHOW ERRORS TRIGGER TRG_CAPNHAT_PN_TONKHO;
SET SERVEROUTPUT ON;
DECLARE
    v_mapn              VARCHAR2(10);
    v_mactpn            VARCHAR2(10);
    v_masp              VARCHAR2(10) := 'SP1001';
    v_sl_nhap           NUMBER := 4;
    v_dongia_nhap       NUMBER := 100;
    v_tongtien_pn       NUMBER;
    v_tonkho_truoc      NUMBER;
    v_tonkho_sau        NUMBER;
BEGIN
    SAVEPOINT sp_test_t7_ok;
    v_mapn := 'P7' || LPAD(SEQ_PN.NEXTVAL, 8, '0');
    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');

    SELECT SoLuong
    INTO v_tonkho_truoc
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    INSERT INTO PHIEUNHAP
        (MaPN, MaNCC, TongTien)
    VALUES
        (v_mapn, 'NC1', 0);

    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, v_mapn, v_masp, v_sl_nhap, v_dongia_nhap);

    SELECT TongTien
    INTO v_tongtien_pn
    FROM PHIEUNHAP
    WHERE MaPN = v_mapn;

    SELECT SoLuong
    INTO v_tonkho_sau
    FROM SANPHAM
    WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('MaPN              = ' || v_mapn);
    DBMS_OUTPUT.PUT_LINE('MaCTPN            = ' || v_mactpn);
    DBMS_OUTPUT.PUT_LINE('Ma san pham        = ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('So luong nhap      = ' || v_sl_nhap);
    DBMS_OUTPUT.PUT_LINE('Don gia nhap       = ' || v_dongia_nhap);
    DBMS_OUTPUT.PUT_LINE('TongTien phieu nhap= ' || v_tongtien_pn);
    DBMS_OUTPUT.PUT_LINE('Ton kho truoc      = ' || v_tonkho_truoc);
    DBMS_OUTPUT.PUT_LINE('Ton kho sau        = ' || v_tonkho_sau);

    IF v_tongtien_pn = v_sl_nhap * v_dongia_nhap
       AND v_tonkho_sau = v_tonkho_truoc + v_sl_nhap THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - T7 cap nhat TongTien PN va cong ton kho');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;

    ROLLBACK TO sp_test_t7_ok;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t7_ok;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mactpn VARCHAR2(10);
BEGIN
    SAVEPOINT sp_test_t7_err10;
    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');

    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, 'PN_FAKE', 'SP1001', 1, 100);

    DBMS_OUTPUT.PUT_LINE('KHONG DUNG: Insert thanh cong voi MaPN khong ton tai');
    ROLLBACK TO sp_test_t7_err10;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t7_err10;
END;
/

SET SERVEROUTPUT ON;
DECLARE
    v_mapn   VARCHAR2(10);
    v_mactpn VARCHAR2(10);
BEGIN
    SAVEPOINT sp_test_t7_err11;
    v_mapn := 'P7' || LPAD(SEQ_PN.NEXTVAL, 8, '0');
    v_mactpn := 'PN' || LPAD(SEQ_CTPN.NEXTVAL, 8, '0');

    INSERT INTO PHIEUNHAP
        (MaPN, MaNCC, TongTien)
    VALUES
        (v_mapn, 'NC1', 0);

    INSERT INTO CHITIETPHIEUNHAP
        (MaCTPN, MaPN, MaSanPham, SoLuong, DonGiaNhap)
    VALUES
        (v_mactpn, v_mapn, 'SP_FAKE', 1, 100);
    DBMS_OUTPUT.PUT_LINE('KHONG DUNG: Insert thanh cong voi MaSanPham khong ton tai');
    ROLLBACK TO sp_test_t7_err11;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t7_err11;
END;
/

-- T8: Tự động gửi thông báo khi đặt hàng thành công
CREATE OR REPLACE TRIGGER TRG_THONGBAO_DATHANG
AFTER INSERT ON DONHANG
FOR EACH ROW
BEGIN
    INSERT INTO THONGBAO (
        MaTB,
        MaNguoiDung,
        TieuDe,
        NoiDung
    )
    VALUES (
        'TB' || SEQ_TB.NEXTVAL,
        :NEW.Manguoidung,
        'Dat hang thanh cong',
        'Don hang ' || :NEW.Madonhang || ' da duoc tao'
    );
END;
/

-- Test T8
SHOW ERRORS TRIGGER TRG_THONGBAO_DATHANG;
SET SERVEROUTPUT ON;
DECLARE
    v_madh            VARCHAR2(10);
    v_matb            VARCHAR2(10);
    v_manguoidung     VARCHAR2(10);
    v_tieude          VARCHAR2(200);
    v_noidung         VARCHAR2(4000);
    v_count_tb        NUMBER;
BEGIN
    SAVEPOINT sp_test_t8;
    v_madh := 'T8' || LPAD(SEQ_DONHANG.NEXTVAL, 8, '0');
    INSERT INTO DONHANG (
        Madonhang,
        Manguoidung,
        TenNguoiNhan,
        SdtNguoiNhan,
        DiaChiGiao,
        ThanhPho,
        TongTien,
        PhiShip,
        Thue,
        TongCong,
        TrangThai
    )
    VALUES (
        v_madh,
        'ND1001',
        'Test Trigger T8',
        '0900000000',
        'Dia chi test T8',
        'TP.HCM',
        0,
        0,
        0,
        0,
        'CHOXULY'
    );

    SELECT COUNT(*)
    INTO v_count_tb
    FROM THONGBAO
    WHERE MaNguoiDung = 'ND1001'
      AND TieuDe = 'Dat hang thanh cong'
      AND DBMS_LOB.SUBSTR(NoiDung, 4000, 1) = 'Don hang ' || v_madh || ' da duoc tao';

    SELECT MaTB,
           MaNguoiDung,
           TieuDe,
           DBMS_LOB.SUBSTR(NoiDung, 4000, 1)
    INTO v_matb,
         v_manguoidung,
         v_tieude,
         v_noidung
    FROM (
        SELECT MaTB,
               MaNguoiDung,
               TieuDe,
               NoiDung,
               NgayTB
        FROM THONGBAO
        WHERE MaNguoiDung = 'ND1001'
          AND TieuDe = 'Dat hang thanh cong'
          AND DBMS_LOB.SUBSTR(NoiDung, 4000, 1) = 'Don hang ' || v_madh || ' da duoc tao'
        ORDER BY NgayTB DESC
    )
    WHERE ROWNUM = 1;

    DBMS_OUTPUT.PUT_LINE('Ma don hang test = ' || v_madh);
    DBMS_OUTPUT.PUT_LINE('So thong bao tim thay = ' || v_count_tb);
    DBMS_OUTPUT.PUT_LINE('Ma thong bao = ' || v_matb);
    DBMS_OUTPUT.PUT_LINE('Ma nguoi dung = ' || v_manguoidung);
    DBMS_OUTPUT.PUT_LINE('Tieu de = ' || v_tieude);
    DBMS_OUTPUT.PUT_LINE('Noi dung = ' || v_noidung);

    IF v_count_tb = 1
       AND v_manguoidung = 'ND1001'
       AND v_tieude = 'Dat hang thanh cong'
       AND v_noidung = 'Don hang ' || v_madh || ' da duoc tao' THEN
        DBMS_OUTPUT.PUT_LINE('KET QUA: DUNG - T8 tu dong tao thong bao khi dat hang');
    ELSE
        DBMS_OUTPUT.PUT_LINE('KET QUA: SAI');
    END IF;

    ROLLBACK TO sp_test_t8;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('SQLCODE = ' || SQLCODE);
        DBMS_OUTPUT.PUT_LINE('SQLERRM = ' || SQLERRM);
        ROLLBACK TO sp_test_t8;
END;
/

SELECT *
FROM DONHANG
WHERE Madonhang LIKE 'T8%';

SELECT MaTB, MaNguoiDung, TieuDe, DBMS_LOB.SUBSTR(NoiDung, 4000, 1) AS NoiDung
FROM THONGBAO
WHERE DBMS_LOB.SUBSTR(NoiDung, 4000, 1) LIKE 'Don hang T8%';

/*
BẢNG NOTE CÁC LỖI
Mã lỗi  Nội dung lỗi                    Chi tiết lỗi
-20001  So luong phai lon hon 0         Lỗi ở biến :NEW.SoLuong của bảng CHITIETDONHANG. Số lượng đặt hàng phải lớn hơn 0.

-20002  Don gia phai lon hon 0          Lỗi ở biến :NEW.DonGia của bảng CHITIETDONHANG. Đơn giá sản phẩm trong chi tiết đơn hàng phải lớn hơn 0.

-20003  So luong ton kho khong du       Lỗi khi :NEW.SoLuong trong bảng CHITIETDONHANG lớn hơn SANPHAM.SoLuong. Tồn kho sản phẩm không đủ để đặt hàng.

-20004  San pham khong ton tai          Lỗi ở biến :NEW.Masanpham của bảng CHITIETDONHANG. Mã sản phẩm không tìm thấy trong bảng SANPHAM.

-20005  Khong tim thay san pham         Lỗi ở biến :OLD.Masanpham của bảng CHITIETDONHANG. Khi xóa chi tiết đơn hàng, không tìm thấy sản phẩm tương ứng để cộng lại tồn kho.

-20006  So luong khong duoc am          Lỗi ở biến :NEW.SoLuong của bảng SANPHAM. Số lượng tồn kho sản phẩm không được nhỏ hơn 0.

-20007  Don hang khong ton tai          Lỗi ở mã đơn hàng Madonhang trong bảng CHITIETDONHANG. Không tìm thấy đơn hàng tương ứng trong bảng DONHANG để cập nhật tổng tiền.

-20008  So luong nhap phai lon hon 0    Lỗi ở biến :NEW.SoLuong của bảng CHITIETPHIEUNHAP. Số lượng nhập hàng phải lớn hơn 0.

-20009  Don gia nhap phai lon hon 0     Lỗi ở biến :NEW.DonGiaNhap của bảng CHITIETPHIEUNHAP. Đơn giá nhập hàng phải lớn hơn 0.

-20010  Phieu nhap khong ton tai        Lỗi ở biến :NEW.MaPN của bảng CHITIETPHIEUNHAP. Không tìm thấy phiếu nhập tương ứng trong bảng PHIEUNHAP.

-20011  San pham khong ton tai          Lỗi ở biến :NEW.MaSanPham của bảng CHITIETPHIEUNHAP. Không tìm thấy sản phẩm tương ứng trong bảng SANPHAM để cộng tồn kho.
*/

-- ============================================================
-- STORED PROCEDURES
-- ============================================================

-- P0: Procedure trung gian để ném lỗi từ BANG_MA_LOI
CREATE OR REPLACE PROCEDURE RAISE_ERROR(p_MaLoi IN NUMBER) IS
    v_TenLoi VARCHAR2(200);
BEGIN
    SELECT TenLoi INTO v_TenLoi FROM BANG_MA_LOI WHERE MaLoi = p_MaLoi;
    RAISE_APPLICATION_ERROR(p_MaLoi, v_TenLoi);
EXCEPTION 
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20999, 'Mã lỗi không tồn tại trong hệ thống!');
END;
/

-- P1: Thêm sản phẩm mới
CREATE OR REPLACE PROCEDURE INSERT_SANPHAM(
    p_TenSP IN VARCHAR2, p_Madanhmuc IN VARCHAR2, p_Mathuonghieu IN VARCHAR2,
    p_Gia IN NUMBER, p_GiaGoc IN NUMBER, p_HinhAnh IN VARCHAR2, p_SoLuong IN NUMBER, p_MoTa IN CLOB
) IS
BEGIN
    INSERT INTO SANPHAM (TenSP, Madanhmuc, Mathuonghieu, Gia, GiaGoc, HinhAnh, SoLuong, MoTa)
    VALUES (p_TenSP, p_Madanhmuc, p_Mathuonghieu, p_Gia, p_GiaGoc, p_HinhAnh, p_SoLuong, p_MoTa);
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P2: Cập nhật người dùng
CREATE OR REPLACE PROCEDURE UPDATE_NGUOIDUNG(
    p_Manguoidung IN VARCHAR2, p_TenND IN VARCHAR2, p_SoDienThoai IN VARCHAR2, p_DiaChi IN VARCHAR2
) IS
BEGIN
    UPDATE NGUOIDUNG SET TenND = p_TenND, SoDienThoai = p_SoDienThoai, DiaChi = p_DiaChi, NgayCapNhat = CURRENT_TIMESTAMP
    WHERE Manguoidung = p_Manguoidung;
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P3: Đổi mật khẩu
CREATE OR REPLACE PROCEDURE DOI_MAT_KHAU(
    p_Manguoidung IN VARCHAR2, p_MatKhauCu IN VARCHAR2, p_MatKhauMoi IN VARCHAR2
) IS v_Cur VARCHAR2(255);
BEGIN
    SELECT MatKhau INTO v_Cur FROM NGUOIDUNG WHERE Manguoidung = p_Manguoidung;
    IF v_Cur != p_MatKhauCu THEN RAISE_ERROR(-20001); END IF;
    UPDATE NGUOIDUNG SET MatKhau = p_MatKhauMoi, NgayCapNhat = CURRENT_TIMESTAMP WHERE Manguoidung = p_Manguoidung;
    COMMIT;
EXCEPTION WHEN NO_DATA_FOUND THEN RAISE_ERROR(-20002);
    WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P4: Đặt hàng (kiểm tra tồn kho)
CREATE OR REPLACE PROCEDURE DAT_HANG(
    p_Manguoidung IN VARCHAR2, p_TenNguoiNhan IN VARCHAR2, p_SdtNguoiNhan IN VARCHAR2,
    p_DiaChiGiao IN VARCHAR2, p_ThanhPho IN VARCHAR2, p_Masanpham IN VARCHAR2, p_KichCo IN VARCHAR2, p_SoLuong IN NUMBER
) IS v_Madonhang VARCHAR2(10); v_SLTon NUMBER; v_Gia NUMBER(19,4); v_TT VARCHAR2(20);
BEGIN
    SELECT SoLuong, Gia, TrangThai INTO v_SLTon, v_Gia, v_TT FROM SANPHAM WHERE Masanpham = p_Masanpham;
    IF v_TT = 'HETHANG' OR v_SLTon < p_SoLuong THEN RAISE_ERROR(-20003); END IF;
    INSERT INTO DONHANG (Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho) VALUES (p_Manguoidung, p_TenNguoiNhan, p_SdtNguoiNhan, p_DiaChiGiao, p_ThanhPho);
    SELECT Madonhang INTO v_Madonhang FROM DONHANG WHERE Manguoidung = p_Manguoidung ORDER BY NgayDat DESC FETCH FIRST 1 ROW ONLY;
    INSERT INTO CHITIETDONHANG (Madonhang, Masanpham, KichCo, SoLuong, DonGia) VALUES (v_Madonhang, p_Masanpham, p_KichCo, p_SoLuong, v_Gia);
    COMMIT;
EXCEPTION WHEN NO_DATA_FOUND THEN RAISE_ERROR(-20004);
    WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P5: Hủy đơn hàng
CREATE OR REPLACE PROCEDURE HUY_DONHANG(p_Madonhang IN VARCHAR2) IS
BEGIN
    UPDATE DONHANG SET TrangThai = 'DAHUY', NgayCapNhat = CURRENT_TIMESTAMP WHERE Madonhang = p_Madonhang;
    DELETE FROM CHITIETDONHANG WHERE Madonhang = p_Madonhang;
    DELETE FROM THANHTOAN WHERE Madonhang = p_Madonhang;
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P6: Thanh toán đơn hàng
CREATE OR REPLACE PROCEDURE THANH_TOAN_DONHANG(p_Madonhang IN VARCHAR2, p_PhuongThuc IN VARCHAR2) IS
    v_TongCong NUMBER(19,4);
BEGIN
    SELECT TongCong INTO v_TongCong FROM DONHANG WHERE Madonhang = p_Madonhang;
    INSERT INTO THANHTOAN (Madonhang, PhuongThuc, SoTien, TrangThai, MaGiaoDich)
    VALUES (p_Madonhang, p_PhuongThuc, v_TongCong, 'DATHANHTOAN', 'TXN' || TO_CHAR(SYSTIMESTAMP, 'YYYYMMDDHH24MISS'));
    UPDATE DONHANG SET TrangThai = 'DANGXULY', NgayCapNhat = CURRENT_TIMESTAMP WHERE Madonhang = p_Madonhang;
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P7: Thêm đánh giá
CREATE OR REPLACE PROCEDURE THEM_DANHGIA(p_Masanpham IN VARCHAR2, p_Manguoidung IN VARCHAR2, p_SoSao IN NUMBER, p_BinhLuan IN CLOB) IS
BEGIN
    INSERT INTO DANHGIA (Masanpham, Manguoidung, SoSao, BinhLuan) VALUES (p_Masanpham, p_Manguoidung, p_SoSao, p_BinhLuan);
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P8: Thêm vào giỏ hàng
CREATE OR REPLACE PROCEDURE THEM_VAO_GIOHANG(p_MaNguoiDung IN VARCHAR2, p_MaSanPham IN VARCHAR2, p_KichCo IN VARCHAR2, p_SoLuong IN NUMBER) IS
    v_MaGH VARCHAR2(10); v_Count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_Count FROM GIOHANG WHERE MaNguoiDung = p_MaNguoiDung;
    IF v_Count = 0 THEN
        INSERT INTO GIOHANG(MaNguoiDung) VALUES(p_MaNguoiDung) RETURNING MaGioHang INTO v_MaGH;
    ELSE SELECT MaGioHang INTO v_MaGH FROM GIOHANG WHERE MaNguoiDung = p_MaNguoiDung;
    END IF;
    INSERT INTO CHITIETGIOHANG(MaGioHang, MaSanPham, KichCo, SoLuong) VALUES (v_MaGH, p_MaSanPham, p_KichCo, p_SoLuong);
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/

-- P9: Báo cáo doanh thu theo tháng
CREATE OR REPLACE PROCEDURE BAO_CAO_DOANH_THU(p_Thang IN NUMBER, p_Nam IN NUMBER) IS
    v_TongDT NUMBER; v_SoDon NUMBER;
BEGIN
    SELECT NVL(SUM(TongCong),0), COUNT(*) INTO v_TongDT, v_SoDon FROM DONHANG
    WHERE EXTRACT(MONTH FROM NgayDat) = p_Thang AND EXTRACT(YEAR FROM NgayDat) = p_Nam AND TrangThai != 'DAHUY';
    DBMS_OUTPUT.PUT_LINE('Thang ' || p_Thang || '/' || p_Nam || ': ' || v_SoDon || ' don, Doanh thu: ' || v_TongDT);
END;
/

-- P10: Nhập hàng từ nhà cung cấp
CREATE OR REPLACE PROCEDURE NHAP_HANG(p_MaNCC IN VARCHAR2, p_MaSanPham IN VARCHAR2, p_SoLuong IN NUMBER, p_DonGiaNhap IN NUMBER) IS
    v_MaPN VARCHAR2(10);
BEGIN
    INSERT INTO PHIEUNHAP(MaNCC) VALUES(p_MaNCC) RETURNING MaPN INTO v_MaPN;
    INSERT INTO CHITIETPHIEUNHAP(MaPN, MaSanPham, SoLuong, DonGiaNhap) VALUES(v_MaPN, p_MaSanPham, p_SoLuong, p_DonGiaNhap);
    COMMIT;
EXCEPTION WHEN OTHERS THEN ROLLBACK; RAISE_ERROR(-20005);
END;
/
