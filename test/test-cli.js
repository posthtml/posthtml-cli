var test = require('ava');
var execa = require('execa');

test('Missing required arguments', t => {
	t.throws(execa('../cli.js'));
});
