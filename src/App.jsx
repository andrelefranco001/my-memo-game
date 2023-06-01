import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import Board from "./components/Board";
import ConfettiGenerator from "confetti-js";
import "animate.css";
import ReactModal from "react-modal";
import mymedal from "/medal_my2.png";
import mylogobanner from "/my_gameslogo.png";

const images = [
  { id: 0, name: "pet1", status: "", img: "/images/01.png" },
  { id: 1, name: "pet2", status: "", img: "/images/02.png" },
  { id: 2, name: "pet3", status: "", img: "/images/04.png" },
  { id: 3, name: "pet4", status: "", img: "/images/06.png" },
  { id: 4, name: "pet5", status: "", img: "/images/09.png" },
  { id: 5, name: "pet6", status: "", img: "/images/17.png" },
  { id: 6, name: "pet7", status: "", img: "/images/21.png" },
  { id: 7, name: "pet8", status: "", img: "/images/25.png" },
];

function App() {
  const confettiCanvasRef = useRef(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [foundPairs, setFoundPairs] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [restartGame, setRestartGame] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const resetGame = () => {
    setShuffledMemoBlocks([]);
    setselectedMemoBlock(null);
    setAnimating(false);
    setFoundPairs(0);
    setTotalGames(totalGames + 1);
    setShowConfetti(false);

    const shuffledImages = shuffleArray([...images, ...images]);
    setShuffledMemoBlocks(
      shuffledImages.map((image, i) => ({
        index: i,
        image,
        flipped: false,
      }))
    );
  };

  const handleMemoClick = (memoBlock) => {
    if (memoBlock.flipped || animating) {
      return;
    }

    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);

    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.image.id === memoBlock.image.id) {
      setselectedMemoBlock(null);
      setFoundPairs(foundPairs + 1);

      if (foundPairs + 1 === images.length) {
        // Todas las parejas encontradas, mostrar confeti y mensaje
        setShowConfetti(true);
        setShowModal(true);
      }
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const confettiSettings = {
        target: confettiCanvasRef.current,
        max: "800",
        size: "1.5",
        animate: true,
        props: ["circle", "square", "triangle", "line"],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126],
        ],
        clock: "50",
        rotate: true,
        width: "1865",
        height: "961",
        start_from_edge: false,
        respawn: true,
      };

      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      return () => confetti.clear();
    }
  }, [showConfetti]);

  const handleModalClose = () => {
    setShowModal(false);
    setRestartGame(true);
  };

  useEffect(() => {
    if (restartGame) {
      resetGame();
      setRestartGame(false);
    }
  }, [restartGame]);

  return (
    <div className="game-container animate__animated animate__fadeIn">
      <div className="title-container animate__animated animate__fadeIn">
          <img
            className="logomybanner"
            src={mylogobanner}
            alt="logobanner"
          />
      </div>
      <Board
        memoBlocks={shuffledMemoBlocks}
        animating={animating}
        handleMemoClick={handleMemoClick}
        />
      <div className="total-container">
        <h2 className="total">Total Games: {totalGames}</h2>
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleModalClose}
        className="modal animate__animated animate__fadeIn"
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={false} // Evitar que la ventana se cierre al hacer clic fuera de ella
      >
        <h1 className="lett-mo">Congratulations!</h1>
        <img
          className="mymedal animate__animated animate__tada"
          src={mymedal}
          alt="logomedal"
        />
        <h1 className="lett-mo">You made it!</h1>
        <button onClick={handleModalClose}>Accept</button>
      </ReactModal>
      {showConfetti && (
        <canvas
          ref={confettiCanvasRef}
          className="my-canvas"
          id="confetti-holder"
        ></canvas>
      )}
    </div>
  );
}

export default App;
