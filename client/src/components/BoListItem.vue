<script setup>

import { computed } from 'vue'

const props = defineProps(['DcRow'])

const BoDcLink = computed(() => {
  return "/dc/" + props.DcRow.id + "/no-session"
})

</script>


<template>
   <!--if {{ DcRow != null }}-->
    <tr>
        <th scope="row">1</th>
        <td>{{ DcRow.name }}</td>
        <td>{{ DcRow.firstname }}</td>
        <td>
            <span v-for="tag in DcRow.tags" :key="tag.id" class="badge text-bg-secondary">{{ tag }}</span>
        </td>

            <td v-if="DcRow.status === 'Finalisé'" class="">{{ DcRow.status }}</td>
            <td v-else-if="DcRow.status === 'Crée'" class="text-primary">{{ DcRow.status }}</td>
            <td v-else class="text-warning">{{ DcRow.status }}</td>

        <td>
            <a class="btn btn-outline-primary btn-sm" :href="BoDcLink">
                Voir le dossier
            </a>
            <button type="button" class="btn btn-outline-danger btn-sm">Archiver</button>
        </td>
    </tr>

</template>

<style scoped>
a.btn-sm{margin-right: 5px;}
</style>