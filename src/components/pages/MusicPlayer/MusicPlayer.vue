<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios';

import { musicPlayerStore } from '@states/musicPlayerStore'

import config from '@configs/config';
let { API_BASE_URL } = config;

let baseUrl = `${API_BASE_URL}/rlc/musicPlayer`
// * Emits
let songSearchInput = ref(undefined);
let searchResults = ref([]);
let currentSong = ref(undefined);
const audioElement = ref(null);

let audioState = reactive({
  audioContext: new AudioContext(),
  audioTrack: undefined,
  analyser: undefined
})

onMounted(() => {
  // * Set default audio volume
  audioElement.value.onended = () => {
    musicPlayerStore.playing = true;
  }
  audioElement.value.volume = 0.05;

  // * Create Audio Track Node
  audioState.audioTrack = audioState.audioContext.createMediaElementSource(audioElement?.value);
  // * Connect audio track node to audio context destination node (usually represents your audio output)
  audioState.audioTrack.connect(audioState.audioContext.destination)

  // * Create Analyser Node
  audioState.analyser = audioState.audioContext.createAnalyser();
  // * Connect analyser node to audio track node
  audioState.audioTrack.connect(audioState.analyser)
})


const searchSongName = async (e) => {
  e.preventDefault();

  let searchValue = songSearchInput?.value;
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

  musicPlayerStore.analyser = audioState.analyser;
  musicPlayerStore.playing = true;
}

</script>

<template>
  <h3>Welcome to the music player, search a song and see what happens</h3>
  <form class="songSearchBar" @submit="e => searchSongName(e)">
    <input type="text" placeholder="Enter a song name..." v-model="songSearchInput"/>
    <button type="submit">Search Songs</button>
  </form>

  <ul class="songsList" v-if="searchResults.length">
    <li class="songItem" v-for="song in searchResults" :key="song.id">
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

.songSearchBar {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 280px;

  background: #333;
  padding: 20px;
  padding-top: 120px;
}

.songSearchBar input {
  padding: 10px 20px;
  border-radius: 2px;
}

.songSearchBar button {
  padding: 10px 20px;
}

.songsList {
  list-style: none;
}

.songItem a {
  cursor: pointer;
}

.songItem a:hover {
  color: #00618f
}
</style>