/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - POLYTRON EV SERVICE CENTER DATABASE
 * Spreadsheet ID: 1JmAKxJEG2TGkx2P9piXMijwhwyYbX16aVoYn4rsDcww
 * =========================================================================
 * 
 * PENTING: MENGATASI ERROR 403 (FORBIDDEN)
 * Jika saat simpan/tarik data muncul error 403:
 * 1. Di Google Apps Script, klik tombol biru "Terapkan" (Deploy) > "Kelola Deployment" (Manage deployments).
 * 2. Klik ikon Pensil (Edit) di sebelah kanan.
 * 3. Pada "Versi" (Version): Pilih "Versi Baru" (New version).
 * 4. Pada "Siapa yang memiliki akses" (Who has access):
 *    -> WAJIB PILIH: "Siapa saja" (Anyone) !! Jangan pilih "Hanya saya" atau organisasi.
 * 5. Klik "Terapkan" (Deploy).
 * 6. URL Web App Aktif (Paten):
 *    https://script.google.com/macros/s/AKfycbwkCZc3iMXLQ1957geQ-Ob4EV-wlbc5NNllPLnOInTh7wWNr8G9U4Kk-IhxSzNem4pr/exec
 * 
 * CARA SETUP PERTAMA KALI:
 * 1. Buka spreadsheet: https://docs.google.com/spreadsheets/d/1JmAKxJEG2TGkx2P9piXMijwhwyYbX16aVoYn4rsDcww/edit?gid=1701714762#gid=1701714762
 * 2. Masuk Ekstensi > Apps Script.
 * 3. Paste seluruh kode ini.
 * 4. Pilih fungsi "initDatabase", klik "Jalankan" (Run).
 * 5. Klik "Deploy" > "New deployment" > jenis "Web app" > "Who has access: Anyone" > Deploy!
 */

