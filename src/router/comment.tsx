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
        console.log(456)
        const unsub = onSnapshot(doc(getFirestore(), 'comment', 'comments'), (doc) => {
            if (doc.exists()) {
                console.log(doc.data().commentArray)
                setComments(doc.data().commentArray)
                console.log(123)
            }
        })
        return () => unsub()
    }, [])

    function onCommentChange(event: any): void {
        const {target: {value}} = event;
        setCommentInput(value)
    }
    
    async function onSendClick() {
        let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        await updateDoc(doc(getFirestore(), 'comment', 'comments'), {
            commentArray: arrayUnion({
                content: commentInput,
                time: new Date().getTime(),
                date: monthArr[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear()
            })
        })

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
                <div className="comments">
                    {comments.map((comment: any): JSX.Element => (
                        <div key={comment.time}>
                            {comment.content}
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