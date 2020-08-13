<template>
  <!-- <transition name="slide-r"> -->
  <div class="content">
    <div v-if="modify">
      <div class="onBlack">
        <textarea ref="text" :value="toDoElemView.title" />
        <div class="onBlack-actions">
          <button class="btn-primary btn-icon" @click="modify = false">
            <i class="fas fa-times"></i>
          </button>
          <button class="btn-succes btn-icon" @click="modifyName()">
            <i class="fas fa-check"></i>
          </button>
          <transition name="msg">
            <div class="msg" v-if="errorMsg">
              <p>
                <i class="fas fa-exclamation"></i>
                {{ errorMsg }}
              </p>
            </div>
            <!-- /.msg -->
          </transition>
        </div>
        <!-- .onBlack-action -->
      </div>
      <!-- .onBlack -->
      <div class="modal"></div>
    </div>
    <h3 v-else @mouseenter="modifyIcon = true" @mouseleave="modifyIcon = false">
      {{ toDoElemView.title }}
      <i v-if="modifyIcon" @click="modify = true" class="fas fa-pen"></i>
    </h3>
    <AddElem create="task" />
    <ul class="task-list">
      <TaskListElem
        v-for="(element, index) in toDoElemView.list"
        :key="index"
        :complite="element.complite"
        :text="element.text"
        :index="index"
      />
    </ul>
    <!-- poprawyty -->
    <button class="btn-back" @click="back()" @keyup.escape="back()">
      <i class="fas fa-chevron-left"></i>
    </button>
  </div>
  <!-- </transition> -->
</template>

<script>
import TaskListElem from "@/components/TaskListElem.vue";
import AddElem from "@/components/AddElem.vue";

export default {
  data() {
    return {
      modifyIcon: false,
      modify: false,
      errorMsg: false
    };
  },
  components: {
    TaskListElem,
    AddElem
  },
  computed: {
    toDoElemView() {
      return this.$store.state.toDoElemView;
    }
  },
  methods: {
    modifyName() {
      if (this.$refs.text.value) {
        if (this.$store.getters.uniqueTitle(this.$refs.text.value)) {
          this.$store.commit("CHANE_NAME", this.$refs.text.value);
          this.modify = false;
        } else this.errorMsg = "Name is exist";
      } else this.errorMsg = "Please enter something";
      if (this.errorMsg) {
        setTimeout(() => {
          this.errorMsg = null;
        }, 1000);
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  watch: {
    toDoElemView: {
      handler(val) {
        this.$store.commit("EMMIT_HISTORY", val);
      },
      deep: true
    }
  },
  mounted() {
    this.$store.commit("SET_TODO_ELEM_VIEW");
  },
  created() {
    const thisComponent = this;
    document.addEventListener("keydown", logKey);
    document.addEventListener("touchmove", myScript);
    function logKey(e) {
      // console.log(e);
      if (e.key === "Escape") {
        thisComponent.back();
      }
    }
    function myScript(e) {
      console.log(e);
    }
  },
  destroyed() {
    this.$store.commit("CLEAR_TODO_ELEM_VIEW");
    this.$store.commit("CLEAR_HISTORY");
  }
};
</script>
