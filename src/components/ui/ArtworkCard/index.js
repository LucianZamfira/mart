// @ts-check
import { LitElement, html } from 'lit';
import style from './style.js';

/** Presentation card. Slots: image (img with alt), title (text), details (text). No properties or events. */
export class ArtworkCard extends LitElement {
  static styles = style;
  render() {
    return html`<article><div class="image"><slot name="image"></slot></div><h3><slot name="title"></slot></h3><p><slot name="details"></slot></p></article>`;
  }
}
if (!customElements.get('artwork-card')) customElements.define('artwork-card', ArtworkCard);
