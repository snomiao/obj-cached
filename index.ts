import md5 from "md5";
export function objCached<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const sig = md5(`${prefix}${fn.toString()}`);
  return (...args: Args) => {
    const key = `${sig}@${md5(JSON.stringify(args))}`;
    return (obj[key] ??= fn(...args)) as Result;
  };
}
export function objCachedAsync<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result> | Result,
  obj: Record<string, Promise<unknown> | unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const sig = md5(`${prefix}${fn.toString()}`);
  return async (...args: Args) => {
    const k = `${sig}@${md5(JSON.stringify(args))}`;
    const cachedResult = await obj[k];
    return (await (obj[k] = cachedResult ?? (await fn(...args)))) as Result;
  };
}
