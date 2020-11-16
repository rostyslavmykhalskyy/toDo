<template>
  <div class="content">
    <AddElem create="task" class="marginCenter" />
    <div class="row">
      <div class="col sticky">
        <transition name="nav" mode="out-in">
          <div v-if="modify" :key="modify" class="card text-center cardDense">
            <h2 class="card__title">
              General info
            </h2>
            <div class="card__text">
              <div>
                <input
                  type="text"
                  ref="taskName"
                  :value="toDoElemView.title"
                  placeholder="Task name"
                />
                <transition name="msg">
                  <div class="msg" v-if="errorMsg">
                    <p>
                      <i class="fas fa-exclamation"></i>
                      {{ errorMsg }}
                    </p>
                  </div>
                </transition>
              </div>
              <div>
                <h3>Created:</h3>
                <p>{{ createdDate.toString() }}</p>
              </div>
              <div>
                <h3>Due date:</h3>
                <div class="date" @keyup.capture="updateValue">
                  <input
                    v-model="dueDate.day"
                    class="date__input"
                    type="number"
                    placeholder="dd"
                    @input="updateDay"
                    @blur="dueDate.day = dueDate.day.toString().padStart(2, 0)"
                    ref="day"
                  />
                  <span class="date__divider">/</span>
                  <input
                    v-model="dueDate.month"
                    class="date__input"
                    type="number"
                    placeholder="mm"
                    @input="updateMonth"
                    @blur="
                      dueDate.month = dueDate.month.toString().padStart(2, 0)
                    "
                    ref="month"
                  />
                  <span class="date__divider">/</span>
                  <input
                    v-model="dueDate.year"
                    class="date__input"
                    type="number"
                    placeholder="yyyy"
                    ref="year"
                    @input="updateYear"
                  />
                  <span class="date__divider"> </span>
                  <input
                    v-model="dueDate.hour"
                    class="date__input"
                    type="number"
                    placeholder="hh"
                    ref="hour"
                    @input="updateHour"
                    @blur="
                      dueDate.hour = dueDate.hour.toString().padStart(2, 0)
                    "
                  />
                  <span class="date__divider">:</span>
                  <input
                    v-model="dueDate.minute"
                    class="date__input"
                    type="number"
                    placeholder="mm"
                    ref="minute"
                    @blur="
                      dueDate.minute = dueDate.minute.toString().padStart(2, 0)
                    "
                  />
                  <transition name="msg">
                    <div class="msg" v-if="errorDateMsg">
                      <p>
                        <i class="fas fa-exclamation"></i>
                        {{ errorDateMsg }}
                      </p>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <div class="card__actions jc-sp">
              <button @click="cancelModify()">Cancel</button>
              <button @click="saveGeneralInfo()" class="btn-primary">
                Save
              </button>
            </div>
          </div>
          <div v-else class="card text-center cardDense">
            <h2 class="card__title">
              General info
            </h2>
            <div class="card__text">
              <div>
                <h3>Task name:</h3>
                <p>{{ toDoElemView.title }}</p>
              </div>
              <div>
                <h3>Created:</h3>
                <p>
                  {{ createdDate.toString() }}
                </p>
              </div>
              <div>
                <h3>Due date:</h3>
                <p>{{ this.dueDate.toString() }}</p>
              </div>
            </div>
            <div class="card__actions jc-sp">
              <button @click="del()">Delete</button>
              <button @click="activeModify()" class="btn-primary">Edit</button>
            </div>
          </div>
        </transition>
      </div>
      <div class="col col-z-2">
        <ul class="task-list">
          <TaskListElem
            v-for="(element, index) in toDoElemView.list"
            :key="index"
            :complete="element.complete"
            :text="element.text"
            :index="index"
          />
        </ul>
      </div>
      <div class="col sticky">
        <h2>
          Time left:<br />
          {{ timer }}
        </h2>
        <ProgressFillRing :progress="progressPercent" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskListElem from "@/components/TaskListElem.vue";
import AddElem from "@/components/AddElem.vue";
import ProgressFillRing from "@/components/ProgressFillRing.vue";

