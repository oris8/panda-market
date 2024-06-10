import BaseButton from "./BaseButton";
import PrimaryButton from "./PrimaryButton";
import LinkButton from "./LinkButton";

const Button = Object.assign(BaseButton, {
  Link: LinkButton,
  Primary: PrimaryButton,
});

export default Button;
