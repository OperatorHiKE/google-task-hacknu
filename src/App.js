import './App.css';
import InputComponent from './components/input/input';
import Map from './components/map/map';
import { useState } from 'react';

function App() {

  const [lat, setLat] = useState(35.6594945)
  const [lng, setLng] = useState(139.6999859)



  return (
    <div className="App">
      <InputComponent />
      <Map lat={lat} lng={lng} />
    </div>
  );
}

export default App;
