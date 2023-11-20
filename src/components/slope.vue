<template>
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :with-header="false"
    size="55vw"
  >
    <el-button type="primary" style="top: 20px;position: absolute;left: 25vw;" @click="slopeShowP">生成坡度图</el-button>
    <el-button type="primary" style="top: 20px;position: absolute;left: 13vw;" @click="aspectShowP">生成坡向图</el-button>

    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :on-change="handleChange"
      :on-error="handleError"
      accept="image/tiff"
    >
      <el-button type="primary">上传dem</el-button>
     
      <template #tip>
        <div class="el-upload__tip">
          tif/tiff files with a size less than 10mb
        </div>
      </template>
    </el-upload>
    <img :src="imageUrl" alt="" style="width: 550px;height: 550px;float: left;"/>
    <img :src="lengendImageUrl" alt="" style="position: absolute;top: 440px;"/>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref, defineProps, watchEffect, onMounted } from "vue";
import * as UTIF from "utif";
import * as UPNG from "upng";
import 'tiff.js';
import * as GeoTIFF from 'geotiff';
import * as turf from '@turf/turf';
const drawer = ref(false);
const imageUrl = ref(""); // 用于存储图片 URL 的变量
const lengendImageUrl = ref(""); // 用于存储图例 URL 的变量

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});
onMounted(() => {
  watchEffect(() => {
    drawer.value = props.isShow;
  });
  // console.log(props.isShow)
});
import { ElMessage, ElMessageBox } from "element-plus";

import type { UploadProps, UploadUserFile } from "element-plus";

const fileList = ref<UploadUserFile[]>([
  {
    name: "示例.tif",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  // console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  // console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};
const handleUpload = (file) => {
  //把imageUrl.value改成file的路径
  // imageUrl.value = URL.createObjectURL(file.raw);
  // console.log(URL.createObjectURL(file.raw))

  console.log(file.raw);
};
// reader.readAsDataURL(file);
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
//文件上传成功时的钩子
const handleSuccess = (response: any, file: any, fileList: any) => {
  console.log(222);
  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   imageUrl.value = e.target.result;
  // };
  // reader.readAsDataURL(file.raw);
  // ElMessage.success("上传成功");
};
const slopeShowP = () => {
  console.log('坡度');
  setTimeout(() => {
    imageUrl.value = '/podu.png';
    lengendImageUrl.value = '/poduLengend.png';
  }, 1500);

  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   imageUrl.value = e.target.result;
  // };
  // reader.readAsDataURL(file.raw);
  // ElMessage.success("上传成功");
};
const aspectShowP = () => {
  console.log('坡向');
  setTimeout(() => {
    imageUrl.value = '/poxiang.jpg';
    lengendImageUrl.value = '/poxiangLengend.png';
  }, 2000);

};
// async function calculateSlope(tiffUrl) {
//   const response = await fetch(tiffUrl);
//   const arrayBuffer = await response.arrayBuffer();
//   const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
//   const image = await tiff.getImage();
//   const data = await image.readRasters();

//   const width = image.getWidth();
//   const height = image.getHeight();

//   const options = {grid: data, cellSize: 0.1, zProperty: 'elevation'};
//   const slope = turf.rasterSlope(options);

//   return slope;
// }

// calculateSlope('../tif/gebco_2023_sub_ice_n36.0_s30.0_w116.0_e122.0.tif').then(slope => {
//   console.log(slope);
// });
//文件上传失败时的钩子
const handleError = (response: any, file: any, fileList: any) => {
  // calculateSlope(URL.createObjectURL(file.raw))
  const xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  xhr.open("GET", URL.createObjectURL(file.raw));
  xhr.onload = () => {
    const tiff = new Tiff({ buffer: xhr.response });
    const canvas = tiff.toCanvas();
    imageUrl.value = canvas.toDataURL();
  };
  xhr.send();

  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   const arrayBuffer = e.target.result;
  //   const ifds = UTIF.decode(arrayBuffer);
  //   UTIF.parse(arrayBuffer, ifds);
  //   const rgba = UTIF.toRGBA8(ifds[0]);
  //   const png = UPNG.encode([rgba.buffer], ifds[0].width, ifds[0].height, 0);
  //   imageUrl.value = URL.createObjectURL(new Blob([png]));
  // };
  // reader.readAsArrayBuffer(file.raw);
  // imageUrl.value = URL.createObjectURL(file.raw);

  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   imageUrl.value = e.target.result;
  // };
  // reader.readAsDataURL(file.raw);
  // ElMessage.success("上传成功");
};
</script>

<style scoped></style>
