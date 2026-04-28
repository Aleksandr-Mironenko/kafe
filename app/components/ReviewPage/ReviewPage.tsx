'use client'
import Image from 'next/image'
// import { useState, useEffect } from 'react'



import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './page.module.scss'

type Review = {
  id: string;
  image_url: string;
  created_at: string;
}

export default function ReviewPage({ reviews }: { reviews: Review[] }) {
  return (
    <div style={{ backgroundColor: "white", margin: "10px 0", borderRadius: "40px", padding: "20px" }}>
      <Swiper
        className={styles.swiper} // 👈 ВАЖНО
        style={{ position: 'relative', width: '100%', height: '100%' }}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
      >
        {(reviews ?? []).map((review) => (
          <SwiperSlide key={review.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: 'auto', margin: 'auto 0' }}>
              <a href={review.image_url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={review.image_url}
                  alt={`slide-${review.image_url}`}
                  layout="responsive"
                  width={1000}
                  height={500}
                  style={{ objectFit: 'contain', margin: '0 auto' }}
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  )
}