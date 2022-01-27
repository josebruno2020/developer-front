<template>
  <main class="container">
    <article class="card mt-4">
      <div class="card-header">
        <h1 class="text-center">Desenvolvedores</h1>
      </div>
      <section class="card-body">
        <modal-new-developer @created="addNewDeveloper($event)"></modal-new-developer>
        <developer-table ref="developer-table"></developer-table>
      </section>
    </article>
  </main>
</template>

<script>
import DeveloperTable from "@/components/DeveloperTable";
import ModalNewDeveloper from "@/components/ModalNewDeveloper";
export default {
  name: "Developer",
  components: {ModalNewDeveloper, DeveloperTable},
  data: () => ({

  }),
  created() {

  },
  methods: {
    addNewDeveloper(developer) {
      return this.$refs["developer-table"].pushNewDeveloper(developer)
    }
  }
}
</script>

<style scoped>

</style>