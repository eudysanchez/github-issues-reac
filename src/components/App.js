import React from 'react';
import '../App.css';

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
            return (<div className="no-data">There are no open Issues for this data range</div>);
        }

        const listItems = this.state.data.map((issue) => <li key={issue.id}>
            <h3>Title: {issue.title}</h3>
            <p><b>User:</b> {issue.user.login} <b>Assignee:</b> {issue.assignee ? issue.assignee.login : "No Assignee"}</p>
            <p className="issue-body"><b>Body:</b> {issue.body}</p>
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