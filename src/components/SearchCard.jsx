import { useState } from 'react'

const IC_PATTERN = /^\d{12}$/

function formatICDisplay(value) {
  const digits = value.replace(/\D/g, '').slice(0, 12)
  if (digits.length <= 6) return digits
  if (digits.length <= 8) return `${digits.slice(0, 6)}-${digits.slice(6)}`
  return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`
}

export default function SearchCard({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const [touched, setTouched] = useState(false)

  const rawDigits = inputValue.replace(/\D/g, '')
  const isValid = IC_PATTERN.test(rawDigits)
  const showError = touched && rawDigits.length > 0 && !isValid

  function handleChange(e) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12)
    setInputValue(raw)
    setDisplayValue(formatICDisplay(raw))
    setTouched(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    onSearch(rawDigits)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div className="card p-6 mx-4 max-w-md w-full animate-slide-up">
      {/* Tajuk kad */}
      <div className="mb-5">
        <h2 className="text-white font-semibold text-lg">Semak Status Keahlian</h2>
        <p className="text-white/60 text-sm mt-0.5">
          Masukkan nombor kad pengenalan anda untuk mencari rekod keahlian
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Input No. IC */}
        <div className="relative mb-4">
          <label
            htmlFor="ic-input"
            className="block text-white/80 text-sm font-medium mb-2"
          >
            Nombor Kad Pengenalan (No. IC)
          </label>

          <div className="relative">
            {/* Icon */}
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>

            <input
              id="ic-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={displayValue}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              onKeyDown={handleKeyDown}
              placeholder="Masukkan 12 digit No. IC"
              className={`input-field pl-11 pr-4 ${showError ? 'border-red-400/60 focus:ring-red-400' : ''}`}
              aria-label="Masukkan Nombor Kad Pengenalan"
              aria-describedby={showError ? 'ic-error' : undefined}
              aria-invalid={showError}
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {/* Clear button */}
            {rawDigits.length > 0 && !isLoading && (
              <button
                type="button"
                onClick={() => { setInputValue(''); setDisplayValue(''); setTouched(false) }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                aria-label="Padam input"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Mesej ralat format */}
          {showError && (
            <p id="ic-error" className="mt-1.5 text-red-400 text-xs flex items-center gap-1" role="alert">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Nombor IC mesti mengandungi 12 digit
            </p>
          )}

          {/* Progress digits counter */}
          <div className="flex justify-between mt-1.5">
            <span></span>
            <span className={`text-xs ${rawDigits.length === 12 ? 'text-emerald-400' : 'text-white/30'}`}>
              {rawDigits.length}/12
            </span>
          </div>
        </div>

        {/* Butang Cari */}
        <button
          type="submit"
          disabled={isLoading || (!isValid && touched)}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Sedang mencari...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Cari Rekod
            </>
          )}
        </button>
      </form>

      {/* Info tambahan */}
      <p className="text-white/30 text-xs text-center mt-4">
        Masukkan No. IC tanpa atau dengan tanda sempang (-)
      </p>
    </div>
  )
}
