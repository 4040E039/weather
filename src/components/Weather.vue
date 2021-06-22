<template>
  <div id="Weatther">
    <div class="loading d-flex justify-content-center align-items-center" v-if="loading">
      <h1>loading...</h1>
    </div>
    <b-container fluid>
      <b-row>
      <b-col md=12 class="Weatther d-flex justify-content-center align-items-center">
          <div class="Hwidht">
            <h5 class="ml-1 mb-2">Weather forecast</h5>
          <b-form-select v-model="selected" class="mb-3 w-100">
            <b-form-select-option v-for="(County, index) in Countys" :key="index" :value="index">{{ County.locationName }}</b-form-select-option>
          </b-form-select>
            <div class="py-3 px-2 Countys" v-if = "Countys !== []">
              <div v-for="(County, index) in Countys" :key="index">
                <div v-if = "index === selected">
                  <b-row>
                  <b-col md = 7>
                    <h4>County : {{ County.locationName }}</h4>
                    <h5>Status : {{ weather (index).parameter.parameterName }}</h5>
                    <h5>MinT : {{ County.weatherElement[2].time[0].parameter.parameterName }}°C</h5>
                    <h5>MaxT : {{ County.weatherElement[4].time[0].parameter.parameterName }}°C</h5>
                    <h5>Feel : {{ County.weatherElement[3].time[0].parameter.parameterName }}</h5>
                    </b-col>
                    <b-col md = 5>
                      <img :src="'./image/' + weatherType (index) + '.png'" alt="">
                    </b-col>
                    </b-row>
                </div>
              </div>
            </div>
            <div v-else > error </div>
          </div>
        </b-col>
        </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'Weather',
  data () {
    return {
      WeattherData: [],
      selected: 6,
      loading: true,
      key: process.env.VUE_APP_KEY
    }
  },
  computed: {
    Countys () {
      return this.WeattherData
    }
  },
  methods: {
    weather (index) {
      return (this.Countys[index].weatherElement[0].time[0])
    },
    weatherType (index) {
      const Type = this.Countys[index].weatherElement[0].time[0].parameter.parameterValue
      if (Type === '2' || Type === '3') return 'w2'
      if (Type === '4' || Type === '5' || Type === '6' || Type === '7') return 'w4'
      if (Type === '8' || Type === '9' || Type === '10' || Type === '11' || Type === '12' || Type === '13' || Type === '14' || Type === '19' || Type === '20' || Type === '29' || Type === '30' || Type === '31' || Type === '32' || Type === '38' || Type === '39') return 'w5'
      if (Type === '15' || Type === '16' || Type === '17' || Type === '18' || Type === '21' || Type === '22' || Type === '33' || Type === '34' || Type === '35' || Type === '36' || Type === '41') return 'w6'
      if (Type === '24') return 'w7'
      if (Type === '25' || Type === '26' || Type === '27' || Type === '28') return 'w8'
      if (Type === '23' || Type === '37' || Type === '42') return 'w9'
    }
  },
  created () {
    const api = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=' + this.key
    this.$http.get(api)
      .then(response => {
        this.loading = false
        this.WeattherData = response.data.records.location
      })
      .catch(error => {
        alert(error)
      })
  }
}
</script>
