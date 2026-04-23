export default function Header() {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        {/* Logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold-400 shadow-lg shadow-gold-500/20 bg-navy-900 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Logo KIKB"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hidden w-full h-full items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-16 h-16">
                <circle cx="100" cy="100" r="88" fill="none" stroke="#fde047" strokeWidth="3"/>
                <text x="100" y="112" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="#fde047" textAnchor="middle">KIKB</text>
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-navy-900 rounded-full"></div>
          </div>
        </div>

        {/* Nama Koperasi */}
        <div className="text-center">
          <h1 className="text-white font-bold text-lg leading-tight tracking-wide">
            KOPERASI ILP KUANTAN BERHAD
          </h1>
          <p className="text-gold-400 text-sm font-medium mt-0.5 tracking-widest uppercase">
            Portal Ahli
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-xs mt-1">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/50"></div>
          <div className="w-1.5 h-1.5 bg-gold-400 rounded-full"></div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/50"></div>
        </div>
      </div>
    </header>
  )
}
