'use client'

import { useStyle } from './DocumentNav.sf'
import { useContext } from 'react'
import { DocumentAppContext } from '../contexts'
import Link from 'next/link'
import { useStore } from '@/lib/stores'

export default function DocumentNav() {
    const style = useStyle()
    const app = useContext(DocumentAppContext)

    const documents = useStore(app.stores.documents)
    const selection = useStore(app.stores.selection)

    return (
        <nav className={style.root()}>
            <ul>
                <li className={style.document()}>ef</li>
                {documents.map((document) => (
                    <li key={document.documentId} className={style.document()}>
                        {selection?.documentId === document.documentId && '+'}
                        <Link href={`/document/${document.documentId}`}>
                            {document.name ?? 'Unamed document'}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
