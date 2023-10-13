module.exports = {
  // 换行长度，默认80
  printWidth: 100,

  // tab缩进大小,默认为2
  tabWidth: 2,

  // 使用tab缩进
  useTabs: false,

  // 每行末尾添加分号
  semi: true,

  // 使用单引号代替双引号
  singleQuote: true,

  // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  arrowParens: 'avoid',

  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  
  // lf|crlf|cr|auto
  endOfLine: 'lf',

  // 将多行元素的 > 放在最后一行的末尾，而不是单独放在下一行(不适用于自关闭元素)。  
  bracketSameLine: false,

  htmlWhitespaceSensitivity: 'ignore',
  
  // Object 的最后一个属性是否添需要逗号
  trailingComma: 'none'
}
