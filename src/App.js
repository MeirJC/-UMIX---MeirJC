import "./App.css";
import { useState } from "react";
// import Session from "./components/Session";
// import FullSession from "./components/FullSession";
import FullSession2 from "./components/FullSession2";
function App() {
  const [loadKits, setLoadKits] = useState(false);
  const handleLoadClick = () => {
    setLoadKits(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <Session /> */}
        {/* <FullSession /> */}
        <button onClick={handleLoadClick}>Load Kits</button>
        {loadKits && <FullSession2 type={"drums"} />}
      </header>
    </div>
  );
}

export default App;
