import React, { useState, useEffect } from "react";

function InstrumentRack({ Links, ctx, setLoaded, loaded, playState, id }) {
  //* -----=====States=====-----
  //? State to hold the audio files
  const [audioFiles, setAudioFiles] = useState([null, null, null, null]);
  //? State to hold the active audio file
  const [activeAudioFile, setActiveAudioFile] = useState(null);
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
      //? set the source node to state
      // setLoop(source);
      //? create new gain node
      const gainNode = await ctx.createGain();
      gainNode.gain.value = 0;
      // console.log("gainNode", gainNode);
      //? connect the gain node to the final destination
      gainNode.connect(ctx.destination);
      //? set the gain node to state
      // setLoopGain(gainNode);
      // gainNode.gain.value = 0;
      //? connect the gain node to the gain node
      source.connect(gainNode);
      setAudioFiles((prevState) => {
        return [...prevState.slice(0, i), source, ...prevState.slice(i + 1)];
      });
      // console.log("source in loadAudioFiles in InstrumentRack: ", source);
      console.log("source in loadAudioFiles in InstrumentRack: ", source);
      return source;
    });
    Promise.all(requests)
      .then((requests) => {
        let arr = [0, 0, 0, 0];
        for (let i = 0; i < requests.length; i++) {
          console.log(
            "requests in loadAudioFiles in InstrumentRack: ",
            "i= ",
            i,
            requests[i]
          );
          arr = [...arr.slice(0, i), requests[i], ...arr.slice(i + 1)];
          console.log(
            "arr in loadAudioFiles in InstrumentRack: ",
            arr,
            "i= ",
            i
          );
        }
        // setAudioFiles([...arr]);
        console.log("arr in loadAudioFiles in InstrumentRack: ", arr);
      })
      .then(() => {
        console.log("audioFiles in InstrumentRack: ", audioFiles);
      });
  };

  //? Use the useEffect hook to load the audio files when the component mounts
  useEffect(() => {
    ctx && loadAudioFiles(Links);
    setLoaded((prevState) => {
      return [...prevState.slice(0, id), true, ...prevState.slice(id + 1)];
    });
  }, []);

  //? Function to handle the click event of the audio file buttons
  const handleButtonClick = (i) => {
    //* Set the gain of the current audio file to 1
    audioFiles[i].gainNode.gain.value = 1;
    //* Set the gain of the other audio files to 0
    audioFiles.forEach((audioFile, j) => {
      if (i !== j) {
        audioFile.gainNode.gain.value = 0;
      }
    });
  };

  return (
    <div>
      {audioFiles.map((audioFile, i) => (
        <button key={i} onClick={() => handleButtonClick(i)}>
          Audio File {i + 1}
        </button>
      ))}
    </div>
  );
}

export default InstrumentRack;
