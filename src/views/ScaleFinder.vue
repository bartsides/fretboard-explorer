<template>
  <div class="scale-finder">
    <Fretboard
      :options="fretboardOptions"
      :selectedFrets="selectedFrets"
      @fretClicked="fretClicked"
    />
    <div class="container pr-0 mb-3">
      <div class="row">
        <div class="col" />
        <div class="col-lg-2 col-md-3 col-sm-4 pr-0">
          <div class="sort-by-selector container pr-0">
            <div class="select-header justify-content-center row">
              <div class="col">Sort By</div>
            </div>
            <div class="justify-content-center row">
              <div
                v-for="option in sortByOptions"
                :key="option"
                class="strip-selector-option col"
                :class="{
                  'strip-selector-option-selected': option === sortBy
                }"
                @click="sortBy = option"
                @mouseover="$event.target.classList.add('selection-hover')"
                @mouseleave="$event.target.classList.remove('selection-hover')"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ScaleMatchSelector :matches="matches" v-model="selectedMatch" />
  </div>
</template>
<script>
import Fretboard from "@/components/Fretboard.vue";
import ScaleMatchSelector from "@/components/ScaleMatchSelector.vue";
import ScaleService from "../services/ScaleService";
import TuningService from "../services/TuningService";
import NoteService from "../services/NoteService";
export default {
  components: { Fretboard, ScaleMatchSelector },
  data() {
    return {
      scales: ScaleService.scales,
      tuning: TuningService.tunings[0],
      matches: [],
      selectedMatch: null,
      selectedFrets: [],
      selectedNotes: [],
      sortBy: "Note",
      sortByOptions: ["Note", "Name"]
    };
  },
  methods: {
    getMarkedNote(string, fret) {
      return NoteService.getNote(
        this.tuning.notes.slice().reverse()[string].value + fret
      );
    },
    fretClicked(string, fret) {
      const index = this.selectedFrets.findIndex(
        f => f.string === string && f.fret === fret
      );
      if (index > -1) {
        this.selectedFrets.splice(index, 1);
      } else {
        this.selectedFrets.push({ string: string, fret: fret });
      }
    },
    getMatches() {
      this.matches = ScaleService.findMatches(this.selectedNotes);
      this.sortMatches();
    },
    sortMatches() {
      this.matches.sort((m1, m2) => {
        if (this.sortBy === "Note") {
          if (m1.note.value > m2.note.value) return 1;
          if (m1.note.value < m2.note.value) return -1;
          if (m1.scale.name > m2.scale.name) return 1;
          if (m1.scale.name < m2.scale.name) return -1;
        } else {
          // sort by scale first
          if (m1.scale.name > m2.scale.name) return 1;
          if (m1.scale.name < m2.scale.name) return -1;
          if (m1.note.value > m2.note.value) return 1;
          if (m1.note.value < m2.note.value) return -1;
        }
        return 0;
      });
    }
  },
  watch: {
    selectedFrets: {
      deep: true,
      handler(val) {
        this.selectedNotes = [];
        for (let i = 0; i < val.length; i++) {
          const selectedNote = this.getMarkedNote(val[i].string, val[i].fret);
          if (!this.selectedNotes.find(n => n.value === selectedNote.value))
            this.selectedNotes.push(selectedNote);
        }
        this.getMatches();
      }
    },
    sortBy() {
      this.sortMatches();
    }
  },
  computed: {
    fretboardOptions() {
      return {
        tuning: this.tuning,
        textMode: "Name",
        slimBottom: true,
        baseNote: this.selectedMatch ? this.selectedMatch.note : null,
        scale: this.selectedMatch ? this.selectedMatch.scale : null
      };
    }
  }
};
</script>
<style scoped>
.strip-selector-option {
  max-width: 75px !important;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
