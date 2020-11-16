<template>
  <div class="circle">
    <div class="circle-bar">
      <h2>
        Done:<br />
        {{ progress }}%
      </h2>
    </div>
    <div class="circle-bar--shadow"></div>

    <div class="circle-progress" :style="progressBar">
      <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div
          class="waveDno"
          :style="progress === 100 ? 'height: 100%' : ''"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: Number
  },
  computed: {
    progressBar() {
      return { transform: `translateY(${100 - this.progress}%)` };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/animations.scss";
@import "../assets/styles/variable.scss";
.circle {
  @extend %insetStaticShadows;
  margin: 3vh auto 0;
  width: 250px;
  height: 250px;
  background-color: #eaebf3;
  border-radius: 150px;
  position: relative;
  overflow: hidden;
}
.circle-bar,
.circle-bar--shadow {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  background-color: #eaebf3;
  justify-content: center;
  z-index: 1;
}
.circle-bar--shadow {
  @extend %staticShadows;
  z-index: 0;
}
.circle-progress {
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.46, 0.03, 0.52, 0.96);
}

.wave {
  top: -23%;
  background: url("../assets/wave.svg") repeat-x;
  position: absolute;
  width: 750px;
  height: 70%;
  background-size: contain;
  animation: wave 4s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.4));
}

.wave:nth-of-type(2) {
  top: -22%;
  animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
    swell 7s ease -1.25s infinite;
  opacity: 1;
}
.waveDno {
  height: 60%;
  width: 100%;
  bottom: 0;
  position: absolute;
  background: #0000 linear-gradient(360deg, $p-color 0%, $p-dark-color 100%) 0%
    0% no-repeat padding-box;
}
@keyframes wave {
  0% {
    margin-left: 5px;
  }
  100% {
    margin-left: -499px;
  }
}

@keyframes swell {
  0%,
  100% {
    transform: translate3d(0, -5px, 0);
  }
  50% {
    transform: translate3d(0, 0px, 0);
  }
}
</style>
