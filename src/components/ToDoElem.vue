<template>
  <div class="card">
    <h3 class="card__title">{{ title }}</h3>

    <div class="card__text">
      <ul v-if="list.length">
        <TaskListElem
          v-for="(element, index) in list.slice(0, 3)"
          :key="index"
          :complete="element.complete"
          :text="element.text"
          :index="index"
          :disableChanges="true"
        />
        <li v-if="list[3]" style="text-indent: .7em">
          . . .
        </li>
      </ul>
      <h4 v-else>ToDo list is empty</h4>
    </div>
    <div class="card__actions">
      <button class="btn-icon sm-icon" @click="deleteToDoElem()">
        <i class="delete"></i>
      </button>
      <button class="btn-primary" @click="openToDoElem()">
        open
      </button>
    </div>
    <div class="card__progress">
      <div class="progress">
        <div
          class="progress-bar"
          :style="{ bottom: -(100 - Math.abs(progress)) + '%' }"
        ></div>
      </div>
      <label>{{ progress }}%</label>
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
    progress: Number,
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
