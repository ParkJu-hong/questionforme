import React, { useState, useEffect } from 'react'
import { dbService } from "../fBase";
import { useSelector } from "react-redux"
import Answer from './Answer';
import styled from "styled-components";

function Home() {
    const [answers, setAnswers] = useState([]);
    const [forRenderingRealTime, SetForRenderingRealTime] = useState(false);
    const userObj = useSelector(state => state.reducerLoggedIn.userObj);

    const getText = async () => {
        // 유저가 쓴 글
        let arrAnswers = [];
        let arrQuestions = []
        dbService.collection("test").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            // 해당 유저가 해당 유저가 쓴 글만 볼 수 있도록 필터링을 함.
            arrAnswers = nweetArray.filter((el) => {
                if (el.creatorId === userObj.uid && el.whatnumberquestion !== undefined) {
                    return true;
                }
            });
            arrAnswers = arrAnswers.sort((a, b) => {
                return a.whatnumberquestion - b.whatnumberquestion;
            });
        });
        
        dbService.collection("Questions").onSnapshot((snapshot) => {
            const questionsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            arrQuestions = questionsArray.slice();
        });

        setTimeout(() => {
            let i = 0;
            while (1) {
                if (arrAnswers[i] === undefined) break;
                arrAnswers[i]["whatnumberquestion"] = arrQuestions[Number(arrAnswers[i].whatnumberquestion) - 1].question;
                i++;
            }
        }, 500);
        setTimeout(() => {
            setAnswers(arrAnswers);
        }, 1000)
    }


    useEffect(() => {
        getText();
    }, [forRenderingRealTime]);
    return (
        <Main>
            <Answer
                answers={answers}
                forRenderingRealTime={() => {
                    SetForRenderingRealTime(!forRenderingRealTime)
                }} />
        </Main>
    )
}

const Main = styled.div`
    text-align: center;
    margin: 30px;
    border-radius: 3px;
`

export default Home