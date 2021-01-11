<template>
  <div
    class="fretboard pt-5"
    :class="{
      rotate: rotate,
      'pb-5': !options || !options.slimBottom,
      'pb-3': options && options.slimBottom
    }"
  >
    <div
      v-if="options && options.tuning"
      class="container"
      :class="{ 'mx-0': rotate }"
    >
      <div
        class="row fret-numbers"
        :class="{
          'justify-content-center': !rotate || !isSmallScreen,
          'justify-content-start': rotate && isSmallScreen
        }"
      >
        <div
          ref="rotateButton"
          class="rotate-button"
          :class="{ 'rotate-button-selected': rotate }"
          @click="rotate = !rotate"
          @mouseover="rotateButtonHover(true)"
          @mouseleave="rotateButtonHover(false)"
        >
          <font-awesome-icon
            class="rotate-button-icon"
            icon="sync"
          ></font-awesome-icon>
        </div>
        <div class="fret-number pr-0" :style="{ width: fretWidth(0) + 'px' }">
          <div class="m-auto">0</div>
        </div>
        <div class="nut-container">.</div>
        <div
          v-for="fret in numFrets"
          :key="fret"
          :style="{ width: fretWidth(fret) + 'px' }"
          class="fret-number"
          :class="{ 'first-fret': fret === 1 }"
        >
          <div class="mx-auto">{{ fret }}</div>
        </div>
      </div>
      <div
        class="row string-row"
        :class="{
          'justify-content-center': !rotate || !isSmallScreen,
          'justify-content-start': rotate && isSmallScreen
        }"
        v-for="(note, i) in options.tuning.notes.slice().reverse()"
        :key="i"
      >
        <!-- Open notes -->
        <div class="px-1 note-name">
          {{ note.name }}
        </div>
        <FretNote
          :mark="noteInScale(note, 0)"
          :highlight="highlightFretNote(note, 0)"
          :selected="fretSelected(i, 0)"
          :string="i"
          :fret="0"
          :text="fretText(note, 0)"
          :width="fretWidth(0)"
          @clicked="fretClicked"
        />
        <div class="row nut-container">
          <div class="nut top-nut" :class="{ 'first-nut': i === 0 }">.</div>
          <div
            class="nut bottom-nut"
            :class="{ 'last-nut': i === options.tuning.notes.length - 1 }"
          >
            .
          </div>
        </div>

        <!-- Fret notes -->
        <FretNote
          v-for="fret in numFrets"
          :key="fret"
          :mark="noteInScale(note, fret)"
          :highlight="highlightFretNote(note, fret)"
          :selected="fretSelected(i, fret)"
          :string="i"
          :fret="fret"
          :text="fretText(note, fret)"
          :width="fretWidth(fret)"
          :class="{ 'first-fret': fret === 1 }"
          @clicked="fretClicked"
        />
      </div>
    </div>
  </div>
</template>
<script>
import NoteService from "@/services/NoteService";
import ScaleService from "@/services/ScaleService";
import SpacingService from "@/services/SpacingService";
import FretNote from "./FretNote";
export default {
  components: {
    FretNote
  },
  props: {
    options: { type: Object, default: () => null },
    highlightedNote: { type: Object, default: () => null },
    frets: { type: Number, default: 24 },
    defaultFretWidth: { type: Number, default: 46 },
    selectedFrets: { type: Array, default: () => null }
  },
  data() {
    return {
      notesInScale: [],
      rotate: false,
      windowWidth: window.innerWidth
    };
  },
  methods: {
    noteInScale(stringNote, fret) {
      if (!this.options || !this.options.scale || !this.options.rootNote)
        return false;
      const fretNote = NoteService.getNote(stringNote.value + fret);
      if (!fretNote) return false;
      return (
        this.notesInScale.find(n => n.value === fretNote.value) !== undefined
      );
    },
    fretText(stringNote, fret) {
      if (!this.options || !this.options.textMode || !stringNote) return "";
      const note = NoteService.getNote(stringNote.value + fret);
      if (!note) return "";
      switch (this.options.textMode) {
        case "Name":
          return note.name;
        case "Number":
          return this.notesInScale.findIndex(n => n.value === note.value) + 1;
        default:
          return "";
      }
    },
    highlightFretNote(stringNote, fret) {
      if (
        !this.options ||
        !this.options.scale ||
        this.options.scale.notes ||
        !this.notesInScale
      )
        return false;
      const fretNote = NoteService.getNote(stringNote.value + fret);
      if (!fretNote) return false;
      const value = this.highlightedNote
        ? this.highlightedNote.value
        : this.notesInScale[0].value;
      return fretNote.value === value;
    },
    fretSelected(string, fret) {
      return (
        this.selectedFrets &&
        this.selectedFrets.findIndex(
          f => f.string === string && f.fret === fret
        ) > -1
      );
    },
    fretWidth(fret) {
      if (fret === 0) return this.defaultFretWidth + 10;
      let result = this.defaultFretWidth * 32 * SpacingService.getSpacing(fret);
      return result;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 556) this.rotate = true;
    },
    rotateButtonHover(hover) {
      const buttonClasses = this.$refs.rotateButton.classList;
      if (hover) buttonClasses.add("rotate-button-hover");
      else buttonClasses.remove("rotate-button-hover");
    },
    fretClicked(string, fret) {
      this.$emit("fretClicked", string, fret);
    }
  },
  computed: {
    tuningNotes() {
      return this.options && this.options.tuning
        ? this.options.tuning.notes
        : [];
    },
    numFrets() {
      return !this.rotate && this.isSmallScreen ? 12 : this.frets;
    },
    isSmallScreen() {
      return this.windowWidth < 992;
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        this.notesInScale =
          val && val.scale && val.rootNote
            ? ScaleService.getNotesInScale(val.scale, val.rootNote)
            : [];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  }
};
</script>
<style lang="scss" scoped>
.rotate {
  -webkit-transform: translateY(-100%) rotate(90deg);
  transform: translateY(-100%) rotate(90deg);
  -webkit-transform-origin: left bottom;
  transform-origin: left bottom;
}
.rotate-button {
  padding: 4px;
  border-radius: 5px;
  min-width: 30px !important;
  height: 30px;
  width: 30px;
  background-color: $darkColor;
}
.rotate-button-selected {
  background-color: $highlightColor;
}
.rotate-button-hover {
  background-color: $highlightColor2;
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
