import { Avatar, Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { login } from '../../redux/actions/sessionsActions';

const Login = () => {
  const dispatch = useTypedDispatch();

  const handleLogin = (isSSO?: boolean) => async () => {
    let permissions = 'READ_TRANSACTION';
    if (isSSO) permissions += ',READ_USER';
    dispatch(login({ accessToken: 'asdasd', permissions }));
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: '100vh', border: '1px solid transparent', display: 'flex' }}
    >
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent="center">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button onClick={handleLogin(false)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Button onClick={handleLogin(true)} fullWidth variant="contained" sx={{ mb: 2 }}>
            Login with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
