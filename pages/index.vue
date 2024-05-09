<template>
  <h1 class="uppercase text-center font-bold text-6xl m-5">CS Lab Database</h1>
  <div class="grid grid-cols-2">
    <div class="category">
      <h3 class="text-center font-bold text-2xl col-span-2">Get Data</h3>
      <button class="btn" @click="getData('employee')">Get all Employee's</button>
      <button class="btn" @click="getData('tutor')">Get all Tutor's</button>
      <button class="btn" @click="getData('coordinator')">Get all Coordinator's</button>
      <button class="btn" @click="getData('tutee')">Get all Tutee's</button>
      <button class="btn" @click="getData('course')">Get all Course's</button>
      <button class="btn" @click="getData('visit')">Get all Visit's</button>
    </div>
    <div class="category">
      <h3 class="text-center font-bold text-2xl col-span-2">Create Data</h3>
      <button class="btn">Create a Employee</button>
      <button class="btn">Create a Tutor</button>
      <button class="btn">Create a Coordinator</button>
      <button class="btn">Create a Tutee</button>
      <button class="btn">Create a Course</button>
      <button class="btn">Create a Visit</button>
    </div>
    <div class="category">
      <h3 class="text-center font-bold text-2xl col-span-2">Delete Data</h3>
      <button class="!from-red-600 btn" @click="selectData('employee')">Delete Employee's</button>
      <button class="!from-red-600 btn" @click="selectData('tutor')">Delete Tutor's</button>
      <button class="!from-red-600 btn" @click="selectData('coordinator')">Delete Coordinator's</button>
      <button class="!from-red-600 btn" @click="selectData('tutee')">Delete Tutee's</button>
      <button class="!from-red-600 btn" @click="selectData('course')">Delete Course's</button>
      <button class="!from-red-600 btn" @click="selectData('visit')">Delete Visit's</button>
    </div>
    <div class="category">
      <h3 class="text-center font-bold text-2xl col-span-2">Manage Data</h3>
      <button class="btn">Fill Database</button>
      <button class="!from-red-600 btn">Empty Database</button>
    </div>
  </div>
  <div class="grid grid-cols-2" v-if="finished">
    <h2 class="uppercase text-center font-bold text-4xl mt-5 col-span-2">Results</h2>
    <h4 class="uppercase text-center font-bold col-span-2">(Total: {{ data.length }})</h4>
    <h4 v-if="selectMode" class="uppercase text-center font-bold text-2xl col-span-2">Select entries to delete</h4>
    <h4 v-if="selectMode" class="uppercase text-center font-bold col-span-2">(Selected: {{ selected.length }})</h4>
    <button
      v-if="selectMode"
      class="!from-red-600 btn col-span-2 disabled:(pointer-events-none filter grayscale-[100] opacity-50)"
      :disabled="selected.length == 0"
      @click="deleteSelected"
    >
      Delete Selected
    </button>
    <div v-for="(item, index) in data">
      <div
        :class="[selectMode ? 'cursor-pointer' : '', 'result']"
        @click="(e) => (selectMode ? select(index) && e.currentTarget.classList.toggle('selected') : null)"
      >
        <pre class="p-3 whitespace-pre-wrap">{{ item }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'home',
});
let finished = ref(false);
let data = ref([]);
let selectMode = ref(false);
let selected = ref([]);

async function select(index) {
  if (selectMode) {
    if (selected.value.includes(index)) {
      selected.value = selected.value.filter((item) => item !== index);
    } else {
      selected.value.push(index);
    }
  }
}

async function deleteSelected() {
  alert(`Are you sure you want to delete the ${selected.value.length} selected entries?`);
  if (selected.value.length > 0) {
    await $fetch('/api/v1/employee', {
      method: 'DELETE',
      body: JSON.stringify(data.filter((item, index) => selected.value.includes(index))),
    });
  }
  selectMode.value = false;
}

async function getData(type) {
  finished.value = false;
  data.value = await $fetch(`/api/v1/${type}`);
  finished.value = true;
}

async function selectData(type) {
  await getData(type);
  selectMode.value = true;
}

async function selectEmployees() {
  await getEmployees();
  selectMode.value = true;
}

async function getEmployees() {
  finished.value = false;
  data.value = await $fetch('/api/v1/employee');
  finished.value = true;
}

async function getTutors() {
  finished.value = false;
  data.value = await $fetch('/api/v1/tutor');
  finished.value = true;
}

async function getCoordinators() {
  finished.value = false;
  data.value = await $fetch('/api/v1/coordinator');
  finished.value = true;
}

async function getTutees() {
  finished.value = false;
  data.value = await $fetch('/api/v1/tutee');
  finished.value = true;
}

async function getCourses() {
  finished.value = false;
  data.value = await $fetch('/api/v1/course');
  finished.value = true;
}

async function getVisits() {
  finished.value = false;
  data.value = await $fetch('/api/v1/visit');
  finished.value = true;
}
</script>

<style scoped>
.result {
  @apply bg-gradient-to-b from-purple-400 to-red-200 filter drop-shadow rounded-md m-5 p-3 transform transition-all hover:(scale-105 drop-shadow-lg);
}
.category {
  @apply bg-gradient-to-b from-purple-400 to-red-200 filter drop-shadow rounded-md m-5 p-3 grid grid-cols-2 transform transition-all hover:(scale-105 drop-shadow-lg);
}
.btn {
  @apply m-2 p-2 font-semibold text-white text-shadow-sm bg-gradient-to-b from-pink-400 to-purple-500 rounded-md transform transition-all hover:(scale-105 bg-gradient-to-b from-purple-500 to-pink-400);
}

.selected {
  @apply scale-95 !to-green-300 border-gray-500 border-2;
}
</style>
