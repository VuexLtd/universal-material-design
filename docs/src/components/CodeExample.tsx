import { h, Component } from 'preact';
import { Icon, Button, Toolbar, TabBar, TabLabel } from '@material-design/preact';
import { highlight, listLanguages } from 'highlight.js';

import './CodeExample.scss';

export class CodeExample extends Component<{ title: string, code: {preact: string, angular: string}, language: string }, { visible?: boolean, tab?: number }> {
    public render() {
        const { title, code, language } = this.props;
        const { visible } = this.state;

        const higlighted = [
            highlight(language, code.angular).value,
            highlight(language, code.preact).value,
        ];

        const codeExample = <div class="code-section">
            <TabBar variant="on-primary" onSelected={tab => this.setState({ tab: tab as number })}>
                <TabLabel>Angular</TabLabel>
                <TabLabel>Preact</TabLabel>
            </TabBar>
            <code>
                <pre dangerouslySetInnerHTML={{ __html: higlighted[this.state.tab] }}></pre>
            </code>
        </div>

        return <div class="code-example">
            <Toolbar variant="primary" flat>
                <span>{ title }</span>
                <Button variant="accent" icon onClick={() => this.setState({ visible: !visible })}><Icon icon="code" /></Button>
            </Toolbar>
            { visible && codeExample }
        </div>
    }
}
