import React from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from '@mui/material';
import { join } from '../../service/ApiService';

const Join = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const userId = data.get('userId');
    const password = data.get('password');

    join({ userId: userId, password: password }).then((response) => {
      //회원가입 성공 시 로그인페이지로 이동
      window.location.href = '/login';
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8%' }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              JOIN
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="userId"
              variant="outlined"
              required
              fullWidth
              id="userId"
              label="아이디"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="비밀번호"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              회원가입
            </Button>
          </Grid>
        </Grid>
        <Grid Container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Join;
