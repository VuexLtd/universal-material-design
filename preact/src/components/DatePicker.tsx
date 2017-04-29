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
    startAt?: DateType;
    date?: DateType;
}

function nullArray(size: number) {
    return Array(size).fill(null);
}

export class DatePicker extends Component<DatePickerProps, { currentDate?: Date, selectedDate?: Date }> {
    static defaultProps: Partial<DatePickerProps> = {
        startAt: new Date(),
    };

    constructor(props: DatePickerProps) {
        super(props);
        this.setState({
            currentDate: parseDate(props.startAt || props.date),
            selectedDate: parseDate(props.date || props.startAt),
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

    public selectDay(selectedDate: Date) {
        this.setState({ selectedDate });
    }

    public renderWeek(start: Date) {
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
            currentDate,
            selectedDate,
        } = this.state;

        const classList = [
            'umd-date-picker',
        ];

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
                <h1>{formatDate(selectedDate, 'ddd, MMM D')}</h1>
            </div>
            <div class="umd-date-picker--calendar">
                <div class="umd-date-picker--month-selector">
                    <Button flat icon onClick={this.prevMonth}><Icon icon="chevron_left" /></Button>
                    <h2>{formatDate(currentDate, 'MMMM YYYY')}</h2>
                    <Button flat icon onClick={this.nextMonth}><Icon icon="chevron_right" /></Button>
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
                    <Button flat variant="accent">Cancel</Button>
                    <Button flat variant="accent">Ok</Button>
                </div>
            </div>
        </div>;
    }
}
