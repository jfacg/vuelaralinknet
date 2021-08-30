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
                  <h2>Lista de Projetos</h2>
                </v-col>
                <v-col>

                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    color="primary"
                    elevation="10"
                    :to="{name: 'projectCreateUpdate', params: {type: 'create', id:'0'}}"
                    exact
                    @click.stop="$emit('input', false)"
                    link
                  >
                    Novo Projeto
                    <v-icon right>add</v-icon>
                  </v-btn>
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
                      Placa da OLT
                    </th>
                    <th class="text-left">
                      Porta da OLT
                    </th>
                    <th class="text-left">
                      Qt. Caixas
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="project in filtereds"
                    :key="project.id"
                  >
                    <td>{{ project.name }}</td>
                    <td>{{ project.oltSlot }}</td>
                    <td>{{ project.oltPort }}</td>
                    <td>
                      <router-link :to="{name:'projectBoxes', params: {id:project.id} }">{{project.numberBoxes}}</router-link>
                    </td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'projectShow', params: {id: project.id}}"
                        @click.stop="$emit('input', false)"
                      >
                        <v-icon>visibility</v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'projectCreateUpdate', params: {type: 'update', id:project.id}}"
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
  name: 'ProjectIndex',
  components: {},

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Projetos FTTH',
        disabled: true
      }
    ],
    search: '',
    projectList: [],
    number: 0

  }),

  mounted () {
    this.getProjects()
      .then(() => {
        this.projectList = this.projects.sort((a, b) => (a.oltSlot > b.oltSlot) ? 1 : ((b.oltSlot > a.oltSlot) ? -1 : 0))

        this.projectList = this.projectList.sort((a, b) => {
          if (a.oltSlot === b.oltSlot) {
            if (a.oltPort > b.oltPort) {
              return 1
            } else if (b.oltPort > a.oltPort) {
              return -1
            } else {
              return 0
            }
          }
        })
      })
  },

  computed: {
    ...mapState({
      projects: state => state.projects.projects
    }),
    filtereds: function () {
      return this.projectList.filter((project) => {
        return project.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },

  methods: {
    ...mapActions([
      'getProjects'
    ])

  }
}
</script>
