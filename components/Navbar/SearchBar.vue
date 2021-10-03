<template>
  <v-text-field
    solo
    label="Search"
    append-icon="mdi-magnify"
    class="my-auto mt-1.5"
    :hide-details="true"
    v-model="searchText"
    @click:append="search"
    @keyup.enter="search"
  ></v-text-field>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    search() {
      console.log(this.searchText);
      this.$router.push({ path: "/search", query: { q: this.searchText } });
    },
  },
};
</script>

<style></style>
