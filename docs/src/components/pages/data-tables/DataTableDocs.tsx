import { h, Component } from 'preact';
import {
    Content,
    Card,
    CardText,
    DataTable,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    SortOrder,
} from '@material-design/preact';
import { CodeExample } from '../../CodeExample';

import * as preact from './preact.txt';
import * as angular from './angular.txt';

interface Dessert {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    sodium: number;
    calcium: number;
    iron: number;
}

const desserts: Dessert[] = [
    {
        name: 'Frozen yoghurt',
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
        sodium: 87,
        calcium: 14,
        iron: 1,
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: 8,
        iron: 1,
    },
];

const sortFuncs = {
    [SortOrder.Ascending]: (a: Dessert, b: Dessert) => a.calories - b.calories,
    [SortOrder.Descending]: (a: Dessert, b: Dessert) => b.calories - a.calories,
};

export class DataTableDocs extends Component<{}, {}> {
    state = {
        rows: desserts,
    }

    public sortCalories = (order: SortOrder) => {
        this.setState({
            rows: order === SortOrder.None ? desserts : [...desserts].sort(sortFuncs[order]),
        });
    };

    public renderRow(row: Dessert) {
        return <TableRow>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.calories}</TableCell>
            <TableCell>{row.fat}</TableCell>
            <TableCell>{row.carbs}</TableCell>
            <TableCell>{row.protein}</TableCell>
            <TableCell>{row.sodium}</TableCell>
            <TableCell>{row.calcium}%</TableCell>
            <TableCell>{row.iron}%</TableCell>
        </TableRow>
    }

    public render() {
        const { rows } = this.state;

        return <Content>
            <Card fill>
                <CodeExample title="Data Table" code={{ preact, angular }} language="xml"></CodeExample>
                <DataTable>
                    <TableHead>
                        <TableCell fill>Dessert (100g serving)</TableCell>
                        <TableCell numeric sortable onSort={this.sortCalories}>Calories</TableCell>
                        <TableCell numeric>Fat (g)</TableCell>
                        <TableCell numeric>Carbs (g)</TableCell>
                        <TableCell numeric>Protein (g)</TableCell>
                        <TableCell numeric>Sodium (mg)</TableCell>
                        <TableCell numeric>Calcium (%)</TableCell>
                        <TableCell numeric>Iron (%)</TableCell>
                    </TableHead>
                    <TableBody>
                        { rows.map(row => this.renderRow(row)) }
                    </TableBody>
                </DataTable>
            </Card>
        </Content>
    }
}
