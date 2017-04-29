import { h } from 'preact';
import {
    Content,
    Card,
    CardText,
    Divider,
} from '@material-design/preact';
import { CodeExample } from '../../CodeExample';

import * as preact from './preact.txt';
import * as angular from './angular.txt';

export function DividerDocs() {
    return <Content>
        <Card fill>
            <CodeExample title="Divider" code={{ preact, angular }} language="xml"></CodeExample>
            <CardText>
                <div>
                    <Divider />
                </div>
            </CardText>
        </Card>
    </Content>
}
