import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AsyncComponent from './utils/AsyncComponent';

import SampleForm from './containers/SampleForm';
import DataForm from './containers/DataForm';

const DynamicForm = AsyncComponent(()=>import("./containers/DynamicForm"));

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/static/">Static Declaritive Form</Link>
              </li>
              <li>
                <Link to="/data/">Data Driven Form</Link>
              </li>
              <li>
                <Link to="/dynamic/">Dynamic Loaded Form</Link>
              </li>
            </ul>
          </nav>
          <Route path="/static/" component={SampleForm} />
          <Route path="/data/" component={DataForm} />
          <Route path="/dynamic/" component={DynamicForm} />
        </div>
      </Router>
    );
  }
}

export default App;
