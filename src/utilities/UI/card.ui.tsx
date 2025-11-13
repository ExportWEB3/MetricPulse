import { Box } from "rizzui/box";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";
import { IconUIComponent } from "./icon.ui";
import { formatToTitleCase } from "../helperfunction";

export function CardUIComponent(props: {
  className?: string;
  title?: string;
  value?: string;
  titleClassName?: string;
  valueClassName?: string;
  icon?: string;
  data?: Record<string, string | number>; // optional object
}) {
  const {
    className,
    title,
    value,
    titleClassName,
    valueClassName,
    data,
    icon,
  } = props;

  // If data is passed, pick the first entry
  let displayTitle = title;
  let displayValue = value;

  if (data) {
    const [key, val] = Object.entries(data)[0] || [];
    displayTitle = formatToTitleCase(key);
    displayValue = String(val ?? "");
  }

  return (
    <Box
      className={`p-4! flex flex-col justify-center items-center rounded-[10px] min-h-[125px] bg-white border border-gray-600 shadow-md ${className}`}
    >
      <div className="flex justify-between">
        <IconUIComponent
        icon={icon as string}
        className={`${!icon && "hidden"}`}
      />
      <TextUIComponent
        type="p"
        text={displayTitle as string}
        className={`text-base ${titleClassName}`}
      />
      </div>

      <div className="flex flex-col gap-5">
        <TitleUIComponent
        type="h3"
        text={displayValue as string}
        className={`mt-2! ${valueClassName}`}
      />
      <TextUIComponent
      type="h5"
      text={displayTitle as string}
      className={`text-gray-500! ${titleClassName}`}
       />
      </div>
    </Box>
  );
}
