<template>
  <div class="mb-3">
        <div class="row dc-section">
          <div class="col">
            <div class="input-group">
              <span class="input-group-text">Nom et prénom</span>
              <input id="infamilyname" type="text" :value="familyname" aria-label="First name" class="form-control" disabled>
              <input type="text" :value="firstname" aria-label="Last name" class="form-control" disabled>
            </div>
          </div>
          <div class="col">
            <input type="email" :value="email" aria-label="Email" class="form-control" disabled>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props:{
    familyname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    
  },
};
</script>

<style scoped>
</style>
