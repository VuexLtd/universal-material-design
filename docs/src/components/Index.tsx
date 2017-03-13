import { h } from 'preact';
import { Content, Button, Card, Ripple } from '@material-design/preact';

import { RouterLink } from './RouterLink';

import './Index.scss';

export function Index() {
    return <Content>
        <h1 class="umd-type--display-1">Components</h1>
        <RouterLink href="/components/buttons">
            <div class="button-preview">
                <Button variant="primary"></Button>
                <Button variant="accent"></Button>
                <Button>Buttons</Button>
                <Ripple />
            </div>
        </RouterLink>
    </Content>
}
