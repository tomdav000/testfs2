import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore({
  id:'country',
  state: ()=>({
    countries:[],
    country:{}
  }),
  actions:{
    async getCountries(){
      try{
        const res = await axios.get('/api/countries')
        this.countries = res.data
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async getCountry(id){
      try{
        const res = await axios.get(`/api/countries/${id}`)
        this.country = res.data
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async addCountry(country){
      try{
        const config = {headers:{'Content-Type':'application/json'}}
        await axios.post('/api/countries',country,config)
        this.getCountries()
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async putCountry(country){
      try{
        const config = {headers:{'Content-Type':'application/json'}}
        await axios.put(`/api/countries/${country.id}`,country,config)
        this.getCountries()
      }catch(error){
        alert(error)
        console.log(error)
      }
    },
    async removeCountry(id){
      try{
        await axios.delete(`/api/countries/${id}`)
        this.getCountries()
      }catch(error){
        alert(error)
        console.log(error)
      }
    }
  },
  getters:{
    allCountries(state){
      return state.countries
    },
    oneCountry(state){
      return state.country
    }
  }
})
