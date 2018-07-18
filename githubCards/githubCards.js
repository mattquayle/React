import { get } from 'axios';

const Card = (props) => {
    return (
        <div style={{marginLeft: 10, marginTop: 10}}>
            <img width="75" src={props.avatar_url} />
            <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'top'}}>
                <div style= {{fontSize: '1.25em', fontWeight: 'bold'}}>
                    {props.name}
                </div>
                <div>
                    {props.company}
                </div>
            </div>
        </div>
    );
}

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card {...card}/>)}
        </div>
    );
}

class Form extends React.Component {
    state = { userName: '' };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form Submit', this.state.userName);
        get('https://api.github.com/users/${this.state.username}')
            .then(resp => {
                console.log(resp);
            })
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                    value={this.state.userName}
                    onChange={(event) => this.setState({userName: event.target.value})}
                    placeholder="Github username" 
                    required
                />
                <button type="submit">Add Card</button>
            </form>
        );
    };
}

class App extends React.Component {
    state = {
        cards: [
            { 
                name: "Matt Quayle",
                avatar_url: "https://avatars0.githubusercontent.com/u/25664582?v=4",
                company: "EMIS Health" 
            },
            { 
                name: "Ben Selby",
                avatar_url: "https://avatars1.githubusercontent.com/u/178634?v=4",
                company: "EMIS Health" 
            }
        ]
    };

    render() {
        return (
            <div>
                <Form />
                <CardList cards={this.state.cards}/>
            </div>
        );
    }
}

const domContainer = document.querySelector('#githubCards');
ReactDOM.render(<App/>, domContainer);