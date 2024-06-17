import BaseButton from "./BaseButton";
import LinkButton from "./LinkButton";

const Button = Object.assign(BaseButton, {
  Link: LinkButton,
});

export default Button;
