
import { Text, Title } from "rizzui/typography";
import { useState } from "react";
import type { TextAttributes, textTypeAttributes, titleTextTypeAttributes } from "../typefiles";

export function TextUIComponent(props: TextAttributes) {
  const { type, url, className, text, onClick } = props;
  const handleNavigation = () => {
    if (!url && onClick) {
      onClick();
      return;
    } else if (!url) return;
    //navigate(`/${url}`);
  };
  return (
    <Text
      onClick={handleNavigation}
      as={type as textTypeAttributes}
      className={`text-xs lg:text-base ${className}`}
    >
      {text}
    </Text>
  );
}

export function TitleUIComponent(props: TextAttributes) {
  const { type, url, className, text, isHover, onClick } = props;
  const [textComponentState, settextComponentState] = useState<{
    isHover: boolean;
  }>({ isHover: false });

  const handleNavigation = () => {
    if (!url && onClick) {
      onClick();
      return;
    } else if (!url) return;
    //navigate(`/${url}`);
  };

  return (
    <Title
      onClick={handleNavigation}
      onMouseEnter={() =>
        settextComponentState({ ...textComponentState, isHover: true })
      }
      className={` font-semibold!  ${className} ${
        isHover &&
        textComponentState?.isHover &&
        "text-shadow-primary-teal-hover"
      }`}
      onMouseLeave={() =>
        settextComponentState({ ...textComponentState, isHover: false })
      }
      as={type as titleTextTypeAttributes}
    >
      {text}
    </Title>
  );
}
