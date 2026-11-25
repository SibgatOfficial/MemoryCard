import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

//import Card from "./components/Card";
function App() {
  const [arr, setArr] = useState([]);
  const [seen, setSeen] = useState([]);
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(0);
  const API_KEY = import.meta.env.VITE_API;
  useEffect(() => {
    async function h() {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=cartoons&limit=12`,
      );
      const json = await res.json();
      setArr(json.data);
    }
    h();
  }, []);
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  function checkSeen(id) {
    if (count > 11) {
      alert("You won!");
    }
    if (seen.includes(id)) {
      setCount(0);
      if (count > max) {
        setMax(count);
      }
      setSeen([]);
    } else {
      setCount(count + 1);
      setSeen([...seen, id]);
    }
  }

  return (
    <>
      <h2 style={{ display: "flex", gap: "20px" }}>
        <span>Score: {count}</span> <span>Best Score:{max}</span>
      </h2>
      <div className="container">
        {arr.map((url) => {
          return (
            <img
              key={url.id}
              id={url.id}
              src={url.images.downsized.url}
              onClick={(event) => {
                setArr(shuffleArray(arr));
                checkSeen(event.target.id);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
