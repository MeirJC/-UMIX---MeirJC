import React, { useState, useEffect } from "react";

function Loop({ ctx, url, index, loopsLoadCheck }) {
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
    // gainNode.gain.value = 0;
    // console.log("gainNode", gainNode);
    //? connect the gain node to the final destination
    gainNode.connect(ctx.destination);
    //? set the gain node to state
    setLoopGain(gainNode);
    // gainNode.gain.value = 0;
    //? connect the gain node to the gain node
    source.connect(gainNode);
    //? set the isLoaded to true (verify that the audio file is loaded)
    setIsLoaded(true);
  };

  useEffect(() => {
    ctx && loadAudioFile();
    console.log(ctx);
    // isLoaded && loadCheck(isLoaded, index);
    // ctx && loadAudioFile();
    // ctx && play();
    // isLoaded && loadAudioFile();
    // isLoaded && currntGain.gain.value = currntGain;
  }, []);
  //!==============================================
  const isItLoaded = async () => {
    await loopsLoadCheck(isLoaded, index);
  };
  isItLoaded();
  //!==============================================
  const play = async () => {
    console.log("loop", loop);
    await loop.start();
  };
  const mute = () => {
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
