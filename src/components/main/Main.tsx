import '../../app/App.css';
import { Grid, Paper, Container } from "@mui/material";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { ToDoList } from "components/toDoList/ToDoList";
import { useAppSelector } from "modules/store";
import { Navigate } from 'react-router-dom';
import { Path } from 'common/router/router';
import { useGetTodolistsQuery, useAddTodolistMutation } from 'components/toDoList/api/todolistsApi';
import { selectIsLoggedIn } from 'features/app/appSlice';


function Main() {
    const { data: todolists } = useGetTodolistsQuery()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [addTodolist, { data, error, isLoading }] = useAddTodolistMutation();
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const onCreateTodolist = (title: string) => {
        addTodolist(title)
    }

    if (!isLoggedIn) {
        return <Navigate to={Path.Login} />
    }

    const mappedToDoLists = todolists ? todolists.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper className="paper" elevation={3} sx={{ borderRadius: '10px' }}>
                    <ToDoList
                        todoListId={t.id}
                        title={t.title}
                        todolist={t}
                    />
                </Paper>
            </Grid>
        );
    }) : todolists

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
