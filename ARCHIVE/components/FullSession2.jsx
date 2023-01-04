import React, { useState, useEffect, useRef } from "react";

function FullSession({ type }) {
  //* -----=====States=====-----
  // const [ctx, setCtx] = useState(null);
  // const [drums, setDrums] = useState([null, null, null, null]);
  // const [bass, setBass] = useState([null, null, null, null]);
  // const [piano, setPiano] = useState([null, null, null, null]);
  // const [guitar, setGuitar] = useState([null, null, null, null]);
  const [loadedLoops, setLoadedLoops] = useState([null, null, null, null]);
  //* -----=====Audio Files=====-----

  //* -----=====Functions=====-----
  //? setting the audio context and passing it to the child components
  // const setContext = () => {
  //   const AudioContext = window.AudioContext || window.webkitAudioContext;
  //   const audioContext = new AudioContext();
  //   console.log(audioContext);
  //   setCtx(audioContext);
  // };
  // //* load context
  // const loadContext = () => {
  //   if (!ctx) {
  //     setContext();
  //   }
  // };

  const audioBuffers = useRef([]);

  useEffect(() => {
    const audioContext = new AudioContext();
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

    const requests = audioFiles[type].map(async (node) => {
      const response = await fetch(node.src);
      const arrayBuffer = await response.arrayBuffer();
      console.log("audioContext: ", audioContext);
      return audioContext.decodeAudioData(arrayBuffer);
    });

    Promise.all(requests).then((buffers) => {
      audioBuffers.current = buffers;
      console.log(audioBuffers.current);
    });
    const audioPlayers = audioBuffers.current.map((buffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      return source;
    });
  }, [type]);
  audioBuffers.current.forEach((buffer) => {
    console.log(buffer);
  });
  return (
    <div
      style={{
        border: "4px solid orange",
        padding: "2rem",
        borderRadius: "1rem",
      }}
    >
      <h1>FullSession2</h1>
      {/* <button onClick={loadContext}>Load Context</button> */}
    </div>
  );
}

export default FullSession;
