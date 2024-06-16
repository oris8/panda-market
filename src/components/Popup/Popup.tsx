import Button from "../Button/Button";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup = ({ isOpen, onClose, children }: PopupProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="flexcenter relative inset-0 h-250 w-[540px] rounded-8 bg-white">
            {children}
            <Button
              onClick={onClose}
              className="ct--primary-button absolute bottom-16 right-16 h-48 w-120"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
