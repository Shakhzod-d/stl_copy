import api from "@/api";

import { removeLocalStorage } from "@/utils/localStorage";

export function validatePhoneNumber<T>(_: T, value: string) {
  const cleanedValue = value.replace(/\D/g, ""); // Faqat raqamlarni qoldiramiz
  if (cleanedValue.length !== 12) {
    return Promise.reject(
      new Error("Telefon raqami to'liq kiritilishi kerak!")
    );
  }
  return Promise.resolve();
}

export const Company = async (id: string) => {
  const { data } = await api.get(`/company/${id}`);
  return data;
};

export function formatTime(seconds: number): string {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

let intervalId: NodeJS.Timeout | undefined;

export const autoRefresh = (interval: number | string | unknown) => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }

  if (interval !== "off") {
    intervalId = setInterval(() => {
      window.location.reload();
    }, Number(interval));
  }
};

export const auth = () => {
  return (
    removeLocalStorage("token"),
    removeLocalStorage("roleId"),
    removeLocalStorage("company"),
    removeLocalStorage("companyId")
  );
};
