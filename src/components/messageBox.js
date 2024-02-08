import React from "react";

export default function MessageBox() {
    return (
        <div className=" hideScrollBar shadow-md border fixed bottom-16 right-14 w-[400px] min-h-52 max-h-96 overflow-y-scroll rounded-xl">
            <div className="p-4">
                <div className="flex justify-end">
                    <div className="bg-zinc-100 py-2 px-3 rounded-s-2xl max-w-[60%] mb-2 text-sm text-zinc-600">
                        <p>what is photosynthesis?</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-zinc-100 py-2 px-3 rounded-s-2xl max-w-[60%] mb-2 text-sm text-zinc-600">
                        <p>tell me about the black hole and how it interracts with human existence</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-zinc-100 py-2 px-3 rounded-s-2xl max-w-[60%] mb-2 text-sm text-zinc-600">
                        <p>what is photosynthesis?</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-zinc-100 py-2 px-3 rounded-s-2xl max-w-[60%] mb-2 text-sm text-zinc-600">
                        <p>tell me about the black hole and how it interracts with human existence tell me about the black hole and how it interracts with human existence tell me about the black hole and how it interracts with human existence tell me about the black hole and how it interracts with human existence tell me about the black hole and how it interracts with human existence</p>
                    </div>
                </div>
            </div>
        </div>
    )
}