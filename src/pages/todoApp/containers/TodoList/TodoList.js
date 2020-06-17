import React, { useContext, useCallback, useState } from 'react'
import TodosContext from '../../../../state/todos/Context'
import FilterContext from '../../../../state/filter/Context'
import styles from './TodoList.module.css'
import * as todoActions from '../../../../state/todos/actions' 
import TodoModal from './components/TodoModal/TodoModal'

import TodoItem from './components/TodoItem/TodoItem';

function filteredList(list, curFilter) {
    switch (curFilter) {
        case 'all':
            return list
        case 'active':
            return list.filter((item) => {
                return item.completed === false
            })
        case 'completed':
            return list.filter((item) => {
                return item.completed === true
            })
        default:
            throw new Error()
    }
}

function TodoList() { 
    const { filter } = useContext(FilterContext)
    const { todos, dispatchToTodos } = useContext(TodosContext) 
    const [curId, setCurId] = useState(null); 
    const handleDelete = useCallback(
        (id) => {
            dispatchToTodos(todoActions.remoteTodo(id))
        },
        [dispatchToTodos],
    )

    const handleStatusUpdate = useCallback(
        (id, completed) => {
            dispatchToTodos(todoActions.toggleTodoStatus(id, completed))
        },
        [dispatchToTodos],
    ) 

    const handleTitleUpdate = useCallback(
        (id, title) => {
            dispatchToTodos(todoActions.toggleTodoTitle(id, title))
        },
        [dispatchToTodos],
    ) 

    const handleModalOpen = useCallback((id) => {
        setCurId(id); 
    },[])

    const handleModalClose = useCallback(() => {
        setCurId(null) 
    },[]) 

    const getTitle = useCallback(
        (id) => {  
            const curTodo = todos.find((todo) => {
                return todo.id === id
            }); 
            return curTodo.title
        },
        [todos],
    )

    return (
        <div className={styles.container}>
            <ul>
                {filteredList(todos, filter).map((todo) => {
                    return (
                        <TodoItem   
                            id={todo.id} 
                            key={todo.id} 
                            completed={todo.completed}
                            title={todo.title}  
                            onModalOpen={handleModalOpen}
                            onStatusUpdate={handleStatusUpdate}
                            onDelete={() => handleDelete(todo.id)}
                        />
                    )
                })}
            </ul>
            { curId && (
                <TodoModal 
                    id={curId} 
                    onTitleUpdate={handleTitleUpdate} 
                    onModalClose={handleModalClose} 
                    findTitle={getTitle}
                /> 
            )}
        </div>
    )
}

export default TodoList 