import createFrontend from "./Frontend"


const updateCount = createFrontend(document.querySelector<HTMLDivElement>('#app')!, 0, (newCount) => {
  updateCount(newCount)
  console.log("Vanilla received update: "+newCount)
})
