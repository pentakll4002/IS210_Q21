SET DEFINE OFF;
SET SERVEROUTPUT ON SIZE UNLIMITED;
SET LINESIZE 200;
-- ============================================================
-- PHAN 2: KIEM SOAT HIEN TUONG BAT NHAT QUAN DU LIEU
--         MO PHONG DIRTY READ TRONG SNEAKERSHOP
-- ============================================================
-- DIRTY READ la gi?
-- Khi Transaction A sua du lieu nhung CHUA COMMIT,
-- Transaction B doc duoc du lieu "ban" do.
-- Neu A ROLLBACK -> B da dung du lieu sai!
-- Oracle mac dinh dung ISOLATION LEVEL = READ COMMITTED
-- -> Oracle TU DONG ngan Dirty Read bang MVCC
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT DEMO 2.1: DIRTY READ - ORACLE TU DONG NGAN CHAN
PROMPT ============================================================

DECLARE
    v_masp     VARCHAR2(10);
    v_tensp    VARCHAR2(200);
    v_sl_truoc NUMBER;
    v_sl_sau   NUMBER;
BEGIN
    -- Tim san pham co ton kho > 5
    SELECT Masanpham, TenSP, SoLuong
    INTO v_masp, v_tensp, v_sl_truoc
    FROM (SELECT Masanpham, TenSP, SoLuong FROM SANPHAM WHERE SoLuong > 5 ORDER BY Masanpham)
    WHERE ROWNUM = 1;

    DBMS_OUTPUT.PUT_LINE('=== BUOC 1: Ton kho ban dau ===');
    DBMS_OUTPUT.PUT_LINE('San pham: ' || v_masp || ' - ' || SUBSTR(v_tensp, 1, 40));
    DBMS_OUTPUT.PUT_LINE('Ton kho hien tai: ' || v_sl_truoc);
    DBMS_OUTPUT.PUT_LINE('');

    -- Transaction A: Cap nhat nhung CHUA COMMIT
    UPDATE SANPHAM SET SoLuong = SoLuong - 1 WHERE Masanpham = v_masp;

    SELECT SoLuong INTO v_sl_sau FROM SANPHAM WHERE Masanpham = v_masp;

    DBMS_OUTPUT.PUT_LINE('=== BUOC 2: TRANSACTION A (Khach 1) ===');
    DBMS_OUTPUT.PUT_LINE('Ton kho TRUOC khi dat: ' || v_sl_truoc);
    DBMS_OUTPUT.PUT_LINE('Ton kho SAU khi dat (chua commit): ' || v_sl_sau);
    DBMS_OUTPUT.PUT_LINE('Trang thai: CHUA COMMIT - du lieu BAN!');
    DBMS_OUTPUT.PUT_LINE('');

    DBMS_OUTPUT.PUT_LINE('=== TRANSACTION B (Session khac) ===');
    DBMS_OUTPUT.PUT_LINE('Oracle READ COMMITTED: Session khac se thay SoLuong = ' || v_sl_truoc);
    DBMS_OUTPUT.PUT_LINE('Chi session hien tai moi thay SoLuong = ' || v_sl_sau);
    DBMS_OUTPUT.PUT_LINE('=> DIRTY READ BI NGAN CHAN boi Oracle MVCC!');
    DBMS_OUTPUT.PUT_LINE('');

    -- ROLLBACK
    ROLLBACK;

    SELECT SoLuong INTO v_sl_sau FROM SANPHAM WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('=== SAU ROLLBACK ===');
    DBMS_OUTPUT.PUT_LINE('Ton kho sau ROLLBACK: ' || v_sl_sau);
    DBMS_OUTPUT.PUT_LINE('Du lieu da tro ve ban dau - TOAN VEN!');
END;
/

-- ============================================================
-- DEMO 2.2: CHUNG MINH MVCC BANG AUTONOMOUS TRANSACTION
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT DEMO 2.2: CHUNG MINH MVCC BANG AUTONOMOUS TRANSACTION
PROMPT (Mo phong 2 session doc lap)
PROMPT ============================================================

-- Dung bang NGUOIDUNG (khong co mutating trigger) de chung minh MVCC
CREATE OR REPLACE PROCEDURE READ_ADDR_OTHER_SESSION(
    p_mand IN VARCHAR2, p_result OUT VARCHAR2
) IS
    PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
    SELECT DiaChi INTO p_result FROM NGUOIDUNG WHERE Manguoidung = p_mand;
    COMMIT;
