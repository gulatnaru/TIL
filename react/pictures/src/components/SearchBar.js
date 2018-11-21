import React, { Component } from 'react'

class SearchBar extends Component {
  state = { keyword: '' }

  removeBadWords = (input) => {
    this.setState({ keyword: input }, () => {
      if(/.*fool.*/i.test(this.state.keyword)) {
        this.setState({ 
          keyword: this.state.keyword.replace(/fool/i, 'NOPE') 
        });
      }
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onUserSubmit(this.state.keyword)
  }

  render = () => {
    return (
      <div className="ui segment container">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <label htmlFor="keyword">Search!</label>
          <input
           id="keyword" 
           type="text"
           onChange={e => this.removeBadWords(e.target.value)}
           value={this.state.keyword}
          />
        </form>
      </div>
    )
  }
}
export default SearchBar;