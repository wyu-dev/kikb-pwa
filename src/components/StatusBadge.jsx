const STATUS_CONFIG = {
  ANGGOTA: {
    label: 'ANGGOTA AKTIF',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-400/50',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
    pulse: true,
  },
  ALK: {
    label: 'AHLI LEMBAGA KOPERASI',
    bg: 'bg-gold-500/20',
    border: 'border-gold-400/50',
    text: 'text-gold-300',
    dot: 'bg-gold-400',
    pulse: false,
  },
  TAMAT: {
    label: 'TAMAT KEAHLIAN',
    bg: 'bg-slate-500/20',
    border: 'border-slate-400/50',
    text: 'text-slate-300',
    dot: 'bg-slate-400',
    pulse: false,
  },
  JAD: {
    label: 'JADUAL DIPADAM',
    bg: 'bg-red-500/20',
    border: 'border-red-400/50',
    text: 'text-red-300',
    dot: 'bg-red-400',
    pulse: false,
  },
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {
    label: status || 'TIDAK DIKETAHUI',
    bg: 'bg-slate-500/20',
    border: 'border-slate-400/50',
    text: 'text-slate-300',
    dot: 'bg-slate-400',
    pulse: false,
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.border} ${config.text}`}
      role="status"
      aria-label={`Status keahlian: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${config.pulse ? 'animate-pulse' : ''}`}></span>
      {config.label}
    </span>
  )
}