// 1. FUNGSI SETUP OTOMATIS (JALANKAN SEKALI DENGAN KLIK 'RUN')
function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // A. SETUP SHEET MASTER KERUSAKAN & LEVEL
  let sheetMaster = ss.getSheetByName('Master_Kerusakan');
  if (!sheetMaster) {
    sheetMaster = ss.insertSheet('Master_Kerusakan');
  } else {
    sheetMaster.clear();
  }

  const masterHeaders = ['ID', 'Kategori', 'Level', 'Estimasi (Jam)', 'Keluhan & Kerusakan Motor EV', 'Rekomendasi Stall', 'Detail Pekerjaan'];
  const masterData = [
    // LEVEL 1 (1 Jam)
    ['KEL-001', 'Reguler', 'Level 1', 1, 'Servis Berkala 1.000 KM (Pengecekan Standar)', 'Stall EV 1 / 2', 'Cek tekanan ban, baut bodi, sistem rem, & pelumasan'],
    ['KEL-002', 'Reguler', 'Level 1', 1, 'Servis Berkala 5.000 KM (Pengecekan Rutin)', 'Stall EV 1 / 2', 'Pemeriksaan voltase baterai, throttle switch & kelistrikan'],
    ['KEL-003', 'Reguler', 'Level 1', 1, 'Penggantian Kampas Rem Depan / Belakang', 'Stall EV 1 / 2', 'Bongkar pasang pad rem & cek piringan cakram disc'],
    ['KEL-004', 'Reguler', 'Level 1', 1, 'Pengurasan & Bleeding Minyak Rem', 'Stall EV 1 / 2', 'Ganti minyak rem DOT4 baru & pembersihan kaliper'],
    ['KEL-005', 'Reguler', 'Level 1', 1, 'Kalibrasi Throttle Gas & Switch Cut-off Rem', 'Stall EV 1 / 2', 'Setting respon putaran gas & kalibrasi sensor rem'],
    ['KEL-006', 'Reguler', 'Level 1', 1, 'Pengecekan Kelistrikan Lampu, Klakson & Sein', 'Stall EV 1 / 2', 'Pemeriksaan jalur kabel ringan & ganti soket'],
    ['KEL-007', 'Reguler', 'Level 1', 1, 'Pengecekan & Setting Balancing Roda / Velg', 'Stall EV 1 / 2', 'Cek laher roda (bearing) & balancing putaran'],

    // LEVEL 2 (2 Jam)
    ['KEL-008', 'Reguler', 'Level 2', 2, 'Update Firmware ECU & Kalibrasi Speedometer', 'Stall EV 1 / 2', 'Flashing software ECU terbaru & kalibrasi display digital'],
    ['KEL-009', 'Reguler', 'Level 2', 2, 'Diagnostik Gangguan Controller / Inverter Motor', 'Stall EV 1 / 2', 'Pembacaan trouble code, cek MOSFET & arus daya'],
    ['KEL-010', 'Reguler', 'Level 2', 2, 'Penggantian Ban Tubeless Depan / Belakang', 'Stall EV 1 / 2', 'Pelepasan velg dinamo hub motor & pasang ban baru'],
    ['KEL-011', 'Reguler', 'Level 2', 2, 'Servis Suspensi Depan / Ganti Seal & Oli Shock', 'Stall EV 1 / 2', 'Overhaul peredam kejut depan & ganti pelumas shock'],
    ['KEL-012', 'Reguler', 'Level 2', 2, 'Penggantian Belt Drive / Rantai Transfer Tenaga', 'Stall EV 1 / 2', 'Penyetelan tegangan sabuk belt motor & pulley'],
    ['KEL-013', 'Reguler', 'Level 2', 2, 'Perbaikan Wiring Harness / Kabel Bodi Utama', 'Stall EV 1 / 2', 'Pengurutan kabel bodi utama & proteksi anti air'],

    // LEVEL 3 (3 Jam)
    ['KEL-014', 'Reguler', 'Level 3', 3, 'Diagnostik Mendalam BMS (Battery Management System)', 'Stall EV 1 / 2', 'Cek cell imbalance, internal resistance & modul proteksi'],
    ['KEL-015', 'Reguler', 'Level 3', 3, 'Penurunan & Penggantian Paket Baterai Utama (Battery Pack)', 'Stall EV 1 / 2', 'Pembongkaran bodi total, angkat baterai pack & kalibrasi'],
    ['KEL-016', 'Reguler', 'Level 3', 3, 'Overhaul Hub Motor / Dinamo Penggerak Roda Belakang', 'Stall EV 1 / 2', 'Bongkar dinamo BLDC, ganti seal & bearing dinamo'],
    ['KEL-017', 'Reguler', 'Level 3', 3, 'Penggantian Total Motor Control Unit (MCU)', 'Stall EV 1 / 2', 'Instalasi MCU unit baru & adaptasi parameter motor'],
    ['KEL-018', 'Reguler', 'Level 3', 3, 'Perbaikan Total Short Circuit & Sistem Proteksi', 'Stall EV 1 / 2', 'Penelusuran korsleting kelistrikan tegangan tinggi'],
    ['KEL-019', 'Reguler', 'Level 3', 3, 'Penggantian Komstir & Press Segitiga Rangka Depan', 'Stall EV 1 / 2', 'Pembongkaran sistem stang kemudi & setting preload komstir'],

    // EXPRESS BAY (< 30 Menit)
    ['KEL-020', 'Express', 'Express', 0.5, 'Fast Check: Cek Tekanan Angin & Tambal Tubeless', 'Express Bay', 'Pengisian angin nitrogen & perbaikan paku tubeless'],
    ['KEL-021', 'Express', 'Express', 0.5, 'Kencangkan Baut Bodi Kendur & Setel Spion', 'Express Bay', 'Pengecekan torsi baut bodi & penyetelan posisi spion'],
    ['KEL-022', 'Express', 'Express', 0.5, 'Penggantian Sekring Fuse / Bohlam Cepat', 'Express Bay', 'Penggantian part kelistrikan ringan plug & play'],
    ['KEL-023', 'Express', 'Express', 0.5, 'Pelumasan Standar Samping & Engsel Bodi', 'Express Bay', 'Penyemprotan pelumas silikon/grease pada engsel']
  ];

  sheetMaster.getRange(1, 1, 1, masterHeaders.length).setValues([masterHeaders])
    .setBackground('#dc2626').setFontColor('#ffffff').setFontWeight('bold');
  sheetMaster.getRange(2, 1, masterData.length, masterHeaders.length).setValues(masterData);
  sheetMaster.setFrozenRows(1);
  sheetMaster.autoResizeColumns(1, masterHeaders.length);

  // B. SETUP SHEET BOOKINGS (TRANSAKSI ANTRIN REAL-TIME)
  let sheetBookings = ss.getSheetByName('Bookings');
  if (!sheetBookings) {
    sheetBookings = ss.insertSheet('Bookings');
  }

  const bookingHeaders = ['Timestamp', 'BookingID', 'NoAntrian', 'SiteID', 'Tanggal', 'JamSlot', 'Stall', 'Level', 'Keluhan', 'ModelMotor', 'PlatNomor', 'NamaPelanggan', 'NoWhatsApp', 'StatusServis'];
  if (sheetBookings.getLastRow() === 0) {
    sheetBookings.getRange(1, 1, 1, bookingHeaders.length).setValues([bookingHeaders])
      .setBackground('#1e293b').setFontColor('#ffffff').setFontWeight('bold');
    sheetBookings.setFrozenRows(1);
    sheetBookings.autoResizeColumns(1, bookingHeaders.length);
  }

  // C. SETUP SHEET MASTER SITES
  let sheetSites = ss.getSheetByName('Master_Sites');
  if (!sheetSites) {
    sheetSites = ss.insertSheet('Master_Sites');
  } else {
    sheetSites.clear();
  }
  const siteHeaders = ['SiteID', 'NamaCabang', 'Kota', 'Alamat', 'Telepon'];
  const siteData = [
    ['tasikmalaya', 'Polytron SC Tasikmalaya', 'Tasikmalaya', 'Jl. KHZ. Mustofa No. 280', '(0265) 332840'],
    ['bandung', 'Polytron SC Bandung', 'Bandung', 'Jl. Soekarno Hatta No. 438', '(022) 5201415'],
    ['cirebon', 'Polytron SC Cirebon', 'Cirebon', 'Jl. Brigjen Dharsono No. 12', '(0231) 246810'],
    ['jakarta-barat', 'Polytron SC Jakarta Barat', 'Jakarta Barat', 'Jl. Daan Mogot KM 11 No. 8', '(021) 5439876'],
    ['semarang', 'Polytron SC Semarang', 'Semarang', 'Jl. MT Haryono No. 712', '(024) 8412345'],
    ['kudus', 'Polytron SC Kudus (Pusat EV)', 'Kudus', 'Jl. AKBP R. Agil Kusumadya', '(0291) 431234'],
    ['surabaya', 'Polytron SC Surabaya', 'Surabaya', 'Jl. Rungkut Industri IV No. 5', '(031) 8439000']
  ];
  sheetSites.getRange(1, 1, 1, siteHeaders.length).setValues([siteHeaders])
    .setBackground('#0f172a').setFontColor('#ffffff').setFontWeight('bold');
  sheetSites.getRange(2, 1, siteData.length, siteHeaders.length).setValues(siteData);
  sheetSites.setFrozenRows(1);
  sheetSites.autoResizeColumns(1, siteHeaders.length);

  Logger.log('✅ DATABASE POLYTRON BERHASIL DIBUAT DENGAN LENGKAP!');
}

