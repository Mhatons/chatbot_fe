import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import MessageBox from "./messageBox";

export default function ChatBox() {
    const [openChat, setOpenChat] = useState(false)

    return (
        <div className="fixed bottom-2 right-3">
            <div onClick={() => setOpenChat(!openChat)} className="h-14 w-14 rounded-full shadow-md flex justify-center items-center cursor-pointer">
                <IoChatbubbleEllipses className=" text-[30px] text-orange-500 " />
            </div>
            {
                openChat && <MessageBox />
            }
        </div>
    )
}