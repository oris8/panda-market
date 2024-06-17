import BaseDropdown from "@/components/Dropdown/BaseDropdown";
import KebabIcon from "/public/images/ic_kebab.svg";

const EditDeleteDropdown = ({
  buttonContent = <KebabIcon />,
  onEdit,
  onDelete,
}: {
  buttonContent?: React.ReactElement;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <BaseDropdown buttonContent={buttonContent} className="ml-auto w-40 border-0">
    <div className="rounded-12 border-1 border-gray-200 bg-white">
      <button
        onClick={onEdit}
        className="flex w-128 justify-center border-b border-gray-200 p-8 text-base font-normal first:rounded-t-12 last:rounded-b-12 last:border-0"
      >
        수정하기
      </button>
      <button
        onClick={onDelete}
        className="flex w-128 justify-center border-b border-gray-200 p-8 text-base font-normal first:rounded-t-12 last:rounded-b-12 last:border-0"
      >
        삭제
      </button>
    </div>
  </BaseDropdown>
);

export default EditDeleteDropdown;
