'use client'

import { Viewer } from '@/lib/components'
import { useContext } from 'react'
import { DocumentAppContext, EditorContext } from '../contexts'
import Link from 'next/link'
import { useStore } from '@/lib/stores'

export function ViewerContent() {
    const app = useContext(DocumentAppContext)
    const module = useContext(EditorContext)

    const selection = useStore(app.stores.selection)

    return (
        <div>
            {selection && <Link href={`/document/${selection.documentId}/edit`}>Edit</Link>}
            <Viewer module={module} />
        </div>
    )
}
