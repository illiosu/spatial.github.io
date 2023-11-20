import { map } from "./initMap.js";
import * as turf from "@turf/turf";
var points = [
  [116.61729317409893, 39.932380403490875],
  [116.61729317409893, 39.932380403490875],
  [116.76635646064511, 39.930800820752765],
  [116.70521990533356, 39.85282948915942],
  [116.78627736069043, 39.79059962227577],
  [116.66743888800615, 39.77001973407519],
  [116.54379192220748, 39.81592026602059],
  [116.62141473962556, 39.852302354195864],
  [116.61729317409893, 39.932380403490875],
];
var turfPoints = turf.featureCollection([]);
for (var i = 0; i < points.length; i++) {
  var point = turf.point(points[i]);
  turfPoints.features.push(point);
}
function drawPolyline(points, map) {
  var polyline = L.polyline(points, {
    color: "red", // 线条颜色
    weight: 3, // 线条宽度
    opacity: 0.5, // 线条透明度
    smoothFactor: 1, // 线条平滑度
  });

  polyline.addTo(map);
}
// 交换 x 和 y 坐标的值
function swapXY(point) {
  return [point[1], point[0]];
}
var swappedPoints = points.map(swapXY);

const convex = () => {
  
  var hull = turf.convex(turfPoints);
  // console.log(hull)
  var hullGeoJson = L.geoJSON(hull); // 将 hull 添加到地图上
  hullGeoJson.addTo(map);
  // console.log(hull);
  map.fitBounds(hullGeoJson.getBounds());
  drawPolyline(swappedPoints, map);
  // hull.addTo(map)
};
export { convex };
