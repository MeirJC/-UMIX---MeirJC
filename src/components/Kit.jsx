import React, { useState } from "react";
import Loop from "./Loop";
function Kit({ ctx, links, kitLoadCheck, kitIdx }) {
  //
  const [allLoopsLoaded, setAllLoopsLoaded] = useState([
    false,
    false,
    false,
    false,
  ]);
  // console.log("links", links);
  //!==============================================
  function loopsLoadCheck(isLoaded, index) {
    if (isLoaded) {
      setAllLoopsLoaded((prev) => {
        prev[index] = true;
        return prev;
      });
    }
    console.log("allLoopsLoaded", allLoopsLoaded);
    if (allLoopsLoaded.every((item) => item === true)) {
      kitLoadCheck(true, kitIdx);
    }
  }
  loopsLoadCheck();
  //!==============================================
  return (
    <div style={{ border: "2px solid crimson", padding: "1rem 2rem" }}>
      <h2>Kit</h2>
      <button onClick={loopsLoadCheck}>is it all loaded</button>
      {links.map((link, index) => {
        let Loopkey = Math.floor(Math.random() * 100000);
        return (
          <Loop
            key={Loopkey}
            ctx={ctx}
            url={link.src}
            index={index}
            loopsLoadCheck={loopsLoadCheck}
          />
        );
      })}
    </div>
  );
}

export default Kit;
