import logo from './logo.svg';
import './App.css';
import CenteredDiv from "./components/centeredDiv";

function App() {
  return (
    <div className="App">
      <CenteredDiv height={50} sizerHeight={"vh"} width={50} sizerWidth={"vw"}>
          <div className="card border-primary mb-3" style={{maxWidth: "50rem"}}>
              <div className="card-header">Welcome To</div>
              <div className="card-body">
                  <h4 className="card-title">React & Bootswatch</h4>
                  <img src={logo} className="App-logo" alt="logo" />
                  <p className="card-text">
                      Get React Tips <a href="https://reactjs.org" target="_blank">Here</a> And Learn About <a href="https://bootswatch.com/" target="_blank">Bootswatch</a>
                  </p>
              </div>
          </div>
      </CenteredDiv>
    </div>
  );
}

export default App;
