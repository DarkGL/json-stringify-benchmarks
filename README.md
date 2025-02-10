# json-stringify-benchmarks

Benchmark for JSON stringification with different libraries.

## Libraries

- [fast-json-stringify](https://www.npmjs.com/package/fast-json-stringify)
- [json-accelerator](https://www.npmjs.com/package/json-accelerator)
- [slow-json-stringify](https://www.npmjs.com/package/slow-json-stringify)
- [worst-json-stringify](https://www.npmjs.com/package/worst-json-stringify)

## Usage

```bash
npm i
```

### Run benchmarks

```bash
npx tsx benchmarks/small.ts
npx tsx benchmarks/medium.ts
npx tsx benchmarks/large.ts
npx tsx benchmarks/multiple-queries.ts
```

## Results

### Node.js 23.6.1

#### Medium

```bash
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
JSON Stingify                668.00 ns/iter 670.88 ns 709.73 ns ▂▅██▄▂▂▂▂▂▁
Fast Json Stringify          619.96 ns/iter 625.49 ns 667.98 ns ▁▃▅█▇▄▂▁▁▁▁
JSON Accelerator             313.98 ns/iter 320.22 ns 337.67 ns ▁▄▇▅▆█▅▅▃▂▁
Slow Json Stringify          689.29 ns/iter 695.45 ns 748.56 ns ▁▃▆█▆▃▂▁▁▁▁

                             ┌                                            ┐
               JSON Stingify ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 668.00 ns
         Fast Json Stringify ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 619.96 ns
            JSON Accelerator ┤ 313.98 ns
         Slow Json Stringify ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 689.29 ns
                             └                                            ┘

summary
  JSON Accelerator
   1.97x faster than Fast Json Stringify
   2.13x faster than JSON Stingify
   2.2x faster than Slow Json Stringify
```

#### Large

```bash
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
JSON Stingify                  3.16 µs/iter   3.15 µs   3.47 µs ▃█▃▁▁▁▁▁▁▁▁
Fast Json Stringify            2.33 µs/iter   2.34 µs   2.41 µs ▃▇▅██▃▃▁▂▁▁
JSON Accelerator               1.05 µs/iter   1.06 µs   1.10 µs ▂▅▆█▇▆▃▂▁▁▂

                             ┌                                            ┐
               JSON Stingify ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.16 µs
         Fast Json Stringify ┤■■■■■■■■■■■■■■■■■■■■■ 2.33 µs
            JSON Accelerator ┤ 1.05 µs
                             └                                            ┘

summary
  JSON Accelerator
   2.21x faster than Fast Json Stringify
   3.01x faster than JSON Stingify
```

#### Multiple queries

```bash
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
JSON Stingify                529.42 ns/iter 532.05 ns 605.59 ns ▂█▇▃▂▂▁▁▂▁▁
Fast Json Stringify          258.41 ns/iter 264.10 ns 312.37 ns ▁█▄█▅▂▁▁▁▁▁
JSON Accelerator             192.64 ns/iter 200.55 ns 217.31 ns ▁▇█▃▂▄▇▄▂▁▁

                             ┌                                            ┐
               JSON Stingify ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 529.42 ns
         Fast Json Stringify ┤■■■■■■■ 258.41 ns
            JSON Accelerator ┤ 192.64 ns
                             └                                            ┘

summary
  JSON Accelerator
   1.34x faster than Fast Json Stringify
   2.75x faster than JSON Stingify
```
