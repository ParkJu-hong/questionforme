import React, { useState, useEffect } from 'react'
import { dbService, storageService } from "../fBase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Calender from './questions/Calender';

import { collection, query, where, getDocs } from "firebase/firestore";

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
        setText("");
    };
    useEffect(async () => {
        dbService.collection("test").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray);
        });
        dbService.collection("Questions").onSnapshot((snapshot) => {
            const questionsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setQuestions(questionsArray);
        });

        // filtering test code 
        const q = query(collection(dbService, "test"), where("whatnumberquestion", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
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