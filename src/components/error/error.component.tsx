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
  return (
    <>
      <div className="w-full h-screen fixed inset-0 flex justify-center items-center overflow-hidden bg-gray-900 bg-opacity-80 px-4! z-50">
        <div className="w-full sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-3/12 bg-white rounded-lg shadow-2xl p-8! min-h-64 justify-center flex flex-col items-center space-y-3! text-center">
          <IconUIComponent
            icon="ri-error-warning-line"
            className="text-red-500 text-6xl mb-4"
          />

          <TitleUIComponent
            text="Server is Down"
            type="h5"
            className="text-gray-800! mt-6! font-bold!"
          />

          <TextUIComponent
            type="p"
            text="The backend server is currently unavailable. Please check back later and refresh your browser."
            className="text-gray-600! mt-4 text-sm leading-relaxed"
          />

          <div className="">
            <ButtonUIComponent 
              text="Refresh Page" 
              className="hover:bg-gray-500"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
