<template>
  <div class="margin">
    <p v-if="clicked">
      {{ accepted ? "Yes" : "No" }}, this is {{ accepted ? "" : " not " }} the
      accepted answer
    </p>
    <p
      class="clickable text-container answer"
      @click="handleClick"
      v-html="body"
    ></p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AnswerVue extends Vue {
  @Prop() body!: string;
  @Prop() accepted!: boolean;

  clicked = false;

  async handleClick() {
    this.clicked = true;
  }
}
</script>
<style lang="scss" scoped>
.answer {
  padding: 30px;
  border: 1px solid lightgray;
  border-radius: 4px;
  max-height: 400px;
  overflow: auto;

  &:hover {
    border-color: #2c3eff;
  }
}
</style>