END;
/

DECLARE
    v_mand            VARCHAR2(10);
    v_addr_truoc      VARCHAR2(255);
    v_addr_trong_txn  VARCHAR2(255);
    v_addr_doc_ngoai  VARCHAR2(255);
    v_addr_sau        VARCHAR2(255);
BEGIN
    SELECT Manguoidung, DiaChi
    INTO v_mand, v_addr_truoc
    FROM NGUOIDUNG WHERE Manguoidung = 'ND1001';

    DBMS_OUTPUT.PUT_LINE('====================================');
    DBMS_OUTPUT.PUT_LINE('  MO PHONG DIRTY READ VOI 2 SESSIONS');
    DBMS_OUTPUT.PUT_LINE('====================================');
    DBMS_OUTPUT.PUT_LINE('[1] Nguoi dung: ' || v_mand);
    DBMS_OUTPUT.PUT_LINE('[1] Dia chi ban dau: ' || v_addr_truoc);

    -- Session A: UPDATE DiaChi nhung CHUA COMMIT
    UPDATE NGUOIDUNG SET DiaChi = 'DIA CHI GIA - CHUA COMMIT' WHERE Manguoidung = v_mand;
    SELECT DiaChi INTO v_addr_trong_txn FROM NGUOIDUNG WHERE Manguoidung = v_mand;
    DBMS_OUTPUT.PUT_LINE('[2] Session A doc sau UPDATE (chua commit): ' || v_addr_trong_txn);

    -- Session B doc (qua Autonomous Transaction = session doc lap)
    READ_ADDR_OTHER_SESSION(v_mand, v_addr_doc_ngoai);
    DBMS_OUTPUT.PUT_LINE('[3] Session B doc (doc lap): ' || v_addr_doc_ngoai);

    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('=== PHAN TICH ===');
    IF v_addr_doc_ngoai = v_addr_truoc THEN
        DBMS_OUTPUT.PUT_LINE('=> Session B doc gia tri CU, KHONG thay du lieu ban');
        DBMS_OUTPUT.PUT_LINE('=> KET LUAN: DIRTY READ DA BI NGAN CHAN!');
        DBMS_OUTPUT.PUT_LINE('=> Co che: Oracle MVCC (Multi-Version Concurrency Control)');
    ELSE
        DBMS_OUTPUT.PUT_LINE('=> Session B doc gia tri MOI -> Dirty Read xay ra!');
    END IF;

    ROLLBACK;
    SELECT DiaChi INTO v_addr_sau FROM NGUOIDUNG WHERE Manguoidung = v_mand;
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[4] Dia chi sau ROLLBACK: ' || v_addr_sau || ' -> Toan ven!');
END;
/

DROP PROCEDURE READ_ADDR_OTHER_SESSION;

-- ============================================================
-- DEMO 2.3: BANG SO SANH ISOLATION LEVEL
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT DEMO 2.3: BANG SO SANH CAC MUC ISOLATION LEVEL
PROMPT ============================================================

BEGIN
    DBMS_OUTPUT.PUT_LINE('+------------------+------------+-----------------+----------------+');
    DBMS_OUTPUT.PUT_LINE('| Isolation Level  | Dirty Read | Non-Repeatable  | Phantom Read   |');
    DBMS_OUTPUT.PUT_LINE('+------------------+------------+-----------------+----------------+');
    DBMS_OUTPUT.PUT_LINE('| READ UNCOMMITTED | CO THE     | CO THE          | CO THE         |');
    DBMS_OUTPUT.PUT_LINE('| READ COMMITTED * | KHONG      | CO THE          | CO THE         |');
    DBMS_OUTPUT.PUT_LINE('| REPEATABLE READ  | KHONG      | KHONG           | CO THE         |');
    DBMS_OUTPUT.PUT_LINE('| SERIALIZABLE     | KHONG      | KHONG           | KHONG          |');
    DBMS_OUTPUT.PUT_LINE('+------------------+------------+-----------------+----------------+');
    DBMS_OUTPUT.PUT_LINE('(*) Oracle mac dinh: READ COMMITTED + MVCC');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Oracle MVCC giai thich:');
    DBMS_OUTPUT.PUT_LINE('  - Moi row co nhieu phien ban (multi-version)');
    DBMS_OUTPUT.PUT_LINE('  - Reader KHONG block Writer va nguoc lai');
    DBMS_OUTPUT.PUT_LINE('  - Uncommitted data chi visible trong session thay doi');
    DBMS_OUTPUT.PUT_LINE('  - Session khac luon doc Consistent Snapshot (du lieu da COMMIT)');
