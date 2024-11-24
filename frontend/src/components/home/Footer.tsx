import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="gap-9 flex items-center justify-center w-full h-[60px] bg-[#364479] overflow-hidden">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white whitespace-nowrap">SQL Injection</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white  whitespace-nowrap">Brute Force</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white  whitespace-nowrap">Broken Access Control</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white  whitespace-nowrap">XSS</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white  whitespace-nowrap">Improper Input Validation</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white  whitespace-nowrap">Improper Input Validation</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white" />
          <span className="text-xl font-medium text-white  whitespace-nowrap">Vulnerable Components</span>
        </div>
    </footer>
  )
}

