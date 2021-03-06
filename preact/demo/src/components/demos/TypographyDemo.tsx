import { h } from 'preact';
import { Icon } from '@material-design/preact';

export function TypographyDemo() {
    return <div>
        <h2 class="umd-type--display-1">Typography</h2>
        <div>
            <div class="umd-type--display-4">Display 4</div>
            <div class="umd-type--display-3">Display 3</div>
            <div class="umd-type--display-2">Display 2</div>
            <div class="umd-type--display-1">Display 1</div>
            <div class="umd-type--headline">Headline</div>
            <div class="umd-type--title">Title</div>
            <div class="umd-type--subheading">Subheading</div>
            <div class="umd-type--body-2">Body 2</div>
            <div class="umd-type--body-1">Body 1</div>
            <div class="umd-type--caption">Caption</div>
        </div>
    </div>
}
