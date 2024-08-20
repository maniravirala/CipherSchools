import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
}

export const shuffleOptions = (options) => {
  console.log(options)
  return options.map(option => {
    return {
      ...option,
      options: shuffleArray(option.options)
    }
  })
}

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
} 