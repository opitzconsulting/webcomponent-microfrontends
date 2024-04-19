// The web-component build process uses this as the export
// This defines a web-component which starts the Web-App that was defined here.
import { Ref, createApp, ref } from "vue"
import Frontend from "./components/Frontend.vue"


export default function register(name: string) {

    if (customElements.get(name) !== undefined) {
        console.info(`Custom Component ${name} already definied. Skipping`)
        return
    }

    customElements.define(name, MicrofrontendWebComponent)
}

class MicrofrontendWebComponent extends HTMLElement {
  declare count: number
  declare styleAddress?: string
  #root!: ShadowRoot

  #state = ref(0)
  render() {
    this.#state.value = this.count
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

    createApp(Frontend, {
      count: this.#state,
      onCount: (count: Ref<number>) => {
        debugger
        this.emitCountUpdate(count.value)
      }
    }).mount(mount);
  }
}



