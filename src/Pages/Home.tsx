import { useEffect } from "react";
import { useAppDispatch } from "../hooks/customSelctor";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { logOutUser } from "../feature/userSlice";
import { getAuthenticateuser } from "../utils/localSotrageManager";

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = getAuthenticateuser();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "#cfe8fc", height: "80px" }}
    >
      <Stack alignItems="center">
        <Typography>Welcome to the Home screen</Typography>
        <Tooltip title="Logout">
          <IconButton
            onClick={() => {
              dispatch(logOutUser());
              navigate("/login");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default Home;
