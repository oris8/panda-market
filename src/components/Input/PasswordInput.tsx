import { useState, forwardRef } from "react";
import BaseInput from "./BaseInput";
import EyeIcon from "/public/images/ic_eye.svg";
import EyeOffIcon from "/public/images/ic_eye-off.svg";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    return (
      <div className="relative">
        <BaseInput
          type={isPasswordVisible ? "text" : "password"}
          ref={ref}
          {...rest}
        />
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="absolute right-16 top-16 h-24 w-24 bg-transparent"
        >
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
