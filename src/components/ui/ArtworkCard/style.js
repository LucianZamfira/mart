import { css } from 'lit';
export default css`
  :host { display: block; }
  :host([hidden]) { display: none; }
  article { margin: 0; }
  a { display: block; color: inherit; text-decoration: none; }
  a:focus-visible { outline: 2px solid var(--accent, #7f3627); outline-offset: 5px; }
  a:hover h3 { text-decoration: underline; text-underline-offset: 4px; }
  .image { overflow: hidden; }
  ::slotted(img) { width: 100%; height: auto; display: block; transition: transform .3s; }
  @media (prefers-reduced-motion: no-preference) { article:hover ::slotted(img) { transform: scale(1.025); } }
  h3 { font: 1.6rem Georgia, serif; margin: 1rem 0 .4rem; }
  p { color: var(--muted, #615e54); font-size: .85rem; margin: 0; }
`;
