import { useContext } from "react";
import { IconUIComponent } from "./icon.ui";
import { TextUIComponent, TitleUIComponent } from "./texts.ui";
import { ButtonUIComponent } from "./button.ui";
import { UserContext } from "../../contexts/user/user.context";

export const GlobalErrorComponent = () => {
  const { userState: state } = useContext(UserContext);

  const handleNavigation = () => {};

  return (
    <>
      <section className="w-full flex h-screen flex-col justify-center items-center">
        <IconUIComponent
          icon="ri-error-warning-line"
          className="text-primary-darkSecondary text-5xl"
        />
        <TitleUIComponent type="h4" text="Error has occured" className="mt-4" />

        <TextUIComponent
          type="p"
          text={
            (state?.globalError?.errorMessage as string) ||
            "Global error has occured"
          }
          className={`pb-3 text-center px-4 mt-4!  ${
            !state?.globalError && "hidden"
          }`}
        />

        <ButtonUIComponent
          text="Home"
          onClick={handleNavigation}
          className="mt-4"
        />
      </section>
    </>
  );
};
