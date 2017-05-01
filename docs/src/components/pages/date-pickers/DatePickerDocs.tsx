import { h, Component } from 'preact';
import {
    Content,
    Card,
    CardText,
    DatePicker,
    TextField,
} from '@material-design/preact';
import { observable, action, useStrict } from 'mobx';
import { observer } from 'preact-mobx';

import { CodeExample } from '../../CodeExample';

import * as preact from './preact.txt';
import * as angular from './angular.txt';

useStrict(true);

@observer
export class DatePickerDocs extends Component<any, any> {
    @observable date = new Date();
    @observable isInline = true;
    @observable isLandscape = false;

    @action.bound
    public setDate(date) {
        this.date = date;
    }

    @action.bound
    public toggleInline(evt: Event) {
        this.isInline = (evt.target as HTMLInputElement).checked;
    }

    @action.bound
    public toggleLandscape(evt: Event) {
        this.isLandscape = (evt.target as HTMLInputElement).checked;
    }

    public render() {
        return <Content>
            <Card fill>
                <CodeExample title="Date Picker" code={{ preact, angular }} language="xml"></CodeExample>
                <CardText>
                    <div style="display: flex; margin-bottom: 32px;">
                        <div>
                            <TextField variant="accent" label="Date" value={this.date.toLocaleString()} />
                            <DatePicker
                                inline={this.isInline}
                                landscape={this.isLandscape}
                                date={this.date}
                                onUpdate={this.setDate}
                            />
                        </div>
                        <div class="umd-type--body-1" style="padding-left: 32px;">
                            <div>
                                <span class="umd-type--body-2">Date: </span>
                                {this.date.toLocaleString()}
                            </div>
                            <div>
                                <span class="umd-type--body-2">Inline: </span>
                                <input type="checkbox" checked={this.isInline} onChange={this.toggleInline} />
                            </div>
                            <div>
                                <span class="umd-type--body-2">Landscape: </span>
                                <input type="checkbox" checked={this.isLandscape} onChange={this.toggleLandscape} />
                            </div>
                        </div>
                    </div>
                </CardText>
            </Card>
        </Content>
    }
}
