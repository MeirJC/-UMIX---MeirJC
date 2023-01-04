import React, { useState } from "react";
import Kit from "./Kit";
function Session() {
  //? create new audio context for the session (global)
  const [ctx, setCtx] = useState(null);
  //? Check which kits are loaded
  const [allKitsLoaded, setAllKitsLoaded] = useState([
    false,
    false,
    false,
    false,
  ]);
  //? check if ALL kits are loaded
  const [fullLoad, setFullLoad] = useState(false);
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
  //!==============================================
  //? checking if all kits are loaded
  const kitLoadCheck = (isLoaded, index) => {
    if (isLoaded) {
      setAllKitsLoaded((prev) => {
        prev[index] = true;
        return prev;
      });
    }
    if (allKitsLoaded.every((item) => item === true)) {
      setFullLoad(true);
    }
    console.log("allKitsLoaded", allKitsLoaded);
  };
  //!==============================================
  //? setting the audio context and passing it to the child components
  const setContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(audioContext);
    setCtx(audioContext);
  };

  const loadContext = () => {
    if (!ctx) {
      setContext();
    }
  };
  return (
    <div style={{ border: "2px solid white", padding: "1rem 3rem" }}>
      <h1>Session</h1>
      {!fullLoad ? (
        <button onClick={loadContext}>Load Context</button>
      ) : (
        <>
          <button>Play</button>
          <button>Stop</button>
        </>
      )}
      <Kit
        ctx={ctx}
        kitLoadCheck={kitLoadCheck}
        links={audioFiles.drums}
        kitIdx={0}
      />
      <Kit
        ctx={ctx}
        kitLoadCheck={kitLoadCheck}
        links={audioFiles.bass}
        kitIdx={1}
      />
      <Kit
        ctx={ctx}
        kitLoadCheck={kitLoadCheck}
        links={audioFiles.piano}
        kitIdx={2}
      />
      <Kit
        ctx={ctx}
        kitLoadCheck={kitLoadCheck}
        links={audioFiles.guitar}
        kitIdx={3}
      />
    </div>
  );
}

export default Session;
