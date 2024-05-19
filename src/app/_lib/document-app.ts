import { Gateway, SplitflowAppKit } from '@splitflow/app'
import { Writable, writable, get } from '@splitflow/core/stores'
import {
    EditorKit,
    createDocument,
    createEditorKit,
    listDocuments,
    updateDocument
} from '@splitflow/editor'
import { firstError } from '@splitflow/lib'
import { Document, ListDocumentsResult } from '@splitflow/lib/editor'
import { editorConfig } from './configs'

export function createDocumentApp(app: SplitflowAppKit) {
    const { gateway } = app

    const editor = createEditorKit(editorConfig, app)

    const stores: Stores = {
        documents: writable([]),
        selection: writable()
    }

    return new DocumentApp(gateway, editor, stores)
}

interface Stores {
    documents: Writable<Document[]>
    selection: Writable<{ documentId: string }>
}

export class DocumentApp {
    constructor(gateway: Gateway, editorKit: EditorKit, stores: Stores) {
        this.gateway = gateway
        this.editorKit = editorKit
        this.stores = stores
    }

    gateway: Gateway
    editorKit: EditorKit
    stores: Stores

    async update(bundle?: DocumentAppBundle) {
        bundle = isFulfilled(bundle) ? bundle : await loadDocumentAppBundle(this)

        const error = firstError(bundle)
        if (error) return { error }

        if (bundle.listDocumentsResult) {
            const { documents } = bundle.listDocumentsResult
            this.stores.documents.set(documents)
        }
    }

    async createDocument() {
        const result = await createDocument(this.editorKit)
        await this.update()
        return result
    }

    async updateDocumentName(name: string) {
        const { documentId } = get(this.stores.selection)
        const result = await updateDocument(this.editorKit, { documentId, name })
        await this.update()
        return result
    }
}

export interface DocumentAppBundle {
    listDocumentsResult: ListDocumentsResult
}

export async function loadDocumentAppBundle(app: DocumentApp) {
    const listDocumentsResult = await listDocuments(app.editorKit)
    return { listDocumentsResult }
}

export function isFulfilled(bundle: DocumentAppBundle) {
    return !!bundle?.listDocumentsResult ?? false
}
