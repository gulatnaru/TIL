import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import ErrorDisplay from "./ErrorDisplay";

class App extends React.Component {
  state = {
    lat: null, // 아직 모른다. but 들어는 온다.
    errorMessage: ""
  };

  renderContent() {
     // 사용자 허용함
      if (!this.state.errorMessage && this.state.lat) {
        return (<SeasonDisplay latitude={this.state.lat}/>);
      }
      // 사용자 거부함
      if (this.state.errorMessage && !this.state.lat) {
        return (<ErrorDisplay errorMessage={this.state.errorMessage} />);
      }
      // 사용자 허용/거부 기다리는 중...
      return (<Spinner message="Where are you??..?" />)
  }

  render() {
    return (
        <div style={{border: 'solid red 10px'}}>
            {this.renderContent()}
        </div>
    )
   
  }

  componentDidMount() {
    console.log("컴포넌트 납시오.");
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({ lat: position.coords.latitude });
      },
      error => {
        this.setState({ errorMessage: error.message });
      }
    );
  }

  componentDidUpdate() {
    console.log("컴포넌트 update & re-rendered");
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
