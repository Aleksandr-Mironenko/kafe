'use client'
import { useEffect } from 'react'

const MIN_WIDTH = 626

export function ViewportScaler() {
    useEffect(() => {
        const meta = document.querySelector('meta[name="viewport"]')

        const updateViewport = () => {
            if (!meta) return

            if (window.innerWidth < MIN_WIDTH) {
                meta.setAttribute('content', `width=${MIN_WIDTH}`)
            } else {
                meta.setAttribute(
                    'content',
                    'width=device-width, initial-scale=1',
                )
            }
        }

        updateViewport()
        window.addEventListener('resize', updateViewport)

        return () => window.removeEventListener('resize', updateViewport)
    }, [])

    return null
}
