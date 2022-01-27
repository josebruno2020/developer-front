<template>
  <section>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Sexo</th>
        <th>Idade</th>
        <th>Aniversário</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="{id, name, sex, age, birthdate} in developers" :key="id">
        <td>{{ id }}</td>
        <td>{{ name }}</td>
        <td>{{ sex }}</td>
        <td>{{ age }}</td>
        <td>{{ new Date(birthdate).toISOString().substr(0, 10).split('-').reverse().join('/') }}</td>
        <td>
          <button class="btn btn-sm btn-danger" @click="confirm(id)" title="Excluir">
            <b-icon icon="trash"></b-icon>
          </button>
          <button class="btn btn-sm btn-info" title="Editar">
            <b-icon icon="pencil"></b-icon>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="table-footer">
      <div class="">
        <p>Total: {{developers.length}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import http from "@/services/http";
import apiRoutes from "@/helpers/apiRoutes";

export default {
  name: "DeveloperTable",
  data() {
    return {
      developers: [],
    }
  },
  created() {
    this.getAllDevelopers();
  },
  methods: {
    getAllDevelopers() {
      http.get(apiRoutes.developers).then(({data}) => {
        this.developers = data.content;
      }).catch(err => console.log(err))

    },
    confirm(id) {
        if (!confirm('Tem certeza que deseja excluir o registro?')) {
          return
        }
        return this.deleteDeveloper(id)
    },

    deleteDeveloper(id) {
      http.delete(`${apiRoutes.developers}/${id}`).then(() => {
        this.developers = this.developers.filter(developer => developer.id !== id)
        alert('Desenvolvedor removido com sucesso!');
      }).catch(err => console.log(err));
    },

    pushNewDeveloper(developer) {
      return this.developers.push(developer);
    }
  }
}
</script>

<style scoped>
.table-footer {
  display: flex;
  justify-content: end;
}
</style>