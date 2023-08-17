import { Button } from "@mui/material";
import { getUserFromLocalStorage } from "../utils/localSotrageManager";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../hooks/customSelctor";
import { loginUser, userDataType } from "../feature/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registeredUser = getUserFromLocalStorage();
  const initialValues: userDataType = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        "Password should contain atleast one Uppercase, special character and number."
      )
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues,

    validationSchema,
    onSubmit: (values) => {
      if (!registeredUser) {
        alert("Please do the registration first");
      }
      if (
        registeredUser.email === values.email &&
        registeredUser.password === values.password
      ) {
        dispatch(loginUser());
        alert(`Login successfull. welcome ${values.email}`);
        navigate("/");
      } else {
        alert("Wrong details entered, Please try again");
        formik.resetForm();
      }
    },
  });

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 2,
              flexDirection: "column",
              width: "30vw",
              minWidth: "400px",
            }}
          >
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

export default Login;
