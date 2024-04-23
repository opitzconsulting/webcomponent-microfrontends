// The web-component build process uses this as the export
// This defines a web-component which starts the Web-App that was defined here.
import { defineCustomElement } from "vue"
import Frontend from "./components/Frontend.ce.vue"


export default function register(name: string) {

    if (customElements.get(name) !== undefined) {
        console.info(`Custom Component ${name} already definied. Skipping`)
        return
    }

    customElements.define(name, MicrofrontendWebComponent)
}


const VueWebComponent = defineCustomElement(Frontend)

// See also: https://vuejs.org/guide/extras/web-components.html
class MicrofrontendWebComponent extends VueWebComponent {
  declare count: number

  render() {
    // Vue's defineCustomElement already does everything for us :)
  }

  private emitCountUpdate(newCount: number) {
    const event = new CustomEvent("count-updated", {detail: newCount})

    this.dispatchEvent(event)
  }

  connectedCallback() {
    super.connectedCallback()

    // Register update listener
    super.addEventListener("count", (ev) => {
      const [count] = (ev as any).detail as [number]
      this.emitCountUpdate(count)
    })

  }
}



