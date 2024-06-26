// The web-component build process uses this as the export
// This defines a web-component which starts the Web-App that was defined here.
import Frontend from "./Frontend"
import { Root, createRoot } from "react-dom/client"

export default function register(name: string) {

    if (customElements.get(name) !== undefined) {
        console.info(`Custom Component ${name} already definied. Skipping`)
        return
    }

    customElements.define(name, MicrofrontendWebComponent)
}

class MicrofrontendWebComponent extends HTMLElement {
  declare count: number
  declare styleAddress: string | undefined
  #root!: ShadowRoot
  #reactRoot: Root | undefined

  private emitCountUpdate(newCount: number) {
    const event = new CustomEvent("count-updated", {detail: newCount})

    this.dispatchEvent(event)
  }

  render() {
    this.#reactRoot!.render(<Frontend count={this.count} setCount={(val) => this.emitCountUpdate(val)} />)
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
    this.#reactRoot = createRoot(mount)
    this.render()
  }
}



