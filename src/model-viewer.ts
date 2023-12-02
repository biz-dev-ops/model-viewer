import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { ItemSelected, ModelItem, ModelItemDecorator } from './model-viewer.types';
import { ModelItemBuilder } from './modules/model-item-builder';
import modelViewerCss from './model-viewer.css';

import "./components/ui/button";
import "./components/ui/popover";
import "./components/model-viewer-path"

@customElement('model-viewer')
export class ModelViewer extends LitElement {
  @property() 
  name!: string

  @property({type: Object}) 
  model!: ModelItem

  @property({ attribute: "data-json" })
  dataJson!: string

  @state()
  path: ModelItemDecorator[] = [];

  override render() {
    if(this.path.length === 0)
      return '';

    return html`
      <model-viewer-path .path=${this.path} @pathChanged=${this.onPathChanged}></model-viewer-path>
      <main>
        ${ModelItemBuilder.build(this.path.at(-1) as ModelItemDecorator, this.onItemSelected.bind(this), false)}
      </main>
    `;
  }

  override update(changedProperties: Map<string, unknown>) {
    if(changedProperties.has("dataJson")) {
      this.path = [];
      this.model = JSON.parse(this.dataJson);
      this.model.title = this.model.title || this.name;
      this.setPath('', this.model);
    }
    else if(changedProperties.has("model")) {
      this.path = [];
      this.model.title = this.model.title || this.name;
      this.setPath('', this.model);
    }
    
    super.update(changedProperties);
  }

  override updated() {
    this.shadowRoot?.querySelector('nav')?.scrollIntoView();
  }
  
  setPath(property: string, item: ModelItem | undefined) {
    if(item === undefined) {
      return;
    }

    const parent = this.path.at(-1);
    this.path = [...this.path, new ModelItemDecorator(item, property, parent?.isChildRequired(property))];
  }

  onItemSelected(event: CustomEvent<ItemSelected>) {
    this.setPath(event.detail.property, event.detail.item)
  }

  onPathChanged(event: CustomEvent<any>) {
    this.path = this.path.slice(0, event.detail.index + 1);
  }

  static override get styles() {
    const hostCSS = css`
      :host {
          border: var(--line-base) solid var(--color-brand-a40);
          padding: var(--space-md);
          display: block;
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
  `;
  
    return [hostCSS, modelViewerCss];
  }
}