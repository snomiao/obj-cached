import { sleep } from "bun";
import { objCached, objCachedAsync } from ".";

describe("objCached", () => {
  it("cache heavy result into Object", () => {
    // sync
    const fn = objCached(() => {
      // do something heavy in sync
      // cached with global object

      const s = +new Date();
      let c = 0;
      // loop 32ms
      while (+new Date() - s < 32) {
        // pass
        c++;
      }
      return c;
    }); // cached with globalThis by default, (global['prefix-hashedKeyXXXX'] in node or window['prefix-hashedKeyXXXX'] in browser)

    // cache not hit
    const st = +new Date();
    const firstResult = fn();
    const et = +new Date();
    expect(firstResult).toBeGreaterThan(0);
    expect(et - st).toBeGreaterThan(30); // 30ms

    //   cache hit
    {
      const st = +new Date();
      const secondResult = fn();
      const et = +new Date();
      expect(secondResult).toBe(firstResult);
      expect(et - st).toBeLessThan(1); // 30ms
    }
  });
  it("cache different result into Object", () => {
    // sync
    const fn = objCached((a: number, b: number) => {
      return a + b;
    }); // cached with globalThis by default, (global['prefix-hashedKeyXXXX'] in node or window['prefix-hashedKeyXXXX'] in browser)
    expect(fn(1, 1)).toEqual(1 + 1);
    expect(fn(2, 1)).toEqual(2 + 1);
  });
  it("with custom obj", () => {
    // sync
    const cacheObj = {};
    const fn = objCached(() => {
      // do something heavy in sync
      // cached with global object

      const s = +new Date();
      let c = 0;
      // loop 32ms
      while (+new Date() - s < 32) {
        // pass
        c++;
      }
      return c;
    }, cacheObj); // cached with globalThis by default, (global['prefix-hashedKeyXXXX'] in node or window['prefix-hashedKeyXXXX'] in browser)

    // cache not hit
    const st = +new Date();
    const firstResult = fn();
    const et = +new Date();
    expect(firstResult).toBeGreaterThan(0);
    expect(et - st).toBeGreaterThan(30); // 30ms
    expect(Object.values(cacheObj)[0]).toBe(firstResult);
  });
});

describe("objCachedAsync", () => {
  it("cache heavy result into Object", async () => {
    const fn = objCachedAsync(async () => {
      // do something heavy in async
      // cached with global object

      const s = +new Date();
      let c = 0;
      // loop 32ms
      while (+new Date() - s < 32) {
        await sleep(1);
        // pass
        c++;
      }
      return c;
    }); // cached with globalThis by default, (global['prefix-hashedKeyXXXX'] in node or window['prefix-hashedKeyXXXX'] in browser)

    // cache not hit
    const st = +new Date();
    const firstResult = await fn();
    const et = +new Date();
    expect(firstResult).toBeGreaterThan(0);
    expect(et - st).toBeGreaterThan(30); // 30ms

    // cache hit
    {
      const st = +new Date();
      const secondResult = await fn();
      const et = +new Date();
      expect(secondResult).toBe(firstResult);
      expect(et - st).toBeLessThan(1); // 30ms
    }
  });
});
