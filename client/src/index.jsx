import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };
    this.getTopRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // When a user types a github username into the text field (and clicks 'Add Repos'),
    // use jQuery's ajax method to send a POST request to /repos
    $.ajax({
        url: 'http://localhost:1128/repos',
        method: 'POST',
        data: {username: term},
    });
  }
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
  getTopRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('GET result:', data);
        this.setState({repos: data});
      },
      error: (err) => {
        console.log('GET request failed:', err);
      }
    })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

