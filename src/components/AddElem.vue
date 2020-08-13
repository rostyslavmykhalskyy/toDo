<template>
  <div class="createCard" :class="{ white: create === 'task' }">
    <input
      ref="text"
      @keydown.enter="buttonFocus()"
      :placeholder="placeholder[create]"
      type="text"
      @focus="focus = true"
      @focusout="focus = false"
    />
    <button
      class="btn-icon"
      @click="createElem()"
      ref="btn"
      @keyup.enter="createElem()"
    >
      <i class="fas fa-plus" :class="{ focus: focus }"></i>
    </button>
    <transition name="msg">
      <div class="msg" v-if="errorMsg">
        <p>
          <i class="fas fa-exclamation"></i>
          {{ errorMsg }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    create: String
  },
  data() {
    return {
      errorMsg: null,
      placeholder: { todo: "Create new note..", task: "Create new task.." },
      focus: false
    };
  },
  methods: {
    createElem() {
      this.$refs.text.focus();
      if (this.$refs.text.value) {
        switch (this.create) {
          case "todo": {
            if (this.$store.getters.uniqueTitle(this.$refs.text.value)) {
              this.$store.commit("ADD_TODO_ELEMENT", this.$refs.text.value);
              this.$refs.text.value = "";
            } else this.errorMsg = "Name is exist";
            break;
          }
          case "task": {
            this.$store.commit("ADD_TASK_ELEMENT", this.$refs.text.value);
            this.$refs.text.value = "";

            break;
          }
          default:
            break;
        }
      } else {
        this.errorMsg = "Please enter something";
      }
      if (this.errorMsg) {
        setTimeout(() => {
          this.errorMsg = null;
        }, 1000);
      }
    },
    buttonFocus() {
      this.$refs.btn.focus();
    }
  }
};
</script>

<style></style>
