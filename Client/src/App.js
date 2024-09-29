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
    <div className="app-container">
      <header>
        <div className="title-container">
          <h1 className="main-title">Freshman Zero</h1>
          <p className="tagline">A way to limit weight gain</p>
        </div>
      </header>

      <main>
        <div className="food-concern">
          <p>Concerned about which foods are good for you? Check out the food available by putting in the date!</p>
          <form onSubmit={handleSubmit}>
          <label for="date">Date:&nbsp;</label>
          <input type="date" id="date" name="date" style={{ width: '300px', height: '25px', fontSize: '18px', padding: '10px' }}  value={date} onChange={(e) => setDate(e.target.value)}/><br></br>
          <div className="meal-selector">
            <p>Click below to select meal options:</p>
            <button type="button" onClick={() => setMeal("breakfast")}>Breakfast</button>
            <button type="button" onClick={() => setMeal("lunch")}>&nbsp;&nbsp;Lunch&nbsp;&nbsp;</button>
            <button type="button" onClick={() => setMeal("dinner")}>&nbsp;&nbsp;Dinner&nbsp;&nbsp;</button><br></br>
          </div>

          <div className="submit-section">
            <button type="submit">Submit</button>
          </div>
        </form>
        </div>
      </main>
      
      <footer>
        <p>Freshman Zero © 2024</p>
      </footer>
    </div>
  );
}

export default App;
