import './App.css';
import {ToDoPage} from "./Pages/ToDoPage";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {Show} from "./Pages/Show"

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route exact path='/'>
              <ToDoPage />
          </Route>

          <Route path='/:id'>
              <Show />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
