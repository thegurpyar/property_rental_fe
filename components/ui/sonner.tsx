"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      expand
      position="bottom-right"
      icons={{
        success: (
          <CircleCheckIcon className="size-5 text-emerald-500" />
        ),
        info: (
          <InfoIcon className="size-5 text-blue-500" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5 text-amber-500" />
        ),
        error: (
          <OctagonXIcon className="size-5 text-rose-500" />
        ),
        loading: (
          <Loader2Icon className="size-5 animate-spin text-[#FF7F32]" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-100 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-3xl group-[.toaster]:p-6 group-[.toaster]:font-black group-[.toaster]:tracking-tight group-[.toaster]:text-sm",
          description: "group-[.toast]:text-slate-400 group-[.toast]:font-bold group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-[#FF7F32] group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-900",
          success: "group-[.toaster]:bg-emerald-50/50 group-[.toaster]:border-emerald-100 group-[.toaster]:text-emerald-900",
          error: "group-[.toaster]:bg-rose-50/50 group-[.toaster]:border-rose-100 group-[.toaster]:text-rose-900",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
