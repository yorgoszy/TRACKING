import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-[#d6cfc2]">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Performance Gym Logo" width={40} height={40} />
        </Link>
      </div>
      <nav className="hidden md:flex space-x-8">
        <Link href="/features" className="text-sm hover:text-[#6366f1] transition-colors">
          Features
        </Link>
        <Link href="/learn-more" className="text-sm hover:text-[#6366f1] transition-colors">
          Learn more
        </Link>
        <Link href="/support" className="text-sm hover:text-[#6366f1] transition-colors">
          Support
        </Link>
      </nav>
      <div className="md:hidden">
        <button className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  )
}
