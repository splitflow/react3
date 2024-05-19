'use client'

import DocumentNav from './DocumentNav'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { DocumentAppContext } from '../contexts'
import { useStyle } from './LeftDrawer.sf'

export function LeftDrawer() {
    const style = useStyle()
    const router = useRouter()
    const documentApp = useContext(DocumentAppContext)

    async function create() {
        const { document } = await documentApp.createDocument()
        router.push(`/document/${document.documentId}/edit`)
    }

    return (
        <div className={style.root()}>
            <button className={style.create()} onClick={() => create()}>
                create
            </button>
            <DocumentNav />
        </div>
    )
}
