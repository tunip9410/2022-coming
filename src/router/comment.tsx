import React, { useEffect, useState } from 'react';
import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    getFirestore } from '@firebase/firestore';

function Comment() {
    const [comments, setComments] = useState([])

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
    
    console.log(comments)

    return (
        <div className="comment">
            <h2>Add your comment</h2>
            {comments !== undefined && (
                <div className="comments">
                    {comments.map((comment: object): JSX.Element => (
                        <div>
                            {typeof comment}
                            {/* {comment.content} */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comment;