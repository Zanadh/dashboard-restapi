import { Avatar, Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useGoogleLogin } from '@react-oauth/google';
import { postAuthGoogle } from '../../api/postAuthGoogle';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { login, LoginActionPayload } from '../../redux/actions/sessionsActions';

const Login = () => {
  const dispatch = useTypedDispatch();

  const signIn = (data: LoginActionPayload) => {
    dispatch(login(data));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const result = await postAuthGoogle({ accessToken: res.access_token });
      console.log(result);
      if (result.status === 200) {
        signIn(result.data);
      }
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: '100vh', border: '1px solid transparent', display: 'flex' }}
    >
      <Box
        display={'flex'}
        flex={1}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent="center"
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button onClick={() => handleGoogleLogin()} fullWidth variant="contained" sx={{ mb: 2 }}>
            Login with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
