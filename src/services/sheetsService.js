const SHEET_ID = import.meta.env.VITE_SHEET_ID || '1ko4QUq4VvQ7_VKiHxva6LJDwwU3KIygDqfXMFqx6QpU'
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SHEET_NAME = 'DAFTAR_ANGGOTA_2026'
const RANGE = `${SHEET_NAME}!A:AJ`

// Kolum F (index 5, 0-based) = No IC format text, tiada sempang — kunci carian
const IC_COLUMN_INDEX = 5

// Indeks kolum mengikut struktur data
const COL = {
  BIL: 0,
  NO_ANGGOTA: 1,
  KELAS: 2,
  NAMA: 3,
  NO_IC_FORMAT: 4,
  NO_IC_TEXT: 5,
  STATUS: 6,
  ALAMAT: 7,
  POSKOD: 8,
  NEGERI: 9,
  PEKERJAAN: 10,
  EMEL: 11,
  TARIKH_MASUK: 12,
  TARIKH_BERHENTI: 13,
  TEMPOH: 14,
  TAHUN_LAHIR_19: 15,
  TAHUN_LAHIR_20: 16,
  TARIKH_LAHIR: 17,
  GELARAN: 18,
  JANTINA_SINGKAT: 19,
  JANTINA_PENUH: 20,
  BANGSA: 21,
  AKADEMIK: 22,
  BERMINAT_ALK: 23,
  NAMA_BANK: 24,
  NO_AKAUN: 25,
  NAMA_WARIS: 26,
  NO_IC_WARIS: 27,
  NO_TEL_WARIS: 28,
  HUBUNGAN_WARIS: 29,
  FI_MASUK: 30,
  SYER_2024: 31,
  DIVIDEN_2025: 32,
  SYER_2025: 33,
  BILANGAN_2026: 34,
  SEMAKAN: 35,
}

function buildApiUrl() {
  return `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
}

function buildCsvUrl() {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`
}

function parseRowToMember(row) {
  return {
    bil: row[COL.BIL] || '',
    noAnggota: row[COL.NO_ANGGOTA] || '',
    kelas: row[COL.KELAS] || '',
    nama: row[COL.NAMA] || '',
    noICFormat: row[COL.NO_IC_FORMAT] || '',
    noICText: row[COL.NO_IC_TEXT] || '',
    noIC: row[COL.NO_IC_FORMAT] || row[COL.NO_IC_TEXT] || '',
    status: row[COL.STATUS] || '',
    alamat: row[COL.ALAMAT] || '',
    poskod: row[COL.POSKOD] || '',
    negeri: row[COL.NEGERI] || '',
    pekerjaan: row[COL.PEKERJAAN] || '',
    emel: row[COL.EMEL] || '',
    tarikhMenjadi: row[COL.TARIKH_MASUK] || '',
    tarikhBerhenti: row[COL.TARIKH_BERHENTI] || '',
    tempohMenjadi: row[COL.TEMPOH] || '',
    tarikhLahir: row[COL.TARIKH_LAHIR] || '',
    gelaran: row[COL.GELARAN] || '',
    jantinaSingkat: row[COL.JANTINA_SINGKAT] || '',
    jantinaPenuh: row[COL.JANTINA_PENUH] || '',
    bangsa: row[COL.BANGSA] || '',
    akademik: row[COL.AKADEMIK] || '',
    berminatALK: row[COL.BERMINAT_ALK] || '',
    namaBank: row[COL.NAMA_BANK] || '',
    noAkaun: row[COL.NO_AKAUN] || '',
    namaWaris: row[COL.NAMA_WARIS] || '',
    noICWaris: row[COL.NO_IC_WARIS] || '',
    noTelWaris: row[COL.NO_TEL_WARIS] || '',
    hubunganWaris: row[COL.HUBUNGAN_WARIS] || '',
    // Maklumat kewangan (READ-ONLY)
    fiMasuk: row[COL.FI_MASUK] || '',
    syer2024: row[COL.SYER_2024] || '',
    dividen2025: row[COL.DIVIDEN_2025] || '',
    syer2025: row[COL.SYER_2025] || '',
  }
}

async function fetchViaApiKey() {
  if (!API_KEY || API_KEY === 'your_google_api_key_here') {
    throw new Error('API_KEY_NOT_SET')
  }
  const response = await fetch(buildApiUrl())
  if (!response.ok) {
    throw new Error(`API_ERROR:${response.status}`)
  }
  const data = await response.json()
  return data.values || []
}

async function fetchViaCsv() {
  const response = await fetch(buildCsvUrl())
  if (!response.ok) {
    throw new Error(`CSV_ERROR:${response.status}`)
  }
  const text = await response.text()
  return parseCsv(text)
}

function parseCsv(text) {
  const lines = text.split('\n').filter(line => line.trim())
  return lines.map(line => {
    const row = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    row.push(current.trim())
    return row
  })
}

export async function fetchAllRows() {
  try {
    return await fetchViaApiKey()
  } catch (err) {
    if (err.message === 'API_KEY_NOT_SET' || err.message.startsWith('API_ERROR')) {
      // Fallback ke CSV jika API key tidak ditetapkan atau ralat API
      return await fetchViaCsv()
    }
    throw err
  }
}

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || ''

export async function kemaskinAhli(noIC, data) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('APPS_SCRIPT_URL_NOT_SET')
  }

  const payload = { noIC: noIC.replace(/\D/g, ''), ...data }

  // Guna no-cors kerana Apps Script tidak support CORS header penuh
  // Request akan dihantar, tapi response adalah opaque (tidak boleh dibaca)
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  // Anggap berjaya jika tiada exception dilempar
  return { success: true }
}

export async function cariAnggotaByIC(noIC) {
  const cleanIC = noIC.replace(/\D/g, '').trim()
  const rows = await fetchAllRows()

  // Row pertama adalah header — skip
  const dataRows = rows.slice(1)

  const found = dataRows.find(row => {
    const icInSheet = (row[IC_COLUMN_INDEX] || '').replace(/\D/g, '').trim()
    return icInSheet === cleanIC
  })

  if (!found) return null
  return parseRowToMember(found)
}
