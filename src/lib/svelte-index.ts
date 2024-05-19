import { Test } from 'chart'
import { someMeth } from 'chart'

export function test() {
    const o = someMeth()
    const instance = new Test({
        props: {},
        target: undefined,
        anchor: undefined
    })
    return o
}
