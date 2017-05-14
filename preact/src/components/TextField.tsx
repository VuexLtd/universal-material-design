import { h, Component } from 'preact';

import { PassthroughProps, PropBuilder } from '../props';

export interface TextFieldProps extends PassthroughProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'textarea';
    label?: string;
    disabled?: boolean;
    variant?: string;

    value?: string;
    name?: string;
    onInput?(evt: Event): void;
}

export interface TextFieldState {
    hasFocus?: boolean;
    value?: string;
}

export class TextField extends Component<TextFieldProps, TextFieldState> {
    static defaultProps: TextFieldProps = {
        type: 'text',
        label: null,
        disabled: false,
        value: '',
        variant: 'default',
        onInput: () => undefined,
    };

    public state: TextFieldState = {
        hasFocus: false,
        value: '',
    };

    public componentDidMount() {
        this.setState({ value: this.props.value });
    }

    public componentWillReceiveProps(props) {
        if (props !== this.state.value) {
            this.setState({ value: props.value });
        }
    }

    public onFocus = () => {
        this.setState({ hasFocus: true });
    }

    public onBlur = () => {
        this.setState({ hasFocus: false });
    }

    public onInput = evt => {
        this.setState({ value: evt.target.value });
        this.props.onInput(evt);
    }

    public render() {
        const {
            children,
            type,
            label,
            disabled,
            variant,
        } = this.props;

        const {
            hasFocus,
            value,
        } = this.state;

        const pb = new PropBuilder(this)
            .withBaseClass('umd-textfield')
            .maybeClass('&--focused', hasFocus)
            .maybeClass('&--disabled', disabled)

        const labelClasses = ['umd-textfield__label'];

        if (hasFocus || !!value) {
            labelClasses.push('umd-textfield__label--floating');
        }

        let input;
        if (type === 'textarea') {
            input = <textarea
                class="umd-textfield__input"
                name={this.props.name}
                onInput={this.onInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            >value</textarea>
        } else {
            input = <input
                class="umd-textfield__input"
                type={type}
                value={value}
                name={this.props.name}
                onInput={this.onInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        }

        return (
            <label {...pb.render()} data-umd-variant={variant}>
                <span class={labelClasses.join(' ')}>{label}</span>
                {input}
                <span class="umd-textfield__underline"></span>
            </label>
        )
    }
}
