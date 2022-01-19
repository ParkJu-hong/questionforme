import React, { useState, useEffect } from 'react';
import { dbService, storageService } from "../../fBase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function Question({ whatnumberquestion = ""}) {
    const [question, setQuestion] = useState({});
    const [text, setText] = useState("");
    const userObj = useSelector(state => state.reducerLoggedIn.userObj);
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setText(value);
    };
    const onSubmit = async (event) => {
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const nweetObj = {
            text,
            whatnumberquestion,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        }
        await dbService.collection("test").add(nweetObj);
        setText("")
    };
    useEffect(()=>{
        dbService.collection("Questions").onSnapshot((snapshot) => {
            const questionsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            const result = questionsArray.filter((el) => el.id === whatnumberquestion);
            setQuestion(result[0]);
        });

    }, [])
    return (
        <div>
            {Number(whatnumberquestion)} Question
            <div>{question.question}</div>
            <form>
                <input 
                type="text"
                value={text}
                onChange={onChange}
                />
                <input 
                type="submit"
                onClick={onSubmit}
                />
            </form>
        </div>
    )
}

export default Question
