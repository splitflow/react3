import { appConfig, editorConfig } from '@/app/_lib/configs'
import { EditorProvider, DocumentAppEffect } from '@/app/_lib/contexts'
import { createSplitflowAppKit } from '@splitflow/app'
import { createEditorKit, loadDocumentBundle, loadEditorBundle } from '@splitflow/editor'
import { firstError } from '@splitflow/lib'

export default async function DocumentLayout({
    params,
    children
}: {
    params: { documentId: string }
    children: React.ReactNode
}) {
    const { documentId } = params

    const app = createSplitflowAppKit(appConfig)
    const editor = createEditorKit(editorConfig, app)
    const editorBundle = await loadEditorBundle(editor)
    const documentBundle = await loadDocumentBundle(editor, { documentId })

    const error = firstError({ ...editorBundle, ...documentBundle })
    if (error) throw error

    return (
        <>
            <DocumentAppEffect documentId={documentId} />
            <EditorProvider editorBundle={editorBundle} documentBundle={documentBundle}>
                {children}
            </EditorProvider>
        </>
    )
}
