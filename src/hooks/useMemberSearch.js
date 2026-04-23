import { useState, useCallback } from 'react'
import { cariAnggotaByIC } from '../services/sheetsService.js'

export const SEARCH_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  FOUND: 'found',
  NOT_FOUND: 'not_found',
  ERROR: 'error',
}

export function useMemberSearch() {
  const [state, setState] = useState(SEARCH_STATE.IDLE)
  const [member, setMember] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const search = useCallback(async (noIC) => {
    setState(SEARCH_STATE.LOADING)
    setMember(null)
    setErrorMessage('')

    try {
      const result = await cariAnggotaByIC(noIC)

      if (result) {
        setMember(result)
        setState(SEARCH_STATE.FOUND)
      } else {
        setState(SEARCH_STATE.NOT_FOUND)
      }
    } catch (err) {
      console.error('Ralat semasa carian:', err)
      const msg = err.message?.startsWith('CSV_ERROR')
        ? 'Gagal mengakses data. Sila pastikan sambungan internet anda aktif dan cuba semula.'
        : 'Ralat tidak dijangka berlaku. Sila cuba sebentar lagi.'
      setErrorMessage(msg)
      setState(SEARCH_STATE.ERROR)
    }
  }, [])

  const reset = useCallback(() => {
    setState(SEARCH_STATE.IDLE)
    setMember(null)
    setErrorMessage('')
  }, [])

  return { state, member, errorMessage, search, reset }
}
