import React, { useState, useEffect } from 'react';
import { dbService, storageService } from "../../fBase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";

function Question({ whatnumberquestion = "" }) {
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
        const ok = window.confirm("Are you sure you want to upload this?");
        if (ok) {
            const nweetObj = {
                text,
                whatnumberquestion,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            }
            await dbService.collection("test").add(nweetObj);
            setText("");
            window.confirm("Success");
        } else {
            return;
        }
    };
    useEffect(() => {
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
        <Main>
            {Number(whatnumberquestion)} Question
            <div>{question.question}</div>
            <form>
                <InputText
                    type="text"
                    value={text}
                    onChange={onChange}
                />
                <InputSubmit
                    type="submit"
                    onClick={onSubmit}
                />
            </form>
        </Main>
    )
}

const Main = styled.div`
    text-align: center;
    /* border: 1px solid red; */
    margin: 40px;
`

const InputText = styled.input`
  width: 100%;
  height: 50px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  background-color: rgb(233, 233, 233);
`


const InputSubmit = styled.input`
    border: 0;
    background-color: white;
`

export default Question
