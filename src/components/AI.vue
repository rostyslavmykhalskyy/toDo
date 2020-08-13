<template>
  <div @click="closePopUp()" class="AIblock">
    <div class="AIpopup" :class="{ 'AI-hide-popup': !ai.active }">
      <p>
        {{ ai.msg }}
        <i class="robot fas fa-robot" :class="{ 'robot-off': !ai.active }"></i>
      </p>
    </div>
    <div class="light" :class="{ 'light-off': !ai.active }"></div>
  </div>
</template>

<script>
export default {
  name: "AI",
  // data() {
  //   return {
  //     hide: true
  //   };
  // },
  computed: {
    toDoLength() {
      return this.$store.state.toDoList.length;
    },
    toDoElemListLength() {
      if (!this.$store.state.toDoElemView.title.length) {
        return true;
      } else if (this.$store.state.toDoElemView.list.length) {
        return true;
      } else {
        return false;
      }
    },
    ai() {
      return this.$store.state.ai;
    }
  },
  methods: {
    closePopUp() {
      this.$store.commit("SET_AI_MSG", {
        active: false
      });
    }
  },
  watch: {
    toDoLength(val) {
      if (!val) {
        this.$store.commit("SET_AI_MSG", {
          msg: "Add a new note to get started!",
          active: true
        });
      } else {
        this.closePopUp();
      }
    },
    toDoElemListLength(val) {
      if (!val) {
        this.$store.commit("SET_AI_MSG", {
          msg: "Add a new task to note.",
          active: true
        });
      } else {
        this.closePopUp();
      }
    }
  },
  mounted() {
    if (!this.$store.state.toDoList.length) {
      this.$store.commit("SET_AI_MSG", {
        msg: "Add a new note to get started!",
        active: true
      });
    }
  }
};
</script>

<style lang="scss">
.AIblock {
  cursor: pointer;
}
.AIpopup {
  top: 10vh;
  left: 10%;
  box-sizing: border-box;
  width: 25%;
  padding: 1rem;
  position: absolute;
  transition: all 0.8s ease;
  background-color: #34515e;
  border-radius: 0 0 5px 5px;
  &::after {
    content: "";
    position: absolute;
    display: block;
    bottom: 0vh;
    left: 0;
    width: 100%;
    height: 1rem;
    -webkit-box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.55);
    -moz-box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.55);
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.55);
  }
}
.AI-hide-popup {
  transition: all 2s ease;
  opacity: 0;
  top: -10vh;
}
.light {
  transition: opacity 2s ease;
  top: 10vh;
  left: 10%;
  width: 25%;
  height: 0px;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.55);
  position: absolute;
}
.light-off {
  opacity: 0;
}
.robot {
  animation: pulse 0.6s ease infinite alternate;
  position: absolute;
  right: 10%;
  margin-left: 100%;
  color: #5db85d;
}
.robot-off {
  color: black !important;
}
@keyframes pulse {
  0%,
  100% {
    color: #7ff87f;
  }
  50% {
    color: #5db85d;
  }
}
</style>
