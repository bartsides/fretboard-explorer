<template>
  <div class="chord-diagram pt-1">
    <div v-if="options && options.tuning" class="container px-1">
      <div class="row mx-0">
        <div class="col-1 my-auto px-0">
          <div
            @click="previousDiagram"
            class="diagram-button d-flex justify-content-center align-items-center"
          >
            <font-awesome-icon
              icon="chevron-left"
              :class="{ 'text-muted': diagramIndex < 1 }"
            ></font-awesome-icon>
          </div>
        </div>
        <div class="col">
          <div class="row fret-numbers justify-content-center">
            <div class="fret-number" />
            <div
              class="fret-number pr-0"
              :style="{ width: defaultFretWidth + 'px' }"
              v-if="frets.includes(0)"
            >
              <div class="m-auto">0</div>
            </div>
            <div class="nut-container">.</div>
            <div
              v-for="fret in frets.filter(f => f !== 0)"
              :key="fret"
              :style="{ width: defaultFretWidth + 'px' }"
              class="fret-number"
            >
              <div class="mx-auto">{{ fret }}</div>
            </div>
          </div>
          <div
            class="row string-row justify-content-center"
            v-for="(note, i) in options.tuning.notes.slice().reverse()"
            :key="i"
          >
            <!-- Open notes -->
            <div class="px-1 note-name">
              {{ note.name }}
            </div>
            <FretNote
              v-if="frets.includes(0)"
              :mark="!hideNote(i, 0) && noteInChord(note, 0)"
              :highlight="!hideNote(i, 0) && highlightFretNote(note, 0)"
              :string="i"
              :fret="0"
              :text="fretText(note, 0)"
              :width="defaultFretWidth"
              :round="true"
              @clicked="click"
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
              v-for="fret in frets.filter(f => f !== 0)"
              :key="fret"
              :mark="!hideNote(i, fret) && noteInChord(note, fret)"
              :highlight="!hideNote(i, fret) && highlightFretNote(note, fret)"
              :string="i"
              :fret="fret"
              :text="fretText(note, fret)"
              :width="defaultFretWidth"
              :round="true"
              @clicked="click"
            />
          </div>
        </div>

        <div class="col-1 my-auto px-0">
          <div
            @click="nextDiagram"
            class="diagram-button d-flex justify-content-center align-items-center"
          >
            <font-awesome-icon
              icon="chevron-right"
              :class="{
                'text-muted': diagramIndex >= diagrams.length - 1
              }"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoteService from "@/services/NoteService";
import FretNote from "./FretNote";
import ChordService from "../services/ChordService";
export default {
  components: {
    FretNote
  },
  props: {
    options: { type: Object, default: () => null },
    defaultFretWidth: { type: Number, default: 46 }
  },
  data() {
    return {
      debug: true,
      notesInChord: [],
      diagramIndex: 0,
      diagramNotes: []
    };
  },
  methods: {
    fretText(stringNote, fret) {
      if (!this.options || !stringNote) return "";
      const fretNote = NoteService.getNote(stringNote.value + fret);
      if (!fretNote) return "";
      const chordNote = this.notesInChord.find(n => n.value === fretNote.value);
      return chordNote ? chordNote.name : "";
    },
    noteInChord(stringNote, fret) {
      if (
        !this.options ||
        !this.notesInChord ||
        !this.notesInChord.length ||
        !this.frets.includes(fret)
      )
        return false;
      const fretNote = NoteService.getNote(stringNote.value + fret);
      if (!fretNote) return false;
      return (
        this.notesInChord.find(n => n.value === fretNote.value) !== undefined
      );
    },
    highlightFretNote(stringNote, fret) {
      if (
        !this.options ||
        !this.notesInChord ||
        !this.notesInChord.length ||
        !this.frets.includes(fret)
      )
        return false;
      const fretNote = NoteService.getNote(stringNote.value + fret);
      if (!fretNote) return false;
      return fretNote.value === this.notesInChord[0].value;
    },
    hideNote(string, fret) {
      if (!this.diagram || !this.diagram.hide) return false;

      return (
        this.diagram.hide.find(
          h =>
            h[0] == this.options.tuning.notes.length - string &&
            h[1] == fret - this.startingFret
        ) !== undefined
      );
    },
    click(string, fret) {
      if (this.debug) {
        if (!this.diagram.hide) this.diagram.hide = [];
        this.diagram.hide.push([
          this.options.tuning.notes.length - string,
          fret - this.startingFret
        ]);
      }
    },
    previousDiagram() {
      this.diagramIndex--;
      if (this.diagramIndex < 0) this.diagramIndex = 0;
    },
    nextDiagram() {
      this.diagramIndex++;
      if (this.diagramIndex >= this.diagrams.length)
        this.diagramIndex = this.diagrams.length - 1;
    }
  },
  computed: {
    tuningNotes() {
      return this.options && this.options.tuning
        ? this.options.tuning.notes
        : [];
    },
    startingFret() {
      if (
        !this.options ||
        !this.options.rootNote ||
        !this.options.chord ||
        !this.diagram ||
        !this.options.tuning
      )
        return undefined;
      const string = this.diagram.string ? this.diagram.string : 0;
      let start =
        this.options.rootNote.value - this.options.tuning.notes[string].value;
      if (this.diagram.startMod) start = start + this.diagram.startMod;
      if (start < 0) start += NoteService.notes.length;
      return start;
    },
    frets() {
      const result = [];
      if (
        !this.options ||
        !this.options.rootNote ||
        !this.options.chord ||
        !this.diagram ||
        !this.options.tuning
      )
        return result;
      let start = this.startingFret;
      const width = this.diagram.width ? this.diagram.width : 3;
      const end = start + width - 1;
      for (; start <= end; start++) result.push(start);
      return result;
    },
    chord() {
      return this.options ? this.options.chord : null;
    },
    diagrams() {
      return this.chord ? this.chord.diagrams : undefined;
    },
    diagram() {
      if (this.diagrams && this.diagrams.length > this.diagramIndex)
        return this.diagrams[this.diagramIndex];
      return undefined;
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        this.notesInChord = [];
        if (!val || !val.rootNote || !val.chord || !val.chord.rootNotes) return;
        this.notesInChord = ChordService.getNotes(val.rootNote, val.chord);
      }
    },
    diagram: {
      immediate: true,
      handler() {
        this.diagramNotes = [];
        if (!this.options || !this.options.tuning) return;
        const tuningNotes = this.options.tuning.notes.slice().reverse();
        for (let i = 0; i < tuningNotes.length; i++) {
          const stringNote = tuningNotes[i];
          this.frets.forEach(fret => {
            if (
              !this.hideNote(i, fret) &&
              (this.highlightFretNote(stringNote, fret) ||
                this.noteInChord(stringNote, fret))
            ) {
              this.diagramNotes.unshift(
                NoteService.getNoteWithMod(stringNote, fret)
              );
            }
          });
        }
        this.$emit("diagramSelected", this.diagramNotes);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.string-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 34px;
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
.diagram-button {
  width: 100%;
  height: 160px;
  border: 1px solid $darkColor;
  border-radius: 0.25rem;
}
.diagram-button:hover {
  background-color: $color;
}
</style>
