// @ts-check
import { LitElement, html } from 'lit';
import style from './style.js';

/** Presentation card. Slots: image, title, details. Optional href links to a detail page. */
export class ArtworkCard extends LitElement {
  static styles = style;
  static properties = { href: { type: String } };
  constructor() { super(); this.href = ''; }
  render() {
    const content = html`<div class="image"><slot name="image"></slot></div><h3><slot name="title"></slot></h3><p><slot name="details"></slot></p>`;
    return html`<article>${this.href ? html`<a href=${this.href}>${content}</a>` : content}</article>`;
  }
}
if (!customElements.get('artwork-card')) customElements.define('artwork-card', ArtworkCard);
