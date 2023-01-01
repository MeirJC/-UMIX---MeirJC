import React, { createContext, useState } from "react";

export const Context = createContext();
function Context2(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Context.Provider
      value={{
        isPlaying: false,
        setIsPlaying: () => setIsPlaying(!isPlaying),
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context2;
