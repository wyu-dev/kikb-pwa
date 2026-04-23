# MASTER PROMPT — KOPERASI ILP KUANTAN BERHAD (KIKB) PWA

> Letakkan prompt ini sebagai `CLAUDE.md` di root projek anda.
> Claude Code akan membacanya secara automatik setiap kali anda bekerja dalam projek ini.

---

## 🏢 KONTEKS PROJEK

**Nama Sistem**: Portal Ahli — KOPERASI ILP KUANTAN BERHAD (KIKB)
**Jenis Aplikasi**: Progressive Web App (PWA)
**Tujuan**: Membolehkan anggota koperasi mencari rekod mereka, mengemaskini maklumat peribadi, dan melihat maklumat kewangan mereka.
**Logo**: `https://wyu-dev.github.io/logo/kikb.png`
**Sumber Data**: Google Sheets (Sheet ID: `1ko4QUq4VvQ7_VKiHxva6LJDwwU3KIygDqfXMFqx6QpU`)

---

## 📊 STRUKTUR DATA (Google Sheets)

### Nama Sheet: `DAFTAR_ANGGOTA_2026`

| Kolum | Label | Keterangan |
|-------|-------|------------|
| A | BIL | Nombor urutan |
| B | NO. ANGGOTA | ID unik anggota |
| C | KELAS (KOPERASI SEKOLAH) | Jenis kelas |
| D | NAMA ANGGOTA | Nama penuh |
| E | NO KAD PENGENALAN | Format XXXXXX-XX-XXXX |
| F | NO KAD PENGENALAN (format text) | **KUNCI CARIAN** — tiada tanda sempang |
| G | STATUS | ANGGOTA / ALK / TAMAT / JAD |
| H | ALAMAT | Alamat penuh |
| I | POSKOD | Poskod |
| J | NEGERI | Negeri |
| K | PEKERJAAN | Jawatan |
| L | EMEL | Emel |
| M | TARIKH MENJADI ANGGOTA | dd/mm/yyyy |
| N | TARIKH BERHENTI ANGGOTA | dd/mm/yyyy (boleh kosong) |
| O | TEMPOH MENJADI ANGGOTA | Contoh: "5 Tahun 2 Bulan 24 Hari" |
| P | TAHUN LAHIR 19xx | |
| Q | TAHUN LAHIR 20xx | |
| R | TARIKH LAHIR | dd/mm/yyyy |
| S | GELARAN | En / Pn / Dr / dll |
| T | JANTINA (L/P) | L atau P |
| U | JANTINA (FULL) | Lelaki / Perempuan |
| V | BANGSA | Melayu / Cina / India / dll |
| W | AKADEMIK | Sijil / Diploma / Ijazah / Sarjana |
| X | BERMINAT MENJADI ALK? | Ya / Tidak |
| Y | NAMA BANK | |
| Z | NO AKAUN | |
| AA | NAMA WARIS | |
| AB | NO IC WARIS | |
| AC | NO TEL WARIS | |
| AD | HUBUNGAN WARIS | |
| AE | FI MASUK (RM) | **READ-ONLY** |
| AF | SYER PADA 31 JULAI 2024 (RM) | **READ-ONLY** |
| AG | DIVIDEN 2025 (RM) | **READ-ONLY** |
| AH | SYER PADA 31 JULAI 2025 (RM) | **READ-ONLY** |
| AI | 2026 | Bilangan semasa |
| AJ | Semakan | Status semakan |

---

## 🔄 ALIRAN APLIKASI (USER FLOW)

```
[Halaman Utama]
      |
      v
[Carian No. IC] ──► [Tidak Dijumpai] ──► Papar mesej ralat
      |
      v (Dijumpai)
[Paparan Maklumat Semasa]
   - Nama Anggota
   - No. Anggota
   - Status Keahlian
      |
      v
[Borang Kemaskini Maklumat]
   WAJIB diisi sebelum teruskan:
   - Alamat, Poskod, Negeri
   - Emel
   - Tarikh Menjadi Anggota
   - Tarikh Berhenti Anggota
   - Tempoh Menjadi Anggota
   - Gelaran, Bangsa, Akademik
   - Berminat Menjadi ALK?
   - Nama Bank, No. Akaun
   - Nama Waris, No IC Waris, No Tel Waris, Hubungan Waris
      |
      v
[Simpan ke Google Sheets]
      |
      v
[Paparan Maklumat Kewangan — READ ONLY]
   - Fi Masuk (RM)
   - Syer pada 31 Julai 2024 (RM)
   - Dividen 2025 (RM)
   - Syer pada 31 Julai 2025 (RM)
```

---

## 🏗️ FASA PEMBANGUNAN

### ✅ FASA 1 — Setup & Carian (SEMASA)
- [ ] Setup projek PWA (Vite + React atau Next.js)
- [ ] Konfigurasi Google Sheets API
- [ ] Halaman carian menggunakan No. IC (Kolum F)
- [ ] Paparan nama & status anggota selepas carian berjaya
- [ ] Mesej ralat jika IC tidak dijumpai
- [ ] PWA manifest + service worker asas

