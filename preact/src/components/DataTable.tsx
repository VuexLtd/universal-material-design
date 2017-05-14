import { h, Component, cloneElement } from 'preact';
import { incrEnum } from '@material-design/core';

import { PassthroughProps, PropBuilder } from '../props';
import { Icon } from './Icon';

export interface TableCellProps extends PassthroughProps {
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

export class DataTable extends Component<PassthroughProps, {}> {
    private table = new Table();

    public getChildContext() {
        return {
            umdDataTable: this.table,
        };
    }

    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this)
            .withBaseClass('umd-data-table');

        return <table {...pb.render()}>{children}</table>;
    }
}

export class TableHead extends Component<PassthroughProps, {}> {
    public getChildContext() {
        return {
            umdDataTableIsHeader: true,
        };
    }

    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this);

        return <thead {...pb.render()}><TableRow>{children}</TableRow></thead>
    }
}

export class TableBody extends Component<PassthroughProps, {}> {
    public render() {
        const { children } = this.props;
        const pb = new PropBuilder(this);

        return <tbody {...pb.render()}>{children}</tbody>
    }
}

export class TableRow extends Component<PassthroughProps, {}> {
    public render() {
        let { children } = this.props;
        const pb = new PropBuilder(this);
        children = children.map((child, index) => cloneElement(child, { index }))

        return <tr {...pb.render()}>{children}</tr>
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

        const pb = new PropBuilder(this)
            .withBaseClass('umd-data-table')
            .maybeClass('&--fill', fill)
            .maybeClass('&--numeric', numeric)
            .maybeClass('&--sortable', sortable)
            .maybeClass('&--sorted', sortable && sort !== SortOrder.None)

        if (this.context.umdDataTableIsHeader) {
            return <th onClick={this.toggleSortOrder} {...pb.render()}>
                { sortable && sort !== SortOrder.None && <Icon size="dense" icon={`arrow_${sort === SortOrder.Ascending ? 'upward' : 'downward'}`} /> }
                {children}
            </th>;
        }

        return <td {...pb.render()}>{children}</td>
    }
}
