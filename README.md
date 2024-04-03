# Object Cached Function

Cache function results in globalThis, useful when playing with `bun --hot`

## Example Usage

### Sync

```typescript
import {objCached} from 'obj-cached'

// sync
const fn = objCached(() => {
    // do something heavy in sync
    // cached with global object
    return ...
}) // cached with globalThis by default, (global['prefix-hashedKeyXXXX'] in node or window['prefix-hashedKeyXXXX'] in browser)

const result = fn()

```

### Async

```typescript
// async
import {objCachedAsync} from 'obj-cached'
const cacheObj = {} // custom cacheObj
const fna =  objCachedAsync(async ()=> {
    // do something heavy
    // and cached with global object
    return ...
}, cacheObj) // cached with global this

const result = await fn()

```

### Store your Cached Object into File (must by async)

```typescript
import { FileCacheObj } from "file-cached";
import { objCachedAsync } from "obj-cached";

const cacheObj = FileCacheObj(import.meta.dir + "/cache.json");

const result = await objCachedAsync(async () => {
  // do sth heavy
}, cacheObj)();
```


## Limitations

1. You can only cache plain JSON object
2. Use async version when used with FileCacheObj.
3. objCachedAsync is NOT waitting for cache written
  - so cache data MAY LOST if you terminate process before it's done.
  - and there are maybe conflict cache written

## Implementation

```typescript
export function objCached<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const key = `${prefix}${fn.toString()}@${JSON.stringify(args)}`;
  return (...args: Args) => (obj[key] ??= fn(...args)) as Result;
}
export function objCachedAsync<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result> | Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const key = `${prefix}${fn.toString()}@${JSON.stringify(args)}`;
  return async (...args: Args) => (obj[key] ??= await fn(...args)) as Result;
}
```

## License

MIT License