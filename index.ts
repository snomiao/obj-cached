export function objCached<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const key = `${prefix}${fn.toString()}`;
  return (...args: Args) => (obj[`${key}@${JSON.stringify(args)}`] ??= fn(...args)) as Result;
}
export function objCachedAsync<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result> | Result,
  obj: Record<string, unknown> = globalThis,
  prefix = "obj-cached-"
) {
  const key = `${prefix}${fn.toString()}`;
  return async (...args: Args) => {
    const result = await obj[`${key}@${JSON.stringify(args)}`]
    return (await obj[`${key}@${JSON.stringify(args)}`] = result ?? await fn(...args)) as Result
  };
}

