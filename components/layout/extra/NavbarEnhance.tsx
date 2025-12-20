'use client'

import { useEffect } from "react"

export default function NavbarEnhance(){
    useEffect(() => {
        const nav = document.querySelector('[data-navba="extra"]') as HTMLElement | null
        if(!nav) return 

        const onScroll = () => {
            nav.setAttribute('data-scrolled', String(window.scrollY > 0))
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true})

        const links = Array.from(nav.querySelectorAll('details a')) as HTMLAnchorElement[]
        const onClick = () => {
            const openDetails = nav.querySelector('details[open]') as HTMLDetailsElement | null
            if(openDetails) openDetails.removeAttribute('open')
        }
        links.forEach((a) => a.addEventListener('click', onClick))

        const overlay = nav.querySelector('data-nav-overlay') as HTMLElement | null
        const onOverlay = () => onClick()
        if(overlay) overlay.addEventListener('click', onOverlay)

        return () => {
            window.removeEventListener('scroll', onScroll)
            links.forEach((a) => a.removeEventListener('click', onClick))
            if(overlay) overlay.removeEventListener('click', onOverlay)
        }
    }, [])

    return null
}