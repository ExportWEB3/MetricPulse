import { useState } from "react";
import { Button } from "rizzui/button";
import { IconUIComponent } from "./icon.ui";
import type { ButtonAttributes } from "../typefiles";

export function ButtonUIComponent(props: ButtonAttributes) {
  const {
    text,
    className,
    onClick,
    type,
    isDisable,
    isBorder,
    icon,
    iconClassName,
  } = props;
  const [buttonState, setButtonState] = useState<{ isHover: boolean }>({
    isHover: false,
  });

  const handleOnclick = () => {
    if (!onClick) return;

    onClick();
  };
  return (
    <>
      <Button
        onMouseEnter={() => setButtonState({ ...buttonState, isHover: true })}
        onMouseLeave={() => setButtonState({ ...buttonState, isHover: false })}
        disabled={isDisable}
        type={type ? type : "button"}
        onClick={handleOnclick}
        className={`${
          buttonState?.isHover ? " bg-secondary-red" : "bg-primary"
        } cursor-pointer text-white w-auto transition duration-300 ease-in-out rounded-[5px] text-sm h-[45px] font-semibold  px-4! ${
          isBorder ? "border" : "border-none"
        } w-44  flex items-center text-xs sm:text-[16px] sm:leading-2.5 ${className}`}
      >
        <span>{text}</span>
        <span className={`${!icon && "hidden"}`}>
          <IconUIComponent
            className={`${iconClassName} text-sm md:text-base`}
            icon={icon || ""}
          />
        </span>
      </Button>
    </>
  );
}
