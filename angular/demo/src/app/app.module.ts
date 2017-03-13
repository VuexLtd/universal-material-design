import { DemoDialog, DialogDemoComponent } from './demos/dialog/dialog-demo.component';
import { TextFieldDemoComponent } from './demos/textfield/textfield-demo.component';
import { TypographyDemoComponent } from './demos/typography/typography-demo.component';
import { ToolbarDemoComponent } from './demos/toolbar/toolbar-demo.component';
import { RippleDemoComponent } from './demos/ripple/ripple-demo.component';
import { IconDemoComponent } from './demos/icon/icon-demo.component';
import { ChipDemoComponent } from './demos/chip/chip-demo.component';
import { CardDemoComponent } from './demos/card/card-demo.component';
import { MaterialDesignModule } from '@material-design/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { ButtonDemoComponent } from './demos/button/button-demo.component';
import { MenuDemoComponent } from './demos/menu/menu-demo.component';
import { TabDemoComponent } from './demos/tab/tab-demo.component';

@NgModule({
    imports: [
        BrowserModule,
        MaterialDesignModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ButtonDemoComponent,
        CardDemoComponent,
        ChipDemoComponent,
        DialogDemoComponent,
        IconDemoComponent,
        MenuDemoComponent,
        RippleDemoComponent,
        TabDemoComponent,
        TextFieldDemoComponent,
        ToolbarDemoComponent,
        TypographyDemoComponent,
        DemoDialog,
    ],
    entryComponents: [DemoDialog],
    bootstrap: [AppComponent],
})
export class AppModule {}
