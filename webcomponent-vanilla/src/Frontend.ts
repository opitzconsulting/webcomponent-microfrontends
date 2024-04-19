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
  </div>
  `

export default function createFrontend(parent: HTMLElement, initialCount: number, setCount: (count: number) => void) {
  parent.innerHTML = template

  let count = initialCount
  let localCount = 0

  const counterElement = parent.querySelector<HTMLButtonElement>("#counter")!
  const localCounterElement = parent.querySelector<HTMLButtonElement>("#local-counter")!

  const updateCounter = (newCount: number) => {
    count = newCount
    counterElement.innerHTML = `Übermittelter Zustand ${newCount}`
  }

  const updateLocalCounter = (newCount: number) => {
    localCount = newCount
    localCounterElement.innerHTML = `Lokaler Zustand ${newCount}`
  }

  counterElement.addEventListener("click", () => setCount(count + 1))
  localCounterElement.addEventListener("click", () => updateLocalCounter(localCount + 1))

  updateCounter(count)
  updateLocalCounter(localCount)

  return updateCounter
}
