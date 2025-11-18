"use client"
import { useState } from "react";

export default function ToggleText(){
    const [showText, setShowText] = useState(false);
    return(
        <div className="p-6">
            <button onClick={()=> setShowText(!showText)} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">
                {showText ? "hide Text" : "show Text"}
            </button>
            {showText && <p className="mt-4">hola mundo</p>}
        </div>
    );
}