import React, { useState, useEffect } from 'react'
import { dbService, storageService } from "../fBase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Calender from './questions/Calender';

function Home() {
    const [text, setText] = useState("");
    const [nweets, setNweets] = useState([]);
    const [questions, setQuestions] = useState([]);
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
            createdAt: Date.now(),
            creatorId: userObj.uid,
        }
        await dbService.collection("test").add(nweetObj);
        setText("")
    };
    useEffect(() => {
        dbService.collection("test").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray);
        });
        
        // 지금하고싶은게.. 필터링하는 것
        /*
            creatorId, whatnumberquestion에 따라 사용자에 따라 프론트로 렌더링하는 거랑
            createdAt이걸로 최신순부터 위로가게끔 차순정렬하는 필터링을 하고싶음.
        */

        dbService.collection("Questions").onSnapshot((snapshot) => {
            const questionsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log("questionsArray : ", questionsArray);
            setQuestions(questionsArray);
        });
    }, []);
    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Enter"
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Submit!"
                    onClick={onSubmit}
                />
            </form>
            <div>
                {nweets.map((el) => {
                    return <div key={el.id}>
                        <div>createdAt : {el.createdAt}</div>
                        <div>creatorId : {el.creatorId}</div>
                        <div>text : {el.text}</div>
                    </div>
                })}
            </div>
            <Calender />
        </div>
    )
}

export default Home