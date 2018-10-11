import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// Step 2: Instantiate instance of civic.sip
class App extends Component {
  constructor() {
    super()
    this.civicSip = new window.civic.sip({ appId: 'WHryoAjz0' });
    // Listen for data
    this.civicSip.on('auth-code-received', function (event) {
      /*
          event:
          {
              event: "scoperequest:auth-code-received",
              response: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2Y2EwNTEzMi0wYTJmLTQwZjItYTg2Yi03NTkwYmRjYzBmZmUiLCJpYXQiOjE0OTQyMjUxMTkuMTk4LCJleHAiOjE0OTQyMjUyOTkuMTk4LCJpc3MiOiJjaXZpYy1zaXAtaG9zdGVkLXNlcnZpY2UiLCJhdWQiOiJodHRwczovL3BoNHg1ODA4MTUuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2Iiwic3ViIjoiY2l2aWMtc2lwLWhvc3RlZC1zZXJ2aWNlIiwiZGF0YSI6eyJjb2RlVG9rZW4iOiJjY2E3NTE1Ni0wNTY2LTRhNjUtYWZkMi1iOTQzNjc1NDY5NGIifX0.gUGzPPI2Av43t1kVg35diCm4VF9RUCF5d4hfQhcSLFvKC69RamVDYHxPvofyyoTlwZZaX5QI7ATiEMcJOjXRYQ",
              type: "code"
          }
      */

      // encoded JWT Token is sent to the server
      var jwtToken = event.response;

      // Your function to pass JWT token to your server
      console.log(jwtToken);
      axios.get('/submit?token=' + jwtToken).then((res) => {console.log(res)});
    });

    this.civicSip.on('user-cancelled', function (event) {
      /*
          event:
          {
            event: "scoperequest:user-cancelled"
          }
      */
    });

    this.civicSip.on('read', function (event) {
      /*
          event:
          {
            event: "scoperequest:read"
          }
      */
    });

    // Error events.
    this.civicSip.on('civic-sip-error', function (error) {
      // handle error display if necessary.
      console.log('   Error type = ' + error.type);
      console.log('   Error message = ' + error.message);
    });
  }
  onClick = () => {
    this.civicSip.signup({ style: 'popup', scopeRequest: this.civicSip.ScopeRequests.BASIC_SIGNUP });
  }
  render() {
    return (
      <div className="App">
        <button id="signupButton" class="civic-button-a medium" type="button" onClick={this.onClick}>
          <span>Log in with Civic</span>
        </button>
      </div>
    );
  }
}

export default App;
