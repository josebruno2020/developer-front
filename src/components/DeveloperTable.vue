<template>
  <section>
    <div class="text-start row mb-4">
      <h5>Filtros</h5>
      <div class="col-md-2">
        <input type="text" v-model="filters.name" class="form-control" placeholder="Nome...">
      </div>
      <div class="col-md-2">
        <input type="text" v-model="filters.age" class="form-control" placeholder="Idade..." @input="filters.age = onlyNumbers(filters.age)">
      </div>
      <div class="col-md-2">
        <input type="date" v-model="filters.birthdate" class="form-control" placeholder="Data Nascimento">
      </div>
      <div class="col-md-2">
        <select v-model="filters.sex" class="form-select">
          <option v-for="sex in sexOptions" :key="sex.value" :value="sex.value">{{sex.text}}</option>
        </select>
      </div>
      <div class="col-md-1 d-flex justify-content-around">
        <button title="Filtrar" class="btn btn-sm btn-secondary" @click="getDevelopersWithFilters">
          <b-icon icon="search"></b-icon>
        </button>
        <button title="Limpar filtro" class="btn btn-sm btn-secondary" @click="cleanFilters">
          <b-icon icon="trash"></b-icon>
        </button>
      </div>
    </div>
    <table class="table table-responsive-lg">
      <thead>
      <tr>
        <th>Uuid</th>
        <th>Nome</th>
        <th>Sexo</th>
        <th>Idade</th>
        <th>Data Nascimento</th>
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
        <td class="d-flex justify-content-around">
          <button class="btn btn-sm btn-danger" @click="confirm(id)" title="Excluir">
            <b-icon icon="trash"></b-icon>
          </button>
          <button class="btn btn-sm btn-warning" title="Editar" @click="goToEditDeveloper(id)">
            <b-icon icon="pencil"></b-icon>
          </button>
          <button class="btn btn-sm btn-info" title="Ver" @click="goToReadyOnly(id)">
            <b-icon icon="eye"></b-icon>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="!developers.length">
      <p>Nenhum resultado encontrado.</p>
    </div>
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
import sexOptions from "@/helpers/sexOptions";

export default {
  name: "DeveloperTable",
  data() {
    return {
      developers: [],
      filters: {
        name: null,
        age: null,
        sex: null,
        birthdate: null
      },
      sexOptions
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
    getDevelopersWithFilters() {
      http.get(apiRoutes.developers, {
        params: {
          name: this.filters.name,
          sex: this.filters.sex,
          age: this.filters.age,
          birthdate: this.filters.birthdate
        }
      }).then(({data}) => {
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
    },

    goToEditDeveloper(id) {
      return this.$emit('isEditDeveloper', id);
    },

    goToReadyOnly(id) {
      return this.$emit('isReadyOnly', id);
    },

    cleanFilters() {
      this.filters = {}
      return this.getAllDevelopers();
    },

    onlyNumbers(string) {
      return string.replace(/[^\d]/, '');
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