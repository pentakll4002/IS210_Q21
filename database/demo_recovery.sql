SET DEFINE OFF;
SET SERVEROUTPUT ON SIZE UNLIMITED;
SET LINESIZE 200;
-- ============================================================
-- PHAN 3: MO PHONG QUY TRINH PHUC HOI HE THONG
--         UNDO/REDO LOG VA CHECKPOINT
-- ============================================================

PROMPT ============================================================
PROMPT PHAN 3.1: KIEM TRA CAU HINH REDO LOG HIEN TAI
PROMPT ============================================================

SELECT l.GROUP# "Group", l.BYTES/1024/1024 "Size_MB", l.STATUS "Status", l.ARCHIVED "Archived" FROM V$LOG l ORDER BY l.GROUP#;

SELECT lf.GROUP# "Group", lf.MEMBER "File_Path" FROM V$LOGFILE lf ORDER BY lf.GROUP#;

SELECT NAME "Parameter", VALUE "Value" FROM V$PARAMETER WHERE NAME IN ('undo_tablespace', 'undo_retention', 'undo_management');

-- ============================================================
-- PHAN 3.2: TAO BANG LOG MO PHONG
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT PHAN 3.2: MO PHONG UNDO/REDO LOG TRONG DAT HANG
PROMPT ============================================================

BEGIN EXECUTE IMMEDIATE 'DROP TABLE UNDO_REDO_LOG PURGE'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP TABLE CHECKPOINT_LOG PURGE'; EXCEPTION WHEN OTHERS THEN NULL; END;
/

CREATE TABLE UNDO_REDO_LOG (
    LogID       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ThoiGian    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LoaiLog     VARCHAR2(10),
    BangBiAnh   VARCHAR2(50),
    MaBanGhi    VARCHAR2(20),
    CotThayDoi  VARCHAR2(50),
    GiaTriCu    VARCHAR2(100),
    GiaTriMoi   VARCHAR2(100),
    TrangThai   VARCHAR2(20)
);

CREATE TABLE CHECKPOINT_LOG (
    CPID        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ThoiGian    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LoaiCP      VARCHAR2(30),
    MoTa        VARCHAR2(500),
    SoTxnActive NUMBER DEFAULT 0,
    SoTxnCommit NUMBER DEFAULT 0
);

CREATE OR REPLACE PROCEDURE LOG_ENTRY(p_Loai VARCHAR2, p_Bang VARCHAR2, p_Ma VARCHAR2, p_Cot VARCHAR2, p_Cu VARCHAR2, p_Moi VARCHAR2, p_TT VARCHAR2 DEFAULT 'ACTIVE') IS
    PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
    INSERT INTO UNDO_REDO_LOG (LoaiLog, BangBiAnh, MaBanGhi, CotThayDoi, GiaTriCu, GiaTriMoi, TrangThai)
    VALUES (p_Loai, p_Bang, p_Ma, p_Cot, p_Cu, p_Moi, p_TT);
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE LOG_CHECKPOINT(p_Loai VARCHAR2, p_MoTa VARCHAR2) IS
    PRAGMA AUTONOMOUS_TRANSACTION;
    v_a NUMBER; v_c NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_a FROM UNDO_REDO_LOG WHERE TrangThai = 'ACTIVE';
    SELECT COUNT(*) INTO v_c FROM UNDO_REDO_LOG WHERE TrangThai = 'COMMITTED';
    INSERT INTO CHECKPOINT_LOG (LoaiCP, MoTa, SoTxnActive, SoTxnCommit) VALUES (p_Loai, p_MoTa, v_a, v_c);
    COMMIT;
END;
/

-- ============================================================
-- KICH BAN: DAT HANG THANH CONG (T1) + CRASH GIUA CHUNG (T2)
-- ============================================================

DECLARE
    v_masp   VARCHAR2(10);
    v_tensp  VARCHAR2(200);
    v_sl_cu  NUMBER;
    v_gia    NUMBER;
    v_madh   VARCHAR2(10);
