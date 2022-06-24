import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./components/address-book-form/AddressBookForm";
import Home from "./components/address-book-home/AddressBookHome";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route exact path="/AddressBookForm/:id">
            <Form />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;