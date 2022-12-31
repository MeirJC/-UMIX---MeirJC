import React, { useState } from "react";
import Loop from "./Loop";
function Kit({ ctx, links }) {
  // console.log("links", links);
  return (
    <div style={{ border: "2px solid crimson", padding: "1rem 2rem" }}>
      <h2>Kit</h2>
      {links.map((link) => {
        let Loopkey = Math.floor(Math.random() * 100000);
        return <Loop key={Loopkey} ctx={ctx} url={link.src} />;
      })}
    </div>
  );
}

export default Kit;
