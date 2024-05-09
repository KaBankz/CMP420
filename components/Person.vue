<template>
  <div class="bg-dark-200 rounded-md p-5 m-5 text-white">
    <div>Name: {{ first_name }} {{ last_name }}</div>
    <div>EMPLID: {{ emplid }}</div>
    <div>Title: {{ title }}</div>
    <div>Phone Number: {{ phone_number }}</div>
    <div>Email: {{ email }}</div>
    <div>Address: {{ address }}</div>
    <div>Sex: {{ sex }}</div>
    <div>DOB: {{ date_of_birth }}</div>
    <div>Date of Hire: {{ date_of_hire }}</div>
    <div>Hourly Rate: {{ hourly_rate }}</div>
    <div>Total Weekly Working Hours: {{ total_weekly_working_hours }}</div>
  </div>
</template>

<script setup>
defineProps({
  emplid: Number,
  first_name: String,
  last_name: String,
  title: String,
  phone_number: String,
  email: String,
  address: String,
  sex: String,
  date_of_birth: String,
  date_of_hire: String,
  hourly_rate: Number,
  total_weekly_working_hours: Number,
});
</script>
