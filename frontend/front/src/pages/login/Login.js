import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Paper, Avatar, TextField, Checkbox } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../../features/login/loginSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = (props) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Login Styless
  const paperStyle = {
    padding: 40,

    display: "flex",
    flexDirection: "column",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const errorStyles = {
    color: "rgb(239 68 68 / 1)",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  };

  const [isOpen, setIsOpen] = useState(false);

  async function LoginForms(values) {
    setIsOpen(false);

    dispatch(
      setLogin({ userName: values.userName, password: values.password })
    );

    reset();
  }

  return (
    <div>
      <Button color="inherit" onClick={() => setIsOpen(true)}>
        <Typography variant="h5">LOGIN</Typography>
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Box>
              <Grid>
                <Paper elevation={0} style={paperStyle}>
                  <Grid align="center">
                    <Avatar style={avatarStyle}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <h2>Login</h2>
                  </Grid>

                  <form onSubmit={handleSubmit(LoginForms)}>
                    <TextField
                      id="standard-basic"
                      placeholder="Enter UserName"
                      type="text"
                      style={btnstyle}
                      name="userName"
                      fullWidth
                      label="UserName"
                      variant="standard"
                      {...register("userName", {
                        required: {
                          value: true,
                          message: "Please Enter UserName",
                        },
                      })}
                    />
                    <span style={errorStyles}>{errors?.userName?.message}</span>
                    <TextField
                      id="standard-basic"
                      placeholder="Enter password"
                      type="password"
                      style={btnstyle}
                      name="password"
                      fullWidth
                      label="Password"
                      variant="standard"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Please Enter Password",
                        },
                      })}
                    />
                    <span style={errorStyles}>{errors?.password?.message}</span>
                    <div style={{ marginTop: "5px" }}>
                      <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Remember me"
                      />
                    </div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={() => LoginForms}
                      style={{
                        btnstyle,
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                      fullWidth
                    >
                      Login in
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
