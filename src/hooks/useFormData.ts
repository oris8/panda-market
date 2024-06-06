import { useState } from "react";

type FormData = {
  [key: string]: any;
};

const useFormData = <T extends FormData>(initialData: T = {} as T) => {
  const [formData, setFormData] = useState<T>(initialData);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: value,
    }));
  };

  return {
    formData,
    handleChange,
    handleImageChange,
  };
};

export default useFormData;
