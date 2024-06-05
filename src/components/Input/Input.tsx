import BaseInput from "./BaseInput";
import ImageInput from "./ImageInput";
import PasswordInput from "./PasswordInput";
import SearchInput from "./SearchInput";
import TextAreaInput from "./TextAreaInput";

const Input = Object.assign(BaseInput, {
  TextArea: TextAreaInput,
  Image: ImageInput,
  //todo  Images: ImagesInput,
  Search: SearchInput,
  Password: PasswordInput,
});

export default Input;
