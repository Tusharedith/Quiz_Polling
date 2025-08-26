import React from 'react'

const Footer = () => (
  <footer className="mt-0 pt-0 pb-2 w-full flex flex-col items-center" style={{ background: 'linear-gradient(45deg, #764ba2 10%, #f093fb 50%, #f5576c 75%, #4facfe 100%)' }}>
    {/* Top purple gradient border */}
    <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 opacity-60 mb-3" />
    
    {/* Social Icons */}
    <div className="flex items-center space-x-7 mb-3">
      {/* Twitter */}
      <a href="https://x.com/TusharSwarnkar5?t=Nhy3zAqJkVwawkg7rNkEaA&s=09" target="_blank" rel="noopener noreferrer">
        <svg className="w-7 h-7 text-gray-400 hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.954 4.569c-.885.389-1.832.654-2.825.775 1.014-.611 1.794-1.574 
          2.163-2.723-.949.556-2.005.959-3.127 1.184-.896-.959-2.178-1.559-3.594-1.559
          -2.72 0-4.924 2.204-4.924 4.924 0 .39.044.765.127 1.124-4.09-.205-7.719-2.165
          -10.148-5.144-.422.722-.664 1.561-.664 2.475 0 1.706.869 3.213 2.188 4.096 
          -.807-.026-1.566-.248-2.228-.616v.061c0 2.383 1.693 4.374 3.946 4.827
          -.413.111-.849.171-1.296.171-.316 0-.623-.03-.924-.086.624 1.956 2.432 3.377 
          4.576 3.417-1.676 1.316-3.794 2.101-6.096 2.101-.395 0-.787-.023-1.175-.067
          2.176 1.397 4.76 2.212 7.548 2.212 9.051 0 14.001-7.496 14.001-13.986 0
          -.21-.005-.423-.014-.634z"/>
        </svg>
      </a>

      {/* GitHub */}
      <a href="https://github.com/Tusharedith" target="_blank" rel="noopener noreferrer">
        <svg className="w-7 h-7 text-gray-400 hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.64.5.5 5.64.5 12a11.504 11.504 0 008.125 10.966c.593.11.81-.257 .81-.57V20.38c-3.3.717-3.995-1.593-3.995-1.593a3.128 3.128 0 00-1.32-1.743 c-1.07-.73.08-.715.08-.715a2.474 2.474 0 011.8 1.212 2.506 2.506 0 003.445.983 2.497 2.497 0 01.75-1.568c-2.63-.3-5.396-1.315-5.396-5.846a4.58 4.58 0 011.225-3.185 4.29 4.29 0 01.117-3.14s1-.32 3.28 1.216a11.1 11.1 0 015.958 0c2.28-1.536 3.28-1.216 3.28-1.216a4.29 4.29 0 01.117 3.141 4.578 4.578 0 011.225 3.184c0 4.54-2.77 5.544-5.406 5.834a2.796 2.796 0 01.796 2.177v3.233c0 .317.216.685.817.57A11.504 11.504 0 0023.5 12c0-6.36-5.14-11.5-11.5-11.5z"/>
        </svg>
      </a>

      {/* Portfolio/Website */}
      <a href="https://tusharswarnkar.vercel.app/" target="_blank" rel="noopener noreferrer">
        <svg className="w-7 h-7 text-gray-400 hover:text-purple-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </a>
    </div>

    {/* Slogan/message */}
    <div className="mb-2 font-mono text-base">Made for interactive learning, not boring lectures!</div>
    
    {/* Copyright */}
    <div className="text-sm text-white-500">
      <span className="font-semibold ">Made with ❤️ by Tushar Swarnkar</span>
    </div>
  </footer>
)

export default Footer
