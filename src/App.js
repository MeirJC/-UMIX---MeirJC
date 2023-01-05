import "./App.css";
// import EnsambleRack from "./components/EnsambleRack";
import Cityscape from "./components/Cityscape";
import ConcreteJungle from "./components/ConcreteJungle";
import StreetLights from "./components/StreetLights";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <EnsambleRack /> */}
        <Cityscape />
        <ConcreteJungle />
        <StreetLights />
      </header>
    </div>
  );
}

export default App;
