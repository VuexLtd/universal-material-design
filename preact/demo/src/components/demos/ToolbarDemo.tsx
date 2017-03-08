import { h } from 'preact';
import { Toolbar } from '@material-design/preact';

export function ToolbarDemo() {
    return <div>
        <h2 class="umd-type--display-1">Toolbars</h2>
        <div>
            <h3 class="umd-type--headline">App</h3>
            <Toolbar>App Toolbar</Toolbar>
        </div>
    </div>
}
