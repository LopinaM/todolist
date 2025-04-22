import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { selectThemeMode } from "src/app/app-clice";
import { useAppDispatch, useAppSelector } from "src/common/hooks";
import { getTheme } from "src/common/theme";
import styles from "./Login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inputs, loginSchema } from "src/features/auth/lib/schemas";
import { loginTC, selectIsLoggedIn } from "src/features/auth/model/auth-slice";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";
import { Path } from "src/common/routing/Routing";

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode);
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log(isLoggedIn);

  // console.log("Login render");
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(Path.Main);
  //   }
  // }, [isLoggedIn]);
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
    // console.log(data);
    dispatch(loginTC(data));
    // reset(); //Для очистки формы после успешного выполнения onSubmit
  };

  // if (isLoggedIn) {
  //   return <Navigate to={Path.Main} />;
  // }

  return (
    <Grid container justifyContent={"center"}>
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
            {/* <TextField
              placeholder="Email"
              label="Email"
              margin="normal"
              error={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Incorrect email address",
                },
              })}
            /> */}
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
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  );
};
