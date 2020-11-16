<template>
  <div id="app">
    <header :style="hideHeader ? 'top:-30%' : 'top:0'" class="header">
      <button class="header__logo" @click="$router.push('/').catch(() => {})">
        <img src="@/assets/logo.svg" alt />
      </button>
      <transition name="nav" mode="out-in" class="header__action">
        <AddElem create="todo" v-if="$route.path == '/'" />
        <ToDoElemButtons v-else />
      </transition>
    </header>
    <main>
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </main>
    <transition name="dialogAnimation">
      <Dialog v-if="dialog.active" :msg="dialog.msg" />
    </transition>
    <Decorations />
    <Decorations />
    <Decorations />
    <Decorations />
    <Decorations />
  </div>
</template>
<script>
import Dialog from "@/components/Dialog.vue";
import AddElem from "@/components/AddElem.vue";
import ToDoElemButtons from "@/components/ToDoElemButtons.vue";
import Decorations from "@/components/Decorations.vue";
const DEFAULT_TRANSITION = "fade";
export default {
  components: {
    Dialog,
    AddElem,
    ToDoElemButtons,
    Decorations
  },
  data() {
    return {
      transitionName: DEFAULT_TRANSITION,
      hideHeader: false
    };
  },
  methods: {
    handleScroll(event) {
      if (event.target.scrollTop > 50) {
        if (!this.hideHeader) {
          this.hideHeader = true;
        }
      } else {
        if (this.hideHeader) {
          this.hideHeader = false;
        }
      }
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    }
  },
  mounted() {
    if (this.$route.path === "/") {
      document
        .getElementsByTagName("main")[0]
        .addEventListener("scroll", this.handleScroll);
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
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
    },
    "$route.path"(r) {
      let main = document.getElementsByTagName("main")[0];
      if (r === "/") {
        main.addEventListener("scroll", this.handleScroll);
        setTimeout(() => {
          main.scrollTo(0, 0);
        }, 500);
      } else {
        main.removeEventListener("scroll", this.handleScroll);
        this.hideHeader = false;
        setTimeout(() => {
          main.scrollTo(0, 0);
        }, 500);
      }
    }
  }
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css";
</style>
