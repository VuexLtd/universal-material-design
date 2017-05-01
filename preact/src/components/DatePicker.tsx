import { h, Component } from 'preact';
import { Icon } from './Icon';
import { Button } from './Button';
import * as getDaysInMonth from 'date-fns/get_days_in_month';
import * as setMonth from 'date-fns/set_month';
import * as formatDate from 'date-fns/format';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfMonth from 'date-fns/end_of_month';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as parseDate from 'date-fns/parse';
import * as eachDay from 'date-fns/each_day';
import * as getDay from 'date-fns/get_day';
import * as setDate from 'date-fns/set_date';
import * as isSameMonth from 'date-fns/is_same_month';
import * as addMonths from 'date-fns/add_months';
import * as subMonths from 'date-fns/sub_months';
import * as isSameDay from 'date-fns/is_same_day';

export type DateType = Date | string | number;

export interface DatePickerProps {
    date?: DateType;
    onUpdate?: (date: Date) => void;
    inline?: boolean;
    landscape?: boolean;
}

function nullArray(size: number) {
    return Array(size).fill(null);
}

export class DatePicker extends Component<DatePickerProps, { currentDate?: Date, selectedDate?: Date }> {
    static defaultProps: Partial<DatePickerProps> = {
        date: new Date(),
        onUpdate: () => undefined,
    };

    constructor(props: DatePickerProps) {
        super(props);
        this.reset();
    }

    ////
    // Lifecycle
    ////

    public componentWillReceiveProps(props: DatePickerProps) {
        if (props.date && !isSameDay(this.props.date, props.date)) {
            this.selectDay(props.date);
        }
    }

    ////
    // Events
    ////

    private submit = () => {
        this.props.onUpdate(this.state.selectedDate);
        this.setState({ currentDate: this.state.selectedDate });
    }

    private cancel = () => {
        this.reset();
    }

    ////
    // Render
    ////

    private renderWeek(start: Date) {
        const selected = this.state.selectedDate;

        let end = endOfWeek(start);
        if (!isSameMonth(start, end)) {
            end = endOfMonth(start);
        }

        let days = eachDay(start, end);
        if (days.length < 7) {
            if (getDay(start) === 0) {
                days = [...days, ...nullArray(7 - days.length)]
            } else {
                days = [...nullArray(7 - days.length), ...days]
            }
        }

        return <tr>
            { days.map(day => <td onClick={() => this.selectDay(day)} class={(day && isSameDay(day, selected)) ? 'selected' : ''}>{day && formatDate(day, 'D')}</td>) }
        </tr>
    }

    public render() {
        const {
            inline,
            landscape,
        } = this.props;
        const {
            currentDate,
            selectedDate,
        } = this.state;

        const classList = [
            'umd-date-picker',
        ];

        inline && classList.push('umd-date-picker--inline');
        landscape && classList.push('umd-date-picker--landscape');

        const monthStart = startOfMonth(currentDate);
        const daysInMonthWithOffset = getDaysInMonth(monthStart) + getDay(monthStart);

        const weeks = [];
        for (let i = 0, lenMonth = Math.ceil(daysInMonthWithOffset / 7); i < lenMonth; i++) {
            let date = setDate(monthStart, i * 7 + 1);
            if (i > 0) {
                date = startOfWeek(date);
            }
            weeks.push(date);
        }

        return <div class={classList.join(' ')}>
            <div  class="umd-date-picker--header">
                <h3>{formatDate(selectedDate, 'YYYY')}</h3>
                <h1>
                    <span>{formatDate(selectedDate, 'ddd, ')}</span>
                    <span>{formatDate(selectedDate, 'MMM D')}</span>
                </h1>
            </div>
            <div class="umd-date-picker--calendar">
                <div class="umd-date-picker--month-selector">
                    <Button flat miniFab onClick={this.prevMonth}><Icon icon="chevron_left" /></Button>
                    <h2>{formatDate(currentDate, 'MMMM YYYY')}</h2>
                    <Button flat miniFab onClick={this.nextMonth}><Icon icon="chevron_right" /></Button>
                </div>
                <table>
                    <tr>
                        <th>S</th>
                        <th>M</th>
                        <th>T</th>
                        <th>W</th>
                        <th>T</th>
                        <th>F</th>
                        <th>S</th>
                    </tr>
                    { weeks.map(week => this.renderWeek(week)) }
                </table>
                <div class="umd-date-picker--actions">
                    <Button flat variant="accent" disabled={inline && isSameDay(currentDate, selectedDate)} onClick={this.cancel}>{ inline ? 'Reset' : 'Cancel' }</Button>
                    <Button flat variant="accent" onClick={this.submit}>Ok</Button>
                </div>
            </div>
        </div>;
    }

    ////
    // Public Api
    ////

    public reset() {
        this.setState({
            currentDate: parseDate(this.props.date),
            selectedDate: parseDate(this.props.date),
        });
    }

    public prevMonth = () => {
        this.setState({
            currentDate: subMonths(this.state.currentDate, 1),
        });
    }

    public nextMonth = () => {
        this.setState({
            currentDate: addMonths(this.state.currentDate, 1),
        });
    }

    public selectDay(date: DateType) {
        this.setState({ selectedDate: parseDate(date) });
    }
}
