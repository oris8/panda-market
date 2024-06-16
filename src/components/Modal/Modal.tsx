import Button from "../Button/Button";

interface ModalProps {
  IconComponent?: React.ReactNode;
  contentText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal = ({
  IconComponent,
  contentText,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}: ModalProps) => {
  return (
    <div className="flexcenter h-195 w-298 flex-col gap-8 rounded-12 bg-white p-20 shadow-sm shadow-[#00000050]">
      {IconComponent && <div className="modal-icon m-8">{IconComponent}</div>}
      <div className="modal-content mb-16">{contentText}</div>
      <div className="modal-actions">
        <Button
          onClick={onConfirm}
          className="ct--primary-button mr-8 inline-block h-48 w-88"
        >
          {confirmText}
        </Button>
        <Button
          onClick={onCancel}
          className="ct--primary-outline-button inline-block h-48 w-88"
        >
          {cancelText}
        </Button>
      </div>
    </div>
  );
};

export default Modal;
