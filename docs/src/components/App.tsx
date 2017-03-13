import { h, Component } from 'preact';
import { Toolbar, Content } from '@material-design/preact';
import { Router, Route } from 'preact-enroute';

import { Index } from './Index';
import { ButtonDocs } from './pages/buttons/ButtonDocs';
import { TabDocs } from './pages/tabs/TabDocs';

export class App extends Component<{}, {}> {
	public state = {
        location: window.location.pathname,
    };

	public componentDidMount() {
		window.addEventListener('popstate', () => {
			this.setState({ location: window.location.pathname });
		});
	}

	public getChildContext() {
		return {
			navigate: path => {
				history.pushState({}, '', path);
				this.setState({ location: path });
			},
		};
	}

    public render() {
        return <div>
            <Toolbar variant="primary">Universal Material Design</Toolbar>
            <Router {...this.state}>
                <Route path="/" component={Index} />
                <Route path="/components/buttons" component={ButtonDocs} />
                <Route path="/components/tabs" component={TabDocs} />
            </Router>
        </div>
    }
}
