<template>
    <div id="team-search-box">
        <input type="text" v-model="keyword"><input type="button" value="search" v-on:click="search">
        <span v-html="html" id="html"></span>
    </div>
</template>

<script>
    export default {
        preFetch(store, route) {
            const keyword = route.query.q ? route.query.q : '';
            store.dispatch('setKeyword', {
                keyword: keyword,
            });
            store.dispatch('searchKeyword', {
                keyword: keyword,
            })
        },
        computed: {
            keyword: {
                get() {
                    return this.$store.state.keyword;
                },
                set(value) {
                    this.$store.dispatch('setKeyword', {
                        keyword: value,
                    });
                }
            },
            html: {
                get() {
                    return this.$store.state.html;
                }
            }
        },
        watch: {
            '$route'(to, from) {
                if (to.query.q === from.query.q) return;
                this.keyword = to.query.q ? to.query.q : '';
                this.$store.dispatch('searchKeyword', {
                    keyword: this.keyword,
                })
            }
        },
        methods: {
            search() {
                this.$store.dispatch('searchKeyword', {
                    keyword: this.keyword
                });
                this.$router.push(`/s?q=${this.$store.state.keyword}`, () => {
                }, () => {
                });
            }
        }
    }
</script>