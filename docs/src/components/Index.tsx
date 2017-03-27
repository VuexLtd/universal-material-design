import { h } from 'preact';
import { Content, Button, Card, Ripple, TabBar, TabLabel } from '@material-design/preact';

import { RouterLink } from './RouterLink';

import './Index.scss';

export function Index() {
    return <Content>
        <h1 class="umd-type--display-1">Components</h1>
        <div class="components">
            <RouterLink href="/components/buttons">
                <div class="preview">
                    <Button variant="primary"></Button>
                    <Button variant="accent"></Button>
                    <Button>Buttons</Button>
                    <Ripple />
                </div>
            </RouterLink>
            <RouterLink href="/components/tabs">
                <div class="preview">
                    <TabBar variant="primary"><TabLabel></TabLabel></TabBar>
                    <TabBar variant="accent"><TabLabel></TabLabel></TabBar>
                    <TabBar><TabLabel>TABS</TabLabel></TabBar>
                    <Ripple />
                </div>
            </RouterLink>
        </div>
    </Content>
}