BEGIN
    -- Tim san pham
    SELECT Masanpham, TenSP, SoLuong, Gia INTO v_masp, v_tensp, v_sl_cu, v_gia
    FROM (SELECT Masanpham, TenSP, SoLuong, Gia FROM SANPHAM WHERE SoLuong > 10 ORDER BY Masanpham)
    WHERE ROWNUM = 1;

    -- ====== CHECKPOINT TRUOC ======
    LOG_CHECKPOINT('FULL_CHECKPOINT', 'Truoc khi bat dau giao dich');

    DBMS_OUTPUT.PUT_LINE('========================================');
    DBMS_OUTPUT.PUT_LINE('  MO PHONG UNDO/REDO LOG - SNEAKERSHOP');
    DBMS_OUTPUT.PUT_LINE('========================================');
    DBMS_OUTPUT.PUT_LINE('San pham: ' || v_masp || ' | Ton kho: ' || v_sl_cu || ' | Gia: ' || v_gia);
    DBMS_OUTPUT.PUT_LINE('');

    -- ====== TRANSACTION T1: DAT HANG THANH CONG ======
    DBMS_OUTPUT.PUT_LINE('--- TRANSACTION T1: Dat hang thanh cong ---');
    v_madh := 'RV' || TO_CHAR(SYSTIMESTAMP, 'SSSSS');

    -- Ghi REDO + UNDO cho INSERT DONHANG
    LOG_ENTRY('REDO', 'DONHANG', v_madh, 'INSERT', 'NULL', v_madh);
    LOG_ENTRY('UNDO', 'DONHANG', v_madh, 'INSERT', v_madh, 'DELETE');
    DBMS_OUTPUT.PUT_LINE('  REDO: INSERT DONHANG ' || v_madh);
    DBMS_OUTPUT.PUT_LINE('  UNDO: Rollback -> DELETE DONHANG ' || v_madh);

    INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TrangThai)
    VALUES (v_madh, 'ND1001', 'Demo Recovery', '0900000000', 'Test Address', 'HCM', 'CHOXULY');

    -- Ghi REDO + UNDO cho UPDATE SANPHAM
    LOG_ENTRY('REDO', 'SANPHAM', v_masp, 'SoLuong', TO_CHAR(v_sl_cu), TO_CHAR(v_sl_cu - 1));
    LOG_ENTRY('UNDO', 'SANPHAM', v_masp, 'SoLuong', TO_CHAR(v_sl_cu), TO_CHAR(v_sl_cu - 1));
    DBMS_OUTPUT.PUT_LINE('  REDO: UPDATE ' || v_masp || '.SoLuong ' || v_sl_cu || ' -> ' || (v_sl_cu - 1));
    DBMS_OUTPUT.PUT_LINE('  UNDO: Rollback -> SET SoLuong = ' || v_sl_cu);

    -- COMMIT T1
    COMMIT;
    UPDATE UNDO_REDO_LOG SET TrangThai = 'COMMITTED' WHERE TrangThai = 'ACTIVE';
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('  => T1 COMMITTED thanh cong!');

    -- ====== CHECKPOINT GIUA ======
    LOG_CHECKPOINT('INCREMENTAL', 'Sau T1 commit, truoc T2');

    -- ====== TRANSACTION T2: BI CRASH GIUA CHUNG ======
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('--- TRANSACTION T2: Dat hang -> CRASH ---');
    LOG_ENTRY('REDO', 'SANPHAM', v_masp, 'SoLuong', TO_CHAR(v_sl_cu - 1), '0');
    LOG_ENTRY('UNDO', 'SANPHAM', v_masp, 'SoLuong', TO_CHAR(v_sl_cu - 1), '0');
    DBMS_OUTPUT.PUT_LINE('  REDO: UPDATE ' || v_masp || '.SoLuong ' || (v_sl_cu - 1) || ' -> 0');
    DBMS_OUTPUT.PUT_LINE('  UNDO: Rollback -> SET SoLuong = ' || (v_sl_cu - 1));
    DBMS_OUTPUT.PUT_LINE('  *** HE THONG CRASH! T2 CHUA COMMIT ***');

    -- ====== QUY TRINH RECOVERY ======
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('========================================');
    DBMS_OUTPUT.PUT_LINE('  QUY TRINH PHUC HOI (RECOVERY)');
    DBMS_OUTPUT.PUT_LINE('========================================');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Buoc 1 - ANALYSIS Phase:');
    DBMS_OUTPUT.PUT_LINE('  Doc Checkpoint cuoi cung');
    DBMS_OUTPUT.PUT_LINE('  T1: COMMITTED -> Can REDO');
    DBMS_OUTPUT.PUT_LINE('  T2: ACTIVE    -> Can UNDO');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Buoc 2 - REDO Phase (tu Checkpoint -> Crash):');
    DBMS_OUTPUT.PUT_LINE('  Ap dung lai TAT CA thay doi tu Redo Log');
    DBMS_OUTPUT.PUT_LINE('  (ca committed va uncommitted)');
    DBMS_OUTPUT.PUT_LINE('  -> Dam bao disk dong bo voi log');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Buoc 3 - UNDO Phase (hoan tac T2):');
    DBMS_OUTPUT.PUT_LINE('  Doc UNDO LOG cua T2');
    DBMS_OUTPUT.PUT_LINE('  Khoi phuc SoLuong = ' || (v_sl_cu - 1));
    DBMS_OUTPUT.PUT_LINE('  -> He thong nhat quan!');

    -- Danh dau T2 la ROLLED_BACK
    UPDATE UNDO_REDO_LOG SET TrangThai = 'ROLLED_BACK' WHERE TrangThai = 'ACTIVE';
    COMMIT;
    LOG_CHECKPOINT('RECOVERY', 'Phuc hoi hoan tat');

    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('+--------+-----------+------------------+');
    DBMS_OUTPUT.PUT_LINE('| Txn    | Trang Thai| Hanh Dong        |');
    DBMS_OUTPUT.PUT_LINE('+--------+-----------+------------------+');
    DBMS_OUTPUT.PUT_LINE('| T1     | COMMITTED | Giu nguyen (REDO)|');
    DBMS_OUTPUT.PUT_LINE('| T2     | ACTIVE    | Hoan tac (UNDO)  |');
    DBMS_OUTPUT.PUT_LINE('+--------+-----------+------------------+');

    -- Don dep
    DELETE FROM THONGBAO WHERE DBMS_LOB.SUBSTR(NoiDung, 100, 1) LIKE '%' || v_madh || '%';
    DELETE FROM DONHANG WHERE Madonhang = v_madh;
    COMMIT;
