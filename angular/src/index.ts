import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdaButton } from './components/button';
import {
    MdaCard,
    MdaCardActions,
    MdaCardHeader,
    MdaCardMedia,
    MdaCardMediaArea,
    MdaCardSubtitle,
    MdaCardText,
    MdaCardTitle,
} from './components/card';
import { MdaChip } from './components/chip';
import { MdaContent } from './components/content';
import {
    MdaDialog,
    MdaDialogActions,
    MdaDialogArgs,
    MdaDialogContainer,
    MdaDialogContent,
    MdaDialogTitle,
    MdaDialogRef
} from './components/dialog';
import { MdaIcon } from './components/icon';
import { MdaMenu, MdaMenuTrigger, MdaMenuItem } from './components/menu';
import { MdaRipple } from './components/ripple';
import { MdaTabBar, MdaTabLabel } from './components/tab';
import { MdaTextField } from './components/textfield';
import { MdaToolbar } from './components/toolbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        MdaButton,
        MdaCard,
        MdaCardActions,
        MdaCardHeader,
        MdaCardMedia,
        MdaCardMediaArea,
        MdaCardSubtitle,
        MdaCardText,
        MdaCardTitle,
        MdaChip,
        MdaContent,
        MdaDialogActions,
        MdaDialogContainer,
        MdaDialogContent,
        MdaDialogTitle,
        MdaIcon,
        MdaMenu,
        MdaMenuTrigger,
        MdaMenuItem,
        MdaRipple,
        MdaTabBar,
        MdaTabLabel,
        MdaTextField,
        MdaToolbar,
    ],
    exports: [
        MdaButton,
        MdaCard,
        MdaCardActions,
        MdaCardHeader,
        MdaCardMedia,
        MdaCardMediaArea,
        MdaCardSubtitle,
        MdaCardText,
        MdaCardTitle,
        MdaChip,
        MdaContent,
        MdaDialogActions,
        MdaDialogContent,
        MdaDialogTitle,
        MdaIcon,
        MdaMenu,
        MdaMenuTrigger,
        MdaMenuItem,
        MdaRipple,
        MdaTabBar,
        MdaTabLabel,
        MdaTextField,
        MdaToolbar,
    ],
    entryComponents: [MdaDialogContainer]
})
export class MaterialDesignModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialDesignModule,
            providers: [
                MdaDialog,
            ]
        }
    }
}

export {
    MdaButton,
    MdaCard,
    MdaCardActions,
    MdaCardHeader,
    MdaCardMedia,
    MdaCardMediaArea,
    MdaCardSubtitle,
    MdaCardText,
    MdaCardTitle,
    MdaChip,
    MdaContent,
    MdaDialog,
    MdaDialogRef,
    MdaDialogActions,
    MdaDialogArgs,
    MdaDialogContainer,
    MdaDialogContent,
    MdaDialogTitle,
    MdaIcon,
    MdaMenu,
    MdaMenuTrigger,
    MdaMenuItem,
    MdaRipple,
    MdaTabBar,
    MdaTabLabel,
    MdaTextField,
    MdaToolbar,
}
