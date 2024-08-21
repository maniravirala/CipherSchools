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

export const deductDurationFromStartTime = (startTime, duration) => {
  console.log(startTime, duration)
  const startObj = new Date(startTime);
  const milliseconds = duration * 1000;

  const end = new Date(startObj.getTime() + milliseconds);
  const current = new Date();
  const remainingTime = end - current;

  const remainingSeconds = Math.max(Math.floor(remainingTime / 1000), 0);

  const formattedTime = formatTime(remainingSeconds);

  // console.log(`Start Time: ${startObj}`);
  // console.log(`Duration (s): ${duration}`);
  // console.log(`End Time: ${end}`);
  // console.log(`Current Time: ${current}`);
  // console.log(`Remaining Time (seconds): ${remainingSeconds}`);
  // console.log(`Formatted Remaining Time: ${formattedTime}`);

  return remainingSeconds;
}
