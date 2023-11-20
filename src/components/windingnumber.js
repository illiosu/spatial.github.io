//     // 定义一个函数计算两个向量的叉积
// function crossProduct(v1, v2) {
//     return v1.x * v2.y - v1.y * v2.x;
//   }
  
//   // 定义一个函数计算点和多边形的回旋数
//   function windingNumber(point, polygon) {
//     // 初始化回旋数为0
//     let wn = 0;
//     // 遍历多边形的每条边
//     for (let i = 0; i < polygon.length; i++) {
//       // 获取当前边的起点和终点
//       let start = polygon[i];
//       let end = polygon[(i + 1) % polygon.length];
//       // 判断点是否在边的上方或下方
//       if (start.y <= point.y) {
//         // 点在边的下方或与起点水平对齐
//         if (end.y > point.y) {
//           // 点在终点的上方，说明边和水平射线有一个交点
//           // 计算交点的横坐标
//           let x =
//             start.x +
//             ((point.y - start.y) * (end.x - start.x)) / (end.y - start.y);
//           // 判断交点是否在点的右侧
//           if (x > point.x) {
//             // 交点在点的右侧，说明边从左向右穿过水平射线
//             // 计算两个向量（起点到终点，起点到点）的叉积
//             let cp = crossProduct(
//               { x: end.x - start.x, y: end.y - start.y },
//               { x: point.x - start.x, y: point.y - start.y }
//             );
//             // 如果叉积大于0，说明两个向量呈逆时针方向
//             if (cp > 0) {
//               // 边对回旋数有正贡献
//               wn++;
//             }
//           }
//         }
//       } else {
//         // 点在边的上方或与终点水平对齐
//         if (end.y <= point.y) {
//           // 点在终点的下方或与终点水平对齐，说明边和水平射线有一个交点
//           // 计算交点的横坐标
//           let x =
//             start.x +
//             ((point.y - start.y) * (end.x - start.x)) / (end.y - start.y);
//           // 判断交点是否在点的右侧
//           if (x > point.x) {
//             // 交点在点的右侧，说明边从右向左穿过水平射线
//             // 计算两个向量（起点到终点，起点到点）的叉积
//             let cp = crossProduct(
//               { x: end.x - start.x, y: end.y - start.y },
//               { x: point.x - start.x, y: point.y - start.y }
//             );
//             // 如果叉积小于0，说明两个向量呈顺时针方向
//             if (cp < 0) {
//               // 边对回旋数有负贡献
//               wn--;
//             }
//           }
//         }
//       }
//     }
//     // 返回回旋数
//     return wn;
//   }
  


/**
   * @description 回转数法判断点是否在多边形内部
   * @param {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }
   * @param {Array} poly 多边形顶点，数组成员的格式同 p
   * @return {String} 点 p 和多边形 poly 的几何关系
   */
function windingNumber(p, poly) {
  var px = p.x,
      py = p.y,
      sum = 0

  for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
    var sx = poly[i].x,
        sy = poly[i].y,
        tx = poly[j].x,
        ty = poly[j].y

    // 点与多边形顶点重合或在多边形的边上
    if((sx - px) * (px - tx) >= 0 && (sy - py) * (py - ty) >= 0 && (px - sx) * (ty - sy) === (py - sy) * (tx - sx)) {
      return 'on'
    }

    // 点与相邻顶点连线的夹角
    var angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px)

    // 确保夹角不超出取值范围（-π 到 π）
    if(angle >= Math.PI) {
      angle = angle - Math.PI * 2
    } else if(angle <= -Math.PI) {
      angle = angle + Math.PI * 2
    }

    sum += angle
  }
  

  // 计算回转数并判断点和多边形的几何关系
  return Math.round(sum / Math.PI) === 0 ? '不在' : '在'
}
export {windingNumber}