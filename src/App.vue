<template>
  <div id="app">
    <header>
      <div class="logo" @click="$router.push('/').catch(() => {})">
        <img src="@/assets/logo.png" alt />
      </div>
      <transition name="nav" mode="out-in">
        <AddElem create="todo" v-if="$route.path == '/'" />
        <ToDoElemButtons v-else />
      </transition>
    </header>
    <AI />
    <main>
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </main>
    <transition name="dialogAnimation">
      <Dialog v-if="dialog.active" :msg="dialog.msg" />
    </transition>
  </div>
</template>
<script>
import Dialog from "@/components/Dialog.vue";
import AddElem from "@/components/AddElem.vue";
import ToDoElemButtons from "@/components/ToDoElemButtons.vue";
import AI from "@/components/AI.vue";
const DEFAULT_TRANSITION = "fade";
export default {
  components: {
    Dialog,
    AddElem,
    ToDoElemButtons,
    AI
  },
  data() {
    return {
      transitionName: DEFAULT_TRANSITION
    };
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    }
    // ai() {
    //   return this.$store.state.ai;
    //   // AI->moduleAI()
    // }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
      // console.log(transitionName);
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-r" : "slide-l";
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Some was wrong";
      }
    }
  }
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css";
</style>
