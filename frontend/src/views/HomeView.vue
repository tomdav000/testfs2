<script setup>
import {onMounted} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useRouter} from 'vue-router'
const cStore = useCounterStore()
const router = useRouter()

const newCountry = {
  name:'',
  location:''
}

const addNewCountry = (coun)=>{
  cStore.addCountry(coun)
  router.go()
}

const removeThisCountry = (id) =>{
  cStore.removeCountry(id)
  router.go()
}

onMounted(()=>{
  cStore.getCountries()
})
</script>

<template>
  <div class="container">
    <form align='center'>
      <input type="text" v-model='newCountry.name' placeholder="Enter Country Name">
      <input type="text" v-model='newCountry.location' placeholder="Where is Country Located?">
      <input type="submit" @click.prevent="addNewCountry(newCountry)" name="Add New Country">
    </form>
  </div>
  <hr/>
  <div class="container">
    <div class="row row-cols-2">
      <div v-for="(co,ind) in cStore.countries" :key='co.id'>
        <div class="border mb-2">
          <p class="text-center" @click='removeThisCountry(co.id)'>{{co.name}}</p>
          <p class="text-center">{{co.location}}</p>
          <p class="text-center"><button class="btn btn-warning"><RouterLink :to=" `${co.id}` ">View Country</RouterLink></button></p>
        </div>
      </div>
    </div>
  </div>
</template>
