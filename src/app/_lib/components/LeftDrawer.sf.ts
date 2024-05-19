import { createStyle as _createStyle } from '@splitflow/designer'
import { useStyle as _useStyle } from '@splitflow/designer/react'

export function useStyle() {
    return _useStyle(style)
}

export const style = _createStyle('LeftDrawer', {})
