import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './Frontend.module.css'
import rootStyles from './index.module.scss'
import { useState } from 'react'

interface Props {
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>
}


export default function Frontend({count, setCount}: Props) {

  const [localCount, setLocalCount] = useState(0)

  return (
    <div className={styles.root + " " + rootStyles.root}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={styles.logo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          Übermittelter Zustand: {count}
        </button>
        <button onClick={() => setLocalCount(localCount + 1)}>
          Lokaler Zustand: {localCount}
        </button>
        <p>
          Diese Komponente ist mit React und Vite/SWC implementiert.
          <br/>
          Das Styling wurde über CSS-Module aus der styles.css vom externen Server geladen.
          <br/>
          Web Components sind isoliert. CSS-Klassen der Web Components können nicht nach oben "leaken"
        </p>
      </div>

    </div>
  )
}

