'use client'

import { useEffect } from "react"

export default function Error({ error }: { error: Error & { digest?: string } }) {

    useEffect(() => {
        console.log(error)
    }, [error])
    
    return (
        <div>
            <h2>Something went wrong! {error.message}</h2>
        </div>
    )
}
