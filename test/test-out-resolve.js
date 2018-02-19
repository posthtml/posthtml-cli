import test from 'ava';
import outResolve from '../src/out-resolve';

test('should return function', t => {
    t.true(typeof outResolve === 'function');
});

test('only input should return file.ext', t => {
    t.is(outResolve('file.ext'), 'file.ext');
});

test('only input should return tmp/file.ext', t => {
    t.is(outResolve('tmp/file.ext'), 'tmp/file.ext');
});

test('input file and output file should return output.ext', t => {
    t.is(outResolve('file.ext', 'output.ext'), 'output.ext');
});

test('input file and output folder should return tmp/file.ext', t => {
    t.is(outResolve('file.ext', 'tmp'), 'tmp/file.ext');
});

test('input files and output folder should return tmp/test/*.ext', t => {
    t.is(outResolve('test/*.ext', 'tmp'), 'tmp/test/*.ext');
});

test('input files and output file should return output.ext', t => {
    t.is(outResolve('test/*', 'output.ext'), 'output.ext');
});

test('input files and output file should return tmp/output.ext', t => {
    t.is(outResolve('test/*', 'tmp/output.ext'), 'tmp/output.ext');
});

