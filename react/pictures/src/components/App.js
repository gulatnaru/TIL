import React, { Component } from "react";
import unsplash from '../api/unsplash';
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App extends Component {
  state = {
    images: []
  }
  onSearchSubmit = async keyword => {
    const response = await unsplash.get("search/photos", {
      params: { query: keyword }
    });

    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onUserSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
