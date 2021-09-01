<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <h2>Lista de Caixas</h2>
                </v-col>
                <v-col>
                  <v-text-field
                    prepend-icon="search"
                    name="filter"
                    label="Search"
                    type="text"
                    v-model="search"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Endereço
                    </th>
                    <th class="text-left">
                      Sinal
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Qt. Portas
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="box in filtereds"
                    :key="box.id"
                  >
                    <td>{{ box.name }}</td>
                    <td>{{ box.address }}</td>
                    <td>{{ box.signal }}</td>
                    <td>{{ box.status }}</td>
                    <td>
                      <router-link :to="{name:'projectBoxesPorts', params: {id:box.id} }">{{box.numberPorts}}</router-link>
                    </td>
                    <td>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'boxCreateUpdate', params: {type: 'update', id:box.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProjectBoxList',
  components: {},

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Projetos',
        disabled: false,
        to: '/projects',
        exact: true,
        link: true
      },
      {
        text: 'Caixas',
        disabled: true
      }
    ],
    search: '',
    boxes: []

  }),

  mounted () {
    const params = this.$route.params
    if (params.id !== 0) {
      this.getProject(params).then((response) => {
        this.boxes = this.project.boxes
      })
    }
  },

  computed: {
    ...mapState({
      project: state => state.projects.project
    }),
    filtereds: function () {
      return this.boxes.filter((box) => {
        // return (box.address ? box.address : '').toLowerCase().indexOf(this.search.toLowerCase()) > -1
        return (box.address ? box.address : '').toLowerCase().match(this.search.toLowerCase())
      })
    }
  },

  methods: {
    ...mapActions([
      'getProject'
    ])
  }
}
</script>
