import { Auth } from "./components/Auth";
import { Drive } from "./components/Drive";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Auth />} />
        <Route path="/drive" element={<Drive />} />
      </Routes>
    </Router>
  );

}

export default App;
