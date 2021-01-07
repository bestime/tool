/***
 * 首先，把条形码从右往左依次编序号为“1,2,3,4……”从序号二开始把所有偶数序号位上的数相加求和，用求出的和乘3，再从序号三开始把所有奇数序号上的数相加求和，用求出的和加上刚才偶数序号上的数，然后得出和。再用10减去这个和的个位数，就得出校验码。
举个例子：此条形码为：977167121601X（X为校验码）。
1．1+6+2+7+1+7=24
2．24×3=72
3．0+1+1+6+7+9=24
4．72+24=96

5．10-6=4

所以最后校验码X=4。此条形码为9771671216014。
如果第5步的结果个位为10，校验码是0；也就是说第4步个位为0的情况.
 */





// 验证条码尾数
function getLastCode (s) {
  var a = 0,b = 0,c = 0,d = 0,e = 0;
  for (var i = 1; i <= 12; i++) {
    var sc = parseInt(s[i - 1]);
    if (i <= 12 && i % 2 == 0) {
      a += sc;
    }else if (i <= 11 && i % 2 == 1) {
      b += sc;
    }
  }
  c = a * 3;
  d = b + c;
  if (d % 10 == 0) {
    e = d - d
  } else {
    e = d + (10 - d % 10) - d
  }
  return e;
}

// 生成随机条码
function create () {
  let str = '69';
  for(let i=0; i<10; i++){
    str += Math.floor(Math.random()*10);
  }
  var checkcode = getLastCode(str);
  var res = str+checkcode
  return res
}

// 验证整个条码是否合法
function check (str) {
  str = String(str)
  const left = str.substr(0,str.length-1)
  const right = str.substr(str.length-1, 1)
  //console.log('barCode-check', left, right)
  let jishu = ''
  let j_num = 0

  let oushu = ''
  let o_num = 0

  for(let index in left) {
    if(index%2===0) {
      j_num += Number(left[index])
      jishu = `${left[index]}${jishu}`
    }else {
      o_num += Number(left[index])
      oushu = `${left[index]}${oushu}`
    }
  }

  //console.log(`${oushu}偶数和：`, o_num)
  const d3 = o_num * 3
  
  //console.log('偶数3倍：', d3)
  //console.log(`${jishu}奇数和 + 偶数3倍：`, j_num)
  const total = j_num + d3
  //console.log('奇数与上一步求和：', total)
  
  let ck = 10 - total % 10
  ck = ck === 10 ? 0 : ck
  // console.log('10-各位 得出校验码：', ck)

  return right == ck
}

module.exports = {
  create,
  check
}