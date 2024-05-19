import { Readable, get } from '@splitflow/core/stores'
import { useEffect, useState } from 'react'

export function useStore<T>(readable: Readable<T>) {
    const [value, set] = useState<T>(() => get(readable))

    useEffect(() => readable.subscribe(set), [readable])

    return value
}
