// View documentation at: https://docs.begin.com
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let games = store.games || []
  const game = store.game || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Games page</h1>
    ${games.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">day: </strong>${item?.day || ''}</p>
  <p class="pb-2"><strong class="capitalize">time: </strong>${item?.time || ''}</p>
  <p class="pb-2"><strong class="capitalize">facility: </strong>${item?.facility || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/games/${item.key}">Edit this game</enhance-link>
</p>
<form action="/games/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this game</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New game</summary>
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
</details>
</main>
</enhance-page-container>
  `
}
