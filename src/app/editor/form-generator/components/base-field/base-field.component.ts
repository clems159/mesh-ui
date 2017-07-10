import { Component, HostBinding } from '@angular/core';
import { MeshFieldControlApi, SchemaFieldPath } from '../../common/form-generator-models';
import { MeshNode, NodeFieldType } from '../../../../common/models/node.model';

export const FIELD_FULL_WIDTH = '96%';
export const FIELD_HALF_WIDTH = '60%';
export const SMALL_SCREEN_LIMIT = 800;

/**
 * This is the base class from which all of the built-in form controls inherit.
 */
@Component({
    selector: 'base-field'
})
export abstract class BaseFieldComponent  {
    @HostBinding('class.mesh-field')
    readonly isMeshField = true;

    @HostBinding('class.compact')
    isCompact = false;

    @HostBinding('class.focus')
    isFocused: boolean = false;

    /** This is set by the ListFieldComponent when creating new list items */
    @HostBinding('class.list-item')
    isListItem = false;

    @HostBinding('style.width')
    width: string;

    @HostBinding('style.height')
    height: string;

    /**
     * Returns true is the control is in a valid state.
     */
    get isValid(): boolean {
        return this._isValid;
    }
    private _isValid: boolean = true;

    /**
     * Initializes the field, providing it with the api object which gives access to properties
     * necessary for rendering the field.
     */
    abstract init(api: MeshFieldControlApi): void;

    /**
     * This method will be invoked whenever the field's value might have changed. "Might have" because it is
     * also invoked when a child field has changed, e.g. when a list item is changed, `valueChange()` is called
     * on the list item *and* the list.
     */
    abstract valueChange(newValue: NodeFieldType, oldValue?: NodeFieldType): void;

    /**
     * This method will be invoked whenever then value of another field in the node is changed.
     */
    nodeFieldChange(path: SchemaFieldPath, value: any, node: MeshNode): void {
        // no-op, can be optionally implemented by subclasses. Primary use-case it to enable the
        // `onNodeChange()` method of the MeshFieldControlApi.
    }

    /**
     * This method is invoked whenever the containing form's width changes.
     */
    formWidthChange(widthInPixels: number): void {
        if (widthInPixels < SMALL_SCREEN_LIMIT) {
            this.setWidth(FIELD_FULL_WIDTH);
        } else {
            this.setWidth(FIELD_HALF_WIDTH);
        }
        this.isCompact = widthInPixels <= SMALL_SCREEN_LIMIT;
    }

    /**
     * Sets the css width of the host component. Intended for use by custom controls.
     */
    setWidth(value: string): void {
        this.width = value;
    }

    /**
     * Sets the css height of the host component. Intended for use by custom controls.
     */
    setHeight(value: string): void {
        this.height = value;
    }

    /**
     * Sets the focused class on the host component.
     */
    setFocus(value: boolean): void {
        this.isFocused = value;
    }

    /**
     * To be invoked when the label of custom controls is clicked, so that those controls
     * may respond to the click (e.g. by focusing an input) via the api.onLabelClick() callback.
     */
    labelClick(): void {
        // no-op, can be optionally implemented by subclasses. Primary use-case it to enable the
        // `onLabelClick()` method of the MeshFieldControlApi.
    }

    /**
     * Set the validity state of the control.
     */
    setValid(value: boolean) {
        this._isValid = value;
    }
}