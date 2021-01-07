#### 使用方法
```javascript
// => {"a":"1","b":["张三",["李四"]]}
parseQuery('a=1&b[]=张三&b[1][]=李四'); 
```

#### parseQuery 测试用例
```javascript
function testParseDemo (json) {
	var dataToUrlStr = ns.param(json)
	var _parseData = ns.parseQuery(dataToUrlStr)

	console.log('<<<===========================>>>')
	
	<!-- console.log('原始数据：', json)
	console.log('解析数据：', _parseData) -->
	console.log('序列化数据：', decodeURIComponent(dataToUrlStr))
	console.log('原始数据字符串：', JSON.stringify(json))
	console.log('解析数据字符串：', JSON.stringify(_parseData))
}
```

```javascript
// => 序列化数据： a=1
// => 原始数据字符串： {"a":"1"}
// => 解析数据字符串： {"a":"1"}
testParseDemo({
	a: "1"
})

// => 序列化数据： a=1&b[]=张三
// => 原始数据字符串： {"a":"1","b":["张三"]}
// => 解析数据字符串： {"a":"1","b":["张三"]}
testParseDemo({
	a: "1",
	b: [
		"张三"
	]
})


// => 序列化数据： a[b][c][d][e][f]=1174295440
// => 原始数据字符串： {"a":{"b":{"c":{"d":{"e":{"f":"1174295440"}}}}}}
// => 解析数据字符串： {"a":{"b":{"c":{"d":{"e":{"f":"1174295440"}}}}}}
testParseDemo({
	a: {
		b: {
			c: {
				d: {
					e: {
						f: "1174295440"
					}
				}
			}
		}
	}
})


// => 序列化数据： a=1&b[]=张三&b[1][]=李四
// => 原始数据字符串： {"a":"1","b":["张三",["李四"]]}
// => 解析数据字符串： {"a":"1","b":["张三",["李四"]]}
testParseDemo({
	a: "1",
	b: [
		"张三",
		[
			"李四"
		]
	]
})


// => 序列化数据： a=1&b[]=张三&b[1][]=李四&b[2][info]=hello
// => 原始数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello"}]}
// => 解析数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello"}]}
testParseDemo({
	a: "1",
	b: [
		"张三",
		[
			"李四"
		],
		{
			info: 'hello'
		}
	]
})


// => 序列化数据： a=1&b[]=张三&b[1][]=李四&b[2][info]=hello&b[2][arr][]=可以的
// => 原始数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello","arr":["可以的"]}]}
// => 解析数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello","arr":["可以的"]}]}
testParseDemo({
	a: "1",
	b: [
		"张三",
		[
			"李四"
		],
		{
			info: 'hello',
			arr: [
				"可以的"
			]
		}
	]
})


// => 序列化数据： a=1&b[]=张三&b[1][]=李四&b[2][info]=hello&b[2][arr][]=可以的&c[age]=50
// => 原始数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello","arr":["可以的"]}],"c":{"age":"50"}}
// => 解析数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello","arr":["可以的"]}],"c":{"age":"50"}}
testParseDemo({
	a: "1",
	b: [
		"张三",
		[
			"李四"
		],
		{
			info: 'hello',
			arr: [
				"可以的"
			]
		}
	],
	c: {
		age: "50"
	}
})

// => 序列化数据： a=1&b[]=张三&b[1][]=李四&b[2][info]=hello&b[2][arr][]=可以的&b[2][name]=借&b[2][ijid]=拿到&c[age]=50
// => 原始数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello","arr":["可以的"],"name":"借","ijid":"拿到"}],"c":{"age":"50"}}
// => 解析数据字符串： {"a":"1","b":["张三",["李四"],{"info":"hello","arr":["可以的"],"name":"借","ijid":"拿到"}],"c":{"age":"50"}}
testParseDemo({
	a: "1",
	b: [
		"张三",
		[
			"李四"
		],
		{
			info: 'hello',
			arr: [
				"可以的"
			],
			name: '借',
			ijid: '拿到'
		}
	],
	c: {
		age: "50"
	}
})



// => 序列化数据： name=bestime&age=27&job[]=张三&job[]=李四&job[2][name]=123&job[2][hh]=戈特&job[2][list][]=一呃&job[2][list][]=没看我&job[3][]=王五&job[3][1][]=赵六&job[3][1][1][]=王八&config[switch]=true
// => 原始数据字符串： {"name":"bestime","age":"27","job":["张三","李四",{"name":"123","hh":"戈特","list":["一呃","没看我"]},["王五",["赵六",["王八"]]]],"config":{"switch":true}}
// => 解析数据字符串： {"name":"bestime","age":"27","job":["张三","李四",{"name":"123","hh":"戈特","list":["一呃","没看我"]},["王五",["赵六",["王八"]]]],"config":{"switch":true}}
testParseDemo({
	name: 'bestime',
	age: '27',
	job: [
		'张三',
		'李四',
		{
			name: '123',
			hh: '戈特',
			list: [
				'一呃',
				'没看我'
			]
		},
		[
			'王五',
			[
				'赵六',
				[
					'王八'
				]
			]
		]
	],
	config: {
		switch: true
	}
});
```