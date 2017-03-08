import { h, Component } from 'preact';

export interface TextFieldProps {
    type?: 'text' | 'password' | 'email' | 'number';
    label?: string;
    disabled?: boolean;

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
        } = this.props;

        const {
            hasFocus,
            value,
        } = this.state;

        const textfieldClasses = ['umd-textfield'];
        const labelClasses = ['umd-textfield__label'];

        if (hasFocus || !!value) {
            labelClasses.push('umd-textfield__label--floating');

            if (hasFocus) {
                textfieldClasses.push('umd-textfield--focused');
            }
        }

        if (disabled) {
            textfieldClasses.push('umd-textfield--disabled');
        }

        return (
            <label class={textfieldClasses.join(' ')}>
                <span class={labelClasses.join(' ')}>{label}</span>
                <input
                    class="umd-textfield__input"
                    type={type}
                    value={value}
                    name={this.props.name}
                    onInput={this.onInput}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                <span class="umd-textfield__underline"></span>
            </label>
        )
    }
}
