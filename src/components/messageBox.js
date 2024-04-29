import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoCheckmark, IoCheckmarkCircleOutline, IoClose, IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import { RiSendPlane2Fill } from "react-icons/ri";
import { LoadingIcon } from "../assets/images";
import AutomatedMessages from "../utils/automatedMesages";
import { myContext } from "../context";

export default function MessageBox({ openModal }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showGdpr, setShowGdpr] = useState(true);
    const [showLanguageOptions, setLanguageOptions] = useState(false);
    const [isEncryption, setEncryption] = useState(false)
    const messagesEndRef = useRef(null);

    const { selectedLanguage } = useContext(myContext)

    // const selectedLanguageOption = localStorage.getItem("language")

    // useEffect(() => {
    //     // Listen for changes to selectedLanguage in localStorage
    //     const handleStorageChange = () => {
    //         setSelectedLanguage(localStorage.getItem("language") || "english");
    //     };

    //     window.addEventListener("storage", handleStorageChange);

    //     return () => {
    //         console.log("ccccccccccccc", selectedLanguage)
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, []);
    // console.log("vvvvvvvvvvvvvvvvvv", selectedLanguage)

    useEffect(() => {
        setTimeout(() => {
            setLanguageOptions(true);
        }, 4000);
    }, []);

    useEffect(() => {
        // Scroll to the last message when messages change
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        setIsLoading(true);

        try {
            const witResponse = await axios.get(
                `https://api.wit.ai/message?v=20240219&q=${encodeURIComponent(
                    inputMessage
                )}`,
                {
                    headers: {
                        Authorization: "Bearer DIJ4AZWYEAWNK54UQVHOOB3FIX5JEAQJ",
                    },
                }
            );

            const newMessage = {
                type: "user",
                text: inputMessage,
            };

            const newResponse = {
                type: "ai",
                text: witResponse.data.intents[0].name.replace(/_/g, ' '), // Replace underscores with spaces
            };

            setMessages([...messages, newMessage, newResponse]);
            setInputMessage("");
        } catch (error) {
            console.error("Error calling Wit.ai API:", error);
        }

        setIsLoading(false);
    };

    const handlePrivacyAcceptance = () => {
        setShowGdpr(false);
        setLanguageOptions(false);
        localStorage.setItem("gdprStatus", "true")
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleGDPRClick = (externalLink) => {
        window.open(externalLink, '_blank');
    };

    const privacyStatus = localStorage.getItem("gdprStatus");

    return (
        <div className=" shadow-2xl bg-[#FCFCFF] border-t overflow-hidden fixed smm:bottom-10 smmm:bottom-3 bottom-0 smm:right-20 smmm:right-3 smmm:w-[350px] w-full max-smmm:m-auto h-[30em] smmm:rounded-xl">
            <div className="px-4 pb-10 pt-4 h-[25.5em] overflow-y-scroll hideScrollBar">
                <AutomatedMessages changeLanguage={showLanguageOptions} />

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} ${message.type === "user" ? "items-end" : "items-start"} gap-2 mb-3`}
                    >
                        {
                            message.type === "ai" && (
                                <div className="rounded-full border text-sm text-zinc-100 h-7 w-7 bg-purple-500 flex justify-center items-center">
                                    <p>AI</p>
                                </div>
                            )
                        }
                        <div className={`bg-zinc-100 py-2 px-3 ${message.type === "user" ? "rounded-s-2xl" : "rounded-r-2xl"} rounded-t-2xl max-w-[60%] text-sm text-zinc-600`}>
                            <p>{message.text}</p>
                        </div>
                        {
                            message.type === "user" && (
                                <div className="rounded-full border text-sm text-zinc-100 h-7 w-7 bg-orange-500 flex justify-center items-center">
                                    <p><IoPersonOutline /></p>
                                </div>
                            )
                        }
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
                {
                    isLoading && (
                        <div className="flex justify-start items-start gap-2 mb-3">
                            <div className="w-[40px]">
                                <img src={LoadingIcon} alt="Loading..." className="w-full" />
                            </div>
                        </div>
                    )
                }
            </div>
            {
                privacyStatus === "true" && (
                    <div className="h-[65px] w-full absolute border-t bottom-0 flex justify-center items-center ">
                        <div className="flex items-center w-[95%] m-auto gap-2  py-2 px-4 rounded-full">
                            <div className="relative">
                                <IoLockClosedOutline onClick={() => setEncryption(!isEncryption)} className=" text-zinc-500 text-md cursor-pointer hover:text-zinc-700" />
                                {
                                    isEncryption && (
                                        <div className=" p-2 rounded-md absolute top-[-50px] text-[9px] w-[160px] bg-white shadow-xl">
                                            This conversation is encrypted with end to end user privacy policy
                                        </div>
                                    )
                                }
                            </div>
                            <input
                                type="text"
                                placeholder="ask questions"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full outline-none bg-transparent "
                            />
                            <RiSendPlane2Fill onClick={sendMessage} className="text-zinc-500 text-xl cursor-pointer hover:text-zinc-700" />
                        </div>
                    </div>
                )
            }
            {
                privacyStatus !== "true" && (
                    <>
                        {
                            !showGdpr && (
                                <div className="h-[65px] w-full absolute border-t bottom-0 flex justify-center items-center ">
                                    <div className="flex items-center w-[90%] m-auto gap-2  py-2 px-4 rounded-full">
                                        <input
                                            type="text"
                                            placeholder="ask questions"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            className="w-full outline-none bg-transparent "
                                        />
                                        <RiSendPlane2Fill onClick={sendMessage} className="text-zinc-500 text-xl cursor-pointer hover:text-zinc-700" />
                                    </div>
                                </div>
                            )
                        }
                        {
                            showLanguageOptions && (
                                <>
                                    {
                                        showGdpr && (
                                            <div className="pt-0 min-h-[65px] py-2 text-center text-[12px] px-8">
                                                {
                                                    selectedLanguage === "english" && (
                                                        <>
                                                            To continue using the Avi chatbot, you must agree to the
                                                            <b onClick={() => handleGDPRClick("https://avenueimpactconsulting.com/privacy-policy/")} className=" cursor-pointer text-zinc-700">
                                                                {` GDPR `}
                                                            </b>
                                                            terms and privacy conditions
                                                        </>
                                                    )
                                                }
                                                {
                                                    selectedLanguage === "french" && (
                                                        <>

                                                            Pour continuer à utiliser le chatbot Avi, vous devez accepter les conditions du
                                                            <b onClick={() => handleGDPRClick("https://docs.google.com/document/d/1J-cwufGG7RDQ3KEveZuX1xDLMBdHwT6F-qQNWAKguy0/edit?usp=sharing")} className=" cursor-pointer text-zinc-700">
                                                                {` RGPD `}
                                                            </b>
                                                            et les conditions de confidentialité.
                                                        </>
                                                    )
                                                }
                                                {
                                                    selectedLanguage === "spanish" && (
                                                        <>
                                                            Para continuar utilizando el chatbot Avi, debes aceptar los términos del
                                                            <b onClick={() => handleGDPRClick("https://docs.google.com/document/d/1aOcJ2WKyQospEV3l9DHzAjd-YBR1qfozX3a9Spm9Z6s/edit?usp=sharing")} className=" cursor-pointer text-zinc-700">
                                                                {` RGPD `}
                                                            </b>
                                                            y las condiciones de privacidad.
                                                        </>
                                                    )
                                                }
                                                <div className="flex pt-1 items-center justify-center gap-2">
                                                    <button onClick={handlePrivacyAcceptance} className=" flex items-center gap-1 border hover:bg-green-50 text-green-600 border-green-600 rounded px-2 py-[1px]">
                                                        {
                                                            selectedLanguage === "english" ? <p>Continue</p> :
                                                                selectedLanguage === "french" ? <p>Continuer</p> :
                                                                    selectedLanguage === "spanish" ? <p>Continuar</p> : ""
                                                        }
                                                        <IoCheckmarkCircleOutline className="text-[20px] " />
                                                    </button>
                                                    <button onClick={() => { handleGDPRClick("https://avenueimpactconsulting.com/about-us/"); openModal() }} className=" flex items-center hover:bg-red-50 text-red-600 border border-red-600 rounded px-2 py-[1px]">
                                                        {
                                                            selectedLanguage === "english" ? <p>Decline</p> :
                                                                selectedLanguage === "french" ? <p>Décliner</p> :
                                                                    selectedLanguage === "spanish" ? <p>Rechazar</p> : ""
                                                        }
                                                        <IoClose className="text-[20px] " />
                                                    </button>

                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                )
            }

            <div className="absolute  top-2 right-2 z-20">
                <IoClose onClick={openModal} className=" closeBtn text-[30px] border rounded-full p-1 hover:bg-red-500 cursor-pointer hover:text-white " />
            </div>
        </div>
    );
}