END;
/

-- ============================================================
-- DEMO 2.4: LOST UPDATE VA CACH PHONG CHONG
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT DEMO 2.4: LOST UPDATE VA CACH KHAC PHUC
PROMPT ============================================================

DECLARE
    v_masp         VARCHAR2(10);
    v_sl_ban_dau   NUMBER;
    v_sl_a_doc     NUMBER;
    v_sl_b_doc     NUMBER;
    v_sl_ket_qua   NUMBER;
BEGIN
    -- Tim san pham co ton kho > 10
    SELECT Masanpham, SoLuong
    INTO v_masp, v_sl_ban_dau
    FROM (SELECT Masanpham, SoLuong FROM SANPHAM WHERE SoLuong > 20 ORDER BY Masanpham)
    WHERE ROWNUM = 1;

    -- Dat ton kho = 5 de demo
    UPDATE SANPHAM SET SoLuong = 5 WHERE Masanpham = v_masp;
    COMMIT;

    DBMS_OUTPUT.PUT_LINE('=== KICH BAN LOST UPDATE ===');
    DBMS_OUTPUT.PUT_LINE('San pham: ' || v_masp);
    DBMS_OUTPUT.PUT_LINE('Ton kho ban dau: 5');
    DBMS_OUTPUT.PUT_LINE('');

    -- Khach A doc ton kho
    SELECT SoLuong INTO v_sl_a_doc FROM SANPHAM WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('[A] Khach A doc ton kho: ' || v_sl_a_doc);

    -- Khach B doc ton kho (cung luc)
    SELECT SoLuong INTO v_sl_b_doc FROM SANPHAM WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('[B] Khach B doc ton kho: ' || v_sl_b_doc);
    DBMS_OUTPUT.PUT_LINE('');

    -- Ca 2 deu thay ton kho = 5
    -- Khach A mua 2 doi
    UPDATE SANPHAM SET SoLuong = v_sl_a_doc - 2 WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('[A] Khach A mua 2 -> set SoLuong = ' || (v_sl_a_doc - 2));

    -- Khach B mua 1 doi (GHI DE khach A!)
    UPDATE SANPHAM SET SoLuong = v_sl_b_doc - 1 WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('[B] Khach B mua 1 -> set SoLuong = ' || (v_sl_b_doc - 1));

    SELECT SoLuong INTO v_sl_ket_qua FROM SANPHAM WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Ket qua: SoLuong = ' || v_sl_ket_qua);
    DBMS_OUTPUT.PUT_LINE('Dung ra phai la: 5 - 2 - 1 = 2');
    DBMS_OUTPUT.PUT_LINE('=> LOST UPDATE: Thao tac cua Khach A bi mat!');

    -- KHAC PHUC
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('=== KHAC PHUC: DUNG SoLuong = SoLuong - N ===');
    UPDATE SANPHAM SET SoLuong = 5 WHERE Masanpham = v_masp;
    COMMIT;

    -- Cach dung: UPDATE voi bieu thuc tru truc tiep
    UPDATE SANPHAM SET SoLuong = SoLuong - 2 WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('[A] UPDATE SoLuong = SoLuong - 2 -> COMMIT');
    COMMIT;

    UPDATE SANPHAM SET SoLuong = SoLuong - 1 WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('[B] UPDATE SoLuong = SoLuong - 1 -> COMMIT');
    COMMIT;

    SELECT SoLuong INTO v_sl_ket_qua FROM SANPHAM WHERE Masanpham = v_masp;
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Ket qua: SoLuong = ' || v_sl_ket_qua);
    DBMS_OUTPUT.PUT_LINE('Dung: 5 - 2 - 1 = 2 -> CHINH XAC!');
    DBMS_OUTPUT.PUT_LINE('=> Phep tru truc tiep tren DB ngan chan Lost Update');

    -- Khoi phuc
    UPDATE SANPHAM SET SoLuong = v_sl_ban_dau WHERE Masanpham = v_masp;
    COMMIT;
END;
/

PROMPT
PROMPT ============================================================
PROMPT HOAN THANH PHAN 2: DIRTY READ VA LOST UPDATE!
PROMPT ============================================================
