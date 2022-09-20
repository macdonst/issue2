export default function Component({ html, state = {} }) {
  return html`
      <style>
        div {
            padding-top: 32px;
            padding-left: 32px;
            padding-right: 32px;
            padding-bottom:32px
        }
      </style>
      <div>
        Hello, World!
      </div>
      `;
}
