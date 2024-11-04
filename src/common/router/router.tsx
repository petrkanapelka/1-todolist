import App from "app/App"
import Main from "components/main/Main"
import { Page404 } from "components/Page404"
import { Login } from "features/auth/Login"
import { createBrowserRouter } from "react-router-dom"

export const Path = {
    Login: 'login',
} as const

export const router = createBrowserRouter([
    {
        path: '/1-todolist',
        element: <App />,
        children: [
            {
                path: '/1-todolist',
                element: <Main />,
            },
            {
                path: Path.Login,
                element: <Login />,
            },
            {
                path: '*',
                element: <Page404 />,
            },
        ],
    },
])