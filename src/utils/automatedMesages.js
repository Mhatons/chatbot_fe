import React, { useContext, useEffect, useState } from "react";
import { aiIcon } from "../assets/images";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { myContext } from "../context";

export default function AutomatedMessages({ changeLanguage }) {
    // const [selectedLanguage, setSelectedLanguage] = useState("english");
    // const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem("language") || "english");

    const { selectedLanguage, setSelectedLanguage } = useContext(myContext)
    const [values, setValues] = useState({ name: "", email: "" });
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const [userName, setUserName] = useState("");

    const handleSubmit = () => {
        if (values.name && values.email !== "") {
            console.log(values);
            localStorage.setItem("user", JSON.stringify(values))
            setUserName(values.name)
            setValues(" ");
            setIsUser(true);
        }
    }

    useEffect(() => {
        const locaUser = JSON.parse(localStorage.getItem("user"))
        if (locaUser) {
            setIsUser(true)
            setUserName(locaUser.name)
        }
        console.log(locaUser)
    }, [])

    useEffect(() => {
        if (values.name && values.email !== "") {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [values])

    const privacyStatus = localStorage.getItem("gdprStatus");

    function handleSelection(language) {
        console.log(language)
        localStorage.setItem("language", language)
        setSelectedLanguage(language)
    }

    const languages = [
        {
            title: "english",
            color: "green"
        },
        {
            title: "spanish",
            color: "orange"
        },
        {
            title: "french",
            color: "purple"
        },
    ]

    return (
        <div>
            {
                privacyStatus !== "true" && (
                    <>
                        {
                            !changeLanguage && (
                                <div className=" text-center m-auto w-[70%] gap-2 pt-10">
                                    <div className="flex justify-center items-center flex-col gap-3">
                                        <div className=" w-[90%]">
                                            <img src={aiIcon} alt="Welcome!!!" className="w-full" />
                                        </div>
                                        <div className={` mb-3 text-[18px] text-zinc-600`}>
                                            <p>Hello! my name is <b>Jimmy Smart</b>, I am your Virtual Assistant. How may I help you today?</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            changeLanguage && (
                                <div className="text-center py-16">
                                    {
                                        selectedLanguage === "spanish" ? (
                                            <>
                                                <h4>Elige tu preferencia de idioma.</h4>
                                                <h6>El idioma predeterminado es inglés.</h6>
                                            </>
                                        ) : selectedLanguage === "french" ? (
                                            <>
                                                <h4>Choisissez votre préférence de langue.</h4>
                                                <h6>La langue par défaut est l'anglais.</h6>
                                            </>
                                        ) : (
                                            <>
                                                <h4>Choose your language Preference.</h4>
                                                <h6>The default language is English</h6>
                                            </>
                                        )
                                    }
                                    <div className="pt-3">
                                        {
                                            languages.map((language) => (
                                                <div className="relative">
                                                    <button
                                                        // style={{ backgroundColor: language.color, }}
                                                        onClick={() => handleSelection(language.title)}
                                                        className={`hover:bg-red-50 hover:text-red-600 border border-red-600 bg-red-600 font-semibold text-white capitalize px-20 py-2 text-sm rounded-full cursor-pointer mt-2`}>
                                                        {language.title}
                                                    </button>
                                                    <IoCheckmarkCircleOutline className={`absolute right-7 ${selectedLanguage === language.title ? "" : "hidden"} top-3 text-2xl text-red-600`} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
            {
                privacyStatus === "true" && (
                    <div>
                        {
                            !isUser && (
                                <div className="text-center pt-20">
                                    <p>You're almost there. to complere your registeration, please enter your name and email below</p>
                                    <form onSubmit={handleSubmit} className=" text-left w-[80%] m-auto">
                                        <div className="pt-4">
                                            <input
                                                type="text"
                                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                                placeholder="name(s)"
                                                className="border focus:border-green-500 p-3 w-full outline-none rounded-md"
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <input
                                                type="email"
                                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                                                placeholder="email address"
                                                className="border focus:border-green-500 p-3 w-full outline-none rounded-md"
                                            />
                                        </div>
                                        <button className={`p-2 ${!isDisabled ? "bg-orange-500 text-white" : "bg-orange-50"} duration-700 w-full mt-4 rounded-md`}>Submit</button>
                                    </form>
                                </div>
                            )
                        }
                        {
                            isUser && (
                                <div className=" text-center m-auto w-[70%] gap-2 pt-10">
                                    <div className="flex justify-center items-center flex-col gap-3">
                                        <div className=" w-[90%]">
                                            <img src={aiIcon} alt="Welcome!!!" className="w-full" />
                                        </div>
                                        <div className={` mb-3 text-[18px] text-zinc-600`}>
                                            <p>Hello <b>{userName}</b>! my name is <b>Jimmy Smart</b>, I am your Virtual Assistant. How may I help you today?</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}