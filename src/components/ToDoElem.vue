<template>
  <div class="card">
    <div class="card-title">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-text">
      <ul v-if="list.length">
        <TaskListElem
          v-for="(element, index) in list.slice(0, 4)"
          :key="index"
          :complite="element.complite"
          :text="element.text"
          :index="index"
          :disableChanges="true"
        />
        <li v-if="list[4]" class="circles">
          <div></div>
          <div></div>
          <div></div>
        </li>
      </ul>
      <h3 v-else>ToDo list is empty</h3>
    </div>
    <div class="card-actions">
      <button class="btn-warning btn-icon" @click="deleteToDoElem()">
        <i class="fas fa-minus-square"></i>
      </button>
      <button class="btn-primary" @click="openToDoElem()">
        open <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import TaskListElem from "@/components/TaskListElem.vue";

export default {
  components: {
    TaskListElem
  },
  props: {
    title: String,
    list: Array,
    index: Number
  },
  methods: {
    deleteToDoElem() {
      this.$store
        .dispatch("dialog", "Delete note?")
        .then(res =>
          res ? this.$store.commit("DELETE_TODO_ELEMENT", this.index) : ""
        );
    },
    openToDoElem() {
      this.$router.push(this.title);
    }
  }
};
</script>

<style lang="scss" scoped>
.circles {
  width: 70px;
  padding: 5px;
  display: flex;
  margin-top: 0.5vh;
  margin-left: 1vh;
  justify-content: space-between;
  div {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.55),
      -3px -3px 5px 0px rgba(255, 255, 255, 0.55);
  }
}
</style>
