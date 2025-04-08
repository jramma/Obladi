import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ObjectId } from "mongodb";

export interface MongoUser {
  email: string;
  name: string;
  surname: string;
  authProvider: string;
  authId: string;
  role: string;
  phone: string;
  password: string;
  picture: string;
  description: string;
  time: Date;
  pines: ObjectId[];
  contributor: number;
  lost: boolean;
  location: string | null;
  rewardPins: number;
  objects: ObjectId[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}
// allowed mails 
export const allowedEmails = [
  "jrmasip97@gmail.com",
  "jrammas@uoc.edu"
];

