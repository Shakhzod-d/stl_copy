import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Rasm yuklash, almashtirish va o'chirish uchun asosiy funksiya

// useImageUpload hook
export const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Faylni tanlash va rasmni yuklash uchun funksiyalar
  const handleImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = () => {
      const selectedFile = fileInput.files?.[0];
      if (selectedFile) {
        setFile(selectedFile); // Faylni saqlash

        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string); // Faylni Data URL shaklida olish
        };
        reader.readAsDataURL(selectedFile);
      }
    };
    fileInput.click();
  };

  // Rasmni olib tashlash funksiyasi
  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
  };

  return { image, file, handleImageUpload, handleRemoveImage };
};
