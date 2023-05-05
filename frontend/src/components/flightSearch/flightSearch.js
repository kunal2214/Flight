import React,{useState} from 'react'
import "./flightSearch.css"
import axios from 'axios'

function FlightSearch() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
const [flights, setFlights] = useState([])
const search = async(event) => {
    if( source && destination && date){
      await axios
      .post("http://localhost:5000/search", {
        "source": source,
        "destination": destination,
        "date": date
      })
      .then((response) => {
        setFlights(response.data);
        
        
      })   
    } else{
        alert("invalid input")
    }
}
    
    
  return (
    <div className="register">
    <h1>Flight Search</h1>
    <input type="text" name="source" value={source} placeholder="Source" onChange={(e) => setSource(e.target.value)} />
    <input type="text" name="destination" value={destination} placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
    <input type="text" name="date" value={date} placeholder="Date : DD-MM-YYYY" onChange={(e) => setDate(e.target.value)} />
    <div className="button" onClick={search}>Search</div>
    {flights.length > 0 && (
      <div>
        <h2>Results:</h2>
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>
              {flight.source} to {flight.destination} on {flight.date}: ${flight.price} : on {flight.name}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)
}
export default FlightSearch