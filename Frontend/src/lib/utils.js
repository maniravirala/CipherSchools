import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
}