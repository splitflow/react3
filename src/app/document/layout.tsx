import { createSplitflowAppKit } from '@splitflow/app'
import { CSSProperties } from 'react'
import { LeftDrawer } from '../_lib/components/LeftDrawer'
import { createDocumentApp, loadDocumentAppBundle } from '../_lib/document-app'
import { DocumentAppProvider } from '../_lib/contexts'
import { appConfig } from '../_lib/configs'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const app = createSplitflowAppKit(appConfig)
    const documentApp = createDocumentApp(app)
    const bundle = await loadDocumentAppBundle(documentApp)

    return (
        <DocumentAppProvider bundle={bundle}>
            <div style={style.app}>
                <div style={style.main}>
                    <div style={style.left}>
                        <LeftDrawer />
                    </div>
                    <div style={style.content}>
                        {children}
                        <div>hello</div>
                    </div>
                </div>
            </div>
        </DocumentAppProvider>
    )
}

const style: Record<'app' | 'main' | 'content' | 'left', CSSProperties> = {
    app: {
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    main: {
        all: 'unset',
        display: 'flex',
        flex: 1,
        gap: '1rem',
        minHeight: 0
    },
    content: {
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    left: {
        all: 'unset',
        display: 'flex',
        flexDirection: 'column'
    }
}
