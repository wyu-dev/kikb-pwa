import { useState } from 'react'
import Header from './components/Header.jsx'
import SearchCard from './components/SearchCard.jsx'
import MemberCard from './components/MemberCard.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import FinancialSummary from './components/FinancialSummary.jsx'
import ErrorCard from './components/ErrorCard.jsx'
import { useMemberSearch, SEARCH_STATE } from './hooks/useMemberSearch.js'
import { kemaskinAhli } from './services/sheetsService.js'

// Langkah aliran selepas IC dijumpai
const STEP = {
  VIEW: 'view',       // Papar maklumat semasa
  FORM: 'form',       // Borang kemaskini
  DONE: 'done',       // Kemaskini berjaya + kewangan
}

function LoadingOverlay({ message = 'Sedang mencari rekod...' }) {
  return (
    <div className="card p-8 mx-4 max-w-md w-full animate-fade-in" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold-400/20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-400 animate-spin"></div>
        </div>
        <div className="text-center">
          <p className="text-white font-medium">{message}</p>
          <p className="text-white/50 text-sm mt-1">Sila tunggu sebentar</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-gold-400/60 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
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
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Koperasi ILP Kuantan Berhad</p>
        <p className="text-white/15 text-xs mt-0.5">Semua maklumat adalah sulit dan dilindungi</p>
      </div>
    </footer>
  )
}

export default function App() {
  const { state, member, errorMessage, search, reset } = useMemberSearch()
  const [step, setStep] = useState(STEP.VIEW)
  const [updatedMember, setUpdatedMember] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleReset() {
    reset()
    setStep(STEP.VIEW)
    setUpdatedMember(null)
    setSubmitError('')
  }

  async function handleSubmitForm(formData) {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await kemaskinAhli(member.noICText || member.noICFormat, formData)
      // Gabungkan data asal dengan kemaskini untuk paparan kewangan
      setUpdatedMember({ ...member, ...formData })
      setStep(STEP.DONE)
    } catch (err) {
      if (err.message === 'APPS_SCRIPT_URL_NOT_SET') {
        setSubmitError('URL Apps Script belum dikonfigurasi. Sila hubungi pentadbir sistem.')
      } else {
        setSubmitError('Ralat berlaku semasa menyimpan. Sila cuba semula.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hiasan latar belakang */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-navy-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full bg-gold-500/5 blur-3xl"></div>
      </div>

      <main className="flex-1 flex flex-col items-center relative z-10">
        <Header />

        <div className="w-full flex flex-col items-center pb-8 gap-4">

          {/* IDLE — borang carian */}
          {state === SEARCH_STATE.IDLE && (
            <SearchCard onSearch={search} isLoading={false} />
          )}

          {/* LOADING — sedang cari */}
          {state === SEARCH_STATE.LOADING && (
            <LoadingOverlay />
          )}

          {/* FOUND + VIEW — papar maklumat ahli */}
          {state === SEARCH_STATE.FOUND && step === STEP.VIEW && (
            <MemberCard
              member={member}
              onReset={handleReset}
              onUpdate={() => setStep(STEP.FORM)}
            />
          )}

          {/* FOUND + FORM — borang kemaskini */}
          {state === SEARCH_STATE.FOUND && step === STEP.FORM && (
            <>
              <UpdateForm
                member={member}
                onSubmit={handleSubmitForm}
                isSubmitting={isSubmitting}
              />
              {submitError && (
                <div className="mx-4 max-w-md w-full bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm text-center">{submitError}</p>
                </div>
              )}
            </>
          )}

          {/* FOUND + DONE — kemaskini berjaya + kewangan */}
          {state === SEARCH_STATE.FOUND && step === STEP.DONE && (
            <FinancialSummary member={updatedMember || member} onReset={handleReset} />
          )}

          {/* NOT_FOUND */}
          {state === SEARCH_STATE.NOT_FOUND && (
            <ErrorCard
              message="Nombor IC yang anda masukkan tidak terdapat dalam pangkalan data ahli koperasi. Sila semak semula nombor IC anda."
              onReset={handleReset}
            />
          )}

          {/* ERROR */}
          {state === SEARCH_STATE.ERROR && (
            <ErrorCard
              message={errorMessage || 'Ralat berlaku semasa mengakses data. Sila semak sambungan internet dan cuba semula.'}
              onReset={handleReset}
            />
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
