import { ResultCode } from "common/enums/enums";
import { getTheme } from "common/theme/getTheme";
import { selectThemeMode, selectIsLoggedIn, setIsLoggedIn } from "features/app/appSlice";
import { useLoginMutation } from "features/auth/api/authApi";
import { LoginArgs } from "features/auth/api/authApi.types";
import { useAppSelector, useAppDispatch } from "modules/store";
import { useForm, SubmitHandler } from "react-hook-form";

export const useLogin = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false } });

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data && res.data.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }));
          localStorage.setItem("sn-token", res.data.data.token);
        }
      })
      .catch((error) => console.error("Login error:", error))
      .finally(() => {
        reset();
      });
  };

  return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register };
};
