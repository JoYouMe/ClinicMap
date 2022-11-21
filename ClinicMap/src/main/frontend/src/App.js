import { Box, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MapContainer from './components/map/MapContainer';
import Join from './components/member/Join';
import Login from './components/member/Login';

function App() {
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
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/map" element={<MapContainer />} />
      </Routes>
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
}

export default App;
