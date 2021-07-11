<template>
  <div class="margin">
    <h3 class="clickable" @click="handleClick">Q: {{ title }}</h3>
    <div v-if="answers.length" class="margin">
      <p v-html="body"></p>
      <p class="answers-header">Answers:</p>
      <AnswerVue
        v-for="answer of answers"
        :key="answer.answer_id"
        :body="answer.body"
        :accepted="answer.is_accepted"
      ></AnswerVue>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AnswerVue from "./Answer.vue";
import client, { Answer } from "../stackexchange-client";

@Component({
  components: {
    AnswerVue,
  },
})
export default class QuestionVue extends Vue {
  @Prop() id!: number;
  @Prop() title!: string;
  @Prop() body!: string;

  answers: Answer[] = [];

  async handleClick() {
    this.answers = await client.getAnswersForQuestion(this.id);
  }
}
</script>
<style lang="scss" scoped>
.answers-header {
  margin: 30px;
  font-weight: bold;
}
</style>
