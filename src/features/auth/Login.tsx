import s from './Login.module.css'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { useLogin } from "./lib/hooks/useLogin"

export const Login = () => {
    const { theme, isLoggedIn, control, onSubmit, handleSubmit, errors, register } = useLogin()

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
                            <TextField
                                label="Email"
                                margin="normal"
                                autoComplete="email"
                                aria-required="true"
                                aria-invalid={errors.email ? "true" : "false"}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format"
                                    }
                                })}
                            />
                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 4, message: "Minimum length is 4" }
                                })}
                                autoComplete="current-password"
                                aria-required="true"
                                aria-invalid={errors.password ? "true" : "false"}
                            />
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