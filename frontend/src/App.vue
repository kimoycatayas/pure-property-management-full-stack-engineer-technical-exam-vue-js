<script setup lang="ts">
import AgentForm from "./components/AgentForm.vue";

function onAgentSaved(agent) {
  console.log("Agent saved:", agent);
  // e.g. refresh list or navigate away
}
</script>

<template>
  <AgentForm @saved="onAgentSaved" />
</template>
