/* Demo for FinTech@SG Course 
Retrieving JSON data from Server in a Tabular form
Author: Prof Bhojan Anand */
import React from 'react';
import logo from './logo.svg';

import './App.css';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = { data: [] };
  }

 callAPIServer() {
  // when component mounted, start a GET request
  // to specified URL
  fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/customers")
    // when we get a response map the body to json
    .then(response => response.json())
    // and update the state data to said json
    .then(data => this.setState({ data }));
 }


  componentDidMount() {   // react lifecycle method componentDidMount() 
                        //will execute the callAPIserver() method after the component mounts.
      this.callAPIServer();
      //console.log(this.serverResObjArr);

  }
  /* Replace the table with paragraph below if you need paragraph
    <p className="App-intro">{JSON.stringify(this.state.data)}</p>
  */

  render() {
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to My App</h1>
              </header>
              
              <table className="myTable">
                <tbody>
                    {(this.state.data).map( (item) => {
                    return (
                      <tr key={item.id}>         
                            <td> {item.first_name} </td>
                            <td> {item.last_name} </td>
                            <td> {item.email}  </td>
                            <td> {item.gender} </td>
                      </tr>
                      )}
                    )}
                    </tbody>
                </table>
   
          </div>
      );
  }
}

export default App;
