import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginData } from "../../utilities/data";
import { ButtonUIComponent } from "../../utilities/UI/button.ui";
import { FormUIComponent } from "../../utilities/UI/form.ui";
import OptimizedImage from "../../utilities/UI/image.ui";
import { InputUIComponent } from "../../utilities/UI/input.ui";
import { TextUIComponent, TitleUIComponent } from "../../utilities/UI/texts.ui";
import { IconUIComponent } from "../../utilities/UI/icon.ui";
import { UserContext } from "../../contexts/user/user.context";
import { useHttpFetcher } from "../hooks/custom.hooks";


export function LoginComponent () {
    const navigate = useNavigate();
    const location = useLocation();
    const { userDispatch } = useContext(UserContext);
    const { fetchIt } = useHttpFetcher();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const isSignup = location.pathname.includes("/signup");

    const buttonText = isSignup ? "Create an account" : "Login";
    const toggleText = isSignup 
        ? "Already have an account? " 
        : "Don't have an account? ";
    const toggleLink = isSignup ? "Sign in" : "Sign up";

        const handleToggleAuth = () => {
        if (isSignup) {
            navigate("/login");
        } else {
            navigate("/signup");
        }
    };

    const handleDemoMode = () => {
        navigate("/demo/dashboard");
    };

    const handleInputChange = (data: any) => {
        setFormData(prev => ({
            ...prev,
            [data.name]: data.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setButtonLoading(true);

        try {
            // Validate inputs
            if (!formData.email || !formData.password) {
                setButtonLoading(false);
                return;
            }

            // Determine endpoint based on current URL
            const apiEndPoint = isSignup ? "register" : "login";
            
            // Make API call using fetchIt
            const res = await fetchIt({
                apiEndPoint,
                reqData: formData,
                httpMethod: 'post',
                isSuccessNotification: {
                    notificationState: true,
                    notificationText: isSignup ? "Account created successfully!" : "Login successful!"
                },
                buttonLoadingSetter: setButtonLoading,
            }) as any;

            // Check if response has payload (success)
            if (res?.payload) {
                const payloadUser = res.payload?.user;
                const payloadToken = res.payload?.token;
                
                // Store token and user info
                userDispatch({ type: "SET_USER", payload: payloadUser });
                userDispatch({ type: "SET_TOKEN", payload: payloadToken });

                // Redirect immediately to dashboard
                navigate("/user/dashboard");
            }

        } catch (error: any) {
            console.error('Login error:', error);
        } finally {
            setButtonLoading(false);
        }
    };

    return (
        <section className="min-h-screen w-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
            <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-[80%]! border border-gray-700 rounded-xl shadow-lg flex items-center flex-col px-2! py-7! md:px-7! lg:px-12! space-y-5! mb-10!">
                <div>
                    <OptimizedImage 
                    imageData={"https://cdn-icons-png.freepik.com/512/3562/3562012.png"}
                    alt="MetricPulse Logo"
                    className="w-16! mx-auto my-6"
                    />
                </div>
                <div className="w-full h-fit flex flex-col space-y-3!">
                    <TitleUIComponent
                    type="h2"
                    text="MetricPulse"
                    className="text-white! text-center"
                    />
                    <TextUIComponent 
                    type="h5"
                    text="AI-powered SaaS metrics dashboard"
                    className="text-gray-500! text-center"
                    />
                </div>
                <span onClick={handleDemoMode} className="w-full gap-4 bg-blue-700 hover:bg-primary cursor-pointer rounded-md flex items-center justify-center h-12"> 
                    <IconUIComponent 
                    icon="ri-sparkling-line"
                    className="text-xl text-white!"
                    />
                    <TextUIComponent 
                    type="h6"
                    className="text-white!"
                    text="Try Demo Mode"
                    />
                </span>
                <div className="w-full h-fit flex gap-2 text-gray-600 items-center">
                    <hr className="flex-1" />
                    <TextUIComponent 
                    type="p"
                    text="or Continue with"
                    />
                    <hr className="flex-1" />
                </div>
                <FormUIComponent className="w-full space-y-3!" onSubmit={handleSubmit}>
                    {loginData.map((login, ind) => (
                    <div key={ind} className="w-full">
                        <InputUIComponent
                        type={( login.label === "Password") ? "password" : "text"}
                        label={login.label}
                        name={login.label.toLowerCase()}
                        placeholder={login.placeholder}
                        value={formData[login.label.toLowerCase() as keyof typeof formData]}
                        onChange={handleInputChange}
                         />
                    </div>
                ))}
                    <ButtonUIComponent 
                    type="submit"
                    className="bg-slate-700 hover:bg-slate-600 w-full"
                    text={buttonLoading ? "Loading..." : buttonText}
                    isBorder={false}
                    isDisable={buttonLoading}
                    />
                </FormUIComponent>
                <span className="flex gap-2">
<TextUIComponent 
    type="p"
    text={toggleText}
    className="text-center text-gray-500! inline"
/>
<TextUIComponent 
    type="p"
    text={toggleLink}
    className="text-blue-500! hover:text-blue-400! cursor-pointer"
    onClick={handleToggleAuth}
/>
                </span>
            </div>
                            <TextUIComponent 
                type="p"
                text="Demo mode available - no signup required"
                className="text-center text-gray-500!"
                />
        </section>
    )
}