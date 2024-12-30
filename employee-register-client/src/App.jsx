import { useState } from "react";
import "./App.css";
import EmployeeList from "./Components/EmployeeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <EmployeeList />
    </div>
  );
}

export default App;
