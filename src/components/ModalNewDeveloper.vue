<template>
  <div>
    <b-button class="btn btn-dark" v-b-modal.modal-prevent-closing>Novo desenvolvedor</b-button>

    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Novo Desenvolvedor"
        :hide-footer="true"
    >
      <form ref="form" @submit.prevent="createDeveloper" >
        <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Nome é obrigatório"
            :state="nameState"
        >
          <b-form-input
              id="name-input"
              v-model="model.name"
              :state="nameState"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Sexo"
            label-for="name-input"
            invalid-feedback="Sexo é obrigatório"
            :state="sexState"
        >
          <b-form-select
              id="name-input"
              v-model="model.sex"
              :state="sexState"
              required
              :options="sexOptions"
              class="form-select"
          ></b-form-select>
        </b-form-group>

        <b-form-group
            label="Idade"
            label-for="name-input"
            invalid-feedback="idade é obrigatória"
            :state="ageState"
        >
          <b-form-input
              id="name-input"
              v-model="model.age"
              :state="ageState"
              type="number"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Hobby"
            label-for="name-input"
            invalid-feedback="hobby é obrigatório"
            :state="hobbyState"
        >
          <b-form-input
              id="name-input"
              v-model="model.hobby"
              :state="hobbyState"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Data de nascimento"
            label-for="name-input"
            invalid-feedback="hobby é obrigatório"
            :state="dateState"
        >
          <b-form-datepicker
              id="name-input"
              v-model="model.birthdate"
              :state="dateState"
              type="number"
              required
          ></b-form-datepicker>
        </b-form-group>
        <div class="mt-3">
          <button type="submit" class="btn btn-sm btn-primary">Salvar</button>
        </div>

      </form>
    </b-modal>
  </div>
</template>

<script>
import Developer from "../core/models/Developer";
import sexOptions from "@/helpers/sexOptions";
import apiRoutes from "@/helpers/apiRoutes";
import http from "@/services/http";

export default {
  name: "ModalNewDeveloper",
  data() {
    return {
      model: new Developer(),
      sexOptions
    }
  },
  computed: {
    nameState() {
      return this.model.name.length >= 1;
    },
    ageState() {
      return this.model.age >= 1;
    },
    sexState() {
      return this.model.sex.length >= 1;
    },
    hobbyState() {
      return this.model.hobby.length >= 1;
    },
    dateState() {
      return this.model.birthdate.length >= 1
    }
  },
  methods: {
    createDeveloper() {
      console.log(this.model)
      http.post(apiRoutes.developers, this.model).then(({data}) => {
        alert('Novo registro inserido!');
        this.closeModal();
        return this.$emit('created', data.content);
      }).catch(err => console.log(err))
    },
    closeModal() {
      this.model = new Developer();
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>

<style scoped>

</style>