// FUNGSI MENGISI 4 DATA SAMPLE ANTRIN (JALANKAN DARI RUN ATAU WEB APP)
function seedSampleBookings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetBookings = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');
  
  // Pastikan header ada di baris 1
  const bookingHeaders = ['Timestamp', 'BookingID', 'NoAntrian', 'SiteID', 'Tanggal', 'JamSlot', 'Stall', 'Level', 'Keluhan', 'ModelMotor', 'PlatNomor', 'NamaPelanggan', 'NoWhatsApp', 'StatusServis'];
  if (sheetBookings.getLastRow() === 0) {
    sheetBookings.getRange(1, 1, 1, bookingHeaders.length).setValues([bookingHeaders])
      .setBackground('#1e293b').setFontColor('#ffffff').setFontWeight('bold');
    sheetBookings.setFrozenRows(1);
  }

  const todayStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd');
  const now = new Date();

  const samples = [
    [now, 'PLY-TSM-' + todayStr.replace(/-/g, '') + '-01', 'REG-01', 'tasikmalaya', todayStr, '08.30', 'stall1', 'Level 1', 'Servis Berkala 1.000 KM (Pengecekan Standar)', 'Polytron Fox-R', 'Z 1482 ABZ', 'Ahmad Faisal', '081234567890', 'Checked In'],
    [now, 'PLY-TSM-' + todayStr.replace(/-/g, '') + '-02', 'REG-02', 'tasikmalaya', todayStr, '09.30', 'stall1', 'Level 2', 'Update Firmware ECU & Kalibrasi Speedometer', 'Polytron Fox-R', 'Z 5678 CD', 'Siti Rahmawati', '082198765432', 'In Progress'],
    [now, 'PLY-TSM-' + todayStr.replace(/-/g, '') + '-03', 'REG-03', 'tasikmalaya', todayStr, '10.30', 'stall2', 'Level 1', 'Penggantian Kampas Rem Depan / Belakang', 'Polytron Fox-S', 'Z 9012 EF', 'Bambang Kusuma', '085712349988', 'Booked'],
    [now, 'PLY-TSM-' + todayStr.replace(/-/g, '') + '-04', 'EXP-01', 'tasikmalaya', todayStr, '0', 'express', 'Express', 'Fast Check: Cek Tekanan Angin & Tambal Tubeless', 'Polytron Fox-S', 'Z 4321 PLY', 'Rian Pratama', '089677889900', 'Done']
  ];

  samples.forEach(function(row) {
    sheetBookings.appendRow(row);
  });

  sheetBookings.autoResizeColumns(1, bookingHeaders.length);
  Logger.log('✅ Berhasil memasukkan 4 sample bookings ke Google Sheet!');
  return { status: 'success', count: samples.length };
}

