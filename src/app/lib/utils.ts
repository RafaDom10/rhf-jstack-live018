import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ml = 500) {
  return new Promise((resolve) => {
    setInterval(resolve, ml)
  })
}
