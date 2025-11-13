import type { closeComponentAttributes } from "../typefiles";
import { IconUIComponent } from "./icon.ui";

export function ClosePopup(props: closeComponentAttributes) {
  const { onClick, className } = props;

  const handleClose = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <span>
      <span onClick={handleClose} className={`cursor-pointer`}>
        <IconUIComponent
          icon="ri-close-line"
          className={`text-primary-lighter text-2xl ${className}`}
        />
      </span>
    </span>
  );
}
