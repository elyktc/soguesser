<template>
  <div id="app">
    <h1>Stack Overflow Guesser</h1>
    <p class="subheader">
      Click on a question to view its answers, then click on one of its answers
      to guess which one is the accepted answer.
    </p>
    <QuestionVue
      v-for="question of questions"
      :key="question.question_id"
      :id="question.question_id"
      :title="question.title"
      :body="question.body"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuestionVue from "./components/Question.vue";
import client, { Question } from "./stackexchange-client";

@Component({
  components: {
    QuestionVue,
  },
})
export default class App extends Vue {
  questions: Question[] = [];

  async created() {
    this.questions = await client.getRecentQuestions();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 30px 0;
}

.subheader {
  margin-bottom: 60px;
}

.margin {
  margin: 30px;
}

.clickable {
  cursor: pointer;

  &:hover {
    color: #2c3eff;
  }
}
</style>
