<template>
  <div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Buchungsdatum</th>
        <th>Beschreibung</th>
        <th>Soll</th>
        <th>Haben</th>
        <th>Summe</th>
        <th>Stornieren</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="loading">
        <span>loading...</span>
      </template>
      <template v-else>
        <tr v-for="record in records" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ formatDate(record.bookingDate) }}</td>
          <td>{{ record.description }}</td>
          <td>{{ record.fromAccountId }}</td>
          <td>{{ record.toAccountId }}</td>
          <td>{{ formatPrice(record.amount) }}</td>
          <td v-if="record.revertingRecord">
            <button type="button" class="btn btn-primary disabled">Storniert</button>
          </td>
          <td v-else-if="record.revertedRecord">
            <button type="button" class="btn btn-primary disabled">Storno-Buchung</button>
          </td>
          <td v-else-if="record.taxedRecord">
            <button type="button" class="btn btn-primary disabled">Steuer-Buchung</button>
          </td>
          <td v-else>
            <button type="button" class="btn btn-primary" @click="revertRecord(record.id)">Stornieren</button>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import {DefaultApi, Record} from "../../generated-sources/openapi";
import moment from "moment";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      records: [Record]
    }
  },
  created() {
    this.getRecords()
  },
  methods: {
    getApi() {
      const axiosInstance = axios.create();
      return new DefaultApi(null, "http://localhost:8080/v1.0", axiosInstance);
    },
    getRecords() {
      this.loading = true
      const api = this.getApi()
      api.getRecord().then(r => {
        console.log("gotData")
        console.log(r.data)
        this.loading = false
        this.records = r.data
      })
    },
    revertRecord(id) {
      let confirmAction = confirm("Sind Sie sicher, dass Sie die Buchung " + id + " stornieren wollen?");
      if (confirmAction) {
        const api = this.getApi()
        api.postRevertRecord(id).then(() => {this.getRecords()});
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€"
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM.DD.YYYY')
      }
    }
  }
}
</script>

<style scoped>

</style>