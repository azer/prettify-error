var failingCode = require("failing-code");
var format = require("format-text");
var leftpad = require("left-pad");
var style = require("style-format");

var template = style('{bold}{red}{title} {grey}{filename}{reset}\n'
                     + '    {red}{v}\n'
                     + '    {grey}{previousLineNo}. {previousLine}\n'
                     + '    {reset}{failingLineNo}. {failingLine}\n'
                     + '    {grey}{nextLineNo}. {nextLine}\n'
                     + '    {red}{^}{reset}\n'
                     + '    {stack}\n'
                     + '{reset}');

module.exports = prettifyError;

function prettifyError (error, shift, code) {
  if (!error || !error.stack) return;

  code || (code = failingCode(error, undefined, shift));

  if (!code) return;

  var previousLineNo = String(code[0].line);
  var failingLineNo = String(code[1].line);
  var nextLineNo = String(code[2].line);
  var linumlen = Math.max(previousLineNo.length,
                          failingLineNo.length,
                          nextLineNo.length);

  return format(template, {
    title: error.message,
    filename: code[1].filename,
    previousLine: code[0].code,
    previousLineNo: leftpad(previousLineNo, linumlen),
    previousColNo: code[0].col,
    failingLine: code[1].code,
    failingLineNo: leftpad(failingLineNo, linumlen),
    failingColNo: code[1].col,
    nextLine: code[2].code,
    nextLineNo: leftpad(nextLineNo, linumlen),
    nextColNo: code[2].col,
    stack: tabStack(error.stack),
    '^': showColumn(code, linumlen - failingLineNo.length, '^'),
    'v': showColumn(code, linumlen - failingLineNo.length, 'v')
  });
}

function showColumn (code, tabn, ch) {
  var result = '';
  var i = String(code[1].line).length + code[1].col + 1 + tabn;

  while (i--) {
    result += ' ';
  }

  return result + ch;
}

function tabStack (stack) {
  return stack.replace(/\n/g, '\n    ');
}
