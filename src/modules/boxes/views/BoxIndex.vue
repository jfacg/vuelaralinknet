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
            <div>
              <h2>Lista de Caixas</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                :to="{name: 'boxCreateUpdate', params: {type: 'create', id:'0'}}"
                exact
                @click.stop="$emit('input', false)"
                link
              >
                Novo Projeto
                <v-icon right>add</v-icon>
              </v-btn>
            </div>

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
                    v-for="box in boxes"
                    :key="box.id"
                  >
                    <td>{{ box.name }}</td>
                    <td>{{ box.address }}</td>
                    <td>{{ box.status }}</td>
                    <td>{{box.numberPorts}}</td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'boxShow', params: {id: box.id}}"
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
                        :to="{name: 'boxCreateUpdate', params: {type: 'update', id:box.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <!-- <v-btn
                        color="segunary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'boxPermission', params: {id:project.id}}"
                      >
                        <v-icon>lock</v-icon>
                      </v-btn> -->

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
        text: 'Caixas',
        disabled: true
      }

    ]

  }),

  mounted () {
    this.getBoxes()
  },

  computed: {
    ...mapState({
      boxes: state => state.boxes.boxes
    })
  },

  methods: {
    ...mapActions([
      'getBoxes'
    ])
  }
}
</script>
