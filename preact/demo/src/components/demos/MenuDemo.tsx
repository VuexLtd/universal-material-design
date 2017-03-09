import { h, Component } from 'preact';
import { Button, Menu, MenuItem } from '@material-design/preact';

export class MenuDemo extends Component<{}, {}> {
    menuTopLeft: Menu;
    menuTopRight: Menu;
    menuBottomLeft: Menu;
    menuBottomRight: Menu;

    public render() {
        return <div>
            <h2 class="umd-type--display-1">Menus</h2>
            <div>
                <Button onClick={evt => this.menuTopLeft.open(evt.target as HTMLElement)}>Top Left</Button>
                <Menu ref={menu => this.menuTopLeft = menu}>
                    <MenuItem>Item 1</MenuItem>
                    <MenuItem>Item 2</MenuItem>
                    <MenuItem>Item 3</MenuItem>
                </Menu>

                <Button onClick={evt => this.menuTopRight.open(evt.target as HTMLElement)}>Top Right</Button>
                <Menu ref={menu => this.menuTopRight = menu} position="top right">
                    <MenuItem>Item 1</MenuItem>
                    <MenuItem>Item 2</MenuItem>
                    <MenuItem>Item 3</MenuItem>
                </Menu>

                <Button onClick={evt => this.menuBottomLeft.open(evt.target as HTMLElement)}>Bottom Left</Button>
                <Menu ref={menu => this.menuBottomLeft = menu} position="bottom left">
                    <MenuItem>Item 1</MenuItem>
                    <MenuItem>Item 2</MenuItem>
                    <MenuItem>Item 3</MenuItem>
                </Menu>

                <Button onClick={evt => this.menuBottomRight.open(evt.target as HTMLElement)}>Bottom Right</Button>
                <Menu ref={menu => this.menuBottomRight = menu} position="bottom right">
                    <MenuItem>Item 1</MenuItem>
                    <MenuItem>Item 2</MenuItem>
                    <MenuItem>Item 3</MenuItem>
                </Menu>
            </div>
        </div>
    }
}

