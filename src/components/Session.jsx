import React, { useState } from "react";
import Kit from "./Kit";
function Session() {
  const [ctx, setCtx] = useState(null);
  // setting the audio context and passing it to the child components
  const setContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(audioContext);
    setCtx(audioContext);
  };

  // complete url list to be paeeed to each kit
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
  const loadContext = () => {
    if (!ctx) {
      setContext();
    }
  };
  return (
    <div style={{ border: "2px solid white", padding: "1rem 3rem" }}>
      <h1>Session</h1>
      <button onClick={loadContext}>Load Context</button>
      <Kit ctx={ctx} links={audioFiles.drums} />
      <Kit ctx={ctx} links={audioFiles.bass} />
      <Kit ctx={ctx} links={audioFiles.piano} />
      <Kit ctx={ctx} links={audioFiles.guitar} />
    </div>
  );
}

export default Session;
