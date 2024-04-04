import { objCached } from "./";

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
  console.log(firstResult);
  expect(firstResult).toBeGreaterThan(0);
  expect(et - st).toBeGreaterThan(30); // 30ms

  //   cache hit
  {
    const st = +new Date();
    const secondResult = fn();
    const et = +new Date();
    console.log(secondResult);
    expect(secondResult).toBe(firstResult);
    expect(et - st).toBeLessThan(1); // 30ms
  }
});
