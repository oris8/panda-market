import ItemTag from "@/components/Item/ItemTag";

interface ItemTagListProps {
  className?: string;
  tags: string[];
  isEditable: boolean;
  onClickTag: () => void;
}

const ItemTagList = ({
  className,
  tags,
  isEditable,
  onClickTag,
}: ItemTagListProps) => {
  return (
    <div className={className}>
      {tags.map((tag: string) => (
        <ItemTag
          key={tag}
          tag={tag}
          onClick={onClickTag}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
};

export default ItemTagList;
