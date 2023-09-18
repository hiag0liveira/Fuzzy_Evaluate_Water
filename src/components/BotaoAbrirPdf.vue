<script setup></script>

<template>
  <div class="buttons">
    <a href="https://drive.google.com/file/d/1w23k8zsQQu_Ksv4OGj0xTWacyQdEck24/view" target="_blank">
      <button class="blob-btn">
        <div class="central">
          <img src="../../public/icon.png" alt="icon_PDF" id="icon_pdf">
          <p class="textoCentral"> Visualizar PDF</p>
        </div>
        <span class="blob-btn__inner">
          <span class="blob-btn__blobs">
            <span class="blob-btn__blob"></span>
            <span class="blob-btn__blob"></span>
            <span class="blob-btn__blob"></span>
            <span class="blob-btn__blob"></span>
          </span>
        </span>
      </button>
    </a>
    <br />

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo">
          </feColorMatrix>
          <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #333;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

.buttons {
  margin-top: 50px;
  text-align: center;
  border-radius: 30px;
}

.blob-btn {
  z-index: 1;
  position: relative;
  padding: 20px 46px;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  color: #0505A9;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 0.5s;
  cursor: pointer;
  border-radius: 30px;
}

.blob-btn:before {
  content: "";
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #0505A9;
  border-radius: 30px;
}

.blob-btn:after {
  content: "";
  z-index: -2;
  position: absolute;
  left: 3px;
  top: 3px;
  width: 100%;
  height: 100%;
  transition: all 0.3s 0.2s;
  border-radius: 30px;
}

.blob-btn:hover {
  color: #FFFFFF;
  border-radius: 30px;
}

.blob-btn:hover:after {
  transition: all 0.3s;
  left: 0;
  top: 0;
  border-radius: 30px;
}

.blob-btn__inner {
  z-index: -1;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: #ffffff;
}

.blob-btn__blobs {
  position: relative;
  display: block;
  height: 100%;
  filter: url('#goo');
}

.blob-btn__blob {
  position: absolute;
  top: 2px;
  width: 25%;
  height: 100%;
  background: #0505A9;
  border-radius: 100%;
  transform: translate3d(0, 150%, 0) scale(1.7);
  transition: transform 0.45s;
}

@supports (filter: url('#goo')) {
  .blob-btn__blob {
    transform: translate3d(0, 150%, 0) scale(1.4);
  }
}

.blob-btn__blob:nth-child(1) {
  left: 0%;
  transition-delay: 0s;
}

.blob-btn__blob:nth-child(2) {
  left: 30%;
  transition-delay: 0.08s;
}

.blob-btn__blob:nth-child(3) {
  left: 60%;
  transition-delay: 0.16s;
}

.blob-btn__blob:nth-child(4) {
  left: 90%;
  transition-delay: 0.24s;
}

.blob-btn:hover .blob-btn__blob {
  transform: translateZ(0) scale(1.7);
}

@supports (filter: url('#goo')) {
  .blob-btn:hover .blob-btn__blob {
    transform: translateZ(0) scale(1.4);
  }
}

#icon_pdf {
  width: 30px;
  height: 30px;
}

.central {
  display: flex;
  justify-content: center;
}

.textoCentral {
  margin-top: 4px;
}
</style>
