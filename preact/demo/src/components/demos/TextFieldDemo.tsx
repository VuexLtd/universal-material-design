import { h } from 'preact';
import { TextField } from '@material-design/preact';

export function TextFieldDemo() {
    return <div>
        <h2 class="umd-type--display-1">Text Fields</h2>
        <div>
            <TextField label="Label text" />
            <TextField variant="primary" label="Label text" />
            <TextField variant="accent" label="Label text" />
            <TextField type="textarea" variant="primary" label="Textarea" />
            <TextField label="Disabled input" disabled value="This should be disabled" />
        </div>
    </div>
}
