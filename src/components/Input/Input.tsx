import BaseInput from "./BaseInput";
import ImageInput from "./ImageInput";
import MultiImageInput from "./MultiImageInput";
import PasswordInput from "./PasswordInput";
import SearchInput from "./SearchInput";
import TextAreaInput from "./TextAreaInput";

const Input = Object.assign(BaseInput, {
  TextArea: TextAreaInput,
  Image: ImageInput,
  Images: MultiImageInput,
  Search: SearchInput,
  Password: PasswordInput,
});

export default Input;