### 🔜 FASA 2 — Borang Kemaskini
- [ ] Borang kemaskini semua medan yang ditetapkan
- [ ] Validasi medan (required fields, format)
- [ ] Hantar kemaskini ke Google Sheets via API
- [ ] Konfirmasi kemaskini berjaya

### 🔜 FASA 3 — Paparan Kewangan
- [ ] Paparan maklumat kewangan (read-only) selepas kemaskini
- [ ] Ringkasan akaun anggota

### 🔜 FASA 4 — Penambahbaikan
- [ ] Offline support (cache data)
- [ ] Push notification
- [ ] Dark/light mode
- [ ] Bahasa: Bahasa Malaysia sepenuhnya

---

## 🔧 STACK TEKNIKAL

```
Framework   : React + Vite  (atau Next.js — fleksibel)
Styling     : Tailwind CSS
PWA         : vite-plugin-pwa
Data        : Google Sheets API v4
Auth        : API Key (read) + OAuth2 / Service Account (write)
Deployment  : Netlify / Vercel / GitHub Pages
```

---

## 🔐 GOOGLE SHEETS INTEGRATION

### Cara Baca Data (GET)
```javascript
// Endpoint untuk baca Sheet
const SHEET_ID = '1ko4QUq4VvQ7_VKiHxva6LJDwwU3KIygDqfXMFqx6QpU';
const API_KEY = process.env.VITE_GOOGLE_API_KEY;
const RANGE = 'Sheet1!A:AJ'; // Ubah "Sheet1" ikut nama sheet sebenar

const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
```

### Carian Mengikut IC
```javascript
// Kolum F = index 5 (0-based)
const IC_COLUMN_INDEX = 5;

function cariAnggota(noIC, rows) {
  // rows[0] = header row
  return rows.slice(1).find(row => row[IC_COLUMN_INDEX] === noIC.trim());
}
```

### Cara Tulis Data (PUT/POST)
- Gunakan **Google Apps Script** sebagai middleware (Web App) untuk operasi write
- Atau guna **Service Account** dengan Google Sheets API v4 PATCH

---

## 🎨 REKA BENTUK & UI

### Identiti Visual
- **Warna Utama**: Biru gelap / navy (warna korporat koperasi)
- **Warna Aksen**: Emas / kuning (menggambarkan kewangan & kepercayaan)
- **Font**: Bahasa Melayu formal, bersih, mudah dibaca
- **Nada**: Profesional, dipercayai, mesra pengguna

### Komponen Utama
1. `Header` — Logo KIKB + nama koperasi
2. `SearchCard` — Input No. IC + butang cari
3. `MemberCard` — Paparan nama & status anggota
4. `UpdateForm` — Borang kemaskini maklumat
5. `FinancialSummary` — Ringkasan kewangan (read-only)
6. `StatusBadge` — Badge status (ANGGOTA / ALK / TAMAT / JAD)

---

## 📁 STRUKTUR FOLDER PROJEK

```
kikb-pwa/
├── public/
│   ├── manifest.json
│   ├── icons/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchCard.jsx
│   │   ├── MemberCard.jsx
│   │   ├── UpdateForm.jsx
│   │   ├── FinancialSummary.jsx
│   │   └── StatusBadge.jsx
│   ├── services/
│   │   └── sheetsService.js    ← Google Sheets API calls
│   ├── hooks/
│   │   └── useMemberSearch.js
│   ├── utils/
│   │   └── formatters.js       ← Format tarikh, nombor, IC
│   ├── App.jsx
│   └── main.jsx
├── .env.local                  ← API keys (jangan commit!)
├── CLAUDE.md                   ← Fail ini
└── vite.config.js
```

---

## ⚠️ PERATURAN PENTING

1. **JANGAN** simpan data sensitif (No. IC, No. Akaun) dalam localStorage atau sessionStorage
2. **JANGAN** commit fail `.env` ke Git
3. Semua teks UI mesti dalam **Bahasa Malaysia**
4. Maklumat kewangan (AE–AH) adalah **READ-ONLY** — pengguna tidak boleh ubah
5. Carian hanya menggunakan **Kolum F** (format text, tiada sempang)
6. Row pertama dalam Sheets adalah **header** — skip semasa proses data

---

## 🧪 CONTOH DATA UJIAN

```
No. IC (format text): 760720036039
Nama: Tasirihafizan Bin Ab Rahman
Status: ALK
```

---

## 📝 NOTA UNTUK CLAUDE CODE

- Bina secara **berperingkat** mengikut fasa di atas
- Tanya sebelum membuat keputusan besar tentang stack atau struktur
- Gunakan **TypeScript** jika boleh untuk type safety
- Tulis komen kod dalam **Bahasa Malaysia** atau Bahasa Inggeris (konsisten)
- Setiap komponen mesti **responsive** (mobile-first)
- Ikut konvensyen **accessibility** (ARIA labels, semantic HTML)
