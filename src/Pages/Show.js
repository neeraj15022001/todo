import React, {useState,useEffect} from 'react';
import {useParams} from "react-router-dom";

export const Show = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState([])

    useEffect(() => {
        fetch(`https://todoflaskneeraj.herokuapp.com/api/${id}`)
        .then(response => response.json())
        .then(data => setTodo(data))
    },[id])

    return (
        <div>
            {todo.length > 0 && todo.map(data => <div>{data.content}</div>)}        
        </div>
    )
}

export default Show
