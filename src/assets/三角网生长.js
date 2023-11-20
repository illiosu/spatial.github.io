// 定义一个点对象
class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  // 执行三角网生长法
  function triangulation(points) {
    let triangles = [];
  
    // 创建包围盒
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
  
    for (let i = 0; i < points.length; i++) {
      minX = Math.min(minX, points[i].x);
      minY = Math.min(minY, points[i].y);
      maxX = Math.max(maxX, points[i].x);
      maxY = Math.max(maxY, points[i].y);
    }
  
    // 添加三角形超级结点到点集
    const superTriangle = [
      new Point(minX - 1, minY - 1),
      new Point(maxX + 1, minY - 1),
      new Point((minX + maxX) / 2, maxY + 1)
    ];
  
    points.push(...superTriangle);
  
    // 创建初始三角形
    triangles.push([points.length - 3, points.length - 2, points.length - 1]);
  
    // 执行三角网生长法
    for (let i = 0; i < points.length - 3; i++) {
      const edges = [];
      const newTriangles = [];
  
      // 检查每一个三角形，判断是否包含点 i
      for (let j = 0; j < triangles.length; j++) {
        const triangle = triangles[j];
  
        if (isPointInsideTriangle(points[i], points[triangle[0]], points[triangle[1]], points[triangle[2]])) {
          // 该三角形包含点 i，添加三条边到边列表
          edges.push([triangle[0], triangle[1]]);
          edges.push([triangle[1], triangle[2]]);
          edges.push([triangle[2], triangle[0]]);
        } else {
          // 不包含点 i，保留该三角形
          newTriangles.push(triangle);
        }
      }
  
      // 根据边列表，找到非共享边，创建新的三角形
      for (let j = 0; j < edges.length - 1; j++) {
        for (let k = j + 1; k < edges.length; k++) {
          if (edges[j][0] === edges[k][1] && edges[j][1] === edges[k][0]) {
            // 找到非共享边，创建新的三角形
            const newTriangle = [edges[j][0], edges[j][1], i];
            newTriangles.push(newTriangle);
  
            // 从边列表中移除该边
            edges.splice(k, 1);
            edges.splice(j, 1);
  
            // 跳出循环，继续寻找下一个非共享边
            break;
          }
        }
      }
  
      // 更新三角形列表
      triangles = newTriangles;
    }
  
    // 移除超级结点及与之相连的三角形
    const validTriangles = triangles.filter(triangle => {
      return triangle.indexOf(points.length - 1) === -1 &&
             triangle.indexOf(points.length - 2) === -1 &&
             triangle.indexOf(points.length - 3) === -1;
    });
  
    return validTriangles;
  }
  
  // 判断点是否在三角形内部
  function isPointInsideTriangle(p, p0, p1, p2) {
    const area = 0.5 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    const s = 1 / (2 * area) * (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y);
    const t = 1 / (2 * area) * (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y);
  
    return s > 0 && t > 0 && (1 - s - t) > 0;
  }
  
  // 使用示例
  const points = [new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(1, 1), new Point(0.5, 0.5)];
  const triangles = triangulation(points);
  
  triangles.forEach(triangle => {
    console.log(triangle);
  });