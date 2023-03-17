<script setup lang="ts">
import { ref } from 'vue'

let songSearchInput = ref(undefined);
let songResultList = ref(undefined);

const searchSongName = (e) => {
  e.preventDefault();
  console.log("I just called to say I:", songSearchInput.value);

  let searchValue = songSearchInput.value;
  console.log("TODO: Send request to server to search Spotify API for tracks and return them")
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
