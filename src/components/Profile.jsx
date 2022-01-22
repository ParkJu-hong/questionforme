import React, { useState, useEffect } from 'react'
import { authService } from "../fBase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { dbService, storageService } from "../fBase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

function Profile() {
    const [text, setText] = useState("");
    const [memos, setMemos] = useState([]);
    const userObj = useSelector(state => state.reducerLoggedIn.userObj);
    const history = useHistory();

    useEffect(() => {
        dbService.collection("memo").onSnapshot((snapshot) => {
            const arrTemp = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setMemos(arrTemp);
        })
    }, [])

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setText(value);
    }
    const onSubmit = async () => {
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const ok = window.confirm("Are you sure you want to upload this?");
        if (ok) {
            const memo = {
                text,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            }
            await dbService.collection("memo").add(memo);
            setText("");

        } else {
            return;
        }
    }
    const onDeleteClick = async (event) => {
        const ok = window.confirm("Are you sure you want to delete this answer?");
        if (ok) {
            const { target : { name }} = event;
            console.log("name : ", name);
            // delete 
            await dbService.doc(`memo/${name}`).delete();
            // forRenderingRealTime();
        } else {
            //  non delete 
        }
    }

    return (
        <Main>
            <form>
                <input
                    type="text"
                    value={text}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="메모"
                    onClick={onSubmit}
                />
            </form>
            <button
                onClick={onLogOutClick}
                style={{ marginTop: "3vh" }}
            >Log Out</button>
            <div className="memoRendering" style={{ marginTop: "5vh" }}>
                {memos.map((el, idx) => {
                    return <div>
                        <span key={idx}>{el.text}</span>
                        <button
                            style={{ marginLeft: "2vh" }}
                            name={el.id}
                            onClick={onDeleteClick}
                        >삭제</button>
                    </div>
                })}
            </div>
        </Main>
    )
}
const Main = styled.div`
    text-align: center;
    /* border: 1px solid red; */
    margin: 40px;
`

export default Profile
