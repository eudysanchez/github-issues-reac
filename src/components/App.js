import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        fetch(`https://api.github.com/repos/angular/angular/issues?q=is%3Aissue+is%3Aopen+past+7+days+`)
        .then(response => response.json())
        .then(
            data => {
                this.setState({
                    data: data
                });
            }
        );
    }

    render() {
        if (!this.state.data) {
            return (<div className="user-page">LOADING...</div>);
        }
        const border = {
          'border-bottom': '2px solid black'
        };
        const listItems = this.state.data.map((issue) => <li key={issue.id}>
            <h3>Title: {issue.title}</h3>
            <p><b>User:</b> {issue.user.login} <b>Assignee:</b> {issue.assignee ? issue.assignee.login : "No Assignee"}</p>
            <p style={border}><b>Body:</b> {issue.body}</p>
         </li>);
        return (
            <div className="issues-page">
              <ul className="issue-info">
                {listItems}
              </ul>
            </div>
        );
    }
};

export default App;