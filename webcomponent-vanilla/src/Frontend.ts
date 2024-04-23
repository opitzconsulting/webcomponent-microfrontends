import styles from "./index.module.scss"

import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'

const template = `
  <div class="${styles.root}">
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <button id="local-counter" type="button"></button>
    </div>
    <p>
      Diese Komponent ist mit Vanilla TS / Vite implementiert
    </p>

    <p>Als Demonstration, dass Verschachtelung auch möglich ist, wurde hier die Vite+Vue3 Komponente verschachtelt einbunden und an den <b>lokalen</b> Zustand angebunden </p>

    <div id="nested-frontend"> Loading... </div>

  </div>
  `



export default function createFrontend(parent: HTMLElement, initialCount: number, setCount: (count: number) => void) {
  parent.innerHTML = template

  let count = initialCount
  let localCount = 0

  const counterElement = parent.querySelector<HTMLButtonElement>("#counter")!
  const localCounterElement = parent.querySelector<HTMLButtonElement>("#local-counter")!
  let nestedFrontendElement: Element | undefined = undefined

  const updateCounter = (newCount: number) => {
    count = newCount
    counterElement.innerHTML = `Übermittelter Zustand ${newCount}`
  }

  const updateLocalCounter = (newCount: number) => {
    localCount = newCount
    localCounterElement.innerHTML = `Lokaler Zustand ${newCount}`

    if(!!nestedFrontendElement) {
      // @ts-ignore
      nestedFrontendElement.count = localCount
    }

  }

  counterElement.addEventListener("click", () => setCount(count + 1))
  localCounterElement.addEventListener("click", () => updateLocalCounter(localCount + 1))

  updateCounter(count)
  updateLocalCounter(localCount)

  const nestedFrontendRoot = parent.querySelector<HTMLDivElement>("#nested-frontend")!

  insertNestedFrontend(nestedFrontendRoot, updateLocalCounter).then( e => nestedFrontendElement = e )

  return updateCounter
}

async function insertNestedFrontend(element: HTMLDivElement, newStateCallback: (count: number) => void) {
  // @ts-ignore
  (await import("http://localhost:5002/webcomponent.js")).default("webcomponent-vue") // redundant, but here anyways
  // for consistency

  element.innerHTML = `<webcomponent-vue count='0' class="${styles.nested}"></webcomponent-vue>`

  const nestedFrontend = element.querySelector("webcomponent-vue")!


  nestedFrontend.addEventListener("count", (ev) => {
    const [count] = (ev as any).detail as [number]
    newStateCallback(count)
  })

  return nestedFrontend
}
