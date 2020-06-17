import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import TodosContext from '../../../../state/todos/Context';
import * as todosActions from '../../../../state/todos/actions';
import * as yup from 'yup';
 
import styles from './TodoCreator.module.css'

export default function TodoCreator() {
    const inputTitle = useRef(null)
    const { dispatchToTodos } = useContext(TodosContext);

    useEffect(() => {
        inputTitle.current.focus()
    }, [])

    const { getFieldProps, errors, handleSubmit } = useFormik({
        initialValues: {
            title: ''
        }, 

        validateOnChange: false,
        validateOnBlur: false, 

        validationSchema: yup.object({
            title: yup.string()
                .required('Você precisa preencher o campo Tarefa')
        }),

        onSubmit: (values, formikBag) => {
            dispatchToTodos(todosActions.addTodo(values.title));
            formikBag.setFieldValue('title', '', false);
        }  
    })
 
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type='text'
                placeholder='Nova tarefa'
                autoComplete='off'
                ref={inputTitle}
                {...getFieldProps('title')}
            />
            {errors.title ? (
                <small className={styles.error}>{errors.title}</small>
            ): null }
            <button 
                className={styles.submit} 
                type='submit'>
                    Adicionar tarefa
            </button>
        </form>
    )
} 