END;
/

-- ============================================================
-- PHAN 3.3: HIEN THI KET QUA LOG
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT PHAN 3.3: UNDO/REDO LOG CHI TIET
PROMPT ============================================================

COLUMN "Log" FORMAT A5
COLUMN "Bang" FORMAT A12
COLUMN "Ma" FORMAT A12
COLUMN "Cot" FORMAT A12
COLUMN "Gia Tri Cu" FORMAT A12
COLUMN "Gia Tri Moi" FORMAT A12
COLUMN "Trang Thai" FORMAT A12

SELECT LoaiLog "Log", BangBiAnh "Bang", MaBanGhi "Ma", CotThayDoi "Cot", GiaTriCu "Gia Tri Cu", GiaTriMoi "Gia Tri Moi", TrangThai "Trang Thai"
FROM UNDO_REDO_LOG ORDER BY LogID;

PROMPT
PROMPT --- Checkpoint Log ---

COLUMN "Loai" FORMAT A16
COLUMN "Mo Ta" FORMAT A40

SELECT LoaiCP "Loai", MoTa "Mo Ta", SoTxnActive "Active", SoTxnCommit "Commit" FROM CHECKPOINT_LOG ORDER BY CPID;

-- ============================================================
-- PHAN 3.4: ARIES RECOVERY ALGORITHM TIMELINE
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT PHAN 3.4: ARIES RECOVERY ALGORITHM
PROMPT ============================================================

BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('  Timeline he thong SneakerShop:');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('  T1 |---[INSERT DH]---[UPDATE SP]---[COMMIT]----|');
    DBMS_OUTPUT.PUT_LINE('  T2 |---[INSERT DH]---[UPDATE SP]---X CRASH     |');
    DBMS_OUTPUT.PUT_LINE('  CP |        ^CP1                     ^CP2      |');
    DBMS_OUTPUT.PUT_LINE('     |____________________________________________|');
    DBMS_OUTPUT.PUT_LINE('  Time --->                              ^CRASH   ');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('  ARIES 3 Phases:');
    DBMS_OUTPUT.PUT_LINE('  1. ANALYSIS: Doc CP2 -> T1=COMMITTED, T2=ACTIVE');
    DBMS_OUTPUT.PUT_LINE('  2. REDO:     Ap dung lai tat ca tu CP2 den crash');
    DBMS_OUTPUT.PUT_LINE('  3. UNDO:     Hoan tac T2 (doc UNDO LOG nguoc lai)');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('  Write-Ahead Logging (WAL) Rule:');
    DBMS_OUTPUT.PUT_LINE('  -> Phai ghi LOG TRUOC khi ghi data xuong disk');
    DBMS_OUTPUT.PUT_LINE('  -> Dam bao moi thay doi deu co the phuc hoi');
END;
/

-- Don dep
DROP TABLE UNDO_REDO_LOG PURGE;
DROP TABLE CHECKPOINT_LOG PURGE;
DROP PROCEDURE LOG_ENTRY;
DROP PROCEDURE LOG_CHECKPOINT;

PROMPT
PROMPT ============================================================
PROMPT HOAN THANH PHAN 3: UNDO/REDO LOG VA CHECKPOINT!
PROMPT ============================================================
