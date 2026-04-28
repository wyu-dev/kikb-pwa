import StatusBadge from './StatusBadge.jsx'

const FIELD_ICONS = {
  anggota: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  id: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
    </svg>
  ),
  tarikh: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
    </svg>
  ),
  tempoh: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

function InfoRow({ icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/10 last:border-0">
      <div className="text-gold-400/70 mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-white font-medium text-sm mt-0.5 break-words">{value}</p>
      </div>
    </div>
  )
}

export default function MemberCard({ member, onReset, onUpdate }) {
  if (!member) return null

  const {
    noAnggota,
    nama,
    noIC,
    status,
    tarikhMenjadi,
    tempohMenjadi,
    gelaran,
    pekerjaan,
    kelas,
  } = member

  const namaLengkap = gelaran ? `${gelaran} ${nama}` : nama

  return (
    <div className="card p-6 mx-4 max-w-md w-full animate-slide-up" role="region" aria-label="Rekod Ahli Dijumpai">
      {/* Header kad ahli */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-1">
            Rekod Ahli Dijumpai
          </p>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-emerald-400 text-xs font-semibold">IC Dijumpai</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Avatar + Nama */}
      <div className="flex items-center gap-4 mb-5 p-3 bg-white/5 rounded-xl">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-navy-900 font-bold text-lg">
            {nama ? nama.charAt(0).toUpperCase() : '?'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-base leading-snug break-words">
            {namaLengkap}
          </h2>
          <p className="text-white/50 text-xs mt-0.5">{pekerjaan || 'Ahli Koperasi'}</p>
        </div>
      </div>

      {/* Maklumat */}
      <div className="space-y-0">
        <InfoRow
          icon={FIELD_ICONS.id}
          label="No. Anggota"
          value={noAnggota}
        />
        <InfoRow
          icon={FIELD_ICONS.anggota}
          label="No. Kad Pengenalan"
          value={noIC}
        />
        {kelas && (
          <InfoRow
            icon={FIELD_ICONS.anggota}
            label="Kelas"
            value={kelas}
          />
        )}
        <InfoRow
          icon={FIELD_ICONS.tarikh}
          label="Tarikh Menjadi Anggota"
          value={tarikhMenjadi}
        />
        <InfoRow
          icon={FIELD_ICONS.tempoh}
          label="Tempoh Keahlian"
          value={tempohMenjadi}
        />
      </div>

      {/* Butang kemaskini + carian semula */}
      <div className="mt-5 flex flex-col gap-2">
        {onUpdate && (
          <button
            onClick={onUpdate}
            className="btn-primary w-full flex items-center justify-center gap-2"
            aria-label="Kemaskini maklumat ahli"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Kemaskini Maklumat
          </button>
        )}
        <button
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
          aria-label="Kembali ke halaman carian"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Cari Ahli Lain
        </button>
      </div>
    </div>
  )
}
