<template>
  <div class="tab-charter container">
    <div class="tab-charter-options">
      <input type="file" ref="file" style="display: none" @change="load" />
      <div class="row">
        <v-select
          name="tuning"
          :options="tunings"
          label="name"
          v-model="tuning"
          class="col-12 col-md-3 col-lg-2 mb-1 pr-md-0"
          :clearable="false"
        >
          <template #header><div class="select-header">Tuning</div></template>
        </v-select>
        <div class="col-12 mt-3 col-md-3 mt-md-auto mb-1">
          <button @click.prevent="save" class="float-left option-button">
            <font-awesome-icon icon="save"></font-awesome-icon>
          </button>
          <button
            @click="$refs.file.click()"
            class="float-left mx-3 option-button"
          >
            <font-awesome-icon icon="folder-open"></font-awesome-icon>
          </button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 col-sm-10 col-md-8">
          <div class="row">
            <div class="col select-header">Song</div>
          </div>
          <div class="row">
            <input class="col" v-model="name" />
          </div>
        </div>
      </div>
    </div>
    <TabSheet
      :tuning="tuning"
      :selections="selections"
      @selectionsChanged="val => (selections = val)"
      ref="tabsheet"
    />
  </div>
</template>
<script>
import TuningService from "../services/TuningService";
import TabSheet from "@/components/TabSheet";
export default {
  components: { TabSheet },
  data() {
    return {
      tunings: TuningService.tunings,
      tuning: TuningService.tunings[0],
      name: "",
      selections: []
    };
  },
  methods: {
    save() {
      const data = JSON.stringify({
        name: this.name,
        tuning: this.tuning,
        selections: this.selections
      });
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = `${this.name}.json`;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      // eslint-disable-next-line prettier/prettier
      e.initEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    load(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.selections = [];
      let reader = new FileReader();
      reader.addEventListener("load", async event => {
        var fileText = event.target.result;
        const data = JSON.parse(fileText);
        this.name = data.name;
        this.tuning = data.tuning;
        this.selections = data.selections;
        if (this.selections.length) await this.$refs.tabsheet.loadSelections();
      });
      reader.readAsText(files[0]);
    }
  },
  computed: {
    options() {
      return { tuning: this.tuning };
    }
  }
};
</script>
<style lang="scss" scoped>
.option-button {
  width: 34px !important;
}
</style>
