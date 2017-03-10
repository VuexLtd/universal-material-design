import { MdaDialog, MdaDialogRef } from '@material-design/angular';
import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'dialog-demo',
    templateUrl: './dialog-demo.component.html',
})
export class DialogDemoComponent {
    public dialogRef: MdaDialogRef;

    constructor(private dialog: MdaDialog) {
    }

    public showDialog(template: TemplateRef<any>) {
        if (template) {
            this.dialogRef = this.dialog.open(template);
        } else {
            this.dialogRef = this.dialog.open(DemoDialog);
        }
    }
}

@Component({
    selector: 'demo-dialog',
    template: `
        <mda-dialog-title>Component Based Dialog!</mda-dialog-title>
        <mda-dialog-content>This dialog was created using component.</mda-dialog-content>
        <mda-dialog-actions>
            <button mdaButton (click)="dialogRef.close()">Cancel</button>
            <button mdaButton (click)="dialogRef.close()">Ok</button>
        </mda-dialog-actions>
    `
})
export class DemoDialog {
    constructor(public dialogRef: MdaDialogRef) {
    }
}
