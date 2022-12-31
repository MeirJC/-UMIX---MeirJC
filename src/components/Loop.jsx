import React, { useState, useEffect } from "react";

function Loop({ ctx, url }) {
  // let url = "./samples/Hdrm1.mp3";
  const [loop, setLoop] = useState(null);
  const [loopGain, setLoopGain] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // loadAudioFile(url);
  const loadAudioFile = async () => {
    //? fetch song from url or physical audio
    const res = await fetch(url); //
    //? convert audio to arrayBuffer
    const arrayBuffer = await res.arrayBuffer(); //
    //? convert arrayBuffer to audioBuffer
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer); //
    //? create new buffer source Node
    const source = await ctx.createBufferSource();
    //? connect the audio buffer that we created before to the source node
    source.buffer = audioBuffer;
    //? set the source node to loop
    source.loop = true;
    //? set the source node to state
    setLoop(source);

    //? create new gain node
    const gainNode = await ctx.createGain();
    gainNode.gain.value = 0;
    console.log("gainNode", gainNode);
    //? set the gain node to state
    gainNode.connect(ctx.destination);
    setLoopGain(gainNode);
    // gainNode.gain.value = 0;
    source.connect(gainNode);
    setIsLoaded(true);
  };
  useEffect(() => {
    setTimeout(() => {
      ctx && loadAudioFile();
      setTimeout(() => {
        play();
      }, 1000);
    }, 2000);
    // ctx && loadAudioFile();

    // ctx && play();

    // isLoaded && loadAudioFile();

    // isLoaded && currntGain.gain.value = currntGain;
  }, [""]);
  const play = async () => {
    await loop.start();
  };

  const mute = () => {
    // console.log("currntGain", currntGain.gain);
    if (loopGain.gain.value === 0) {
      loopGain.gain.value = 1;
    } else {
      loopGain.gain.value = 0;
    }
  };
  return (
    <div
      style={{
        border: "2px solid green",
        padding: "1rem 2rem",
        margin: "0.5rem",
      }}
    >
      {ctx && (
        <div>
          <h3>Loop</h3>
          {/* <button onClick={loadAudioFile}>Load</button> */}
          <button onClick={play}>Play</button>
          <button onClick={mute}>Mute</button>
        </div>
      )}
    </div>
  );
}

export default Loop;
