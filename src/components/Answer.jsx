import React, { useEffect } from 'react';
import { dbService } from "../fBase";
import styled from "styled-components"

function Answer({ answers, forRenderingRealTime }) {
    useEffect(() => {
    }, [])

    const onDeleteClick = async (event) => {
        const ok = window.confirm("Are you sure you want to delete this answer?");
        if (ok) {
            const { target : { name }} = event;
            console.log("name : ", name);
            // delete 
            await dbService.doc(`test/${name}`).delete();
            forRenderingRealTime();
        } else {
            //  non delete 
        }
    }

    return (
        <div>
            {answers.length !== 0 ? answers.map((el) => {
                return <_Answer key={el.id}>
                    <span>
                    <div>Question : {el.whatnumberquestion}</div>
                    <div>{el.text}</div>
                    </span>
                    <DeleteButton
                        name={el.id}
                        onClick={onDeleteClick}
                    >Delete Nweet</DeleteButton>
                </_Answer>
            }) : "9qfm"}
        </div>
    )
}

const _Answer = styled.div`
    margin: 20px;
`
const DeleteButton = styled.button`
    margin-top: 5px;
`

export default Answer
