import { EditorModule } from '@splitflow/editor'
import { DocumentApp } from './document-app'

export function nameUpdater(documentApp: DocumentApp, editorModule: EditorModule) {
    let _name: string

    return editorModule.stores.document.subscribe(($document) => {
        const block = $document[0] as any
        const name = block?.text ?? block?.markdown

        if (_name != undefined && name !== _name) {
            documentApp.updateDocumentName(name)
        }
        _name = name
    })
}
