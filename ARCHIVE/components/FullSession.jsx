import React, { useState } from "react";

function FullSession() {
  //* -----=====States=====-----
  const [ctx, setCtx] = useState(null);
  const [drums, setDrums] = useState([null, null, null, null]);
  // const [bass, setBass] = useState([null, null, null, null]);
  // const [piano, setPiano] = useState([null, null, null, null]);
  // const [guitar, setGuitar] = useState([null, null, null, null]);
  //* -----=====Audio Files=====-----
  const audioFiles = {
    drums: [
      { src: "./samples/Hdrm1.mp3" },
      { src: "./samples/Hdrm2.mp3" },
      { src: "./samples/Hdrm3.mp3" },
      { src: "./samples/Hdrm4.mp3" },
    ],
    bass: [
      { src: "./samples/Hbas1.mp3" },
      { src: "./samples/Hbas2.mp3" },
      { src: "./samples/Hbas3.mp3" },
      { src: "./samples/Hbas4.mp3" },
    ],
    piano: [
      { src: "./samples/Hkys1.mp3" },
      { src: "./samples/Hkys2.mp3" },
      { src: "./samples/Hkys3.mp3" },
      { src: "./samples/Hkys4.mp3" },
    ],
    guitar: [
      { src: "./samples/Hgtr1.mp3" },
      { src: "./samples/Hgtr2.mp3" },
      { src: "./samples/Hgtr3.mp3" },
      { src: "./samples/Hgtr4.mp3" },
    ],
  };

  //* -----=====Functions=====-----
  //? setting the audio context and passing it to the child components
  const setContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(audioContext);
    setCtx(audioContext);
  };
  //* load context
  const loadContext = () => {
    if (!ctx) {
      setContext();
    }
  };
  return (
    <div
      style={{
        border: "4px solid orange",
        padding: "2rem",
        borderRadius: "1rem",
      }}
    >
      <h1>FullSession</h1>
      <button onClick={loadContext}>Load Context</button>
    </div>
  );
}

export default FullSession;
