import React, { useState, useEffect } from 'react'
import { authService } from "../fBase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { dbService, storageService } from "../fBase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
                <InputText
                    type="text"
                    value={text}
                    onChange={onChange}
                />
                <InputSubmit
                    type="submit"
                    value="메모"
                    onClick={onSubmit}
                />
            </form>
            <LogOutButton
                onClick={onLogOutClick}
                style={{ marginTop: "3vh"}}
            >Log Out</LogOutButton>
            <div className="memoRendering" style={{ marginTop: "5vh" }}>
                {memos.map((el, idx) => {
                    return <div key={idx}>
                        <div >{el.text}</div>
                        <LogOutButton
                            style={{ marginLeft: "2vh" }}
                            name={el.id}
                            onClick={onDeleteClick}
                        >삭제</LogOutButton>
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

const LogOutButton = styled.button`
    border: 0;
    background-color: white;  
`

export default Profile
