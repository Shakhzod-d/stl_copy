import { useState, useEffect } from 'react';


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
export const useImageHandler = () => {
  const [image, setImage] = useState<string | null>(null);

  // Rasmni yuklash yoki almashtirish funksiyasi
  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // Rasmni olib tashlash funksiyasi
  const handleRemoveImage = () => {
    setImage(null);
  };

  return { image, handleImageUpload, handleRemoveImage };
};

