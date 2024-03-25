# Object Cached Function

Cache function results in globalThis, useful when playing with `bun --hot`

## Example Usage

```typescript
import {objCached} from 'obj-cached'

// sync
const fn = objCached(() => {
    // do something heavy in sync
    // cached with global object
    return ...
})


import {objCachedAsync} from 'obj-cached'
const result = fn()

// async
const fna =  objCachedAsync(async ()=> {
    // do something heavy
    // and cached with global object
    return ...
}, window)

const result = await fn()
```

## Implementation

```typescript
export function objCached<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const key = `${prefix}${fn.toString()}`;
  return (...args: Args) => (obj[key] ??= fn(...args)) as Result;
}
export function objCachedAsync<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result> | Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const key = `${prefix}${fn.toString()}`;
  return async (...args: Args) => (obj[key] ??= await fn(...args)) as Result;
}

```

## License

MIT License