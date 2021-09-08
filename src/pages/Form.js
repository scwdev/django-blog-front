import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Form = ({ handler, post, history }) => {
    const [ formData, setFormData ] = useState(post)

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handler(formData)
        history.push("/")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Form Component</h2>
            <label for="title" >
                Title
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <br />
            <label for="body">
                Body
                <input type="text" name="body" value={formData.body} onChange={handleChange} />
            </label>
            <input type="submit" />
        </form>

    )
}

export default Form