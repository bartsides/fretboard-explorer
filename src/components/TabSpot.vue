<template>
  <div class="tab-spot px-0">
    <input
      class="tab-spot-text"
      v-model="value"
      :class="{ 'tab-spot-has-text': value }"
      maxlength="4"
    />
  </div>
</template>
<script>
export default {
  props: {
    text: { type: String }
  },
  data() {
    return { value: "" };
  },
  watch: {
    text: {
      immediate: true,
      handler(val) {
        this.value = val;
      }
    },
    value(val) {
      this.$emit("input", val);
    }
  }
};
</script>
