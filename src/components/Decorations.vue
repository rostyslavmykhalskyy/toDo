<template>
  <div
    class="circle"
    :style="{
      width: size + 'px',
      height: size + 'px',
      top: top + '%',
      left: left + '%',
      borderRadius: radius + 'px',
      animationDuration: interval / 1000 + 's'
    }"
  >
    <div
      class="inside-circle"
      :style="{
        width: size2 + '%',
        height: size2 + '%',
        animationDuration: (interval / 2 + interval) / 1000 + 's'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 0,
      size2: 0,
      top: 0,
      left: 0,
      interval: 0
    };
  },
  computed: {
    radius() {
      return this.size / 2;
    }
  },
  created() {
    this.interval = Math.floor(Math.random() * 10000) + 5000;
    setInterval(() => {
      this.top = Math.floor(Math.random() * 81);
      this.left = Math.floor(Math.random() * 81);
      this.size = Math.floor(Math.random() * 501) + 30;
      this.size2 = Math.floor(Math.random() * 91) + 10;
    }, this.interval);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/animations.scss";
.circle {
  @extend %insetStaticShadows;
  position: fixed;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: example infinite;
}
.inside-circle {
  @extend %staticShadows;
  border-radius: 100%;
  animation: example infinite;
  opacity: 1;
}
@keyframes example {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  25% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.25);
  }
  75% {
    transform: scale(0.51);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
