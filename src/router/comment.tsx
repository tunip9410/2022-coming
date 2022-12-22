import React, { useEffect, useState } from 'react';
import {
    arrayUnion,
    updateDoc,
    doc,
    onSnapshot,
    getFirestore } from '@firebase/firestore';
import SendImage from "../image/send-white.png";

function Comment() {
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState<String>("")
    const commentInputElement: any = document.getElementById("input-comment")
    const [count, setCount] = useState(0)

    useEffect(() => {
        const unsub = onSnapshot(doc(getFirestore(), 'comment', '2023-comments'), (doc) => {
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
        if (commentInput !== "" && commentInput.length < 30 && count < 3) {
            let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            await updateDoc(doc(getFirestore(), 'comment', '2023-comments'), {
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

    setInterval(() => setCount(0), 6000)

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