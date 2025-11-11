"use client"
import { useState } from "react"

export default function CounterPage(){
    const [count, setCount] = useState(0)
    return(
        <div>
            <h2>Clicks: {count}</h2>
            <div>
                <button onClick={()=> setCount(count + 1)}>
                    +1
                </button>
                <button onClick={()=> setCount(count -1)}>
                    -1
                </button>
            </div>
        </div>
    )
}