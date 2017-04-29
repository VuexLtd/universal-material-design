import { h } from 'preact';
import {
    Content,
    Card,
    CardText,
    DatePicker,
} from '@material-design/preact';
import { CodeExample } from '../../CodeExample';

import * as preact from './preact.txt';
import * as angular from './angular.txt';

export function DatePickerDocs() {
    return <Content>
        <Card fill>
            <CodeExample title="Date Picker" code={{ preact, angular }} language="xml"></CodeExample>
            <CardText>
                <DatePicker />
            </CardText>
        </Card>
    </Content>
}
