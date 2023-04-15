<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios, {isCancel, AxiosError} from 'axios';

let baseUrl = 'http://localhost:3000/rlc/musicPlayer'

let songSearchInput = ref(undefined);
let searchResults = ref([]);
let currentSong = ref(undefined);
const audioElement = ref(null);

let audioState = reactive({
  audioContext: new AudioContext(),
  audioTrack: undefined
})

onMounted(() => {
  audioState.audioTrack = audioState.audioContext.createMediaElementSource(audioElement?.value);
  audioState.audioTrack.connect(audioState.audioContext.destination)
})


const searchSongName = async (e) => {
  e.preventDefault();

  let searchValue = songSearchInput?.value;
  console.log("I just called to say I:", searchValue);
  console.log("TODO: Send request to server to search Spotify API for tracks and return them")


  let url = `${baseUrl}/search`;

  if (searchValue && typeof searchValue === 'string') {
    url += `?query=${searchValue}`
  }

  let result = await axios.get(url);
  searchResults.value = result?.data;

  console.log(searchResults.value)
};

const playSong = ({ song }) => {
  currentSong.value = song;

  if (audioState.audioContext.state === "suspended") {
    audioState.audioContext.resume();
  }
  
  audioElement.value.play();
}

</script>

<template>
  <h3>Welcome to the music player, search a song and see what happens</h3>
  <form @submit="e => searchSongName(e)">
    <input type="text" placeholder="Enter a song name..." v-model="songSearchInput"/>
    <button type="submit">Search Songs</button>
  </form>

  <ul v-if="searchResults.length">
    <li v-for="song in searchResults" :key="song.id">
      <a @click="playSong({ song })">{{ song.name }} - {{ song.artists }}</a>
    </li>
  </ul>

  <audio 
    :src="currentSong?.url"
    ref="audioElement" 
    autoplay
    controls
    crossorigin="anonymous"
  ></audio>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>