import React from 'react'
import { Link } from 'react-router-dom'

const PostMap = ({ posts, getOnePost }) => {

    const postMap = posts.map((item,index) => (
        <Link to={`post/${item.id}`} onClick={() => {getOnePost(item)}} >
            <h3>{item.title}</h3>
            <p>{item.body}</p>
        </Link>
    ))
    
    return (
        <div>
            {postMap}
        </div>
        )
}

export default PostMap