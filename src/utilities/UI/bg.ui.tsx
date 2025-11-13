import { useEffect } from "react";

export function BackgroundBlur(props: {
  isBackground: boolean;
  zIndex?: string;
  className?: string;
  isVisible: boolean;
  isFullDarkBG?: boolean;
}) {
  const { zIndex, isBackground, isVisible, isFullDarkBG } = props;

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor:
          isBackground && !isFullDarkBG
            ? "rgba(0, 0, 0, 0.5)"
            : isFullDarkBG
            ? "rgba(0, 0, 0, 0.9)"
            : "",
      }}
      className={`fixed inset-0 overflow-hidden animate-fade-in ${
        zIndex || "z-5"
      } ${isVisible ? "block" : "hidden"} `}
    ></div>
  );
}
