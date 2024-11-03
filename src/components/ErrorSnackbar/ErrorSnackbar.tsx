import { SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppDispatch, useAppSelector } from 'modules/store'
import { setAppErrorAC } from 'modules/app-reducer'

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setAppErrorAC(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}