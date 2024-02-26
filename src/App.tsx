import React from 'react';
import './App.css';
import Weather from './Components/Weather';
import { Container } from '@mui/material';

function App() {
  return (
    <Container sx={{borderRadius: '10px', width: '100%'}}>
      <Weather />
    </Container>
  );
}

export default App;
