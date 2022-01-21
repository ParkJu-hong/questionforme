import React, { useEffect } from 'react';
import { dbService } from "../fBase";

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
    const toggleEditing = () => {

    }
    return (
        <div>
            {answers.length !== 0 ? answers.map((el) => {
                return <div key={el.id}>
                    <div>whatnumberquestion : {el.whatnumberquestion}</div>
                    <div>text : {el.text}</div>
                    <button
                        name={el.id}
                        onClick={onDeleteClick}
                    >Delete Nweet</button>
                    <button onClick={toggleEditing}>Edit Nweet</button>
                </div>
            }) : "Initializing..."}
        </div>
    )
}

export default Answer
