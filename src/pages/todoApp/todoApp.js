import React from 'react'
import TodoCreator from './containers/TodoCreator/TodoCreator';
import TodoList from './containers/TodoList/TodoList'
import TodoFilter from './containers/TodoFilter/TodoFilter'

export default function TodoApp() {
    return (
        <>
            <TodoCreator />
            <TodoList/>
            <TodoFilter/>
        </>
    )
} 