import { formatCurrency } from '../utils/formatters.js'

function FinancialCard({ label, value, icon, highlight }) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? 'bg-gold-500/10 border-gold-400/30' : 'bg-white/5 border-white/10'}`}>
      <div className="flex items-start justify-between">
        <p className={`text-xs font-medium uppercase tracking-wider ${highlight ? 'text-gold-400/80' : 'text-white/50'}`}>{label}</p>
        <div className={highlight ? 'text-gold-400' : 'text-white/30'}>{icon}</div>
      </div>
      <p className={`text-xl font-bold mt-2 ${highlight ? 'text-gold-300' : 'text-white'}`}>
        {formatCurrency(value)}
      </p>
    </div>
  )
}

export default function FinancialSummary({ member, onReset }) {
  const { nama, noAnggota, fiMasuk, syer2024, dividen2025, syer2025 } = member

  const iconCoin = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  )

  const iconChart = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
    </svg>
  )

  return (
    <div className="card p-6 mx-4 max-w-md w-full animate-slide-up">
      {/* Kejayaan kemaskini */}
      <div className="flex flex-col items-center text-center mb-6 pb-5 border-b border-white/10">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-3">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 className="text-white font-bold text-lg">Maklumat Berjaya Dikemaskini</h2>
        <p className="text-white/50 text-sm mt-1">Terima kasih, {nama?.split(' ')[0]}</p>
      </div>

      {/* Maklumat ahli */}
      <div className="bg-white/5 rounded-xl p-3 mb-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
          <span className="text-navy-900 font-bold text-sm">{nama?.charAt(0)}</span>
        </div>
        <div>
          <p className="text-white font-medium text-sm">{nama}</p>
          <p className="text-white/40 text-xs">No. Anggota: {noAnggota}</p>
        </div>
      </div>

      {/* Tajuk kewangan */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>
        </svg>
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Maklumat Kewangan</h3>
        <div className="flex-1 h-px bg-white/10 ml-2"></div>
        <span className="text-white/30 text-xs italic">Baca sahaja</span>
      </div>

      {/* Grid kewangan */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <FinancialCard label="Fi Masuk" value={fiMasuk} icon={iconCoin} />
        <FinancialCard label="Syer Julai 2024" value={syer2024} icon={iconChart} />
        <FinancialCard label="Dividen 2025" value={dividen2025} icon={iconCoin} highlight />
        <FinancialCard label="Syer Julai 2025" value={syer2025} icon={iconChart} highlight />
      </div>

      <p className="text-white/20 text-xs text-center mb-5">
        Maklumat kewangan adalah untuk rujukan sahaja dan tidak boleh diubah
      </p>

      {/* Butang carian baharu */}
      <button
        onClick={onReset}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        Cari Ahli Lain
      </button>
    </div>
  )
}
