import test from 'ava';
import isPromise from 'is-promise';
import outResolve from '../lib/out-resolve';

test('should return function', t => {
  t.true(typeof outResolve === 'function');
});

test('should return Promise', t => {
  t.true(isPromise(outResolve()));
});

test('only input should return file.ext', async t => {
  t.is(await outResolve('file.ext'), 'file.ext');
});

test('only input should return tmp/file.ext', async t => {
  t.is(await outResolve('tmp/file.ext'), 'tmp/file.ext');
});

test('input file and output file should return output.ext', async t => {
  t.is(await outResolve('file.ext', 'output.ext'), 'output.ext');
});

test('input file and output folder should return tmp/file.ext', async t => {
  t.is(await outResolve('file.ext', 'tmp'), 'tmp/file.ext');
});

test('input files and output folder should return tmp/test/*.ext', async t => {
  t.is(await outResolve('test/*.ext', 'tmp'), 'tmp/test/*.ext');
});

test('input files and output file should return output.ext', async t => {
  t.is(await outResolve('test/*', 'output.ext'), 'output.ext');
});

test('input files and output file should return tmp/output.ext', async t => {
  t.is(await outResolve('test/*', 'tmp/output.ext'), 'tmp/output.ext');
});

