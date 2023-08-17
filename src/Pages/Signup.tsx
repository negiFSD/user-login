import { Button, Paper } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { signUpUSer, userDataType } from "../feature/userSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../hooks/customSelctor";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      dispatch(signUpUSer(values));
      navigate("/login");
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
        Sign Up
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {"Have an account? Sign In."}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

export default Signup;
