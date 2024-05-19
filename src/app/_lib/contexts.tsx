'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { DocumentApp, DocumentAppBundle, createDocumentApp } from './document-app'
import { AppBundle, SplitflowApp, createSplitflowApp } from '@splitflow/app'
import { useServerInsertedHTML } from 'next/navigation'
import { SSRRegistry, formatCss } from '@splitflow/designer'
import { SplitflowDesignerContext } from '@splitflow/designer/react'
import { DocumentBundle, EditorBundle, EditorModule, createEditor } from '@splitflow/editor'
import { useError } from './hooks'

export const SsrRegistryContext = createContext<SSRRegistry>(undefined)

export function SsrRegistryProvider({ children }: { children: React.ReactNode }) {
    const [ssrRegistry] = useState(() => ({ style: {}, theme: {} }))
    const isServerInserted = useRef(false)

    useServerInsertedHTML(() => {
        if (!isServerInserted.current) {
            isServerInserted.current = true

            return (
                <>
                    <style type="text/css" data-splitflow-id="style">
                        {formatCss(ssrRegistry.style)}
                    </style>
                    <style type="text/css" data-splitflow-id="theme">
                        {formatCss(ssrRegistry.theme)}
                    </style>
                </>
            )
        }
    })

    return <SsrRegistryContext.Provider value={ssrRegistry}>{children}</SsrRegistryContext.Provider>
}

export const SplitflowAppContext = createContext<SplitflowApp>(undefined)

export function SplitflowAppProvider({
    bundle,
    children
}: {
    bundle: AppBundle
    children: React.ReactNode
}) {
    const ssrRegistry = useContext(SsrRegistryContext)

    const [app] = useState(() => {
        console.log(bundle)
        const app = createSplitflowApp(bundle, ssrRegistry)
        app.initialize()
        return app
    })

    return (
        <SplitflowAppContext.Provider value={app}>
            <SplitflowDesignerContext.Provider value={app.designer}>
                {children}
            </SplitflowDesignerContext.Provider>{' '}
        </SplitflowAppContext.Provider>
    )
}

export const DocumentAppContext = createContext<DocumentApp>(undefined)

export function DocumentAppProvider({
    bundle,
    children
}: {
    bundle: DocumentAppBundle
    children: React.ReactNode
}) {
    const app = useContext(SplitflowAppContext)

    const [documentApp] = useState(() => {
        const documentApp = createDocumentApp(app)
        documentApp.update(bundle)
        return documentApp
    })

    useEffect(() => {
        documentApp.update(bundle)
    }, [documentApp, bundle])

    return <DocumentAppContext.Provider value={documentApp}>{children}</DocumentAppContext.Provider>
}

export function DocumentAppEffect({ documentId }: { documentId: string }) {
    const app = useContext(DocumentAppContext)

    useEffect(() => {
        app.stores.selection.set({ documentId })
    }, [documentId])

    return null
}

export const EditorContext = createContext<EditorModule>(undefined)

export function EditorProvider({
    editorBundle,
    documentBundle,
    children
}: {
    editorBundle: EditorBundle
    documentBundle: DocumentBundle
    children: React.ReactNode
}) {
    const _error = useError()
    const app = useContext(SplitflowAppContext)

    const [editor] = useState(() => {
        const editor = createEditor(editorBundle, app)
        editor.initialize()
        editor.updateDocument(documentBundle)
        return editor
    })

    useEffect(() => {
        ;(async () => {
            const { error } = await editor.updateDocument(documentBundle)
            if (error) _error(error)
        })()
    }, [editor, documentBundle])

    return <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
}