export default {
  data() {
    return {
      modifyIcon: false,
      modify: false,
      errorMsg: false,
      errorDateMsg: false,
      timer: "N/A",
      interval: null,
      dueDate: {
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        second: "",
        generateTimestamp: function() {
          return new Date(
            this.year,
            this.month - 1,
            this.day,
            this.hour,
            this.minute,
            this.second
          ).getTime();
        },
        toString: function() {
          return `${this.day}/${this.month}/${this.year} ${this.hour}:${this.minute}:${this.second}`;
        }
      },
      createdDate: {
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        second: "",
        toString: function() {
          return `${this.day}/${this.month}/${this.year} ${this.hour}:${this.minute}:${this.second}`;
        }
      }
    };
  },
  components: {
    TaskListElem,
    AddElem,
    ProgressFillRing
  },
  computed: {
    toDoElemView() {
      return this.$store.state.toDoElemView;
    },
    progressPercent() {
      let completed = 0;
      let percent = 0;
      this.toDoElemView.list.forEach(element =>
        element.complete ? completed++ : ""
      );
      percent = (completed / this.toDoElemView.list.length) * 100;
      if (percent) {
        return parseFloat(percent.toFixed(1));
      } else return 0;
    }
  },
  methods: {
    modifyName() {
      if (this.$refs.taskName.value) {
        if (this.$store.getters.uniqueTitle(this.$refs.taskName.value)) {
          this.$store.commit("CHANE_NAME", this.$refs.taskName.value);
        } else this.errorMsg = "Name is exist";
      } else this.errorMsg = "Please enter something";
      if (this.errorMsg) {
        setTimeout(() => {
          this.errorMsg = null;
        }, 1000);
      }
    },
    modifyDeadline() {
      if (Date.now() > this.dueDate.generateTimestamp()) {
        this.errorDateMsg = "Wrong date";
        setTimeout(() => {
          this.errorDateMsg = null;
        }, 1000);
      } else {
        this.$store.commit("CHANE_DEADLINE", this.dueDate.generateTimestamp());
        this.timerStart();
      }
    },
    activeModify() {
      if (this.dueDate.toString() === "N/A") {
        this.dueDate = { ...this.dueDate, ...this.createdDate };
      }
      this.modify = true;
    },
    saveGeneralInfo() {
      if (this.$refs.taskName.value !== this.$router.currentRoute.params.id) {
        this.modifyName();
      }
      if (this.dueDate.generateTimestamp() !== this.toDoElemView.deadline) {
        this.modifyDeadline();
      }
      if (!this.errorMsg && !this.errorDateMsg) {
        this.modify = false;
      }
    },
    cancelModify() {
      this.modify = false;
      this.parseTimestamp(this.dueDate, this.toDoElemView.deadline);
    },
    updateDay() {
      if (this.dueDate.day.length < 2) return;
      else this.$refs.month.select();
    },
    updateMonth() {
      if (this.dueDate.month.length < 2) return;
      else this.$refs.year.select();
    },
    updateYear() {
      if (this.dueDate.year.length < 4) return;
      else this.$refs.hour.select();
    },
    updateHour() {
      if (this.dueDate.hour.length < 2) return;
      else this.$refs.minute.select();
    },
    updateValue() {
      const timestamp = Date.parse(
        `${this.dueDate.year.toString().padStart(4, 0)}-${this.dueDate.month}-${
          this.dueDate.day
        }`
      );
      if (Number.isNaN(timestamp)) return;
      this.$emit("input", timestamp);
    },
    del() {
      this.$store
        .dispatch("dialog", "Delete note?")
        .then(res => (res ? this.$store.dispatch("del") : ""));
    },
    timerStart() {
      if (this.toDoElemView.deadline !== "N/A") {
        this.interval = setInterval(() => {
          let now = new Date().getTime();
          // Find the distance between now and the count down date
          let distance = this.toDoElemView.deadline - now;
          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          this.timer = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          if (distance <= 0) {
            this.timer = "0d 0h 0m 0s";
            clearInterval(this.interval);
          }
        }, 1000);
      }
    },
    parseTimestamp(toObject, fromTimestamp) {
      if (fromTimestamp !== "N/A") {
        [toObject.day, toObject.month, toObject.year] = new Date(fromTimestamp)
          .toLocaleDateString()
          .split(".");
        [toObject.hour, toObject.minute, toObject.second] = new Date(
          fromTimestamp
        )
          .toLocaleTimeString()
          .split(":");
      } else {
        toObject.toString = () => {
          return "N/A";
        };
      }
    }
  },
  watch: {
    toDoElemView: {
      handler(val) {
        this.$store.commit("EMMIT_HISTORY", val);
      },
      deep: true
    },
    "dueDate.year"(current, prev) {
      if (current > 9999 || current.length > 4) this.dueDate.year = prev;
      if (current < 1) this.dueDate.year = 2100;
    },
    "dueDate.month"(current) {
      if (current > 12 || current.length > 2) this.dueDate.month = "01";
      if (current < 1) this.dueDate.month = 12;
    },
    "dueDate.day"(current) {
      if (current > 31 || current.length > 2) this.dueDate.day = "01";
      if (current < 1) this.dueDate.day = 31;
    },
    "dueDate.hour"(current) {
      if (current > 23 || current.length > 2) this.dueDate.hour = "00";
      if (current < 0) this.dueDate.hour = 23;
    },
    "dueDate.minute"(current) {
      if (current > 59 || current.length > 2) this.dueDate.minute = "00";
      if (current < 0) this.dueDate.minute = 59;
    }
  },
  mounted() {
    this.$store.commit("CLEAR_HISTORY");
    this.$store.commit("SET_TODO_ELEM_VIEW");
    this.parseTimestamp(this.createdDate, this.toDoElemView.dateStamp);
    this.parseTimestamp(this.dueDate, this.toDoElemView.deadline);
    this.timerStart();
    window.addEventListener("beforeunload", () => {
      this.$store.commit("SAVE_TODO_ELEMENT");
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.$store.commit("SAVE_TODO_ELEMENT");
  },
  destroyed() {
    this.$store.commit("CLEAR_TODO_ELEM_VIEW");
  }
};
</script>
<style scoped>
.card__text {
  margin-top: 20px;
}
</style>
