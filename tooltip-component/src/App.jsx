import React from "react";
import Tooltip from "./components/Tooltip";

const App = () => {
  return (
    <div style={{ padding: "100px" }}>
      <Tooltip text="This is a tooltip" position="top">
        <button>Hover me :v</button>
      </Tooltip>

      <br /><br />

      <Tooltip text="Bottom tooltip" position="bottom">
        <span>Hover text :P</span>
      </Tooltip>
    </div>
  );
};

export default App;