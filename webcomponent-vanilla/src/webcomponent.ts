// The web-component build process uses this as the export
// This defines a web-component which starts the Web-App that was defined here.
import createFrontend from "./Frontend"

export default function register(name: string) {

    if (customElements.get(name) !== undefined) {
        console.info(`Custom Component ${name} already definied. Skipping`)
        return
    }

    customElements.define(name, MicrofrontendWebComponent)
}

class MicrofrontendWebComponent extends HTMLElement {
  count: number = 0
  #updateCount?: (count: number) => void


  declare styleAddress?: string
  #root!: ShadowRoot

  render() {
    if(this.#updateCount) {
      this.#updateCount(this.count)
    }
  }

  private emitCountUpdate(newCount: number) {
    const event = new CustomEvent("count-updated", {detail: newCount})

    this.dispatchEvent(event)
  }

  connectedCallback() {
    this.#root = this.attachShadow({mode: "open"})
    const mount = document.createElement("div")

    const styleAddress = this.styleAddress ?? import.meta.env.BASE_URL + "style.css"

    const style = document.createElement("link");
    style.rel = "stylesheet"
    style.href = styleAddress
    this.#root.appendChild(style)

    this.#root.appendChild(mount)

    const updateCount = createFrontend(mount, this.count ?? 0, (val) => this.emitCountUpdate(val))
    this.#updateCount = updateCount
  }
}



