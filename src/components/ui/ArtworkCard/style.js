import { css } from 'lit';
export default css`
  :host { display: block; }
  :host([hidden]) { display: none; }
  article { margin: 0; }
  .image { overflow: hidden; }
  ::slotted(img) { width: 100%; height: auto; display: block; transition: transform .3s; }
  @media (prefers-reduced-motion: no-preference) { article:hover ::slotted(img) { transform: scale(1.025); } }
  h3 { font: 1.6rem Georgia, serif; margin: 1rem 0 .4rem; }
  p { color: var(--muted, #615e54); font-size: .85rem; margin: 0; }
`;