// Helper output JSON / JSONP (Anti-CORS untuk mode file:// maupun web)
function createOutput(data, callback) {
  const jsonStr = JSON.stringify(data);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + jsonStr + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(jsonStr)
    .setMimeType(ContentService.MimeType.JSON);
}

// 2. ENDPOINT API: MEMBACA DATA & MENDUKUNG GET WRITE FALLBACK (GET)
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetBookings = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');
  const cb = e && e.parameter ? e.parameter.callback : null;

  // SUPPORT GET ACTION: ADD BOOKING ATAU UPDATE STATUS VIA GET (BYPASS CORS)
  if (e && e.parameter && e.parameter.action) {
    if (e.parameter.action === 'seedSample') {
      const res = seedSampleBookings();
      return createOutput(res, cb);
    }

    if (e.parameter.action === 'addBooking' && e.parameter.data) {
      try {
        const b = JSON.parse(e.parameter.data);
        sheetBookings.appendRow([
          new Date(),
          b.id,
          b.queueNumber,
          b.siteId,
          b.date,
          b.slot,
          b.stall,
          b.level || 'Level 1',
          b.complaint || b.notes || '',
          b.model,
          b.plate,
          b.name,
          b.phone,
          b.status || 'Booked'
        ]);
        return createOutput({ status: 'success', message: 'Booking tersimpan ke Google Sheet via GET' }, cb);
      } catch (err) {
        return createOutput({ status: 'error', message: err.toString() }, cb);
      }
    }

    if (e.parameter.action === 'updateStatus' && e.parameter.bookingId) {
      const values = sheetBookings.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === e.parameter.bookingId) {
          sheetBookings.getRange(i + 1, 14).setValue(e.parameter.newStatus);
          return createOutput({ status: 'success', message: 'Status diupdate di Google Sheet via GET' }, cb);
        }
      }
      return createOutput({ status: 'not_found', message: 'Booking ID tidak ditemukan' }, cb);
    }
  }

  // DEFAULT GET: BACA MASTER KERUSAKAN & BACA DATA BOOKINGS
  const sheetMaster = ss.getSheetByName('Master_Kerusakan');
  const masterValues = sheetMaster ? sheetMaster.getDataRange().getValues() : [];
  const masterData = [];
  for (let i = 1; i < masterValues.length; i++) {
    const row = masterValues[i];
    masterData.push({
      id: row[0],
      category: row[1],
      level: row[2],
      hours: row[3],
      name: row[4],
      stall: row[5],
      desc: row[6]
    });
  }

  const bookingValues = sheetBookings ? sheetBookings.getDataRange().getValues() : [];
  const bookingsData = [];
  for (let i = 1; i < bookingValues.length; i++) {
    const row = bookingValues[i];
    const bId = row[1];
    if (!bId || bId === 'BookingID') continue;
    let dStr = row[4];
    if (row[4] instanceof Date) {
      dStr = Utilities.formatDate(row[4], 'Asia/Jakarta', 'yyyy-MM-dd');
    }
    bookingsData.push({
      id: bId,
      queueNumber: row[2] || 'REG-01',
      siteId: row[3] || 'tasikmalaya',
      date: String(dStr),
      slot: String(row[5]),
      stall: row[6] || 'stall1',
      level: row[7] || 'Level 1',
      complaint: row[8] || '',
      notes: row[8] || '',
      model: row[9] || 'Polytron Fox-R',
      plate: row[10] || '',
      name: row[11] || '',
      phone: row[12] || '',
      status: row[13] || 'Booked'
    });
  }

  const response = {
    status: 'success',
    master_kerusakan: masterData,
    bookings: bookingsData
  };

  return createOutput(response, cb);
}

// 3. ENDPOINT API: MENYIMPAN BOOKING & UPDATE STATUS (POST)
function doPost(e) {
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
      if (typeof data.booking === 'string') {
        data.booking = JSON.parse(data.booking);
      }
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetBookings = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');

    if (data.action === 'seedSample') {
      const res = seedSampleBookings();
      return ContentService.createTextOutput(JSON.stringify(res))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === 'addBooking') {
      const b = data.booking;
      sheetBookings.appendRow([
        new Date(),
        b.id,
        b.queueNumber,
        b.siteId,
        b.date,
        b.slot,
        b.stall,
        b.level || 'Level 1',
        b.complaint || b.notes || '',
        b.model,
        b.plate,
        b.name,
        b.phone,
        b.status || 'Booked'
      ]);
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Booking tersimpan ke Google Sheet' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.action === 'updateStatus') {
      const values = sheetBookings.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === data.bookingId) {
          sheetBookings.getRange(i + 1, 14).setValue(data.newStatus);
          return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Status berhasil diupdate di Google Sheet' }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: 'not_found', message: 'Booking ID tidak ditemukan' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Action tidak dikenal' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
