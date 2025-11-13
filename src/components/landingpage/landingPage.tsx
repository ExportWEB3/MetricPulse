import { TextUIComponent } from "../../utilities/UI/texts.ui";

export function LandingPageComponent() {
    return (
        <div className="w-full h-full flex flex-col items-center space-y-10! bg-pink-50">
            <div className="w-220 h-32 bg-white border border-black rounded-[25px]">
            </div>
            <div className="w-220 h-90 bg-white border border-black rounded-[25px]">
            </div>
            <div className="w-150 h-28 flex flex-col justify-between items-center">
                <TextUIComponent 
                type="h5"
                text="Don't have a WhatsApp Account? Get Started"
                className="text-black!"
                />
                <TextUIComponent 
                type="p"
                text="Your Personal Messages are end-to-end Encrypted"
                />
                <TextUIComponent 
                type="p"
                text="Terms & Privacy Policy"
                className="hover:underline cursor-pointer"
                />
            </div>
        </div>
    )
}