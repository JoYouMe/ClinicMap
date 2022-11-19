import React from 'react';
import { Button, TextField, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import axios from 'axios';
import { API_BASE_URL } from '../../app-config';

const Login = () => {
  const login = (member) => {
    axios({
      method: 'post',
      url: API_BASE_URL + '/login',
      data: member,
    }).then((response) => {
      console.log(response);
      if (response.data.token) {
        sessionStorage.setItem('ACCESS_TOKEN', response.data.token);
        window.location.href = '/';
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userId = data.get('userId');
    const password = data.get('password');

    //member
    login({ userId: userId, password: password });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {' '}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userId"
              label="아이디"
              name="userId"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="비밀번호"
              name="password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/join" variant="body2">
              계정이 없으시면 여기서 회원가입하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
