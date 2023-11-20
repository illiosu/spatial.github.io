import { windingNumber } from "../components/windingnumber";
import * as turf from "@turf/turf";
import { h } from "vue";
import { ElNotification } from "element-plus";
export const mapObj = {
  zoom: 10,
  currentTileLayer: null,
};
let map = null;
export const initMap = () => {
  map = L.map("mapContain", {}).setView([27.9911, 120.6993], mapObj.zoom);
  var euclideandistance = null;
  mapObj.map = map;
  // 天地图矢量底图url
  const imageURL2 =
    "http://t0.tianditu.gov.cn/vec_w/wmts?" +
    "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
    "&tk=81e92153f7bd56bf35d42ceacbc4ab95";
  var tianditushilian = L.tileLayer(imageURL2, {
    attribution: "stamen",
  });

  tianditushilian.addTo(map);
// 在它们的属性中创建具有随机z值的随机点
var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});

var maxDistance = 100;
var clustered = turf.clustersDbscan(points, maxDistance);

  // 初始化绘制工具
  map.pm.setLang("zh");
  map.pm.addControls({
    position: "topleft",
    drawPolygon: true, // 绘制多边形
    drawMarker: true, //绘制标记点
    drawCircleMarker: false, //绘制圆形标记
    drawPolyline: true, //绘制线条
    drawRectangle: false, //绘制矩形
    drawCircle: false, //绘制圆圈
    editMode: false, //编辑多边形
    dragMode: false, //拖动多边形
    cutPolygon: false, // 添加一个按钮以删除多边形里面的部分内容
    removalMode: false, // 清除多边形
  });

  map.on("pm:create", (e) => {
    if (e.shape === "Polygon") {
      // var coords = e.layer.getLatLngs()[0];
      // var polygon = turf.polygon([coords]);
      // var area = turf.area(polygon);
      var polygon2 = turf.polygon([
        [
          [108.09876, 37.200787], // 注意：polygon首尾坐标要一致
          [106.398901, 33.648651],
          [114.972103, 33.340483],
          [113.715685, 37.845557],
          [108.09876, 37.200787],
        ],
      ]);
      // console.log("1:"+polygon2.type)
      //       console.log(e.layer._latlngs[0])

      // console.log("面积："+area);
      // var polygon = turf.polygon(e.layer._latlngs[0]);
      // console.log("2:"+e.layer._latlngs[0].type)
      // var area = turf.area(polygon);
      // var points2 = turf.points(e.layer.getLatLngs()[0]);
      // console.log(area)
      handleDrawPolygon(e);
    }
    if (e.shape === "Marker") {
      // console.log(e);
      // // // var point = L.Projection.Mercator.project(); // 将经纬度坐标投影为墨卡托坐标
      // //
      // console.log(e.layer._latlng);
      var point = L.Projection.Mercator.project(e.layer._latlng);
      // console.log(point);
      var result = windingNumber(point, mercatorCoords);
      // console.log(mercatorCoords);
      ElNotification({
        title: "Title",
        message: h("i", { style: "color: teal" }, "点" + result + "多边形内"),
      });
      // var popup = L.popup()
      //   .setLatLng([40, 116.28])
      //   .setContent("点" + result + "多边形内")
      //   .openOn(map);
    }
    if (e.shape === "Line") {
      var layer = e.layer;
      var polylineGeoJson = {};
      polylineGeoJson = e.layer.toGeoJSON();
      // console.log(polylineGeoJson);
      var point1 = {
        lat: polylineGeoJson.geometry.coordinates[0][1],
        lng: polylineGeoJson.geometry.coordinates[0][0],
      };
      var point2 = {
        lat: polylineGeoJson.geometry.coordinates[1][1],
        lng: polylineGeoJson.geometry.coordinates[1][0],
      };
      var mercatorCoord = L.Projection.Mercator.project(point1);
      // console.log(mercatorCoord);

      euclideandistance = euclideanDistance2(point1, point2);

      var p1 = latLonToMeters(point1.lat, point1.lng);
      var p2 = latLonToMeters(point2.lat, point2.lng);
      // console.log("横坐标1p" + p1.x + "纵坐标1p" + p1.y);
      // console.log("横坐标2p" + p2.x + "纵坐标2p" + p2.y);
      var t1 = manhattanDistance(p1, p2);
      var t2 = chebyshevDistance(p1, p2);
      var t3 = euclideanDistance(p1, p2);
      var t4 = minkowskiDistance(p1, p2, 1);
      ElNotification({
      
      
        message: h('i', { style: 'color: teal;word-wrap: break-word;word-break:break-all' }, "绝对值距离/曼哈顿距离:" +
        t1 
      +
        "切比雪夫距离：" +
        t2 
       +
        "欧氏距离：" +
        t3 
      +
        "明氏距离：" +
        t4),
        duration: 0,
      });
      // layer.bindPopup(
      //   "绝对值距离/曼哈顿距离:" +
      //     t1 +
      //     "<br>" +
      //     "切比雪夫距离：" +
      //     t2 +
      //     "<br>" +
      //     "欧氏距离：" +
      //     t3 +
      //     "<br>" +
      //     "明氏距离：" +
      //     t4
      // ); // 绑定 Popup 内容

      // layer.openPopup(); // 打开 Popup
    }
  });

  map.on("pm:drawstart", (e) => {});
  var mercatorCoords = []; // 存储墨卡托坐标的数组
  map.on("pm:drawend", (e) => {});
  function handleDrawPolygon(e) {
    var layer = e.layer;

    var latlngs = layer.getLatLngs()[0]; // 假设只有一个多边形
    latlngs.forEach(function (latlng) {
      var mercatorCoord = L.Projection.Mercator.project(latlng); // 将经纬度坐标投影为墨卡托坐标
      mercatorCoords.push(mercatorCoord);
    });
    var polygon = turf.polygon([
      [
        [-81, 41],
        [-88, 36],
        [-84, 31],
        [-80, 33],
        [-77, 39],
        [-81, 41],
      ],
    ]);
    var centroid = turf.centroid(polygon);
    // console.log(centroid.geometry.coordinates);
    var area = calculatePolygonArea(mercatorCoords); // 调用计算多边形面积的函数
    // console.log(mercatorCoords);
    var bcenter = barycenter(mercatorCoords);
    // var popup = L.popup()
    //   .setLatLng([39.91924596285797, 116.275161])
    //   .setContent(
    //     "面积：" + area + "<br>" + "重心:" + bcenter.cx + "," + bcenter.cy
    //   )
    //   .openOn(map);

    ElNotification({
      
      message: h('i', { style: 'color: teal;word-wrap: break-word;word-break:break-all' },"面积:" + area + "重心:" + bcenter.cx + "," + bcenter.cy,),
      duration: 0,
    });

    function barycenter(polygon) {
      // console.log(polygon.length);
      //多边形重心
      var cx = 0;
      var cy = 0;
      for (var i = 0; i < polygon.length - 1; i++) {
        cx +=
          (polygon[i].x + polygon[i + 1].x) *
          (polygon[i + 1].x * polygon[i].y - polygon[i].x * polygon[i + 1].y);
        cy +=
          (polygon[i].y + polygon[i + 1].y) *
          (polygon[i + 1].x * polygon[i].y - polygon[i].x * polygon[i + 1].y);
      }
      cx /= 6 * area;
      cy /= 6 * area;
      // console.log("重心：" + cx + "," + cy);
      return { cx, cy };
    }
  }
  function calculatePolygonArea(mercatorCoords) {
    var numPoints = mercatorCoords.length;
    var sum = 0;

    for (var i = 0; i < numPoints; i++) {
      var coord1 = mercatorCoords[i];
      var coord2 = mercatorCoords[(i + 1) % numPoints];
      sum += (coord2.x - coord1.x) * (coord1.y + coord2.y);
    }

    var area = Math.abs(sum / 2);

    return area;
  }
  // 欧式距离
  function euclideanDistance(p1, p2) {
    // 计算两点之间的横坐标和纵坐标差
    var dx = Math.abs(p1.x - p2.x);
    var dy = Math.abs(p1.y - p2.y);
    // 计算两点之间的距离
    var d = Math.sqrt(dx * dx + dy * dy);
    return d;
  }
  // 经纬度转换为米
  function latLonToMeters(lat, lon) {
    // 地球半径，单位为米
    var R = 6378137;
    // 将经纬度转换为弧度
    var rad = Math.PI / 180;
    var latRad = lat * rad;
    var lonRad = lon * rad;
    // 计算横坐标和纵坐标
    var x = R * lonRad;
    var y = R * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    // 返回一个包含横坐标和纵坐标的对象

    return { x: x, y: y };
  }
  //马氏距离
  function mahalanobisDistance(latlng1, latlng2) {
    var featureVector1 = [latlng1.lat, latlng1.lng]; // 特征向量1
    var featureVector2 = [latlng2.lat, latlng2.lng]; // 特征向量2
    var covarianceMatrix = null; // 协方差矩阵
    var inverseCovarianceMatrix = null; // 协方差矩阵的逆矩阵

    var diffVector = subtractVectors(featureVector1, featureVector2);
    var mahalanobis = multiplyMatrices(diffVector, inverseCovarianceMatrix);
    mahalanobis = multiplyMatrices(mahalanobis, transposeMatrix(diffVector));

    return Math.sqrt(mahalanobis);
  }
  // 欧氏距离是指欧几里得空间中两点之间的直线段的长度，它适用于平面或者三维空间，但不适用于球面。
  // 因为地球表面近似为一个球面，所以如果要计算地球上两个位置之间的距离，就不能用欧氏距离，而要用球面距离。
  // //欧式距离
  function euclideanDistance2(latlng1, latlng2) {
    var earthRadius = 6371; // 地球半径，单位为千米

    var latDiff = (Math.abs(latlng2.lat - latlng1.lat) * Math.PI) / 180; // 将纬度差值转换为弧度
    var lngDiff = (Math.abs(latlng2.lng - latlng1.lng) * Math.PI) / 180; // 将经度差值转换为弧度

    var a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos((latlng1.lat * Math.PI) / 180) *
        Math.cos((latlng2.lat * Math.PI) / 180) *
        Math.sin(lngDiff / 2) *
        Math.sin(lngDiff / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c * 1000; // 最终距离，单位为千米
  }
  //绝对值距离/曼哈顿距离
  function manhattanDistance(p1, p2) {
    var latDiff = Math.abs(p2.x - p1.x);
    var lngDiff = Math.abs(p2.y - p1.y);
    return latDiff + lngDiff;
  }
  //切氏距离
  function chebyshevDistance(p1, p2) {
    var latDiff = Math.abs(p2.x - p1.x);
    var lngDiff = Math.abs(p2.y - p1.y);
    return Math.max(latDiff, lngDiff);
  }
  //明氏距离
  // 当p=1时，明氏距离即为曼哈顿距离；

  // 当p=2时，明氏距离即为欧氏距离；

  // 当时p-->无穷时，明氏距离即为切比雪夫距离。
  function minkowskiDistance(p1, p2, p) {
    var latDiff = Math.abs(p2.x - p1.x) ** p;
    var lngDiff = Math.abs(p2.y - p1.y) ** p;
    return (latDiff + lngDiff) ** (1 / p);
  }
};
export { map };
