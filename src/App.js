import './App.css';
import InputComponent from './components/input/input';
import Map from './components/map/map';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation/naviagation';
import DirectionComponent from './components/direction/direction';

function App() {

  const [lat, setLat] = useState(35.6594945)
  const [lng, setLng] = useState(139.6999859)



  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/dir" element={<>
          <InputComponent />
          <Map lat={lat} lng={lng} /></>}>
        </Route>
        <Route path='/' element={<DirectionComponent />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
