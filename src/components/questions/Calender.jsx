import React, { useState } from 'react'
import Question from './Question';
import { useSelector, useDispatch } from 'react-redux';

function Calender() {
    const [arr, setArr] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    const selected = useSelector(state => state.reducerLoggedIn.calenderSelected);
    const dispatch = useDispatch();
    return (
        <div style={{ textAlign: "center", margin: "40px"}}>
            {selected !== "" ? <Question whatnumberquestion={selected} /> : <>
                {arr.map((el, idx) => {
                    return <span 
                        key={idx}
                        style={{ margin: "20px", fontSize: "20px"}}
                        onClick={() => {
                            dispatch({
                                type: "CHANGE_CALENDER_NOT_NULL",
                                payload: {
                                    calenderSelected: el
                                }
                            })
                        }}>{el}</span>
                })}
            </>}
        </div>
    )
}

export default Calender
