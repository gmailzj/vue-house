<template>
    <div>
        <div class="app.vue" id="app">
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
    export default {
        name: "app",
        data() {
            return {};
        },
        watch: {},
        methods: {}
    };
</script>
<style>
    [v-cloak] {
        display: none;
    }
</style>
