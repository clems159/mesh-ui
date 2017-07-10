import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenticsUICoreModule } from 'gentics-ui-core';

import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { StringFieldComponent } from './components/string-field/string-field.component';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { HtmlFieldComponent } from './components/html-field/html-field.component';
import { ListFieldComponent } from './components/list-field/list-field.component';
import { FieldGeneratorService } from './providers/field-generator/field-generator.service';
import { MicronodeFieldComponent } from './components/micronode-field/micronode-field.component';
import { MeshControlGroupService } from './providers/field-control-group/mesh-control-group.service';
import { BooleanFieldComponent } from './components/boolean-field/boolean-field.component';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { NodeFieldComponent } from './components/node-field/node-field.component';
import { BinaryFieldComponent } from './components/binary-field/binary-field.component';
import { CustomFieldComponent } from './components/custom-field/custom-field.component';
import { SharedModule } from '../../shared/shared.module';

const ENTRY_COMPONENTS = [
    BinaryFieldComponent,
    BooleanFieldComponent,
    CustomFieldComponent,
    DateFieldComponent,
    HtmlFieldComponent,
    ListFieldComponent,
    MicronodeFieldComponent,
    NodeFieldComponent,
    NumberFieldComponent,
    StringFieldComponent
];

@NgModule({
    imports: [GenticsUICoreModule, CommonModule, FormsModule, SharedModule],
    declarations: [FormGeneratorComponent, ...ENTRY_COMPONENTS],
    entryComponents: ENTRY_COMPONENTS,
    providers: [FieldGeneratorService, MeshControlGroupService],
    exports: [FormGeneratorComponent]
})
export class FormGeneratorModule {}