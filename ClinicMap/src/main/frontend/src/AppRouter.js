import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/member/Login';
import Join from './components/member/Join';
import MapContainer from './components/map/MapContainer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ⓒ'}
      <i className="fa-brands fa-github" style={{ fontSize: '1.7rem' }}></i>
      &nbsp; JoYumi &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/map" element={<MapContainer />} />
        </Routes>
      </BrowserRouter>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
};

export default AppRouter;
