'use client'
import { useState, useEffect } from 'react'

export function useImageDimensions(src) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, isPortrait: false })

    useEffect(() => {
        if (!src) return

        const img = new Image()
        img.src = src
        
        img.onload = () => {
            const isPortrait = img.naturalHeight > img.naturalWidth
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
                isPortrait
            })
        }
    }, [src])

    return dimensions
}