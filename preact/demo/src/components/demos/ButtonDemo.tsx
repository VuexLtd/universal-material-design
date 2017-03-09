import { h } from 'preact';
import { Button, Icon } from '@material-design/preact';

export function ButtonDemo() {
    return <div>
        <h2 class="umd-type--display-1">Buttons</h2>
        <div>
            <h3 class="umd-type--headline">Primary</h3>
            <Button>Primary Button</Button>
            <Button disabled>Primary Button</Button>
        </div>
        <div>
            <h3 class="umd-type--headline">Dense</h3>
            <Button dense>Dense Button</Button>
            <Button dense disabled>Dense Button</Button>
        </div>
        <div>
            <h3 class="umd-type--headline">Flat</h3>
            <Button flat>Flat Button</Button>
            <Button flat disabled>Flat Button</Button>
        </div>
        <div>
            <h3 class="umd-type--headline">Icon</h3>
            <div>
                <Button icon><Icon icon="add" /></Button>
                <Button icon disabled><Icon icon="more_vert" /></Button>
            </div>
            <div>
                <Button flat icon><Icon icon="send" /></Button>
                <Button flat icon disabled><Icon icon="face" /></Button>
            </div>
        </div>
    </div>
}
