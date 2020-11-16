<template>
  <div class="createCard" :attribute="create">
    <input
      ref="text"
      :placeholder="placeholder[create]"
      type="text"
      :attribute="create"
      @keyup.enter="createElem()"
    />
    <button
      class="btn-icon bg-icon"
      @click="createElem()"
      ref="btn"
      :attribute="create"
    >
      <i class="tickIcon"></i>
    </button>
    <button
      v-if="create === 'todo'"
      class="btn-icon bg-icon"
      @click="createElemAutoname()"
      :attribute="create + '-sm'"
    >
      <i class="tickIcon"></i>
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
      placeholder: { todo: "Create new note", task: "Create new task" }
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
              this.$router.push(this.$refs.text.value);
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
    createElemAutoname() {
      let i = 1;
      while (this.$store.getters.uniqueTitle("Note " + i) === false) {
        i++;
      }
      this.$store.commit("ADD_TODO_ELEMENT", "Note " + i);
      this.$router.push("Note " + i);
    }
  }
};
</script>

<style></style>
