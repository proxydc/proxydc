<template>
  <div>
    <h5>{{ title }}</h5>
    <div id="fonct">
      <input
        v-for="(ability, index) in functionalAbilities"
        :value="ability"
        :key="index"
        class="form-control dc-vlist"
        type="text"
      />
    </div>

    <button
      type="button"
      class="btn btn-outline-primary btn-sm"
      @click="addRow"
    >
      Ajouter une compétence
    </button>
  </div>
</template>

<script>
export default {
 /* data() {
    return {
      uid: "",
      titile: "",
      functionalAbilities: [],
      error: "",
    };
  },*/
  props: {
    title: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    functionalAbilities: {
      type: Array,
    },
  },
 /* defineEmits:{
    (['update:abilities'])
  },*/
  methods: {
    addRow() {
      var container = document.getElementById("fonct");
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      container.appendChild(newInput);
    },
  },
};
</script>

<style scoped>
</style>
