SET DEFINE OFF;
SET SERVEROUTPUT ON SIZE UNLIMITED;
SET LINESIZE 200;
SET TIMING ON;
-- ============================================================
-- PHAN 4: DANH GIA HE THONG - RESPONSE TIME & THROUGHPUT
-- ============================================================

BEGIN EXECUTE IMMEDIATE 'DROP TABLE BENCHMARK_RESULTS PURGE'; EXCEPTION WHEN OTHERS THEN NULL; END;
/

CREATE TABLE BENCHMARK_RESULTS (
    TestID       NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    TenTest      VARCHAR2(200),
    LoaiTest     VARCHAR2(50),
    SoLanChay    NUMBER,
    TongThoiGian NUMBER,
    TBThoiGian   NUMBER,
    MinThoiGian  NUMBER,
    MaxThoiGian  NUMBER,
    Throughput   NUMBER,
    NgayTest     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

PROMPT ============================================================
PROMPT TEST 1: SELECT by Primary Key
PROMPT ============================================================

DECLARE
    v_start TIMESTAMP; v_end TIMESTAMP;
    v_total NUMBER := 0; v_min NUMBER := 999999; v_max NUMBER := 0; v_elapsed NUMBER;
    v_laps  NUMBER := 100;
    v_masp  VARCHAR2(10);
    v_ten   VARCHAR2(200); v_gia NUMBER;
BEGIN
    SELECT Masanpham INTO v_masp FROM (SELECT Masanpham FROM SANPHAM ORDER BY Masanpham) WHERE ROWNUM = 1;

    FOR i IN 1..v_laps LOOP
        v_start := SYSTIMESTAMP;
        SELECT TenSP, Gia INTO v_ten, v_gia FROM SANPHAM WHERE Masanpham = v_masp;
        v_end := SYSTIMESTAMP;
        v_elapsed := EXTRACT(SECOND FROM (v_end - v_start)) * 1000;
        v_total := v_total + v_elapsed;
        IF v_elapsed < v_min THEN v_min := v_elapsed; END IF;
        IF v_elapsed > v_max THEN v_max := v_elapsed; END IF;
    END LOOP;

    INSERT INTO BENCHMARK_RESULTS (TenTest, LoaiTest, SoLanChay, TongThoiGian, TBThoiGian, MinThoiGian, MaxThoiGian, Throughput)
    VALUES ('SELECT by PK (' || v_masp || ')', 'READ', v_laps, v_total, v_total/v_laps, v_min, v_max,
            CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END);
    COMMIT;

    DBMS_OUTPUT.PUT_LINE('=== SELECT by PK (' || v_masp || ') x' || v_laps || ' ===');
    DBMS_OUTPUT.PUT_LINE('Trung binh: ' || ROUND(v_total/v_laps, 3) || ' ms | Min: ' || ROUND(v_min, 3) || ' ms | Max: ' || ROUND(v_max, 3) || ' ms');
    DBMS_OUTPUT.PUT_LINE('Throughput: ' || CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END || ' ops/sec');
END;
/

PROMPT
PROMPT ============================================================
PROMPT TEST 2: SELECT voi JOIN (SP + TH + DM)
PROMPT ============================================================

DECLARE
    v_start TIMESTAMP; v_end TIMESTAMP;
    v_total NUMBER := 0; v_min NUMBER := 999999; v_max NUMBER := 0; v_elapsed NUMBER;
    v_laps  NUMBER := 100;
    v_count NUMBER;
BEGIN
    FOR i IN 1..v_laps LOOP
        v_start := SYSTIMESTAMP;
        SELECT COUNT(*) INTO v_count
        FROM SANPHAM sp
        JOIN THUONGHIEU th ON sp.Mathuonghieu = th.Mathuonghieu
        JOIN DANHMUC dm ON sp.Madanhmuc = dm.Madanhmuc
        WHERE sp.TrangThai = 'CONHANG';
        v_end := SYSTIMESTAMP;
        v_elapsed := EXTRACT(SECOND FROM (v_end - v_start)) * 1000;
        v_total := v_total + v_elapsed;
        IF v_elapsed < v_min THEN v_min := v_elapsed; END IF;
        IF v_elapsed > v_max THEN v_max := v_elapsed; END IF;
    END LOOP;

    INSERT INTO BENCHMARK_RESULTS (TenTest, LoaiTest, SoLanChay, TongThoiGian, TBThoiGian, MinThoiGian, MaxThoiGian, Throughput)
    VALUES ('SELECT JOIN (SP+TH+DM)', 'READ_JOIN', v_laps, v_total, v_total/v_laps, v_min, v_max,
            CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END);
    COMMIT;

    DBMS_OUTPUT.PUT_LINE('=== SELECT JOIN x' || v_laps || ' (' || v_count || ' san pham) ===');
    DBMS_OUTPUT.PUT_LINE('Trung binh: ' || ROUND(v_total/v_laps, 3) || ' ms | Min: ' || ROUND(v_min, 3) || ' ms | Max: ' || ROUND(v_max, 3) || ' ms');
    DBMS_OUTPUT.PUT_LINE('Throughput: ' || CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END || ' ops/sec');
END;
/

PROMPT
PROMPT ============================================================
PROMPT TEST 3: INSERT Don Hang (co Trigger)
PROMPT ============================================================

DECLARE
    v_start TIMESTAMP; v_end TIMESTAMP;
    v_total NUMBER := 0; v_min NUMBER := 999999; v_max NUMBER := 0; v_elapsed NUMBER;
    v_laps  NUMBER := 50;
    v_masp  VARCHAR2(10);
    v_madh  VARCHAR2(10);
    v_mact  VARCHAR2(10);
    v_gia   NUMBER;
    v_sl_old NUMBER;
BEGIN
    SELECT Masanpham, Gia, SoLuong INTO v_masp, v_gia, v_sl_old
    FROM (SELECT Masanpham, Gia, SoLuong FROM SANPHAM WHERE SoLuong > 100 ORDER BY Masanpham)
    WHERE ROWNUM = 1;

    -- Dam bao ton kho du
    UPDATE SANPHAM SET SoLuong = 5000 WHERE Masanpham = v_masp;
    COMMIT;

    FOR i IN 1..v_laps LOOP
        v_start := SYSTIMESTAMP;
        v_madh := 'BM' || LPAD(SEQ_DONHANG.NEXTVAL, 5, '0');
        INSERT INTO DONHANG (Madonhang, Manguoidung, TenNguoiNhan, SdtNguoiNhan, DiaChiGiao, ThanhPho, TrangThai)
        VALUES (v_madh, 'ND1001', 'Bench', '0900000000', 'Addr', 'HCM', 'CHOXULY');
        v_mact := 'BT' || LPAD(SEQ_CHITIET.NEXTVAL, 5, '0');
        INSERT INTO CHITIETDONHANG (Machitiet, Madonhang, Masanpham, KichCo, SoLuong, DonGia)
        VALUES (v_mact, v_madh, v_masp, 'US 9', 1, v_gia);
        COMMIT;
        v_end := SYSTIMESTAMP;
        v_elapsed := EXTRACT(SECOND FROM (v_end - v_start)) * 1000;
        v_total := v_total + v_elapsed;
        IF v_elapsed < v_min THEN v_min := v_elapsed; END IF;
        IF v_elapsed > v_max THEN v_max := v_elapsed; END IF;
    END LOOP;

    INSERT INTO BENCHMARK_RESULTS (TenTest, LoaiTest, SoLanChay, TongThoiGian, TBThoiGian, MinThoiGian, MaxThoiGian, Throughput)
    VALUES ('INSERT DonHang (Trigger)', 'WRITE_TXN', v_laps, v_total, v_total/v_laps, v_min, v_max,
            CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END);
    COMMIT;

    DBMS_OUTPUT.PUT_LINE('=== INSERT DonHang x' || v_laps || ' ===');
    DBMS_OUTPUT.PUT_LINE('Trung binh: ' || ROUND(v_total/v_laps, 3) || ' ms | Min: ' || ROUND(v_min, 3) || ' ms | Max: ' || ROUND(v_max, 3) || ' ms');
    DBMS_OUTPUT.PUT_LINE('Throughput: ' || CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END || ' ops/sec');

    -- Don dep
    DELETE FROM CHITIETDONHANG WHERE Madonhang LIKE 'BM%';
    DELETE FROM THONGBAO WHERE DBMS_LOB.SUBSTR(NoiDung, 100, 1) LIKE '%BM%';
    DELETE FROM DONHANG WHERE Madonhang LIKE 'BM%';
    UPDATE SANPHAM SET SoLuong = v_sl_old WHERE Masanpham = v_masp;
    COMMIT;
END;
/

PROMPT
PROMPT ============================================================
PROMPT TEST 4: SEARCH LIKE (Full Table Scan)
PROMPT ============================================================

DECLARE
    v_start TIMESTAMP; v_end TIMESTAMP;
    v_total NUMBER := 0; v_min NUMBER := 999999; v_max NUMBER := 0; v_elapsed NUMBER;
    v_laps  NUMBER := 100;
    v_count NUMBER;
BEGIN
    FOR i IN 1..v_laps LOOP
        v_start := SYSTIMESTAMP;
        SELECT COUNT(*) INTO v_count FROM SANPHAM WHERE UPPER(TenSP) LIKE '%NIKE%' AND TrangThai = 'CONHANG';
        v_end := SYSTIMESTAMP;
        v_elapsed := EXTRACT(SECOND FROM (v_end - v_start)) * 1000;
        v_total := v_total + v_elapsed;
        IF v_elapsed < v_min THEN v_min := v_elapsed; END IF;
        IF v_elapsed > v_max THEN v_max := v_elapsed; END IF;
    END LOOP;

    INSERT INTO BENCHMARK_RESULTS (TenTest, LoaiTest, SoLanChay, TongThoiGian, TBThoiGian, MinThoiGian, MaxThoiGian, Throughput)
    VALUES ('SEARCH LIKE %NIKE%', 'SEARCH', v_laps, v_total, v_total/v_laps, v_min, v_max,
            CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END);
    COMMIT;

    DBMS_OUTPUT.PUT_LINE('=== SEARCH LIKE %NIKE% x' || v_laps || ' (' || v_count || ' ket qua) ===');
    DBMS_OUTPUT.PUT_LINE('Trung binh: ' || ROUND(v_total/v_laps, 3) || ' ms | Min: ' || ROUND(v_min, 3) || ' ms | Max: ' || ROUND(v_max, 3) || ' ms');
    DBMS_OUTPUT.PUT_LINE('Throughput: ' || CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END || ' ops/sec');
END;
/

PROMPT
PROMPT ============================================================
PROMPT TEST 5: BAO CAO DOANH THU (Aggregation)
PROMPT ============================================================

DECLARE
    v_start TIMESTAMP; v_end TIMESTAMP;
    v_total NUMBER := 0; v_min NUMBER := 999999; v_max NUMBER := 0; v_elapsed NUMBER;
    v_laps  NUMBER := 50;
    v_dt    NUMBER; v_sodon NUMBER;
BEGIN
    FOR i IN 1..v_laps LOOP
        v_start := SYSTIMESTAMP;
        SELECT NVL(SUM(TongCong), 0), COUNT(*) INTO v_dt, v_sodon
        FROM DONHANG WHERE TrangThai != 'DAHUY' AND NgayDat >= ADD_MONTHS(SYSDATE, -12);
        v_end := SYSTIMESTAMP;
        v_elapsed := EXTRACT(SECOND FROM (v_end - v_start)) * 1000;
        v_total := v_total + v_elapsed;
        IF v_elapsed < v_min THEN v_min := v_elapsed; END IF;
        IF v_elapsed > v_max THEN v_max := v_elapsed; END IF;
    END LOOP;

    INSERT INTO BENCHMARK_RESULTS (TenTest, LoaiTest, SoLanChay, TongThoiGian, TBThoiGian, MinThoiGian, MaxThoiGian, Throughput)
    VALUES ('BAO CAO DOANH THU', 'AGGREGATION', v_laps, v_total, v_total/v_laps, v_min, v_max,
            CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END);
    COMMIT;

    DBMS_OUTPUT.PUT_LINE('=== BAO CAO DOANH THU x' || v_laps || ' ===');
    DBMS_OUTPUT.PUT_LINE('Doanh thu: ' || v_dt || ' | So don: ' || v_sodon);
    DBMS_OUTPUT.PUT_LINE('Trung binh: ' || ROUND(v_total/v_laps, 3) || ' ms | Min: ' || ROUND(v_min, 3) || ' ms | Max: ' || ROUND(v_max, 3) || ' ms');
    DBMS_OUTPUT.PUT_LINE('Throughput: ' || CASE WHEN v_total > 0 THEN ROUND(v_laps / (v_total/1000), 2) ELSE 0 END || ' ops/sec');
END;
/

-- ============================================================
-- TONG HOP KET QUA
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT TONG HOP KET QUA BENCHMARK
PROMPT ============================================================

COLUMN "Test" FORMAT A30
COLUMN "Type" FORMAT A12
COLUMN "Runs" FORMAT 999
COLUMN "Avg(ms)" FORMAT 999.999
COLUMN "Min(ms)" FORMAT 999.999
COLUMN "Max(ms)" FORMAT 999.999
COLUMN "Ops/Sec" FORMAT 99999.99

SELECT TenTest "Test", LoaiTest "Type", SoLanChay "Runs",
       ROUND(TBThoiGian, 3) "Avg(ms)", ROUND(MinThoiGian, 3) "Min(ms)",
       ROUND(MaxThoiGian, 3) "Max(ms)", Throughput "Ops/Sec"
FROM BENCHMARK_RESULTS ORDER BY TestID;

-- ============================================================
-- DANH GIA TONG THE
-- ============================================================

PROMPT
PROMPT ============================================================
PROMPT DANH GIA TONG THE HE THONG
PROMPT ============================================================

DECLARE
    v_avg_read   NUMBER;
    v_avg_write  NUMBER;
    v_avg_search NUMBER;
    v_avg_agg    NUMBER;
BEGIN
    SELECT NVL(AVG(TBThoiGian),0) INTO v_avg_read FROM BENCHMARK_RESULTS WHERE LoaiTest IN ('READ','READ_JOIN');
    SELECT NVL(AVG(TBThoiGian),0) INTO v_avg_write FROM BENCHMARK_RESULTS WHERE LoaiTest = 'WRITE_TXN';
    SELECT NVL(AVG(TBThoiGian),0) INTO v_avg_search FROM BENCHMARK_RESULTS WHERE LoaiTest = 'SEARCH';
    SELECT NVL(AVG(TBThoiGian),0) INTO v_avg_agg FROM BENCHMARK_RESULTS WHERE LoaiTest = 'AGGREGATION';

    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('+----------------------------+------------+----------+');
    DBMS_OUTPUT.PUT_LINE('| Nhom thao tac              | TB (ms)    | Danh gia |');
    DBMS_OUTPUT.PUT_LINE('+----------------------------+------------+----------+');
    DBMS_OUTPUT.PUT_LINE('| READ (SELECT + JOIN)       | ' || LPAD(ROUND(v_avg_read,3),8) || '   | '
        || CASE WHEN v_avg_read < 1 THEN 'XUAT SAC' WHEN v_avg_read < 10 THEN 'TOT     ' ELSE 'CAN TOI' END || '  |');
    DBMS_OUTPUT.PUT_LINE('| WRITE (INSERT + Triggers)  | ' || LPAD(ROUND(v_avg_write,3),8) || '   | '
        || CASE WHEN v_avg_write < 10 THEN 'XUAT SAC' WHEN v_avg_write < 50 THEN 'TOT     ' ELSE 'CAN TOI' END || '  |');
    DBMS_OUTPUT.PUT_LINE('| SEARCH (LIKE full-scan)    | ' || LPAD(ROUND(v_avg_search,3),8) || '   | '
        || CASE WHEN v_avg_search < 5 THEN 'XUAT SAC' WHEN v_avg_search < 20 THEN 'TOT     ' ELSE 'CAN TOI' END || '  |');
    DBMS_OUTPUT.PUT_LINE('| AGGREGATION (SUM/COUNT)    | ' || LPAD(ROUND(v_avg_agg,3),8) || '   | '
        || CASE WHEN v_avg_agg < 5 THEN 'XUAT SAC' WHEN v_avg_agg < 20 THEN 'TOT     ' ELSE 'CAN TOI' END || '  |');
    DBMS_OUTPUT.PUT_LINE('+----------------------------+------------+----------+');
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Tieu chi: Response Time < 100ms la tot cho Web App');
    DBMS_OUTPUT.PUT_LINE('          Throughput > 100 ops/sec la tot cho OLTP');
END;
/

DROP TABLE BENCHMARK_RESULTS PURGE;

PROMPT
PROMPT ============================================================
PROMPT HOAN THANH PHAN 4: BENCHMARK RESPONSE TIME & THROUGHPUT!
PROMPT ============================================================

SET TIMING OFF;
