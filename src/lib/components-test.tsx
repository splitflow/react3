import { Test } from "chart/client"
import { useEffect, useRef } from "react"

export function Graph() {
    const element = useRef(null)

    useEffect(() => {
        const instance = new Test({
            props: { module },
            target: element.current
        })
        return () => instance.$destroy()
    })

    return <div ref={element}></div>
}