import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import { getTheme } from "common/theme/getTheme"
import { useAppDispatch, useAppSelector } from "modules/store"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from './Login.module.css'
import { Navigate } from "react-router-dom"
import { loginTC } from "./model/authThunks"

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const themeMode = useAppSelector(state => state.app.themeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false } })

    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(loginTC(data))
        reset()
    }

    if (isLoggedIn) {
        return <Navigate to={'/1-todolist/'} />
    }

    return (
        <Grid container justifyContent={'center'} sx={{ marginTop: '15px' }}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel sx={{ marginTop: '20px' }}>
                        <p>
                            To login get registered
                            <a
                                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                                href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }
                            })} />
                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                            <TextField type="password" label="Password" margin="normal" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 4, message: "Minimum length is 4" }
                            })} />
                            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Controller
                                        name={'rememberMe'}
                                        control={control}
                                        render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
                                    />
                                }
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'} >
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}