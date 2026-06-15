/**
 * Quick smoke-test for the frontmatter parser.
 * Run:  cd ~/portfolio && npx tsx src/lib/frontmatter.test.ts
 */
import { parseFrontmatter, getString, getStrings } from '../../src/lib/frontmatter'

let passed = 0
let failed = 0

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (ok) { passed++; console.log(`  ✓ ${label}`) }
  else { failed++; console.log(`  ✗ ${label}\n    expected: ${JSON.stringify(expected)}\n    got:      ${JSON.stringify(actual)}`) }
}

const t1 = parseFrontmatter(`---
title: "Hello, World"
tags: ["meta", "portfolio"]
---
Body here.`)
check('basic fields', { title: getString(t1.data, 'title'), tags: getStrings(t1.data, 'tags') }, { title: 'Hello, World', tags: ['meta', 'portfolio'] })
check('content', t1.content, 'Body here.')

const t2 = parseFrontmatter(`---
title: "Quoted: colons inside"
---
Content`)
check('colon in quoted value', getString(t2.data, 'title'), 'Quoted: colons inside')

const t3 = parseFrontmatter(`---
---
No frontmatter body.`)
check('empty frontmatter block', Object.keys(t3.data).length, 0)
check('empty frontmatter content', t3.content, 'No frontmatter body.')

const t4 = parseFrontmatter(`No frontmatter at all. Just text.`)
check('no frontmatter delimiters', t4.content, 'No frontmatter at all. Just text.')

const t5 = parseFrontmatter(`---
desc: Unquoted value with spaces
tags: [a, b, c]
---
Content`)
check('unquoted string', getString(t5.data, 'desc'), 'Unquoted value with spaces')
check('array without quotes', getStrings(t5.data, 'tags'), ['a', 'b', 'c'])

const t6 = parseFrontmatter(`---
tags: ["trailing",]
---
Content`)
check('trailing comma in JSON array', getStrings(t6.data, 'tags'), ['trailing'])

const t7 = parseFrontmatter(`  \n  \n---\ntitle: Leading whitespace\n---\nContent`)
check('leading whitespace before ---', getString(t7.data, 'title'), 'Leading whitespace')

// Unquoted values with colons work correctly — indexOf(':') finds the first
// colon (the key:value separator), not subsequent colons in the value.
const t8 = parseFrontmatter(`---
desc: Unquoted: has colon
---
Content`)
check('unquoted colon in value', getString(t8.data, 'desc'), 'Unquoted: has colon')

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed > 0 ? 1 : 0)
