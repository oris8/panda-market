import DeleteButton from "@/components/DeleteButton";

interface ItemTagProps {
  tag: string;
  onClick?: React.MouseEventHandler;
  isEditable?: boolean;
  className?: string;
}

const ItemTag = ({
  tag,
  onClick,
  isEditable = false,
  className,
}: ItemTagProps) => {
  return (
    <div
      className={`flex h-36 items-center justify-around gap-4 rounded-26 bg-gray-100 px-16 text-16 ${className}`}
    >
      <p>{isEditable ? tag : `#${tag}`}</p>
      {isEditable && onClick && <DeleteButton onClick={onClick} />}
    </div>
  );
};

export default ItemTag;
