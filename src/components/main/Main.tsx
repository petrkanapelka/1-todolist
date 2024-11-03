import '../../app/App.css';
import { Grid, Paper, Container } from "@mui/material";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { ToDoList } from "components/toDoList/ToDoList";
import { addTodolistTC, fetchTodolistsThunk } from "modules/todolists-reducer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "modules/store";


function Main() {
    const dispatch = useAppDispatch();
    let todolists2 = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsThunk)
    }, [dispatch])

    const onCreateTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const mappedToDoLists = todolists2.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper className="paper" elevation={3} sx={{ borderRadius: '10px' }}>
                    <ToDoList
                        todoListId={t.id}
                        title={t.title}
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <>
            <Container fixed maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='addnewtodolist-wrapper'>
                        <h3>Add new ToDoList</h3>
                        <AddItemForm addNewItem={onCreateTodolist} />
                    </div>
                </Grid>
            </Container>
            <Container fixed maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='todolists-wrapper'>
                        {mappedToDoLists}
                    </div>
                </Grid>
            </Container>
        </>
    );
}

export default Main;
