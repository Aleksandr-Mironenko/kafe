
"use client"
import Image from 'next/image'
import pagefood from '../../../public/food-dish-svgrepo-com.svg'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import ReviewPage from '@/app/components/ReviewPage/ReviewPage'
// import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import AdminEditMenu from '@/app/components/AdminEditMenu/AdminEditMenu'
import AdminEditServices from '@/app/components/AdminEditServices/AdminEditServices'
import AdminEditReviews from '@/app/components/AdminEditReviews/AdminEditReviews'
import AdminEditPosts from '../AdminEditPosts/AdminEditPosts'
import AdminEditPublicInfo from '../AdminEditPublicInfo/AdminEditPublicInfo'

interface Menu {
  url_name: string
  id: string
  name: string
  description: string | null
  image_url: string | null
  created_at: string | null
  is_available: boolean
}

interface Service {
  id: number
  name: string
  description: string
  full_description: string
  is_available: boolean
  created_at: string | null
  url_name: string
  images: string[]
}
interface Review {
  id: string;
  image_url: string;
  created_at: string;
}
export interface Post {
  id: string
  name: string
  header: string
  full_description: string
  sort_order: number
  is_available: boolean
  created_at: string
  url_name: string
}
interface PublicInfo {
  id: string,
  city: string,
  address_url: string,
  phone: string,
  schedule: string,
  title: string,
  content: string,
  image_url: string,
  url_link: string,
  updated_at: string,
  delivery_payment_title: string,
  delivery_payment_content: string
}


const AdminPage = ({ menu, services, reviews, posts, publicInfo }: { menu: Menu[], services: Service[], reviews: Review[], posts: Post[], publicInfo: PublicInfo }) => {
  const [open, setOpen] = useState<'menu' | 'services' | 'reviews' | 'posts' | 'publicInfo' | null>(null)
  return (
    <>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center', justifyContent: 'center', margin: "10px 30px" }}>
        <button onClick={() => setOpen('menu')} className={styles.createButton}>
          Редактировать меню
        </button>
        <button onClick={() => setOpen('services')} className={styles.createButton}>
          Редактировать услуги
        </button>
        <button onClick={() => setOpen('reviews')} className={styles.createButton}>
          Редактировать отзывы
        </button>
        <button onClick={() => setOpen('posts')} className={styles.createButton}>
          Редактировать посты
        </button>
        <button onClick={() => setOpen('publicInfo')} className={styles.createButton}>
          Редактировать публичную информацию
        </button>
      </div>

      {open === 'menu' && < AdminEditMenu menu={menu} />}
      {open === 'services' && < AdminEditServices services={services} />}
      {open === 'reviews' && < AdminEditReviews reviews={reviews} />}
      {open === 'posts' && < AdminEditPosts posts={posts} />}
      {open === 'publicInfo' && < AdminEditPublicInfo publicInfo={publicInfo} />}
    </>
  )
}


export default AdminPage