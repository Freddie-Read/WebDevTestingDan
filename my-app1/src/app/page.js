'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Card from './components/Card'

export default function Home() {
    const colorList =['red', 'blue', 'yellow', 'black'];
    // a key property is required internally by react to manage the components in the list
    const colorListJSX = colorList.map((color, key) =>
        (<Card cColor={color} key={key}/>));
  return (
    <main className={styles.main}>

      <div style={{display:'flex', padding:'10px', margin: '10px'}}>
          {colorListJSX}
      </div>

    </main>
  )
}
