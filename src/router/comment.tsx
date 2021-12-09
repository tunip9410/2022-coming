import React, { useEffect, useState } from 'react';
import {
    arrayUnion,
    updateDoc,
    doc,
    setDoc,
    onSnapshot,
    getFirestore } from '@firebase/firestore';
import SendImage from "../image/send-white.png";

function Comment() {
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState<String>("")
    const commentInputElement: any = document.getElementById("input-comment")

    useEffect(() => {
        const unsub = onSnapshot(doc(getFirestore(), 'comment', 'comments'), (doc) => {
            if (doc.exists()) {
                setComments(doc.data().commentArray.sort((a: any, b: any) => parseFloat(b.time) - parseFloat(a.time)))
            }
        })
        return () => unsub()
    }, [])

    function onCommentChange(event: any): void {
        const {target: {value}} = event;
        setCommentInput(value)
    }
    
    async function onSendClick() {
        if (commentInput !== "") {
            let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            await updateDoc(doc(getFirestore(), 'comment', 'comments'), {
                commentArray: arrayUnion({
                    content: commentInput,
                    time: new Date().getTime(),
                    date: monthArr[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear()
                })
            })
        }

        setCommentInput("")
        if (commentInputElement instanceof HTMLInputElement) {
            commentInputElement.value = ""
        }
    }

    function enterKey(event: any) {
        if (event.key === "Enter") {
            onSendClick()
        }
    }

    return (
        <div className="comment">
            {comments !== undefined && (
                <div className="comments" id="comments-box">
                    {comments.map((comment: any): JSX.Element => (
                        <div key={comment.time} className="comment-box">
                            <p className="comment-text">{comment.content}</p>
                            <p className="comment-date">{comment.date}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="addComment">
                <div className="inputCommentBox">
                    <input type="text" className="input-comment" id="input-comment" placeholder="Add your comment" onChange={onCommentChange} onKeyPress={enterKey}/>
                </div>
                <div className="addButton">
                    <a href="#" onClick={onSendClick}>
                        <img src={SendImage} alt="send button" width="25px" className="send-image" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Comment;