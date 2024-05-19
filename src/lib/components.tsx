import { useEffect, useRef } from 'react'
import { EditorModule, ViewerModule, Editor as _Editor, Viewer as _Viewer } from '@splitflow/editor'

export function Editor({ module }: { module: EditorModule }) {
    const element = useRef(null)

    useEffect(() => {
        const instance = new _Editor({
            props: { module },
            target: element.current
        })
        return () => instance.$destroy()
    })

    return <div ref={element}></div>
}

export function Viewer({ module }: { module: ViewerModule }) {
    const element = useRef(null)

    useEffect(() => {
        const instance = new _Viewer({
            props: { module },
            target: element.current
        })
        return () => instance.$destroy()
    })

    return <div ref={element}></div>
}
