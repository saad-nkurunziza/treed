import {
  differenceInDays,
  differenceInMonths,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  const now = new Date();

  if (isToday(date)) {
    const distance = formatDistanceToNow(date);
    if (distance.includes("minute")) {
      return distance.replace("minute", "min") + " ago";
    } else if (distance.includes("hour")) {
      return distance.replace("hour", "hr") + " ago";
    } else if (distance.includes("day")) {
      return distance.replace("day", "d") + " ago";
    } else {
      return distance + " ago";
    }
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    const daysDifference = differenceInDays(now, date);
    if (daysDifference < 7) {
      return formatDistanceToNow(date).replace("about ", "") + " ago";
    } else if (daysDifference < 30) {
      const weeks = Math.floor(daysDifference / 7);
      return weeks > 1 ? `${weeks} weeks ago` : "1 week ago";
    } else if (differenceInMonths(now, date) < 12) {
      const months = differenceInMonths(now, date);
      return months > 1 ? `${months} months ago` : "1 month ago";
    } else {
      return format(date, "MMMM dd, yyyy");
    }
  }
};
