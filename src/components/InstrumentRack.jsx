import React, { useState, useEffect } from "react";

function InstrumentRack({
  Links,
  ctx,
  setLoaded,
  playState,
  loadedIndex,
  activeAudioFile,
  setActiveAudioFile,
  allLoaded,
}) {
  //* -----=====States=====-----
  //? State to hold the audio files
  const [audioFiles, setAudioFiles] = useState([null, null, null, null]);
  //? State to hold the active audio clip
  const [currntClip, setCurrentClip] = useState(null);
  //* -----=====Functions=====-----
  //? Function to load the audio files and initialize them
  const loadAudioFiles = async (files) => {
    // console.log("files", files);
    const requests = await files.map(async (node, i) => {
      const response = await fetch(node.src);
      const arrayBuffer = await response.arrayBuffer();
      // console.log("ctx inside loadAudioFiles in INstrumentRack: ", ctx);
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer); //
      //? create new buffer source Node
      const source = await ctx.createBufferSource();
      //? connect the audio buffer that we created before to the source node
      source.buffer = audioBuffer;
      //? set the source node to loop
      source.loop = true;
      //? create new gain node
      const gainNode = await ctx.createGain();
      //? set the gain of the gain node to 0
      gainNode.gain.value = 0;
      //? connect the gain node to the final destination
      gainNode.connect(ctx.destination);
      //? connect the gain node to the gain node
      source.connect(gainNode);
      setAudioFiles((prevState) => {
        prevState[i] = { source, gainNode };
        return prevState;
      });
      // console.log("source in loadAudioFiles in InstrumentRack: ", source);
      return source;
    });
    Promise.all(requests).then((requests) => {
      console.log("requests in InstrumentRack: ", requests);
      console.log("audioFiles in InstrumentRack: ", audioFiles);
      setLoaded((prevState) => {
        prevState[loadedIndex] = true;
        return prevState;
      });
    });
  };

  //? Use the useEffect hook to load the audio files when the component mounts
  useEffect(() => {
    ctx && loadAudioFiles(Links);
    // setLoaded((prevState) => {
    //   return [...prevState.slice(0, id), true, ...prevState.slice(id + 1)];
    // });
    //* Set the activeAudioFile in the parent component to the current audio file index
    setActiveAudioFile((prevState) => {
      prevState[loadedIndex] = 0;
      return prevState;
    });
    console.log("activeAudioFile in handleButtonClick: ", activeAudioFile);
    allLoaded && play();
  }, [activeAudioFile, allLoaded]);

  //? Function to handle the click event of the audio file buttons
  const handleButtonClick = (i) => {
    // console.log("audioFiles[i] in handleButtonClick: ", audioFiles[i]);
    console.log("allLoaded in play: ", allLoaded);
    //* set the currnt clip playing
    setCurrentClip(i);
    console.log("currntClip in handleButtonClick: ", currntClip);

    audioFiles.forEach((audioFile, j) => {
      // console.log(audioFiles[i].gainNode.gain.value);
      const current = audioFiles[i].gainNode.gain.value === 1 ? 0 : 1;
      // console.log("i →", i, "j→", j);

      if (i === j) {
        audioFiles[j].gainNode.gain.value = current;
      } else {
        audioFiles[j].gainNode.gain.value = 0;
      }
      console.log(audioFiles[j].gainNode.gain.value);
    });
  };
  //? Function to play all the audio files
  function play(audioState) {
    audioState.forEach((audioFile) => {
      audioFile.source.start();
    });
  }
  return (
    <div>
      {audioFiles.map((audioFile, i) => (
        <>
          <button key={i} onClick={() => handleButtonClick(i)}>
            Audio File {i + 1}
          </button>
          <button
            key={Math.floor(Math.random() * 10000000)}
            onClick={() => play(audioFiles)}
          >
            start play
          </button>
        </>
      ))}
    </div>
  );
}

export default InstrumentRack;
