import multiavatar from "@multiavatar/multiavatar/esm"

export function avatarSvg(seed: string, opts?: { noBg?: boolean }){
    return multiavatar(seed || 'ayolin', !!opts?.noBg) as string
}

export function svgToDataUrl(svg: string){
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}