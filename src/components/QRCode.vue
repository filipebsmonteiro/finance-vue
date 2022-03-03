<template>
  <div>
    <img
      v-if="!hideLogo"
      id="logo"
      src="~assets/logo_320.png"
      alt="Logomarca Veus"
    />
    <canvas id="canvas" :width="this.size" :height="this.size" />
    <img id="qrcode" src="" alt="QR Code" />
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "QRCode",
  props: {
    info: [String, Number],
    size: {
      type: String,
      default: "220",
    },
    hideLogo: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    insertAfter(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
  },
  mounted() {
    const canvas = document.getElementById("canvas");

    if (!this.hideLogo) {
      const imgDim = {
        width: 45,
        height: 45,
      };
      const context = canvas.getContext("2d");
      const logo = document.getElementById("logo");
      let imageObj = new Image();
      imageObj.src = logo.getAttribute("src");

      imageObj.onload = function () {
        context.drawImage(
          imageObj,
          canvas.width / 2 - imgDim.width / 2,
          canvas.height / 2 - imgDim.height / 2,
          imgDim.width,
          imgDim.height
        );
      };
    }

    const data = this.info;
    QRCode.toCanvas(
      canvas,
      data,
      {
        width: this.size,
      },
      function (error) {
        if (error) console.error(error);
      }
    );

    canvas.setAttribute("style", "display:none;");
    const dataURL = canvas.toDataURL("image/jpeg");
    const qrcode = document.getElementById("qrcode");
    qrcode.removeAttribute("class");
    qrcode.setAttribute("src", dataURL);
  },
};
</script>

<style scoped>
#logo {
  position: absolute;
  width: 50px;
  margin-top: calc(50% - 40px);
  margin-left: calc(50% - 40px);
}
</style>
