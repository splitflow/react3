'use client'

import { Editor } from '@/lib/components'
import { useContext, useEffect } from 'react'
import { DocumentAppContext, EditorContext } from '../contexts'
import { nameUpdater } from '../services'

export function EditorContent() {
    const app = useContext(DocumentAppContext)
    const module = useContext(EditorContext)

    useEffect(() => nameUpdater(app, module), [app, module])

    return <Editor module={module} />
}
