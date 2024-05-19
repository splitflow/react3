import { createStyle as _createStyle } from '@splitflow/designer'
import { useStyle as _useStyle } from '@splitflow/designer/react'

export function useStyle() {
    return _useStyle(style)
}

export const style = _createStyle('DocumentNav', {
    root: {
        padding: {
            left: 3
        }
    },
    document: {
        padding: {
            top: 3,
            left: 3
        }
    }
})
