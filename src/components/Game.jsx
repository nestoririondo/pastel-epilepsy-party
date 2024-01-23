import { useState, useEffect } from "react";
import "../styles/Game.css";
import TimeStop from "./TimeStop";

const Game = () => {
  const [tilesLeft, setTilesLeft] = useState(160);
  const [win, setWin] = useState(false);

  const handleChangeColor = (e) => {
    if (win) return;
    if (e.target.style.border !== "3px solid black") {
      e.target.style.border = "3px solid black";
      setTilesLeft((tilesLeft) => tilesLeft - 1);
    } else {
      e.target.style.border = "1px solid grey";
      setTilesLeft((tilesLeft) => tilesLeft + 1);
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

  const playAgain = () => {
    setWin(false);
    setTilesLeft(160);
    const body = document.querySelector("body");
    body.style.backgroundColor = "white";
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => {
      tile.style.backgroundColor = `hsl(${Math.random() * 360}, ${
        Math.random() * 75
      }%, ${50 + Math.random() * 25}%)`;
      tile.style.border = "1px solid grey";
    });
  };

  const handleWin = () => {
    setWin(true);
  };

  return (
    <>
      <div className="tile-container">{renderTiles(160)}</div>
      {/* <button onClick={handleWin} tilesLeft={tilesLeft}>Win</button> */}
      {!win && <h1>Tiles left: {tilesLeft}</h1>}
      {win && (
        <>
          <h1 className="win">You Win!</h1>
          <button onClick={playAgain}>Play Again</button>
        </>
      )}
      <TimeStop win={win} />
    </>
  );
};

export default Game;
