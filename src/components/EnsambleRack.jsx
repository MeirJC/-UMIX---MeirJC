import React, { useState, useEffect } from "react";
import InstrumentRack from "./InstrumentRack";
function EnsambleRack() {
  //* -----=====States=====-----
  //? create new audio context for the session (global)
  const [ctx, setCtx] = useState(null);
  //? State to hold the global play/stop state
  const [playState, setPlayState] = useState(false);
  //? State to hold the loaded state of the InstrumentRack components
  const [loaded, setLoaded] = useState([false, false, false, false]);
  //* -----=====Audio Files=====-----
  //? complete url list to be paeeed to each kit
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
    console.log("audioContext inside setContext func", audioContext);
    setCtx(audioContext);
  };
  const loadContext = () => {
    if (!ctx) {
      setContext();
    }
  };

  useEffect(() => {
    if (ctx && playState) {
      //* Start playing all of the audio files in the InstrumentRack components
      // ctx.start(); //? this is not a function - just a placeholder
    } else if (ctx && !playState) {
      //* Stop playing all of the audio files in the InstrumentRack components
      // ctx.stop(); //? this is not a function - just a placeholder
    }
  }, [ctx, playState]);

  //* Function to handle the click event of the play/stop button
  const handlePlayClick = () => {
    setPlayState(!playState);
  };

  return (
    <div style={{ border: "4px solid orange", padding: "1.4rem 1.4rem" }}>
      {ctx ? (
        <button onClick={handlePlayClick}>{playState ? "Stop" : "Play"}</button>
      ) : (
        <button onClick={loadContext}>Load</button>
      )}
      {ctx && (
        <InstrumentRack
          Links={audioFiles.drums}
          ctx={ctx}
          setLoaded={setLoaded}
        />
      )}
    </div>
  );
}

export default EnsambleRack;
