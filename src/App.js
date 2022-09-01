import './App.css';
import {useEffect,useState} from 'react'
import Hotbg from './assets/1.jpg'
import Coldbg from './assets/2.jpg'
import { Description } from './components/Description';
import { getFormatedWeatherData } from './weatherServiceAPI';


function App() {
  const [city, setCity] = useState('San Luis')
const [weather, setWeather] = useState(null);
const [units, setUnits] = useState('metric')
const [bg, setBg] = useState(Hotbg)

  useEffect(() => {
    const fetcheData = async() => { 
      const data = await getFormatedWeatherData(city,units)
      setWeather(data)
      //dynamic bg
      const threshold = units === 'metric' ? 20 : 60;

      if (data.temp <= threshold) setBg(Coldbg);
      else setBg(Hotbg)
      };
     fetcheData();
  }, [units,city])

  const handleUnitsClick = (e) => { 
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? "*F" : "*C";
    setUnits(isCelsius ? "metric" : "imperial")
   };
  
   const enterKeyPressed = e => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
      
    }
   }

  return (
    <div className="app" style={{ backgroundImage:`url(${bg})` }}>
     <div className="overlay">
      {
        weather && (
          <div className="container">

        <div className="section section__inputs">
          <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City..' />
          <button onClick={handleUnitsClick}>*F</button>
        </div>
        
        <div className="section section__temperature">
          <div className="icon">
            <h3>{`${weather.name},${weather.country}`}</h3>
            <img src={weather.iconURL} alt="none" />
            <h3>{weather.description}</h3>
          </div>
          <div className="temperature">
            <h1>{`${weather.temp.toFixed()} *${units === 'metric' ? 'C' : 'F'}`}</h1>
          </div>
        </div>

{/* bottom part */}
<Description weather={weather} units={units}/>
      </div>
        )
      }
      
     </div>
    </div>
  );
}

export default App;
