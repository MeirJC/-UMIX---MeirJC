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
  //? State to verify if all the InstrumentRack components are loaded
  const [allLoaded, setAllLoaded] = useState(false);
  //? State to hold the active audio file
  const [activeAudioFile, setActiveAudioFile] = useState([
    null,
    null,
    null,
    null,
  ]);
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
    guitar: [
      { src: "./samples/Hgtr1.mp3" },
      { src: "./samples/Hgtr2.mp3" },
      { src: "./samples/Hgtr3.mp3" },
      { src: "./samples/Hgtr4.mp3" },
    ],
    piano: [
      { src: "./samples/Hkys1.mp3" },
      { src: "./samples/Hkys2.mp3" },
      { src: "./samples/Hkys3.mp3" },
      { src: "./samples/Hkys4.mp3" },
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
  }, [ctx, playState, loaded, allLoaded]);

  //? Function to check the loaded state of the InstrumentRack components
  const allSamplesAreLoaded = loaded.every((item) => item === true);
  if (allSamplesAreLoaded) {
    setAllLoaded(true);
    console.log("All is Loaded!", "allLoaded", allLoaded, "loaded", loaded);
  }
  //* Function to handle the click event of the play/stop button
  const handlePlayClick = () => {
    setPlayState(!playState);
  };
  // //? Function to check the loaded state of the InstrumentRack components
  // if (loaded.every((item) => item === true)) {
  //   setAllLoaded(true);
  //   console.log("All is Loaded!", "allLoaded", allLoaded, "loaded", loaded);
  // }
  function checkLOADED() {
    console.log("loaded", loaded);
    console.log("activeAudioFile", activeAudioFile);
    const allLoaded = loaded.every((item) => item === true);
    console.log("allLoaded", allLoaded);
  }
  console.log("activeAudioFile in EnsambleRack", activeAudioFile);
  return (
    <div style={{ border: "4px solid orange", padding: "1.4rem 1.4rem" }}>
      <button onClick={checkLOADED}>CHEK LOADDDD</button>
      {ctx ? (
        <button onClick={handlePlayClick}>{playState ? "Stop" : "Play"}</button>
      ) : (
        <button onClick={loadContext}>Load</button>
      )}
      {ctx && (
        <div key={"set1"}>
          <InstrumentRack
            activeAudioFile={activeAudioFile}
            Links={audioFiles.drums}
            ctx={ctx}
            setLoaded={setLoaded}
            allLoaded={allLoaded}
            key={"drums"}
            loadedIndex={0}
            setActiveAudioFile={setActiveAudioFile}
          />
          <InstrumentRack
            activeAudioFile={activeAudioFile}
            Links={audioFiles.bass}
            ctx={ctx}
            setLoaded={setLoaded}
            key={"bass"}
            loadedIndex={1}
            setActiveAudioFile={setActiveAudioFile}
          />
          <InstrumentRack
            activeAudioFile={activeAudioFile}
            Links={audioFiles.guitar}
            ctx={ctx}
            setLoaded={setLoaded}
            key={"guitar"}
            loadedIndex={2}
            setActiveAudioFile={setActiveAudioFile}
          />
          <InstrumentRack
            activeAudioFile={activeAudioFile}
            Links={audioFiles.piano}
            ctx={ctx}
            setLoaded={setLoaded}
            key={"piano"}
            loadedIndex={3}
            setActiveAudioFile={setActiveAudioFile}
          />
        </div>
      )}
    </div>
  );
}

export default EnsambleRack;
