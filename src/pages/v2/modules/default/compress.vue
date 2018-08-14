<template>
  <div>
    <input id="file" type="file" @change="onFileChange">
    <div>
      <img id="img">
    </div>
  </div>
</template>

<script>
import imageResizeTool from "../../components/compressPic";

export default {
  data() {
    return {
      a: 1
    }
  },
  methods: {
    onFileChange(e) {
      var file = e.target.files[0];
      console.log(file);
      this.compressPicture(file, function(p) {
        console.log(p);
      })
    },
    compressPicture: function (file, callback) {
      var vm = this;
      function getBinarySendData(sData) {
        var nBytes = sData.length,
          ui8Data = new Uint8Array(nBytes);
        for (var nIdx = 0; nIdx < nBytes; nIdx++) {
          /* eslint no-bitwise: 0 */
          ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
        }
        return (ui8Data);
      }
      var reader = new FileReader();

      reader.onloadstart = function () {
        console.log("onloadstart");
      }

      reader.onprogress = function (p) {
        console.log("onprogress");
      }

      reader.onload = function () {
        console.log("load complete");
      }

      reader.onloadend = function () {
        if (reader.error) {
          console.log('上传图片错误，请重试');
          console.log(reader.error);
        } else {
          // console.log(reader.result);
          console.log(reader.result.length, reader.result.byteLength);
          // var data = getBinarySendData(reader.result);
          var data = reader.result;
          document.getElementById('img').src = data;
          // callback(data);
        }
      }
      // imageResizeTool.fileResizetoBase64(file, 1, function (dataUrl) {
      //   // reader.readAsDataURL(file);
      //   callback(dataUrl);
      // })
      imageResizeTool.fileResizetoFile(file, 0.9, function (file) {
        reader.readAsDataURL(file);
      })
    },
  }
}
</script>

<style scoped>
</style>
