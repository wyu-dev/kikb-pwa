export function formatIC(ic) {
  const digits = String(ic).replace(/\D/g, '')
  if (digits.length !== 12) return ic
  return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`
}

export function formatCurrency(value) {
  const num = parseFloat(String(value).replace(/[^\d.]/g, ''))
  if (isNaN(num)) return value || '-'
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  }).format(num)
}

export function formatDate(dateStr) {
  if (!dateStr) return '-'
  return dateStr
}

export function maskIC(ic) {
  const digits = String(ic).replace(/\D/g, '')
  if (digits.length !== 12) return ic
  return `${digits.slice(0, 6)}-**-****`
}

export function maskAccountNo(accNo) {
  if (!accNo || accNo.length < 4) return accNo || '-'
  return `${'*'.repeat(accNo.length - 4)}${accNo.slice(-4)}`
}
