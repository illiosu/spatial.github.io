import { map } from "./initMap.js";
import { ref } from "vue";
const epsilon = ref(2000);
var originalPoints = [
  { lat: 39.9042, lng: 116.4074 }, // 北京市中心
  { lat: 39.9137, lng: 116.4537 }, // 故宫博物院
  { lat: 39.8819, lng: 116.4103 }, // 天安门广场
  { lat: 39.8653, lng: 116.3323 }, // 天坛公园
  { lat: 39.9414, lng: 116.3504 }, // 鼓楼大街
  { lat: 39.9593, lng: 116.298 }, // 奥林匹克公园
  { lat: 39.9929, lng: 116.337 }, // 圆明园遗址公园
];
function drawPolyline(points, map) {
  var polyline = L.polyline(points, {
    color: "red", // 线条颜色
    weight: 3, // 线条宽度
    opacity: 0.8, // 线条透明度
    smoothFactor: 1, // 线条平滑度
  });

  polyline.addTo(map);

  map.fitBounds(polyline.getBounds());
}
function drawSimplifyPolyline(points, map) {
  var polyline = L.polyline(points, {
    color: "blue", // 线条颜色
    weight: 3, // 线条宽度
    opacity: 0.8, // 线条透明度
    smoothFactor: 1, // 线条平滑度
  });

  polyline.addTo(map);
}
// 定义一个函数，计算两个经纬度坐标之间的距离（单位：米）
function getDistance(lat1, lng1, lat2, lng2) {
  var R = 6371000; // 地球半径
  var radLat1 = (lat1 * Math.PI) / 180;
  var radLat2 = (lat2 * Math.PI) / 180;
  var deltaLat = radLat1 - radLat2;
  var deltaLng = (lng1 * Math.PI) / 180 - (lng2 * Math.PI) / 180;
  var a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
// 定义一个函数，计算一个点到一条线段的垂直距离
function getPerpendicularDistance(point, start, end) {
  // 如果起点和终点重合，返回点到起点的距离
  if (start.lat === end.lat && start.lng === end.lng) {
    return getDistance(point.lat, point.lng, start.lat, start.lng);
  }
  // 使用海伦公式计算三角形的面积
  var a = getDistance(start.lat, start.lng, end.lat, end.lng); // 线段长度
  var b = getDistance(point.lat, point.lng, start.lat, start.lng); // 点到起点的距离
  var c = getDistance(point.lat, point.lng, end.lat, end.lng); // 点到终点的距离
  var p = (a + b + c) / 2; // 半周长
  var S = Math.sqrt(p * (p - a) * (p - b) * (p - c)); // 面积
  return (S * 2) / a; // 垂直距离
}
// 定义一个函数，使用Douglas-Peuker算法对一组坐标点进行抽稀
function simplify(points, epsilon) {
  // 如果点数小于等于2，直接返回原数组
  if (points.length <= 2) {
    return points;
  }

  // 找出距离首尾线段最远的点，记录其索引和距离
  var maxIndex = -1;
  var maxDistance = -1;

  for (var i = 1; i < points.length - 1; i++) {
    var distance = getPerpendicularDistance(
      points[i],
      points[0],
      points[points.length - 1]
    );
    if (distance > maxDistance) {
      maxIndex = i;
      maxDistance = distance;
    }
  }

  // 如果最大距离大于阈值，则保留该点，并递归处理左右两段
  if (maxDistance > epsilon) {
    var left = simplify(points.slice(0, maxIndex), epsilon); // 左半段（包含最远点）
    var right = simplify(points.slice(maxIndex), epsilon); // 右半段（包含最远点）
    return left.slice(0, left.length - 1).concat(right); // 合并两段（去掉重复的最远点）
  } else {
    // 如果最大距离小于等于阈值，则舍弃中间的点，只保留首尾两点
    return [points[0], points[points.length - 1]];
  }
}

function drawMarkers(points, map) {
  // 遍历每个坐标点
  for (var i = 0; i < points.length; i++) {
    // 创建一个标记对象
    var marker = L.marker(points[i], {
      title: "Point " + i, // 标记标题
    });

    marker.addTo(map);
    marker.bindPopup(
      "Point " +
        i +
        ": (" +
        points[i].lat.toFixed(6) +
        ", " +
        points[i].lng.toFixed(6) +
        ")"
    );
  }
}
const chouXi = () => {
  drawPolyline(originalPoints, map);
  var simplifiedPoints = simplify(originalPoints, epsilon.value);
  drawSimplifyPolyline(simplifiedPoints, map);
  drawMarkers(originalPoints, map);
  console.log(1111)
};
export { chouXi ,epsilon};
