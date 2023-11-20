import { map } from "./initMap.js";
import * as turf from "@turf/turf";
import { points2 ,markers} from "./Voronoi.js";

const k_means = () =>{
    markers.value.forEach((m)=>{
        map.removeLayer(m)
    })
    markers.value = []
    var maxDistance = 10;
    // var clustered = turf.clustersDbscan(points2, maxDistance);
    var options = {numberOfClusters: 7};
    var clustered = turf.clustersKmeans(points2, options);
    console.log(clustered);
    // console.log(k);
    // coords.forEach(coord => {
    //   L.marker(coord.reverse()).addTo(map);
    // });
    // 初始化iconUrl数组
    var iconUrls = [
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png",
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-yellow.png",
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-black.png",
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png",
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-orange.png",
    ];
    
    // // 使用 turf.clustersDbscan 对点进行聚类
    // var clustered = turf.clustersDbscan(points2, maxDistance);
    
    // 遍历聚类结果，为每个聚类分配一个iconUrl
    var clusterIcons = {};
    clustered.features.forEach(function (feature) {
      var clusterId = feature.properties.cluster;
      if (!clusterIcons[clusterId]) {
        clusterIcons[clusterId] =
          iconUrls[Object.keys(clusterIcons).length % iconUrls.length];
      }
    });
    
    // 遍历所有的点，根据它们的聚类标签给它们分配iconUrl，并创建出marker点
    clustered.features.forEach(function (feature) {
        console.log(111)
      var clusterId = feature.properties.cluster;
      var iconUrl = clusterIcons[clusterId];
      var marker = L.marker(
        [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
        {
          icon: L.icon({
            iconUrl: iconUrl, // 使用分配的iconUrl
            iconSize: [25, 41], // 图标大小
            iconAnchor: [12, 41], // 图标锚点
            popupAnchor: [1, -34], // 弹出窗口锚点
            shadowSize: [41, 41], // 阴影大小
          }),
        }
      ).addTo(map);
    });
}
export {k_means}