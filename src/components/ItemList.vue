<template>
    <div class="list">
        <ol>
            <li v-for="(item, i) of items" :key="i">
                <input type="radio" class="list-option"
                       :id="`${i}-${item}`"
                       name="item" :value="i"
                       v-model="activeIndex">
                <label :for="`${i}-${item}`" :title="displayItem(i)">{{ displayItem(i) }}</label>
            </li>
        </ol>
    </div>
</template>

<script setup>
import loadedModels from '@/names/modelsList.json';
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const {activeIndex, items} = storeToRefs(useAppStore());
const modelList = loadedModels;

const displayItem = (index) => {
    // Safely return the display name for the model at the given index
    const selectedItem = items.value[index];
    if (!selectedItem) {
        return "Container"; // Fallback text if no model is found
    } else {
        const model = modelList.find((obj) => obj["filename"] === selectedItem + ".skel");
        return model ? model["dispName"] : "Unknown Model";
    }
}

</script>

<style scoped>
.list {
    overflow: scroll;
}
</style>