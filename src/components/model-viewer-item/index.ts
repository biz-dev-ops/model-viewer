import { LitElement } from "lit";
import { property } from "lit/decorators.js";

import { ItemSelected, ModelItem } from "../../model-viewer.types";
import modelViewerCss from "../../model-viewer.css";

export abstract class ModelViewerItem extends LitElement {
    @property({ type: Object }) item!: ModelItem;
    @property({ type: String }) property!: string;
    @property({ type: String }) override title!: string;
    @property({ type: Boolean }) required!: boolean;

    protected handleItemSelection() {
        this.dispatchEvent(new CustomEvent<ItemSelected>('itemSelected', { detail: { property: this.property, item: this.item } }));
    }
    
    static override get styles() {
        return modelViewerCss;
    }
}