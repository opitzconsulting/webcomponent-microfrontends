// The web-component build process uses this as the export
// This defines a web-component which starts the Web-App that was defined here.
import Frontend from "./Frontend"
import React from "react"
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
  declare setCount: React.Dispatch<React.SetStateAction<number>> | undefined
  declare styleUrl: string
  declare styleAddress: string
  #root!: ShadowRoot

  fallbackSetter: React.Dispatch<React.SetStateAction<number>> = (val) => {
    console.error("Setter not defined. Received value "+val+", but cannot emit. Please provide a callback via data-setCount")
  }
  #reactRoot: Root | undefined

  constructor() {
    super()
  }

  render() {
    this.#reactRoot!.render(<Frontend count={this.count} setCount={this.setCount ?? this.fallbackSetter } />)
  }

  connectedCallback() {
    this.#root = this.attachShadow({mode: "open"})
    const mount = document.createElement("div")

    if(this.styleAddress) {
      const style = document.createElement("link");
      style.rel = "stylesheet"
      style.href = this.styleAddress
      this.#root.appendChild(style)
    }

    this.#root.appendChild(mount)
    this.#reactRoot = createRoot(mount)
    this.render()
  }
}



