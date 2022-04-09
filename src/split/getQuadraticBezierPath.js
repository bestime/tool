/**
 * 绘制一条曲线路径
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */
 export default function getQuadraticBezierPath(start, end, curveness, percent) {
  var cp = [
    (start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
    (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness,
  ]

  var x = quadraticBezier(start[0], cp[0], end[0], percent)
  var y = quadraticBezier(start[1], cp[1], end[1], percent)
  // console.log(x, y)
  return [x, y]
}

function quadraticBezier(p0, p1, p2, t) {
  var k = 1 - t
  return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2 // 这个方程就是二次贝赛尔曲线方程
}