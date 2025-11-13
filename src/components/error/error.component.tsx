import { useNavigate } from "react-router-dom";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { IconUIComponent } from "../../utilities/UI/icon.ui";

export function ComponentErrorDisplayer(props: {
  errorMessage: string;
  isHeaderText?: boolean;
  isShowButton?: boolean;
  className?: string;
  showBackground: boolean;
}) {
  const {
    errorMessage,
    isHeaderText = false,
    isShowButton,
    className,
    showBackground,
  } = props;
  const navigate = useNavigate();

  const handleAction = () => {
    navigate("/login");
  };

  return (
    <div
      className={` w-full  inset-0 flex flex-col items-center justify-center   text-center px-4 ${
        showBackground && "bg-black"
      } ${className}`}
    >
      <div className="mb-4  text-4xl">
        <IconUIComponent icon="ri-error-warning-line" />
      </div>

      {isHeaderText && <TitleUIComponent text="An Error Occurred" type="h5" />}

      <TextUIComponent
        className="text-gray-300! mt-4!"
        type="p"
        text={errorMessage || "Something went wrong"}
      />

      <div className={`mt-6 ${isShowButton ? "block" : "hidden"}`}>
        <ButtonUIComponent text="Go to Login" onClick={handleAction} />
      </div>
    </div>
  );
}

export function CheckServerStatus() {
  // Temporarily disable the server-down overlay so frontend work can continue
  // without the backend. Restore the JSX below when the backend is available.
  /*
  return (
    <>
      <div className="w-full h-screen fixed  flex justify-center items-center overflow-hidden bg-gray-200  px-4">
        <div className="w-full sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-3/12 bg-white rounded-md shadow-lg !p-6 h-56 justify-center flex flex-col items-center text-center">
          <IconUIComponent
            icon="ri-error-warning-line"
            className="text-primary-lighter text-6xl"
          />

          <TitleUIComponent
            text="Server is down at the moment!"
            type="h5"
            className="text-primary-light !mt-6"
          />

          <TextUIComponent
            type="p"
            text="Check back later and refresh the browser"
            className="text-primary-lighter mt-3"
          />
        </div>
      </div>
    </>
  );
  */

  return null;
}
