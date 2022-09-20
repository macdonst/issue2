// View documentation at: https://docs.begin.com
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const game = store.game || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/games/${game.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Game">
  <enhance-text-input label="Day" type="date" id="day" name="day" value="${game?.day}" errors="${problems?.day?.errors}"></enhance-text-input>
  <enhance-text-input label="Time" type="time" id="time" name="time" value="${game?.time}" errors="${problems?.time?.errors}"></enhance-text-input>
  <enhance-text-input label="Facility" type="text" id="facility" name="facility" value="${game?.facility}" errors="${problems?.facility?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${game?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
