import { useState } from 'react'

const GELARAN_LIST = ['En', 'Pn', 'Cik', 'Dr', 'Prof', 'Hj', 'Hjh', 'Dato', 'Datin']
const NEGERI_LIST = ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya']
const BANGSA_LIST = ['Melayu', 'Cina', 'India', 'Iban', 'Kadazan', 'Lain-lain']
const AKADEMIK_LIST = ['SPM/Setaraf', 'Sijil', 'Diploma', 'Ijazah', 'Sarjana', 'PhD']
const HUBUNGAN_LIST = ['Suami', 'Isteri', 'Ibu', 'Bapa', 'Anak', 'Adik-Beradik', 'Lain-lain']

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="text-gold-400">{icon}</div>
      <h3 className="text-white font-semibold text-sm uppercase tracking-wider">{title}</h3>
      <div className="flex-1 h-px bg-white/10 ml-2"></div>
    </div>
  )
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-white/70 text-xs font-medium mb-1.5">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text', inputMode, maxLength, disabled }) {
  return (
    <input
      type={type}
      inputMode={inputMode}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200 disabled:opacity-50"
    />
  )
}

function Select({ value, onChange, options, placeholder, disabled }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="w-full bg-navy-800 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 appearance-none"
    >
      <option value="" className="bg-navy-900">{placeholder || 'Pilih...'}</option>
      {options.map(o => (
        <option key={o} value={o} className="bg-navy-900">{o}</option>
      ))}
    </select>
  )
}


function validate(form) {
  const errors = {}
  if (!form.gelaran) errors.gelaran = 'Gelaran diperlukan'
  if (!form.alamat.trim()) errors.alamat = 'Alamat diperlukan'
  if (!form.poskod.trim()) errors.poskod = 'Poskod diperlukan'
  else if (!/^\d{5}$/.test(form.poskod)) errors.poskod = 'Poskod mesti 5 digit'
  if (!form.negeri) errors.negeri = 'Negeri diperlukan'
  if (!form.emel.trim()) errors.emel = 'Emel diperlukan'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emel)) errors.emel = 'Format emel tidak sah'
  if (!form.bangsa) errors.bangsa = 'Bangsa diperlukan'
  if (!form.akademik) errors.akademik = 'Tahap akademik diperlukan'
if (!form.namaBank.trim()) errors.namaBank = 'Nama bank diperlukan'
  if (!form.noAkaun.trim()) errors.noAkaun = 'No. akaun diperlukan'
  if (!form.namaWaris.trim()) errors.namaWaris = 'Nama waris diperlukan'
  if (!form.noICWaris.trim()) errors.noICWaris = 'No. IC waris diperlukan'
  else if (!/^\d{12}$/.test(form.noICWaris.replace(/\D/g, ''))) errors.noICWaris = 'No. IC waris mesti 12 digit'
  if (!form.noTelWaris.trim()) errors.noTelWaris = 'No. telefon waris diperlukan'
  if (!form.hubunganWaris) errors.hubunganWaris = 'Hubungan waris diperlukan'
  return errors
}

