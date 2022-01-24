import React, { useEffect } from 'react';
import { dbService } from "../fBase";
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function Answer({ answers, forRenderingRealTime }) {
    useEffect(() => {
    }, [])

    const onDeleteClick = async (event) => {
        const ok = window.confirm("Are you sure you want to delete this answer?");
        if (ok) {
            const { target: { name, value } } = event;
            console.log("name : ", name);
            console.log("value : ", value);
            // delete 
            await dbService.doc(`test/${name}`).delete();
            forRenderingRealTime();
        } else {
            //  non delete 
        }
    }

    return (
        <div style={{ }}>
            {answers.length !== 0 ? answers.map((el) => {
                return <_Answer key={el.id}>
                    <div style={{ flex: 1}}>
                    <div>Question : {el.whatnumberquestion}</div>
                    <div>{el.text}</div>
                    </div>
                    <DeleteButton
                        name={el.id}
                        onClick={onDeleteClick}
                    >삭제</DeleteButton>
                </_Answer>
            }) : <div >9qfm</div>}
        </div>
    )
}

const _Answer = styled.div`
    margin: 20px;
    display: flex;
`
const DeleteButton = styled.button`
    margin-top: 5px;
    border: 0;
    background-color: white;
`

export default Answer