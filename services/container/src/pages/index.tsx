import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header/>
    </>
  )
}


function Header() {
  return <div className={styles.header}>
    <Link href={"/todo"}>todo</Link>
    <Link href={"/counter"}>counter</Link>
  </div>
}