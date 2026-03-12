'use client'

import { BookmarkIcon, BookOpenIcon, CheckIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import clsx from "clsx"

type BookStatus = "reading" | "read" | "wantToRead"

const statusConfig = {
  read: {
    label: "Lido",
    icon: CheckIcon,
    className: "bg-green-500 hover:bg-green-500/90 text-white"
  },
  reading: {
    label: "Lendo",
    icon: BookOpenIcon,
    className: "bg-yellow-500 hover:bg-yellow-500/90 text-white"
  },
  wantToRead: {
    label: "Quero ler",
    icon: BookmarkIcon,
    className: "bg-blue-500 hover:bg-blue-500/90 text-white"
  }
}

type StatusBadgeProps = {
  status: string | null
}

export function StatusBadge({ status }: StatusBadgeProps) {

  const config = statusConfig[status as BookStatus]

  if (!config) {
    return (
      <Badge variant="secondary" className="text-xs">
        Desconhecido
      </Badge>
    )
  }

  const { label, icon: Icon, className } = config

  return (
    <Badge
      className={clsx(
        "flex items-center gap-1 text-xs font-medium",
        className
      )}
    >
      <Icon size={14} />
      {label}
    </Badge>
  )
}