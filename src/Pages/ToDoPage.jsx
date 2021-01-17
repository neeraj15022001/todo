import React, {useEffect, useState} from 'react';
import {Card} from "../Component/Card";
import Form from "../Component/Form";


export const ToDoPage = () => {
    const [todo, setTodo] = useState([])
    const [addToDo, setAddToDo] = useState("")

    useEffect(() => {
        fetch('/api')
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(data => setTodo(data))
    },[])

    const handleFormChange = (inputValue) => {
        setAddToDo(inputValue)
        console.log(addToDo)
    }

    const handleFormSubmit = () => {
        fetch("/api/create", {
            method : "POST",
            body : JSON.stringify({
                content:addToDo 
            }),
            headers: {
                "Content-type": "application/json; charset = UTF-8"
            }
        }).then(response => response.json())
        .then(message => {
            console.log(message)
            setAddToDo("")
            getLatestToDos()
        })
    }

    const getLatestToDos = () => {
        fetch('/api').then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => setTodo(data))
    }
    return (
        <>
            <Form userInput={addToDo} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <Card listOfTodos = {todo} />
        </>
    )
}

