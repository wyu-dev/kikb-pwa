export default function ErrorCard({ message, onReset }) {
  return (
    <div
      className="card p-6 mx-4 max-w-md w-full animate-slide-up border-red-400/20"
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth={2}/>
          </svg>
        </div>
      </div>

      {/* Mesej */}
      <div className="text-center mb-5">
        <h2 className="text-white font-semibold text-lg mb-2">
          Rekod Tidak Dijumpai
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          {message || 'Nombor IC yang dimasukkan tidak terdapat dalam sistem. Sila semak semula nombor IC anda.'}
        </p>
      </div>

      {/* Senarai kemungkinan */}
      <div className="bg-white/5 rounded-xl p-4 mb-5">
        <p className="text-white/70 text-xs font-medium mb-2">Kemungkinan sebab:</p>
        <ul className="space-y-1.5">
          {[
            'Nombor IC dimasukkan tidak tepat',
            'Anda belum mendaftar sebagai ahli koperasi',
            'Data belum dikemaskini dalam sistem',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/50">
              <svg className="w-3.5 h-3.5 text-gold-400/70 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Butang cuba semula */}
      <button
        onClick={onReset}
        className="btn-primary w-full flex items-center justify-center gap-2"
        aria-label="Cuba cari semula"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Cuba Semula
      </button>
    </div>
  )
}
