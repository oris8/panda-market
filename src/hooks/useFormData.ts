import { useState } from "react";

type FormValues = {
  [key: string]: any;
};

const useFormData = (initialData: FormValues) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (value: File | string) => {
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
