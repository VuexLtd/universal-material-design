import { h } from 'preact';
import {
    Content,
    Card,
    CardText,
    TabBar,
    TabLabel,
    Toolbar,
} from '@material-design/preact';
import { CodeExample } from '../../CodeExample';

import * as preact from './preact.txt';
import * as angular from './angular.txt';

export function TabDocs() {
    return <Content>
        <Card fill>
            <CodeExample title="Tabs" code={{ preact, angular }} language="xml"></CodeExample>
            <CardText>
                <h1 class="umd-type--title">Tab Bar</h1>
                <TabBar variant="primary">
                    <TabLabel>Tab 1</TabLabel>
                    <TabLabel>Tab 2</TabLabel>
                    <TabLabel>Tab 3 with quite a long tab label, like seriously stupidly large</TabLabel>
                </TabBar>
                <br />
                <TabBar variant="accent">
                    <TabLabel>Tab 1</TabLabel>
                    <TabLabel>Tab 2</TabLabel>
                    <TabLabel>Tab 3</TabLabel>
                </TabBar>
                <br />
                <Toolbar flat variant="primary">
                    <TabBar variant="on-primary">
                        <TabLabel>Tab 1</TabLabel>
                        <TabLabel>Tab 2</TabLabel>
                        <TabLabel>Tab 3</TabLabel>
                    </TabBar>
                </Toolbar>
                <br />
                <Toolbar flat variant="accent">
                    <TabBar variant="on-accent">
                        <TabLabel>Tab 1</TabLabel>
                        <TabLabel>Tab 2</TabLabel>
                        <TabLabel>Tab 3</TabLabel>
                    </TabBar>
                </Toolbar>
            </CardText>
        </Card>
    </Content>
}
