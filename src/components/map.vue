<template>
  <div>
    <div id="mapContain"></div>
    <el-button id="refreshButton" @click="cx" style="left: 6vw;position: absolute;"
      >抽稀</el-button
    >
  
    <el-button id="refreshButton" @click="convex()" style="left: 5.25vw;top: 8vh;position: absolute;"
      >凸包</el-button
    >
    <el-button id="refreshButton" @click="voronoi()" style="left: 5.25vw;top: 13vh;"
      >泰森多边形</el-button
    >
    <el-button id="refreshButton" @click="shiftShow" style="left: 5.25vw;top: 18vh;"
      >dem</el-button
    >
    <el-button id="refreshButton" @click="dbscan()" style="left: 5.25vw;top: 23vh;"
      >Dbscan</el-button
    >
    <el-button id="refreshButton" @click="k_means()" style="left: 5.25vw;top: 28vh;"
      >k-means</el-button
    >
    <!-- <el-input v-model="input" placeholder="Please input" style="left: 6vw;top: 40vh;position: absolute;z-index: 10000;width: 90px;"/> -->
    <slope :isShow="slopeShow"></slope>
    <!-- <el-button plain @click="open1"> Closes automatically </el-button>
        <el-button plain @click="open2"> Won't close automatically </el-button> -->
    <!-- <div id="three"></div>
    <div id="webgl" ></div> -->
    
  </div>
</template>
<script setup>
import { nextTick, onMounted,ref ,watch,watchEffect} from "vue";
import { initMap } from "../assets/initMap";
import { chouXi,epsilon } from "../assets/chouXi.js";
import { convex } from "../assets/convex.js";
import { voronoi } from "../assets/Voronoi.js";
import {dbscan} from "../assets/Dbscan.js"
import {k_means} from "../assets/k-means.js"
import threejs from './threejs.vue'
import { h } from "vue";
import { ElNotification } from "element-plus";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import slope from './slope.vue'
import * as turf from '@turf/turf';

const input = ref(0);
// epsilon.value = input.value;
// console.log(epsilon.value)
// watchEffect(() => {
//   chouXi();
// });
const cx = () =>{
  chouXi();
}
onMounted(() => {
  initMap();
//   watch(input, (newVal, oldVal) => {
//   // console.log(newVal, oldVal)
//   epsilon.value = input.value;
//   console.log(epsilon.value)
// })
});
const slopeShow = ref(false);
const shiftShow = () =>{
  slopeShow.value = !slopeShow.value;

}
</script>

<style scoped>
#mapContain {
  height: 100vh;
  width: 100vw;
}

* {
  margin: 0px;
  padding: 0px;
}

.el-button {
  width: 100px;
  height: 30px;
  position: absolute;

  top: 20px;
  z-index: 1001;
}
</style>
