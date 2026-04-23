import Header from './components/Header.jsx'
import SearchCard from './components/SearchCard.jsx'
import MemberCard from './components/MemberCard.jsx'
import ErrorCard from './components/ErrorCard.jsx'
import { useMemberSearch, SEARCH_STATE } from './hooks/useMemberSearch.js'

function LoadingOverlay() {
  return (
    <div className="card p-8 mx-4 max-w-md w-full animate-fade-in" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold-400/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border border-gold-400/10"></div>
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Sedang mencari rekod...</p>
          <p className="text-white/50 text-sm mt-1">Sila tunggu sebentar</p>
        </div>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold-400/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="w-full py-4 px-4 mt-auto">
      <div className="max-w-md mx-auto text-center">
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Koperasi ILP Kuantan Berhad
        </p>
        <p className="text-white/15 text-xs mt-0.5">
          Semua maklumat adalah sulit dan dilindungi
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const { state, member, errorMessage, search, reset } = useMemberSearch()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-navy-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl"></div>
      </div>

      {/* Konten utama */}
      <main className="flex-1 flex flex-col items-center relative z-10">
        <Header />

        <div className="w-full flex flex-col items-center pb-8 px-0 gap-4">
          {/* Keadaan: IDLE — papar borang carian */}
          {state === SEARCH_STATE.IDLE && (
            <SearchCard onSearch={search} isLoading={false} />
          )}

          {/* Keadaan: LOADING — papar loading */}
          {state === SEARCH_STATE.LOADING && (
            <LoadingOverlay />
          )}

          {/* Keadaan: FOUND — papar rekod ahli */}
          {state === SEARCH_STATE.FOUND && (
            <MemberCard member={member} onReset={reset} />
          )}

          {/* Keadaan: NOT_FOUND — papar mesej IC tidak dijumpai */}
          {state === SEARCH_STATE.NOT_FOUND && (
            <ErrorCard
              message="Nombor IC yang anda masukkan tidak terdapat dalam pangkalan data ahli koperasi. Sila semak semula nombor IC anda."
              onReset={reset}
            />
          )}

          {/* Keadaan: ERROR — papar mesej ralat teknikal */}
          {state === SEARCH_STATE.ERROR && (
            <ErrorCard
              message={errorMessage || 'Ralat berlaku semasa mengakses data. Sila semak sambungan internet dan cuba semula.'}
              onReset={reset}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
