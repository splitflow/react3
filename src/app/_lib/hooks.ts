import { useState } from 'react'

export function useError() {
    const [, setError] = useState()

    return (error: any) =>
        setError(() => {
            throw error
        })
}
