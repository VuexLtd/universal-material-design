import { h, Component, cloneElement } from 'preact';
import { incrEnum } from '@material-design/core';

import { Icon } from './Icon';

export interface TableCellProps {
    index?: number;
    numeric?: boolean;
    fill?: boolean;
    sortable?: boolean;
    onSort?: (order: SortOrder) => void;
}

export enum SortOrder {
    None,
    Ascending,
    Descending,
}

export class Table {
    headers = new Map<number, TableCellProps>();
}

export class DataTable extends Component<{}, {}> {
    private table = new Table();

    public getChildContext() {
        return {
            umdDataTable: this.table,
        };
    }

    public render() {
        const { children } = this.props;
        return <table class="umd-data-table">{children}</table>;
    }
}

export class TableHead extends Component<{}, {}> {
    public getChildContext() {
        return {
            umdDataTableIsHeader: true,
        };
    }

    public render() {
        const { children } = this.props;
        return <thead><TableRow>{children}</TableRow></thead>
    }
}

export class TableBody extends Component<{}, {}> {
    public render() {
        const { children } = this.props;
        return <tbody>{children}</tbody>
    }
}

export class TableRow extends Component<{}, {}> {
    public render() {
        let { children } = this.props;
        children = children.map((child, index) => cloneElement(child, { index }))
        return <tr>{children}</tr>
    }
}

export class TableCell extends Component<TableCellProps, { sort: SortOrder }> {
    static defaultProps: TableCellProps = {
        onSort: () => undefined,
    };

    context: {
        umdDataTable: Table;
        umdDataTableIsHeader: boolean;
    };

    state = {
        sort: SortOrder.None,
    };

    public toggleSortOrder = () => {
        if (!this.props.sortable) {
            return;
        }

        const sort = incrEnum(SortOrder, this.state.sort);
        this.setState({ sort });
        this.props.onSort(sort);
    }

    public componentWillMount() {
        if (this.context.umdDataTableIsHeader) {
            this.context.umdDataTable.headers.set(this.props.index, this.props);
        }
    }

    public componentWillReceiveProps(props: TableCellProps) {
        if (this.context.umdDataTableIsHeader) {
            this.context.umdDataTable.headers.set(this.props.index, this.props);
        }
    }

    public render() {
        let {
            children,
            fill,
            numeric,
            sortable,
        } = this.props;

        const {
            sort,
        } = this.state;

        if (!this.context.umdDataTableIsHeader) {
            const header = this.context.umdDataTable.headers.get(this.props.index);
            if (fill == null) fill = header.fill;
            if (numeric == null) numeric = header.numeric;
        }

        const classes = [];

        if (fill) {
            classes.push('umd-data-table--fill');
        }

        if (numeric) {
            classes.push('umd-data-table--numeric');
        }

        if (sortable) {
            classes.push('umd-data-table--sortable');

            if (sort !== SortOrder.None) {
                classes.push('umd-data-table--sorted');
            }
        }

        if (this.context.umdDataTableIsHeader) {
            return <th onClick={this.toggleSortOrder} class={classes.join(' ')}>
                { sortable && sort !== SortOrder.None && <Icon size="dense" icon={`arrow_${sort === SortOrder.Ascending ? 'upward' : 'downward'}`} /> }
                {children}
            </th>;
        }

        return <td class={classes.join(' ')}>{children}</td>
    }
}
