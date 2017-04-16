import { h } from 'preact';
import { Content, Button, Card, CardText, CardTitle, CardSubtitle, Icon } from '@material-design/preact';
import { CodeExample } from '../../CodeExample';

import * as preact from './preact.txt';
import * as angular from './angular.txt';

export function ButtonDocs() {
    return <Content>
        <Card fill>
            <CodeExample title="Buttons" code={{ preact, angular }} language="xml"></CodeExample>
            <CardText>
                <h1 class="umd-type--title">Regular</h1>
                <Button variant="default">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="accent">Accent</Button>
                <Button disabled>Disabled</Button>
            </CardText>
            <CardText>
                <h1 class="umd-type--title">Dense</h1>
                <Button variant="default" dense>Default</Button>
                <Button variant="primary" dense>Primary</Button>
                <Button variant="accent" dense>Accent</Button>
                <Button disabled dense>Disabled</Button>
            </CardText>
            <CardText>
                <h1 class="umd-type--title">Flat</h1>
                <Button variant="default" flat>Default</Button>
                <Button variant="primary" flat>Primary</Button>
                <Button variant="accent" flat>Accent</Button>
                <Button disabled flat>Disabled</Button>
            </CardText>
            <CardText>
                <h1 class="umd-type--title">Icon</h1>
                <Button variant="default" icon><Icon icon="add" /></Button>
                <Button variant="primary" icon><Icon icon="send" /></Button>
                <Button variant="accent" icon><Icon icon="edit" /></Button>
                <Button disabled icon><Icon icon="more_vert" /></Button>
            </CardText>
            <CardText>
                <h1 class="umd-type--title">FAB</h1>
                <div>
                    <Button variant="default" fab><Icon icon="add" /></Button>
                    <Button variant="primary" fab><Icon icon="send" /></Button>
                    <Button variant="accent" fab><Icon icon="edit" /></Button>
                    <Button disabled fab><Icon icon="more_vert" /></Button>
                </div>
                <div>
                    <Button variant="default" miniFab><Icon icon="add" /></Button>
                    <Button variant="primary" miniFab><Icon icon="send" /></Button>
                    <Button variant="accent" miniFab><Icon icon="edit" /></Button>
                    <Button disabled miniFab><Icon icon="more_vert" /></Button>
                </div>
            </CardText>
        </Card>
    </Content>
}
