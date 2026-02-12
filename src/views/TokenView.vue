<template>
  <div class="token-view">
    <Token />
  </div>
</template>

<script>
import Token from "@/components/Token.vue";

export default {
  name: "TokenView",
  components: {
    Token,
  },
  mounted() {
    document.title = "Consultar Token";
  },
};
</script>

<style scoped>
.token-view {
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