export default function UpdateForm({ member, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    gelaran: member.gelaran || '',
    alamat: member.alamat || '',
    poskod: member.poskod || '',
    negeri: member.negeri || '',
    emel: member.emel || '',
    bangsa: member.bangsa || '',
    akademik: member.akademik || '',
namaBank: member.namaBank || '',
    noAkaun: member.noAkaun || '',
    namaWaris: member.namaWaris || '',
    noICWaris: member.noICWaris || '',
    noTelWaris: member.noTelWaris || '',
    hubunganWaris: member.hubunganWaris || '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)

  function set(field) {
    return val => setForm(f => ({ ...f, [field]: val }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      // Scroll ke error pertama
      document.querySelector('.text-red-400')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    onSubmit(form)
  }

  const errs = touched ? validate(form) : {}

  return (
    <div className="card p-6 mx-4 max-w-md w-full animate-slide-up">
      {/* Header borang */}
      <div className="mb-5 pb-4 border-b border-white/10">
        <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Langkah 2 daripada 3</p>
        <h2 className="text-white font-bold text-lg mt-1">Kemaskini Maklumat</h2>
        <p className="text-white/50 text-xs mt-1">
          Medan bertanda <span className="text-gold-400">*</span> adalah wajib diisi
        </p>
      </div>

      {/* Maklumat ahli (read-only) */}
      <div className="bg-white/5 rounded-xl p-3 mb-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
          <span className="text-navy-900 font-bold text-sm">{member.nama?.charAt(0)}</span>
        </div>
        <div>
          <p className="text-white font-medium text-sm">{member.nama}</p>
          <p className="text-white/40 text-xs">No. Anggota: {member.noAnggota}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>

        {/* ── BAHAGIAN 1: MAKLUMAT PERIBADI ── */}
        <div className="mb-6">
          <SectionTitle
            title="Maklumat Peribadi"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>}
          />
          <div className="space-y-3">
            <Field label="Gelaran" required error={errs.gelaran}>
              <Select value={form.gelaran} onChange={set('gelaran')} options={GELARAN_LIST} placeholder="Pilih gelaran" disabled={isSubmitting} />
            </Field>
            <Field label="Bangsa" required error={errs.bangsa}>
              <Select value={form.bangsa} onChange={set('bangsa')} options={BANGSA_LIST} placeholder="Pilih bangsa" disabled={isSubmitting} />
            </Field>
            <Field label="Tahap Akademik" required error={errs.akademik}>
              <Select value={form.akademik} onChange={set('akademik')} options={AKADEMIK_LIST} placeholder="Pilih tahap akademik" disabled={isSubmitting} />
            </Field>
          </div>
        </div>

        {/* ── BAHAGIAN 2: ALAMAT ── */}
        <div className="mb-6">
          <SectionTitle
            title="Alamat"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>}
          />
          <div className="space-y-3">
            <Field label="Alamat Penuh" required error={errs.alamat}>
              <textarea
                value={form.alamat}
                onChange={e => set('alamat')(e.target.value)}
                placeholder="No. rumah, jalan, taman..."
                rows={3}
                disabled={isSubmitting}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Poskod" required error={errs.poskod}>
                <Input value={form.poskod} onChange={set('poskod')} placeholder="41000" inputMode="numeric" maxLength={5} disabled={isSubmitting} />
              </Field>
              <Field label="Negeri" required error={errs.negeri}>
                <Select value={form.negeri} onChange={set('negeri')} options={NEGERI_LIST} placeholder="Pilih" disabled={isSubmitting} />
              </Field>
            </div>
            <Field label="Emel" required error={errs.emel}>
              <Input value={form.emel} onChange={set('emel')} placeholder="nama@emel.com" type="email" disabled={isSubmitting} />
            </Field>
          </div>
        </div>

        {/* ── BAHAGIAN 3: MAKLUMAT BANK ── */}
        <div className="mb-6">
          <SectionTitle
            title="Maklumat Bank"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z"/></svg>}
          />
          <div className="space-y-3">
            <Field label="Nama Bank" required error={errs.namaBank}>
              <Input value={form.namaBank} onChange={set('namaBank')} placeholder="Contoh: Maybank, CIMB, BSN..." disabled={isSubmitting} />
            </Field>
            <Field label="No. Akaun Bank" required error={errs.noAkaun}>
              <Input value={form.noAkaun} onChange={set('noAkaun')} placeholder="Contoh: 1234567890" inputMode="numeric" disabled={isSubmitting} />
            </Field>
          </div>
        </div>

        {/* ── BAHAGIAN 5: MAKLUMAT WARIS ── */}
        <div className="mb-6">
          <SectionTitle
            title="Maklumat Waris"
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>}
          />
          <div className="space-y-3">
            <Field label="Nama Waris" required error={errs.namaWaris}>
              <Input value={form.namaWaris} onChange={set('namaWaris')} placeholder="Nama penuh waris" disabled={isSubmitting} />
            </Field>
            <Field label="No. IC Waris" required error={errs.noICWaris}>
              <Input value={form.noICWaris} onChange={val => set('noICWaris')(val.replace(/\D/g, '').slice(0, 12))} placeholder="12 digit tanpa sempang" inputMode="numeric" maxLength={12} disabled={isSubmitting} />
            </Field>
            <Field label="No. Telefon Waris" required error={errs.noTelWaris}>
              <Input value={form.noTelWaris} onChange={set('noTelWaris')} placeholder="01x-xxxxxxx" inputMode="tel" disabled={isSubmitting} />
            </Field>
            <Field label="Hubungan dengan Waris" required error={errs.hubunganWaris}>
              <Select value={form.hubunganWaris} onChange={set('hubunganWaris')} options={HUBUNGAN_LIST} placeholder="Pilih hubungan" disabled={isSubmitting} />
            </Field>
          </div>
        </div>

        {/* Butang hantar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Sedang menyimpan...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Simpan Maklumat
            </>
          )}
        </button>
      </form>
    </div>
  )
}
