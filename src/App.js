import './App.css';
import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import PostMap from './pages/PostMap';
import OnePost from './pages/OnePost';
import Form from './pages/Form';

function App(props) {
  
  const url = "https://django-lab-app.herokuapp.com/blog/"

  const nullPost = {
    title: "",
    body: ""
  }
  
  const [ blogPosts, setBlogPosts] = useState([])
  const [ onePost, setOnePost ] = useState(nullPost)

  const getPosts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setBlogPosts(data)
  }

  const handleCreate = async (newPost) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })

    getPosts()
  }

  const handleUpdate = async (newPost) => {
    const response = await fetch(url + newPost.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    getPosts()
  }

  const handleDestroy = async (newPost) => {
    const response = await fetch(url + newPost.id + "/", {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  const getOnePost = (input) => {
    const data = blogPosts.filter(item => (item.id === input.id))
    setOnePost(...data)
  }

  return (
    <div className="App">
      <h1>App Component</h1>
      {/* <Form update={handleUpdate} destroy={handleDestroy} /> */}
      <button onClick={() => {
        setOnePost(nullPost)
        props.history.push("/new-post")}}>Add New</button>
      <Switch >
        <Route exact path="/" render={(rp) => (<PostMap {...rp} posts={[...blogPosts]} getOnePost={getOnePost} />)} />
        <Route exact path="/post/:id" render={(rp) => (<OnePost {...rp} post={onePost} destroy={handleDestroy} />)} />
        <Route path="/new-post" render={(rp) => <Form {...rp} handler={handleCreate} post={onePost}/>} />
        <Route path="/post/:id/edit" render={(rp) => <Form {...rp} handler={handleUpdate} post={onePost} />} />
      </Switch>
    </div>
  );
}

export default App;
