<script setup>
import {onMounted} from 'vue'
import {useCounterStore} from '@/stores/counter'
import {useRouter,useRoute} from 'vue-router'
const cStore = useCounterStore()
const router = useRouter()
const route = useRoute()
const updCountry = {
  id: route.params.id,
  name:'',
  location:''
}

const updOldCountry = (coun)=>{
  cStore.putCountry(coun)
  router.go()
}




onMounted(()=>{
  cStore.getCountry(route.params.id)
})
</script>

<template>
  <div class="container">
    <form align='center'>
      <input type="text" v-model='updCountry.name' placeholder="Enter Country Name">
      <input type="text" v-model='updCountry.location' placeholder="Where is Country Located?">
      <input type="submit" @click.prevent="updOldCountry(updCountry)" name="Update Country">
    </form>
  </div>
  <hr/>
  <div class="container">
    <div class="row">
        <div class="border mb-2">
          <p class="text-center fs-1">{{cStore.country.name}}</p>
          <p class="text-center fs-3">{{cStore.country.location}}</p>
          <div v-for="(lang,ind) in cStore.country.languages" :key="lang.id">
            <div class="card m-3">
              <p class="text-center fs-4">{{lang.name}}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>