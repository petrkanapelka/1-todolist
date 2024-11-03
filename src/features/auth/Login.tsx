import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import { getTheme } from "common/theme/getTheme"
import { useAppSelector } from "modules/store"

export const Login = () => {
    const themeMode = useAppSelector(state => state.app.themeMode)
    const theme = getTheme(themeMode)

    return (
        <Grid container justifyContent={'center'} sx={{marginTop: '15px'}}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
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
                    <FormGroup>
                        <TextField label="Email" margin="normal" />
                        <TextField type="password" label="Password" margin="normal" />
                        <FormControlLabel label={'Remember me'} control={<Checkbox />} />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}