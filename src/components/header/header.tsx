import OptimizedImage from "../../utilities/UI/image.ui";
import { TitleUIComponent } from "../../utilities/UI/texts.ui";
import { CSVUploadButton } from "./csv-upload";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { useLogout } from "../hooks/custom.hooks";


export function HeaderComponent() {
  const { handleLogout } = useLogout();

    return (
        <div className="w-full h-30 min-[360px]:h-16 flex flex-col min-[360px]:flex-row items-center border-b border-slate-700 py-2! px-4!">
            <div className="w-full sm:w-1/2 h-full flex gap-4 items-end ">
            <OptimizedImage 
            imageData={"https://cdn-icons-png.freepik.com/512/3562/3562012.png"}
            alt="MetricPulse Logo"
            className="w-10!"
            />
            <TitleUIComponent
            type="h3"
            text="MetricPulse"
            className="text-white! text-center"
            />
            </div>
            <div className="w-full sm:w-1/2 h-full flex justify-end items-end gap-5 md:gap-10">
              <CSVUploadButton />
              <button
                onClick={handleLogout}
                className="w-10 h-10 cursor-pointer flex items-center justify-center border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition"
                title="Logout"
              >
                <IconUIComponent
                    icon="ri-logout-box-line"
                    className="text-xl text-gray-400!"
                 />
              </button>
            </div>
        </div>
    )
}