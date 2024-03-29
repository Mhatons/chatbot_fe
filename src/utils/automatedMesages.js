import React, { useContext, useEffect, useState } from "react";
import { aiIcon } from "../assets/images";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { myContext } from "../context";

export default function AutomatedMessages({ changeLanguage }) {
    // const [selectedLanguage, setSelectedLanguage] = useState("english");
    // const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem("language") || "english");

    const { selectedLanguage, setSelectedLanguage } = useContext(myContext)

    console.log("selected Langauge", selectedLanguage)

    const privacyStatus = localStorage.getItem("gdprStatus")

    function handleSelection(language) {
        console.log(language)
        localStorage.setItem("language", language)
        setSelectedLanguage(language)
    }

    console.log(privacyStatus)
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
                                    <h4>Choose your language Preference.</h4>
                                    <h6>The default language is English</h6>
                                    <div className="pt-3">
                                        {
                                            languages.map((language) => (
                                                <div className="relative">
                                                    <button
                                                        style={{ backgroundColor: language.color }}
                                                        onClick={() => handleSelection(language.title)}
                                                        className=" hover:px-24 font-semibold text-white capitalize duration-500 px-20 py-2 text-sm rounded-full cursor-pointer mt-2">
                                                        {language.title}
                                                    </button>
                                                    <IoCheckmarkCircleOutline className={`absolute right-10 ${selectedLanguage === language.title ? "" : "hidden"} top-3 text-2xl text-green-600`} />
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
        </div>
    )
}