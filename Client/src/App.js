import './App.css';
import { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")


function App() {
  const [date, setDate] = useState("");
  const [meal, setMeal] = useState("");
  const [foods, setFoods] = useState([]);

  const sendInfo = () => {
    socket.emit("send_date", {date, meal});
  }

  useEffect(() => {
    socket.on("receive_food", (data) => {
      setFoods(data);
    })
  }, [socket])

  const handleSubmit = (event) => {
    sendInfo();
  }

  return (
    <div className="App">
      <h1>Freshman Zero</h1>
      <form onSubmit={handleSubmit}>
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/><br></br>
        <button type="button" onClick={() => setMeal("breakfast")}>Breakfast</button>
        <button type="button" onClick={() => setMeal("lunch")}>Lunch</button>
        <button type="button" onClick={() => setMeal("dinner")}>Dinner</button><br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
