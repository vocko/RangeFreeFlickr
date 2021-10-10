import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Flickr from '../components/flickr'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Range Free Flickr</title>
        <meta name="description" content="Range Free Flickr app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="range-free.png" />
        </h1>
        <Flickr />
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
