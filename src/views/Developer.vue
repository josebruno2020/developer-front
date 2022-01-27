<template>
  <main class="container">
    <article class="card mt-4">
      <div class="card-header">
        <h1 class="text-center">Desenvolvedores</h1>
      </div>
      <section class="card-body">
        <modal-developer ref="modal-developer" @created="addNewDeveloper($event)" @updated="refreshDeveloper()"></modal-developer>
        <developer-table
            @isEditDeveloper="openModalEdit($event)"
            @isReadyOnly="modalReadyOnly($event)"
            ref="developer-table"
        ></developer-table>
      </section>
    </article>
  </main>
</template>

<script>
import DeveloperTable from "@/components/DeveloperTable";
import ModalDeveloper from "@/components/ModalDeveloper";
export default {
  name: "Developer",
  components: {ModalDeveloper, DeveloperTable},
  data: () => ({

  }),
  created() {

  },
  methods: {
    addNewDeveloper(developer) {
      return this.$refs["developer-table"].pushNewDeveloper(developer)
    },
    openModalEdit(developerId) {
      document.querySelector('#button-modal-open').click();
      return this.$refs["modal-developer"].isModalEdit(developerId)
    },
    refreshDeveloper() {
      return this.$refs["developer-table"].getAllDevelopers();
    },

    modalReadyOnly(developerId) {
      document.querySelector('#button-modal-open').click();
      return this.$refs["modal-developer"].isView(developerId);
    }
  }
}
</script>

<style scoped>

</style>