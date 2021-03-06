import { h, Component } from 'preact';
import { Toolbar, Content } from '@material-design/preact';

import { ButtonDemo } from './demos/ButtonDemo';
import { CardDemo } from './demos/CardDemo';
import { ChipDemo } from './demos/ChipDemo';
import { DialogDemo } from './demos/DialogDemo';
import { IconDemo } from './demos/IconDemo';
import { MenuDemo } from './demos/MenuDemo';
import { RippleDemo } from './demos/RippleDemo';
import { TextFieldDemo } from './demos/TextFieldDemo';
import { ToolbarDemo } from './demos/ToolbarDemo';
import { TypographyDemo } from './demos/TypographyDemo';

export class App extends Component<{}, {}> {
    public render() {
        return (
            <div>
                <Toolbar variant="primary">Preact Material Design</Toolbar>
                <Content>
                    <p>A set of components for Preact that conform to the material design guidlines.</p>
                    <ButtonDemo />
                    <CardDemo />
                    <ChipDemo />
                    <DialogDemo />
                    <IconDemo />
                    <MenuDemo />
                    <RippleDemo />
                    <TextFieldDemo />
                    <ToolbarDemo />
                    <TypographyDemo />
                </Content>
            </div>
        )
    }
}
