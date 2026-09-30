import assert from 'node:assert/strict';
import test from 'node:test';
const { Field, Provable, UInt96 } = await import(
  process.env.O1JS_TEST_MODULE ?? '../dist/node/index.js'
);

const B = 1n << 48n;
const MAX = (1n << 96n) - 1n;
const modes = ['constant', 'witness'];

function inputs(x, y, mode) {
  if (mode === 'constant') return [UInt96.from(x), UInt96.from(y)];
  return [
    Provable.witness(UInt96, () => UInt96.from(x)),
    Provable.witness(UInt96, () => UInt96.from(y)),
  ];
}

test('UInt96 enforces its constant range', () => {
  assert.equal(UInt96.from(MAX).toBigInt(), MAX);
  assert.throws(() => UInt96.from(MAX + 1n));
});

test('UInt96 multiplication preserves valid products and rejects overflow', async () => {
  for (const mode of modes) {
    await Provable.runAndCheck(() => {
      const [x, y] = inputs(B + 1n, B - 1n, mode);
      x.mul(y).value.assertEquals(Field(MAX));
    });
    await assert.rejects(
      Provable.runAndCheck(() => {
        const [x, y] = inputs(B, B, mode);
        x.mul(y);
      })
    );
  }
});

test('UInt96 division agrees with integer arithmetic and rejects zero', async () => {
  for (const mode of modes) {
    await Provable.runAndCheck(() => {
      const [x, y] = inputs(MAX, B, mode);
      const { quotient, rest } = x.divMod(y);
      quotient.value.assertEquals(Field(MAX / B));
      rest.value.assertEquals(Field(MAX % B));
    });
    await assert.rejects(
      Provable.runAndCheck(() => {
        const [x, y] = inputs(1n, 0n, mode);
        x.divMod(y);
      })
    );
  }
});

function withQuotient(x, y, q) {
  let substitutions = 0;
  const check = Provable.runAndCheck(() => {
    const [a, b] = inputs(x, y, 'witness');
    const witness = Provable.witness;
    Provable.witness = function (type, compute) {
      if (type === Field && substitutions === 0) {
        substitutions++;
        return witness.call(this, type, () => Field(q));
      }
      return witness.call(this, type, compute);
    };
    try {
      a.divMod(b);
    } finally {
      Provable.witness = witness;
    }
  });
  return { check, substitutions: () => substitutions };
}

test('UInt96 rejects malicious quotient witnesses', async () => {
  for (const [x, y, q] of [
    [100n, 7n, 13n],
    [100n, 7n, 15n],
    [MAX, 1n, MAX - 1n],
  ]) {
    const attempt = withQuotient(x, y, q);
    await assert.rejects(attempt.check);
    assert.equal(attempt.substitutions(), 1);
  }
});
