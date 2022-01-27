<template>
  <div>
    <b-button class="btn btn-dark" id="button-modal-open" v-b-modal.modal-prevent-closing>Novo desenvolvedor</b-button>

    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        :title="isEdit ? 'Editar Desenvolvedor' : 'Novo Desenvolvedor'"
        :hide-footer="true"
    >
      <form ref="form" @submit.prevent="submitForm" >
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
              :readonly="isReadOnly"
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
              :disabled="isReadOnly"
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
              :readonly="isReadOnly"
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
              :readonly="isReadOnly"
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
              :readonly="isReadOnly"
          ></b-form-datepicker>
        </b-form-group>
        <div class="mt-3">
          <button :disabled="isReadOnly" type="submit" class="btn btn-sm btn-primary">Salvar</button>
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
  name: "ModalDeveloper",
  data() {
    return {
      model: new Developer(),
      sexOptions,
      isEdit: false,
      developerId: null,
      isReadOnly: false
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
    submitForm() {
      if (!this.isEdit) return this.createDeveloper();
      return this.editDeveloper();
    },
    createDeveloper() {
      console.log(this.model)
      http.post(apiRoutes.developers, this.model).then(({data}) => {
        alert('Novo registro inserido!');
        this.closeModal();
        return this.$emit('created', data.content);
      }).catch(err => console.log(err))
    },
    closeModal() {
      this.isEdit = false;
      this.model = new Developer();
      this.isReadOnly = false;
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    editDeveloper() {
      http.put(`${apiRoutes.developers}/${this.developerId}`, this.model).then(() => {
        alert('Registro atualizado!');
        this.closeModal();
        return this.$emit('updated');
      }).catch(err => console.log(err));
    },
    getDeveloper(id) {
      http.get(`${apiRoutes.developers}/${id}`).then(({data}) => {
        this.model = data.content;
      }).catch(err => console.log(err))
    },

    isModalEdit(id) {
      this.getDeveloper(id)
      this.isEdit = true;
      this.developerId = id;
      this.isReadOnly = false;
    },

    isView(id) {
      this.getDeveloper(id);
      this.isEdit = false;
      return this.isReadOnly = true;
    }
  }
}
</script>

<style scoped>

</style>