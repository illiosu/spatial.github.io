import { map } from "./initMap.js";
import * as turf from "@turf/turf";
import { ref } from "vue";
var markers = ref([])
var points2
const voronoi = () => {
  var coords = [
    [116.60502082260878, 39.925079261429325],
    [116.88461262686103, 38.75669871715417],
    [116.41537855983194, 39.39743607521298],
    [116.37353855704946, 39.335762328952605],
    [116.30211922156319, 38.58765141347873],
    [116.0970779800366, 39.996126812311786],
    [116.2899238678566, 38.682319852463436],
    [116.96793805558438, 38.233057198376756],
    [116.64734093083518, 38.25690688989921],
    [116.64224292393234, 39.02831555073409],
    [116.53761144649823, 38.58613878602641],
    [116.95322301547357, 39.154278081608155],
    [116.81798323563706, 39.295227981238405],
    [116.42480720226978, 38.75127498166532],
    [116.36580757112185, 38.70327077017487],
    [116.92181514779308, 39.06616812339325],
    [116.98578627400353, 38.621801431942984],
    [116.05337843223448, 39.49286699031438],
    [116.53659608768513, 39.956443023070236],
    // [116.53171682133015, 38.52296237694999],
    // [116.07991979951296, 39.407614442204924],
    // [116.95007506915388, 39.28500244341008],
    // [116.58367142181986, 38.51969968115765],
    // [116.98329033532076, 39.05635887202502],
    // [116.04022734926961, 38.74868460249197],
    // [116.21960585453883, 39.801181436872376],
    // [116.40599414396706, 38.84112427643986],
    // [116.66204627102177, 38.04795116646361],
    // [116.18223029467921, 38.84873778014484],
    // [116.36176015371464, 39.30883731667114],
    // [116.27038404260422, 38.48525687742421],
    // [116.8467260170295, 38.24159917173837],
    [116.3725863533642, 38.88219694923688],
    [116.49686805192445, 39.86468598383151],
    [116.77365605140702, 39.850303832872676],
    [116.76231204438665, 38.13068109684582],
    [116.63374357746514, 38.86800619737787],
    [116.46353706510476, 39.047554164800246],
    [116.79881754366791, 38.19547970911778],
    [116.62456623213401, 39.99676858767895],
    [116.44320095377066, 39.899225113891745],
    [116.37583874275678, 38.008153813092115],
    [116.64339706559306, 38.2713900869794],
    [116.64142622157945, 38.12966313032992],
    [116.83829717441166, 38.02688569337976],
    [116.92687633292729, 39.77816773734342],
    [116.51827365646265, 39.25693149104164],
    [116.48399297877097, 39.92170242872048],
    [116.72894122662375, 38.337147090839515],
    [116.26310847089756, 39.62710040083161],
    [116.18697377888391, 39.87428094487905],
    [116.53315106420091, 39.2607435648856],
    [116.7423322904323, 38.861067162237475],
    [116.72167234518909, 38.85208361931129],
    [116.55271009766254, 38.39046974627812],
    [116.80811517797063, 38.75985732520789],
    [116.68890143929488, 38.1800150331766],
    [116.75606577417913, 39.18632775672723],
    [116.6953573098123, 38.783104004249864],
    [116.56659224964542, 38.91693103353267],
    [116.08639418440782, 39.625913071787295],
    [116.33524591653764, 38.314010305324615],
    [116.63698302160401, 39.090265513098466],
    [116.8150995933516, 39.71601304183126],
    [116.10144279794386, 39.482521652816374],
    [116.2913802781492, 39.0960320188828],
    [116.14043484869542, 39.29093242671068],
    [116.17381807169633, 39.73770149721288],
    [116.42222888675519, 38.32781710807287],
    [116.56785426509327, 38.09293859014806],
    [116.69976701289158, 39.036886033130784],
    [116.72950202848732, 39.297289751897594],
    [116.23302711891772, 39.778968213239885],
    [116.87636401890558, 38.77129969125118],
    [116.64605202130677, 39.87603145091258],
    [116.18465524633913, 39.381321295786876],
    [116.79578618155638, 38.54159074849081],
    [116.6636308613407, 39.029153927266755],
    [116.79500173119192, 38.0137525293864],
    [116.23914825520328, 38.66788325601138],
    [116.6580048502489, 38.95451701352364],
    [116.10636041005746, 39.580475013101974],
    [116.97735097038942, 39.80312844244458],
    [116.73437972413197, 39.871809413059864],
    [116.95997532007439, 39.36943834006636],
    [116.71753107627046, 39.93901512099713],
    [116.61166236693037, 39.896996161393716],
    [116.84269556123752, 38.10280183726966],
    [116.22022269803455, 39.81394621488071],
    [116.07284245030728, 39.93487049372569],
    [116.87043538496201, 38.98500975166764],
    [116.42643079809721, 39.54227944308964],
    [116.8122236019377, 39.22036804882207],
    [116.83149153320926, 38.4288684111549],
    [116.66468635577094, 39.72967940724502],
    [116.612737884546, 39.21792430141055],
    [116.12907631286808, 39.315875785894946],
    [116.94152336958055, 38.67848111660496],
    [116.52395583782072, 39.768441962680846],
    [116.09102421402503, 39.28861220355734],
  ];
  //   var coord2 = [];
  points2 = turf.points(coords);
  //   console.log("1:" + points2.type);
  var options = {
    //[最小经度，最小纬度，最大经度，最大纬度]。
    bbox: [116, 38, 117, 40],
  };

  var voronoiPolygons = turf.voronoi(points2, options);

  var vpGeoJson = L.geoJSON(voronoiPolygons); // 将 hull 添加到地图上
  //   console.log(vpGeoJson)
  vpGeoJson.addTo(map);

  // coords.forEach(coord => {
  //   var marker = L.marker(coord.reverse()).addTo(map);
  //   markers.value.push(marker)
  // });
  
   
  //   // 初始化颜色数组
  // var colors = ["red", "green", "blue", "yellow", "purple", "orange"];

  // // 使用 turf.clustersDbscan 对点进行聚类
  // var clustered = turf.clustersDbscan(points2, maxDistance);

  // // 遍历聚类结果，为每个聚类分配一个颜色
  // var clusterColors = {};
  // clustered.features.forEach(function(feature) {
  //   var clusterId = feature.properties.cluster;
  //   if (!clusterColors[clusterId]) {
  //     clusterColors[clusterId] = colors[Object.keys(clusterColors).length % colors.length];
  //   }
  // });
  // console.log(colors)
  // // 遍历所有的点，根据它们的聚类标签给它们分配颜色，并创建出marker点
  // clustered.features.forEach(function(feature) {
  //   var clusterId = feature.properties.cluster;
  //   var color = clusterColors[clusterId];
  //   var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
  //     icon: L.icon({
  //       iconUrl: '/cc-marker.png', // 替换为你的图标路径
  //       iconSize: [25, 41], // 图标大小
  //       iconAnchor: [12, 41], // 图标锚点
  //       popupAnchor: [1, -34], // 弹出窗口锚点
  //       shadowSize: [41, 41], // 阴影大小
  //     })
  //   }).addTo(map);
  // });
  map.fitBounds(vpGeoJson.getBounds());
};
export { voronoi,markers,points2 };
