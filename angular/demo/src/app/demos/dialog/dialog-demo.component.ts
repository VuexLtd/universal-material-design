import { MdaDialog, MdaDialogRef } from '@material-design/angular';
import { Component } from '@angular/core';

@Component({
    selector: 'dialog-demo',
    templateUrl: './dialog-demo.component.html',
})
export class DialogDemoComponent {
    constructor(private dialog: MdaDialog) {
    }

    public showDialog() {
        this.dialog.open(DemoDialog);
    }
}

@Component({
    selector: 'demo-dialog',
    template: `
        <mda-dialog-title>Dialog Title</mda-dialog-title>
        <mda-dialog-content>This is the dialog's content</mda-dialog-content>
        <mda-dialog-actions>
            <button mdaButton (click)="dialogRef.close()">Cancel</button>
            <button mdaButton>Ok</button>
        </mda-dialog-actions>
    `
})
export class DemoDialog {
    constructor(public dialogRef: MdaDialogRef) {
    }
}
