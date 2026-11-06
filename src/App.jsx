import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
//import Card from "./components/Card";
function App() {
  const [arr, setArr] = useState([]);
  const [seen, setSeen] = useState([]);
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    async function h() {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=BqWA4cPMAidn3jgL1ZAbgutEuqQImKlO&q=cartoons&limit=12`,
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
      <h1>Score: {count}</h1>
      <h1>Best Score:{max}</h1>
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
