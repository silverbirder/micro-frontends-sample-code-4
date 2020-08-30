<template>
    <div>
        <h1>{{count}}</h1>
        <button type="button" v-on:click="increment">+</button>
    </div>
</template>

<script>
    export default {
        computed: {
            count () {
                return this.$store.getters.getCount
            },
        },
        methods: {
            increment () {
                this.$store.dispatch('increment')
            },
        }
    }
</script>