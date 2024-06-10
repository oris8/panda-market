import { useState } from "react";
import BaseInput from "./BaseInput";
import EyeIcon from "/public/images/ic_eye.svg";
import EyeOffIcon from "/public/images/ic_eye-off.svg";

const PasswordInput = ({ ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <BaseInput type={isPasswordVisible ? "text" : "password"} {...rest} />
      <button
        type="button"
        onClick={handleTogglePasswordVisibility}
        className="absolute right-16 top-16 h-24 w-24 bg-transparent"
      >
        {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;
