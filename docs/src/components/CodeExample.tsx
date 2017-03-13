import { h, Component } from 'preact';
import { Icon, Button, Toolbar } from '@material-design/preact';
import { highlight, listLanguages } from 'highlight.js';

import './CodeExample.scss';

export class CodeExample extends Component<{ title: string, code: {preact: string, angular: string}, language: string }, { visible: boolean }> {
    public render() {
        const { title, code, language } = this.props;
        const { visible } = this.state;

        const { value: angular } = highlight(language, code.angular);
        const { value: preact } = highlight(language, code.preact);

        return <div class="code-example">
            <Toolbar variant="primary" flat>
                <span>{ title }</span>
                <Button variant="accent" icon onClick={() => this.setState({ visible: !visible })}><Icon icon="code" /></Button>
            </Toolbar>
            { visible && <code>
                <pre dangerouslySetInnerHTML={{ __html: preact }}></pre>
            </code> }
        </div>
    }
}
