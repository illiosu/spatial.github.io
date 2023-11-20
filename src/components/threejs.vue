<template>
  <div>
    <canvas
      id="mainCanvas"
      style="
        margin-top: 200px;
        width: 400px;
        height: 400px;
        margin-left: 100px;
        position: absolute;
        top: 20px;
        z-index: 1001;
      "
    ></canvas>
  </div>
</template>
<script setup>
import * as THREE from "three";
import * as GeoTIFF from "geotiff";
import { onMounted } from "vue";
onMounted(() => {
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("mainCanvas"),
  });
  renderer.setClearColor("#255"); // 设置渲染器背景为黑色
  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-6, 6, 4.5, -4.5, 0, 50); //创建照相机
  camera.position.set(35, 15, 25); //设置照相机的位置
  camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置照相机面向(0,0,0)坐标观察
  var light = new THREE.PointLight(0xffffff, 1, 100); //创建光源
  light.position.set(10, 15, 10); //设置光源的位置
  scene.add(light); //在场景中添加光源
  var material = new THREE.MeshPhongMaterial({
    color: "red", //设置颜色为yellow
  });

  var geometry = new THREE.BoxGeometry(5, 5, 5);
  //创建物体
  var cube = new THREE.Mesh(geometry, material);
  scene.add(light);
  scene.add(cube);
  renderer.render(scene, camera);

  const tif = GeoTIFF.fromUrl("/assets/in.tif");
  
  console.log(tif)
  // const tifImage =  tif.getImage();
  // const image = {
  //     width: tifImage.getWidth(),
  //     height: tifImage.getHeight()
  //     };
  // const data =  tifImage.readRasters({
  //     interleave: true
  // });
});
</script>

<style scoped></style>
