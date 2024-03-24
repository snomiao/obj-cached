# Object Cached Function

## Example

````typescript

```typescript
import 'obj-cached'

const fn = objCached(()=> {
    // do something heavy in sync
    // cached with global object
    return ...
})

const result = fn()


const fna =  objCachedAsync(async ()=> {
    // do something heavy
    // and cached with global object
    return ...
}, window)

const result = await fn()

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

````

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

## Implement

```

```

}, window)

await objCachedAsync(()=> )

await objCachedAsync(()=> {})

```

```
