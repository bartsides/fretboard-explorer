<template>
  <div class="tab-sheet m-5">
    <div v-if="tuning" class="d-flex flex-row flex-wrap">
      <div class="tuning-notes d-flex flex-column my-3">
        <div
          class="tab-string-note d-flex flex-column justify-content-center"
          v-for="(note, i) in tuning.notes.slice().reverse()"
          :key="i"
        >
          <!-- String notes -->
          <div class="px-1 note-name">
            {{ note.name }}
          </div>
        </div>
      </div>

      <TabSection
        class="my-3"
        v-for="(section, s) in sections"
        :key="s"
        :tuning="tuning"
        :numNotes="sectionWidth"
        :selections="selections"
        :offset="s * sectionWidth"
        @input="(x, y, text) => input(x, y, text)"
      />
    </div>
  </div>
</template>
<script>
import TabSection from "./TabSection";
export default {
  components: {
    TabSection
  },
  props: {
    tuning: { type: Object, default: () => null },
    selections: { type: Array, default: () => [] }
  },
  data() {
    return {
      lineWidth: 2,
      sectionWidth: 12,
      sections: 0
    };
  },
  methods: {
    input(x, y, text) {
      if (x >= (this.sections - 2) * this.sectionWidth) {
        // add more sections
        this.sections += 2;
      }
      let selections = this.selections.slice();
      const match = selections.find(s => s.x === x && s.y === y);
      if (!match) {
        selections.push({ x: x, y: y, text: text });
        this.selectionsChanged(selections);
        return;
      }
      if (text) {
        match.text = text;
        this.selectionsChanged(selections);
      } else {
        selections = selections.filter(
          s =>
            (s.x !== x && s.y !== y) ||
            (s.x === x && s.y !== y) ||
            (s.x !== x && s.y === y)
        );
        this.selectionsChanged(selections);
      }
    },
    selectionsChanged(selections) {
      this.$emit("selectionsChanged", selections);
    },
    async loadSelections() {
      // wait until selections are loaded
      async () => {
        while (!this.selections || !this.selections.length) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      };

      var max = 0;
      var len = this.selections.length;
      while (len--) {
        if (this.selections[len].x > max) max = this.selections[len].x;
      }

      var lines = Math.ceil(max / (this.sectionWidth * this.lineWidth));
      lines += 2;
      this.sections = lines * this.lineWidth;
      if (this.sections < 4) this.sections = 4;
    }
  },
  computed: {
    tuningNotes() {
      return this.tuning ? this.tuning.notes : [];
    },
    defaultSections() {
      return this.lineWidth * 4;
    }
  },
  mounted() {
    // default 4 lines
    this.sections = this.defaultSections;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  }
};
</script>
<style lang="scss" scoped>
.tuning-notes {
  margin-left: -30px;
}
.string-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 40px;
}
.fret-numbers {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 24px;
}
.fret-number {
  display: flex;
  position: relative;
  min-width: 29.4327px;
  padding-right: 4px;
  font: 16px "Roboto Condensed", sans-serif;
}
.nut-container {
  height: 100%;
  width: $nutWidth;
  min-width: $nutWidth;
  margin-left: -4px;
  margin-right: 0px;
  color: $backgroundColor;
}
.nut {
  height: 50%;
  min-height: 50%;
  border-right: $nutWidth solid $darkColor;
  z-index: 1;
  margin-left: -1px;
  margin-right: -1px;
}
.top-nut {
  border-radius: 6px 0px;
}
.bottom-nut {
  border-radius: 0px 6px;
}
.first-nut {
  border-radius: 6px;
}
.last-nut {
  border-radius: 6px;
}
.invis-text {
  color: $backgroundColor;
}
.note-name {
  width: 30px;
  min-width: 30px;
  text-align: left;
}
</style>
