import { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [tilesLeft, setTilesLeft] = useState(200);
  const [win, setWin] = useState(false);

  const handleChangeColor = (e) => {
    if (win) return;
    if (e.target.style.border !== "3px solid black") {
      e.target.style.border = "3px solid black";
      setTilesLeft(tilesLeft - 1);
    } else {
      e.target.style.border = "1px solid grey";
      setTilesLeft(tilesLeft + 1);
    }
    e.target.style.backgroundColor = `hsl(${Math.random() * 360}, ${
      Math.random() * 75
    }%, ${50 + Math.random() * 25}%)`;
    const body = document.querySelector("body");
    body.style.backgroundColor = e.target.style.backgroundColor;
  };

  useEffect(() => {
    if (tilesLeft === 0) {
      setWin(true);
    }
  }, [tilesLeft]);

  const renderTiles = (numTiles) => {
    const arrayOfTiles = [];
    for (let i = 0; i < numTiles; i++) {
      arrayOfTiles.push(i);
    }
    return arrayOfTiles.map((index) => (
      <div
        onMouseEnter={(e) => handleChangeColor(e)}
        key={index}
        className="tile"
        style={{
          backgroundColor: `hsl(${Math.random() * 360}, ${
            Math.random() * 75
          }%, ${50 + Math.random() * 25}%)`,
        }}
      ></div>
    ));
  };

  return (
    <>
      <div className="tile-container">{renderTiles(200)}</div>
      {!win && <h1>Tiles left: {tilesLeft}</h1>}
      {win && (
        <>
          <h1 className="win">You Win!</h1>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </>
      )}
    </>
  );
};

export default Home;
