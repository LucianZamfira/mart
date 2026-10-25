// @ts-check
import { LitElement, html } from 'lit';
import style from './style.js';

/** Presentation host. The default slot contains server-rendered, crawlable card markup. */
export class ArtworkCard extends LitElement {
  static styles = style;
  static properties = { href: { type: String } };
  constructor() { super(); this.href = ''; }
  render() {
    return html`<slot></slot>`;
  }
}
if (!customElements.get('artwork-card')) customElements.define('artwork-card', ArtworkCard);
