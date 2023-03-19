<script setup lang="ts">
import { ref } from 'vue'
import axios, {isCancel, AxiosError} from 'axios';

let baseUrl = 'http://localhost:3000/rlc/musicPlayer'

let songSearchInput = ref(undefined);
let songResultList = ref(undefined);
let searchResults = ref([]);


const searchSongName = async (e) => {
  e.preventDefault();

  let searchValue = songSearchInput?.value;
  console.log("I just called to say I:", searchValue);
  console.log("TODO: Send request to server to search Spotify API for tracks and return them")


  let url = `${baseUrl}/search`;

  if (searchValue && typeof searchValue === 'string') {
    url += `?query=${searchValue}`
  }

  searchResults = await axios.get(url);
};

</script>

<template>
  <h3>Welcome to the music player, search a song and see what happens</h3>
  <form @submit="e => searchSongName(e)">
    <input type="text" placeholder="Enter a song name..." v-model="songSearchInput"/>
    <button type="submit">Search Songs</button>
  </form>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
