<template>
  <div class="scale-chord-card card">
    <h5 class="card-header">
      <div
        class="fret-icon fret-note-mark mb-1"
        :class="{ 'fret-note-highlight': number === 1 }"
      >
        {{ number }}
      </div>
      <div v-if="notes">{{ notes[0].name }} {{ chord.name }}</div>
      <div v-if="notes && chord" class="text-muted">
        {{ notes[0].name }}<span v-html="chord.abbr" />
      </div>
    </h5>
    <div v-if="notes" class="card-body">
      {{ notes.map(n => n.name).join(" ") }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chord: { type: Object, default: () => null },
    notes: { type: Array, default: () => null },
    number: { type: Number, default: 1 }
  }
};
</script>
<style lang="scss" scoped>
.scale-chord-card {
  width: 220px;
}
</style>
