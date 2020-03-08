<template>
  <div class="mytable">
    <h1>{{ msg }}</h1>
    <button
      :style="{ width: '150px' }"
      type="button"
      @click="handleChangeSample"
    >
      Change sample data
    </button>
    <div class="main-table">
      <hot-table id="table" ref="reftable" :settings="settings" />
    </div>
    <div id="data-preview">
      <table />
    </div>
    <div>Preview Data Table</div>
    <div :style="{ 'justify-content': 'center' }">
      <div v-html="TablePreview" />
    </div>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue"

export default {
  name: "Table",
  components: {
    HotTable
  },
  props: {
    msg: String
  },
  data() {
    return {
      settings: {
        licenseKey: "non-commercial-and-evaluation",
        data: [],
        stretchH: "all",
        rowHeaders: true,
        colHeaders: true,
        width: "100%",
        afterInit: () => {
          this.hotRef = this.$refs.reftable.hotInstance
          this.InitHotRef(this.hotRef)
        },
        afterChange: () => {
          if (this.hotRef) {
            if (this.DataDirection === "table_to_buffer") {
              const rawdata = this.hotRef.getSourceData()
              let data = JSON.parse(JSON.stringify({ rawdata })).rawdata
              this.$store.commit("table/SET_TABLE_DATA", data)
            }
          }
          this.$store.commit("table/SET_DATA_DIRECTION", "table_to_buffer")
        }
      }
    }
  },

  computed: {
    TablePreview() {
      var data = ""
      data += "<table border='1'>"
      for (var row = 0; row < this.TableData.length; row++) {
        data += "<tr>"
        for (var col = 0; col < this.TableData[row].length; col++) {
          data += `<td>${this.TableData[row][col]}</td>`
        }
        data += "</tr>"
      }
      data += "</table>"
      return data
    },

    TableData() {
      return this.$store.getters["table/TableData"]
    },

    DataDirection() {
      return this.$store.getters["table/DataDirection"]
    }
  },

  mounted() {
    console.log("mounted")
  },

  methods: {
    handleChangeSample() {
      console.log("handleChangeSample")
      switch (Math.floor(Math.random() * 5)) {
        case 0: {
          const data = []
          this.SetTableData(data)
          break
        }

        case 1: {
          const data = [["e"]]
          this.SetTableData(data)
          break
        }

        case 2: {
          const data = [
            ["e", "f"],
            ["g", "h"]
          ]
          this.SetTableData(data)
          break
        }

        case 3: {
          const data = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"]
          ]
          this.SetTableData(data)
          break
        }

        case 4: {
          const data = [
            ["a1", "a2", "a3", "a4"],
            ["a5", "a6", "a7", "a8"],
            ["a9", "a10", "a11", "a12"],
            ["a13", "a14", "a15", "a16"]
          ]
          this.SetTableData(data)
          break
        }
      }
    },

    updatePreview: function() {},

    InitHotRef: function(data) {
      this.$store.dispatch("table/InitHotRef", data)
    },

    SetTableData: function(data) {
      this.$store.dispatch("table/SetTableData", data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mytable {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
