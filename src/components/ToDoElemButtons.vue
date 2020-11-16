<template>
  <div class="buttons">
    <!-- <button class="btn-succes btn-icon" @click="save()">
      <i class="fas fa-save"></i>
    </button> -->
    <button
      class="btn-icon sm-icon"
      :disabled="changeCounter == 0"
      @click="restore()"
    >
      <i class="fas fa-history"></i>
    </button>
    <button
      class="btn-icon sm-icon"
      :disabled="changeCounter == 0"
      @click="undo()"
    >
      <i class="fas fa-undo"></i>
    </button>
    <button
      class="btn-icon sm-icon"
      :disabled="!(changeCounter < historyLength - 1)"
      @click="redo()"
    >
      <i class="fas fa-redo"></i>
    </button>
    <!-- <button class="btn-warning btn-icon" @click="del()">
      <i class="fas fa-trash-alt"></i>
    </button> -->
  </div>
</template>

<script>
export default {
  computed: {
    changeCounter() {
      return this.$store.state.changeCounter;
    },
    historyLength() {
      return this.$store.state.changesHistory.length;
    }
  },
  methods: {
    restore() {
      this.$store.dispatch("dialog", "Restore note?").then(res => {
        if (res) {
          this.$store.commit("SET_TODO_ELEM_VIEW");
          this.$store.commit("CLEAR_HISTORY");
        }
      });
    },
    undo() {
      this.$store.commit("UNDO_TODO_ELEM_VIEW");
    },
    redo() {
      this.$store.commit("REDO_TODO_ELEM_VIEW");
    }
  }
};
</script>

<style></style>
