/**
 * GOOGLE APPS SCRIPT — KIKB Portal Ahli
 *
 * Cara deploy:
 * 1. Buka Google Sheet anda
 * 2. Extensions → Apps Script
 * 3. Padam kod sedia ada, paste keseluruhan kod ini
 * 4. Klik Save (Ctrl+S)
 * 5. Klik Deploy → New deployment
 * 6. Type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Klik Deploy → salin URL yang diberi
 * 10. Tambah URL tu sebagai VITE_APPS_SCRIPT_URL dalam GitHub Secrets
 */

const SHEET_ID = '1ko4QUq4VvQ7_VKiHxva6LJDwwU3KIygDqfXMFqx6QpU';
const SHEET_NAME = 'DAFTAR_ANGGOTA_2026';
const IC_COL = 5; // Kolum F (0-indexed)

function doPost(e) {
  try {
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

    // Kemaskini medan (kolum mengikut struktur DAFTAR_ANGGOTA_2026)
    const updates = {
      8:  data.alamat,       // H - Alamat
      9:  data.poskod,       // I - Poskod
      10: data.negeri,       // J - Negeri
      12: data.emel,         // L - Emel
      19: data.gelaran,      // S - Gelaran
      22: data.bangsa,       // V - Bangsa
      23: data.akademik,     // W - Akademik
      24: data.berminatALK,  // X - Berminat ALK
      25: data.namaBank,     // Y - Nama Bank
      26: data.noAkaun,      // Z - No Akaun
      27: data.namaWaris,    // AA - Nama Waris
      28: data.noICWaris,    // AB - No IC Waris
      29: data.noTelWaris,   // AC - No Tel Waris
      30: data.hubunganWaris // AD - Hubungan Waris
    };

    for (const [col, val] of Object.entries(updates)) {
      if (val !== undefined && val !== null) {
        sheet.getRange(rowIndex, Number(col)).setValue(val);
      }
    }

    // Tandakan rekod telah disemak
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
