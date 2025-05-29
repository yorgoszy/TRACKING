"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LoginModal } from "@/components/login-modal"

export function MobileNav() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <nav className="flex flex-col items-start gap-4 mt-8">
          <Link href="#features" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            {t("nav.features")}
          </Link>
          <Link href="#testimonials" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            {t("nav.testimonials")}
          </Link>
          <Link href="#pricing" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            {t("nav.pricing")}
          </Link>
          <Link href="#contact" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            {t("nav.contact")}
          </Link>
          <div className="flex flex-col w-full gap-2 mt-4">
            <LoginModal />
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href="#">{t("nav.getStarted")}</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
