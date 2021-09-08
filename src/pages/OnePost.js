import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OnePost = ({ post, destroy, history, match }) => {

    const handleDelete = () => {
        destroy(post)
        history.push("/")
    }

    return (
        <article>
            Is this thing on?
            <h2>{post?.title}</h2>
            <p>{post?.body}</p>
            <button onClick={() => {history.push(match.url + "/edit")}}>EDIT</button>
            <button onClick={() => {handleDelete()}}>DELETE</button>
        </article>
    )
}

export default OnePost