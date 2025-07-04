import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { selectThemeMode, setIsLoggedInAC } from "src/app/app-clice";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { getTheme } from "src/common/theme";
import styles from "./Login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inputs, loginSchema } from "src/features/auth/lib/schemas";
import { useLoginMutation } from "src/features/auth/api/authApi";
import { ResultCode } from "src/common/enums";
import { AUTH_TOKEN } from "src/common/constants";
import { Paper } from "@mui/material";

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const theme = getTheme(themeMode);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: true }));
        localStorage.setItem(AUTH_TOKEN, res.data.data.token);
        reset(); //Для очистки формы после успешного выполнения onSubmit
      }
    });
  };

  return (
    <div className={styles.container}>
      <Paper elevation={8} style={{ padding: "20px", width: 350, display: "flex", justifyContent: "center" }}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
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
              <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
              {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

              <TextField
                placeholder="Password"
                type="password"
                label="Password"
                margin="normal"
                error={!!errors.password}
                {...register("password")}
              />
              {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

              <FormControlLabel
                label="Remember me"
                control={
                  <Controller
                    name={"rememberMe"}
                    control={control}
                    //v1
                    //   render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                    //v2
                    render={({ field: { onChange, value } }) => (
                      <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                    )}
                  />
                }
              />
              <Button type="submit" variant="contained" color="secondary">
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Paper>
    </div>
  );
};
