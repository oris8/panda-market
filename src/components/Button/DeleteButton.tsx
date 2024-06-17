import DeleteIcon from "/public/images/ic_delete.svg";
import ActiveDeleteIcon from "/public/images/ic_delete-active.svg";

interface DeleteButtonProps {
  className?: string;
  activeClassName?: string;
  svgClassName?: string;
  activeSvgClassName?: string;
  onClick: React.MouseEventHandler;
}

const DeleteButton = ({ className, onClick }: DeleteButtonProps) => {
  return (
    <button
      className={`block h-24 w-22 [&:hover_.active]:block [&:hover_svg]:hidden [&_.active]:hidden ${className}`}
      onClick={onClick}
      type="button"
    >
      <DeleteIcon />
      <ActiveDeleteIcon className="active" />
    </button>
  );
};

export default DeleteButton;
