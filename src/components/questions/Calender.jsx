import React, { useState } from 'react'
import Question from './Question';

function Calender() {
    const [arr, setArr] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    const [selected, setSelected] = useState("");
    return (
        <div>
            {selected !== "" ? <Question whatnumberquestion={selected}/> : <>
                {arr.map((el, idx) => {
                    return <div key={idx}
                        onClick={() => { setSelected(el) }}>{el}</div>
                })}
            </>}
        </div>
    )
}

export default Calender
