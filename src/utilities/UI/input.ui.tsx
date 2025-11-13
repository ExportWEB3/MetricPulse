import { useState } from "react";
import { IconUIComponent } from "./icon.ui";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";
import type { inputAttributes, textAreaAttributes } from "../typefiles";

export function InputUIComponent(props: inputAttributes) {
  const {
    label,
    type,
    isError,
    className,
    placeholder,
    name,
    isDisable,
    isReadOnly,
    onChange,
    isRequired,
    customData,
    value,
    isCheckedState,
    checked,
    onKeyDown,
  } = props;
  const [inputLevelState, setInputLevelState] = useState<{
    isVisible: boolean;
    isHover: boolean;
  }>({ isVisible: true, isHover: false });

  const toggleVisibility = () => {
    if (type !== "password") return;

    setInputLevelState({
      ...inputLevelState,
      isVisible: !inputLevelState?.isVisible,
    });
    return;
  };

  const handleOnchange = (text: string | boolean) => {
    if (!onChange) return;
    const data = {
      value: text,
      payload: customData,
      name: name,
    };
    onChange(data);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(e);
    if (e.key === "Enter" && onKeyDown) {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      onKeyDown(e);
      target.value = "";
    }
    return;
  };

  return (
    <div className=" flex flex-col">
      <TextUIComponent
        type="p"
        text={`${label}`}
        className={`text-xs font-semibold mt-2! text-gray-300! pb-2! ${!label && "hidden"}`}
      />
      <div
        onFocus={() =>
          setInputLevelState({ ...inputLevelState, isHover: true })
        }
        onBlur={() =>
          setInputLevelState({ ...inputLevelState, isHover: false })
        }
        className={`w-full! flex items-center  justify-between transition duration-300 ease-in-out bg-slate-900/50 border border-slate-700 rounded-md  h-12  ${
          inputLevelState?.isHover && "border-primary border-[1.5px] shadow-md "
        } ${className} ${isError && "border-red"}`}
      >
        <input
          type={
            type === "password"
              ? inputLevelState?.isVisible
                ? "password"
                : "text"
              : type
          }
          placeholder={placeholder || "Write"}
          className={`${
            type === "password" ? "w-11/12" : "w-full"
          } h-full outline-none indent-3 text-white`}
          value={value}
          onKeyDown={(e) => handleOnKeyDown(e)}
          name={name}
          required={isRequired}
          readOnly={isReadOnly}
          disabled={isDisable}
          checked={checked}
          onChange={(e) =>
            handleOnchange(isCheckedState ? e.target.checked : e?.target?.value)
          }
        />

        <span
          className={` w-1/12 ${
            type !== "password" && "hidden"
          } flex justify-center cursor-pointer`}
          onClick={toggleVisibility}
        >
          <IconUIComponent
            icon={`${
              inputLevelState?.isVisible ? `ri-eye-off-line` : `ri-eye-line`
            }`}
            className="text-xl"
          />
        </span>
      </div>
    </div>
  );
}

export function TextAreaComponent(props: textAreaAttributes) {
  const {
    onChange,
    customData,
    className,
    placeHolder,
    value,
    isDisabled,
    isReadOnly,
    isError,
    name,
  } = props;
  const [inputLevelState, setInputLevelState] = useState<{
    isVisible: boolean;
    isHover: boolean;
  }>({ isVisible: true, isHover: false });

  const handleOnchange = (text: string) => {
    if (!onChange) return;
    const payload = {
      value: text,
      payload: customData,
      name,
    };
    onChange(payload);
  };
  return (
    <div className={`w-full flex flex-col`}>
      <textarea
        onFocus={() =>
          setInputLevelState({ ...inputLevelState, isHover: true })
        }
        onBlur={() =>
          setInputLevelState({ ...inputLevelState, isHover: false })
        }
        readOnly={isReadOnly}
        disabled={isDisabled}
        onChange={(text) => handleOnchange(text?.target?.value)}
        placeholder={placeHolder}
        value={value}
        className={`border ${
          isError ? "border-red" : "border-primary-transparentBlack"
        } outline-none rounded-md p-4! min-h-[100px] h-[150px] text-primary-darkSecondary transition duration-300 ease-in-out  border-primary-teal
         ${className}
        ${
          inputLevelState?.isHover &&
          "border-primary-teal border-[1.5px] shadow-md "
        }
        `}
      />

      {isError && (
        <TitleUIComponent
          type="h5"
          text="Field is Required"
          className="mt-2 text-primary-dark"
        />
      )}
    </div>
  );
}
