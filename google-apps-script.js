/**
 * GOOGLE APPS SCRIPT — KIKB Portal Ahli
 *
 * Cara deploy:
 * 1. Buka Google Sheet → Extensions → Apps Script
 * 2. Padam kod sedia ada, paste keseluruhan kod ini
 * 3. Klik Save (Ctrl+S)
 * 4. Klik Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy → salin URL
 * 6. Tambah URL sebagai VITE_APPS_SCRIPT_URL dalam GitHub Secrets
 *
 * NOTA DEBUG:
 * Jangan guna butang Debug pada doPost() terus — ia akan fail
 * sebab tiada HTTP request object. Guna testDoPost() untuk test.
 */

const SHEET_ID = '1ko4QUq4VvQ7_VKiHxva6LJDwwU3KIygDqfXMFqx6QpU';
const SHEET_NAME = 'DAFTAR_ANGGOTA_2026';
const IC_COL = 5; // Kolum F (0-indexed)

// ─── FUNCTION UNTUK TEST (pilih ini di dropdown sebelum Debug) ───────────────
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        noIC: '760720036039',
        alamat: 'No 12, Jalan Ceria 3, Taman Ceria',
        poskod: '25350',
        negeri: 'Pahang',
        emel: 'tasirihafizan@example.com',
        gelaran: 'En',
        bangsa: 'Melayu',
        akademik: 'Diploma',
        berminatALK: 'Ya',
        namaBank: 'Maybank',
        noAkaun: '1234567890',
        namaWaris: 'Aminah Binti Rahman',
        noICWaris: '781201056789',
        noTelWaris: '0123456789',
        hubunganWaris: 'Isteri',
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// ─── MAIN FUNCTION ────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    // Defensive check — elak crash masa Debug tanpa request
    if (!e || !e.postData || !e.postData.contents) {
      return response(false, 'Tiada data POST diterima');
    }

    const data = JSON.parse(e.postData.contents);

    if (!data.noIC) {
      return response(false, 'No IC diperlukan');
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();

    // Cari baris dengan IC yang sepadan (skip row pertama = header)
    let rowIndex = -1;
    const cleanIC = String(data.noIC).replace(/\D/g, '');
    for (let i = 1; i < values.length; i++) {
      const sheetIC = String(values[i][IC_COL]).replace(/\D/g, '');
      if (sheetIC === cleanIC) {
        rowIndex = i + 1; // 1-indexed untuk Sheets API
        break;
      }
    }

    if (rowIndex === -1) {
      return response(false, 'Rekod tidak dijumpai');
    }

    // Kemaskini medan (nombor kolum 1-indexed)
    const updates = {
      8:  data.alamat,        // H - Alamat
      9:  data.poskod,        // I - Poskod
      10: data.negeri,        // J - Negeri
      12: data.emel,          // L - Emel
      19: data.gelaran,       // S - Gelaran
      22: data.bangsa,        // V - Bangsa
      23: data.akademik,      // W - Akademik
      24: data.berminatALK,   // X - Berminat ALK
      25: data.namaBank,      // Y - Nama Bank
      26: data.noAkaun,       // Z - No Akaun
      27: data.namaWaris,     // AA - Nama Waris
      28: data.noICWaris,     // AB - No IC Waris
      29: data.noTelWaris,    // AC - No Tel Waris
      30: data.hubunganWaris  // AD - Hubungan Waris
    };

    for (const [col, val] of Object.entries(updates)) {
      if (val !== undefined && val !== null && val !== '') {
        sheet.getRange(rowIndex, Number(col)).setValue(val);
      }
    }

    // Tandakan rekod telah dikemaskini
    sheet.getRange(rowIndex, 36).setValue('DIKEMASKINI'); // AJ - Semakan

    return response(true, 'Maklumat berjaya dikemaskini');

  } catch (err) {
    return response(false, 'Ralat: ' + err.toString());
  }
}

function doGet(e) {
  return response(true, 'KIKB Apps Script aktif');
}

function response(success, message) {
  const output = ContentService.createTextOutput(
    JSON.stringify({ success, message })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
