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
                  <h2>Portas da Caixa: {{ box.name }}</h2>
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
                      Cód do Cabo
                    </th>
                    <th class="text-left">
                      Cliente
                    </th>
                    <th class="text-left">
                      Parceiro
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="port in box.ports"
                    :key="port.id"
                  >
                    <td>{{ port.name }}</td>
                    <td>{{ port.cableCode }}</td>
                    <td>
                      <v-dialog
                        transition="dialog-bottom-transition"
                        max-width="600"
                        v-if="port.client_ixc !== null"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                          >{{ (port.client_ixc !== null) ? port.client_ixc.razao : '' }}</div>
                        </template>
                        <template v-slot:default="dialog">
                          <v-card>
                            <v-toolbar
                              color="primary"
                              dark
                            >Dados do Cliente IXC</v-toolbar>
                            <v-card-text>
                              <div v-if="port.client_ixc !== null">
                                <br>
                                Nome: {{port.client_ixc.razao}} <br>
                                Endereço: {{port.client_ixc.endereco}} - {{port.client_ixc.numero}} <br>
                                Bairro: {{port.client_ixc.bairro}} - Cep: {{port.client_ixc.cep}}<br>
                              </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn
                                text
                                @click="dialog.value = false"
                              >Close</v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>

                    </td>
                    <td>{{ port.partner }}</td>
                    <td>{{ port.status }}</td>

                    <td>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'portCreateUpdate', params: {type: 'update', id:port.id}}"
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
  name: 'ProjectBoxPortList',
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
        to: { name: 'projects' },
        exact: true,
        link: true
      },
      {
        text: 'Caixas',
        disabled: false,
        to: { name: 'projectBoxes', params: {} },
        exact: true,
        link: true
      },
      {
        text: 'Portas',
        disabled: true
      }
    ],
    search: '',
    newBox: {}

  }),

  created () {
    const params = this.$route.params
    if (params.id !== 0) {
      this.getBox(params).then((response) => {
        this.newBox = this.box
      })
    }
    console.log(this.box)
    this.items[2].to.params = { id: this.box.project_id }
  },

  computed: {
    ...mapState({
      box: state => state.boxes.box
    })
  },

  methods: {
    ...mapActions([
      'getBox',
      'getClientIXC',
      'getPort'
    ])
  }
}
</script>
