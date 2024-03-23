<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stories = ref([])
let page = 1

const fetchStories = async () => {
    const response = await axios.get(`https://cryptodire.kontinentalist.com/api/v1/stories?page=${page}`)
    console.log(response.data)
    stories.value = [...stories.value, ...response.data.data]
    page++
}


onMounted(fetchStories)
</script>



<template>
    <div>
        <div class="latest-stories__title">
            <h2>Latest Stories</h2>
        </div>
        <div class="stories-grid">
            <div class="story" v-for="story in stories" :key="story.id">
                <a :href="`https://kontinentalist.com/stories/${story.slug}`" target="_blank">
                    <div class="story-image" :style="{ backgroundImage: `url(${story.hero_image.url})` }"></div>
                </a>
                <a :href="`https://kontinentalist.com/stories/${story.slug}`" target="_blank">
                    <h2 class="story-title">{{ story.title }}</h2>
                </a>
                <div class="story-dek" v-html="story.dek"></div>
            </div>
        </div>
        <div class="button-row"><button @click="fetchStories" class="load-more">Load more</button></div>
    </div>
</template>


<style>
.load-more {
    background-color: transparent;
    border: 1px solid;
    color: #ff5b28;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Gordita", "Trebuchet MS", sans-serif;
    font-weight: 500;
    height: 50px;
    width: 150px;
    cursor: pointer;
}

.load-more:hover {
    text-decoration: underline;
    text-decoration-color: #ff845e;
}


.button-row {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    padding-bottom: 20px;
}

.latest-stories__title h2 {
    font-size: 34px;
    line-height: 48px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Gordita", "Trebuchet MS", sans-serif;
    font-weight: 700;
    padding: 20px;
}

.stories-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    width: 100%;
    align-items: middle;
    ;
}

.stories-grid>* {
    min-width: 364px;
}

.story {
    flex: 1 1 200px;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 0 10px;
}

.story-image {
    position: relative;
    width: auto;
    height: auto;
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
}

.story-image::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.story-image:hover::after {
    opacity: 1;
}

.story-title {
    color: #2a2929;
    font-size: 24px;
    line-height: 32px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Gordita", "Trebuchet MS", sans-serif;
    font-weight: 700;
}

.story-title:hover {
    text-decoration: underline;
    text-decoration-color: #ff845e;
}

.story-dek {
    font-size: 1.2rem;
    text-align: left;
    color: rgb(140, 138, 136);
}
</style>