<template>
  <v-container>
    <v-layout>
      <v-col
        cols="12"
        md="6"
        lg="3"
      >
        <v-card
          color="#385F73"
          dark
          outlined
          shaped
          hover
          :to="{name: 'projects'}"
        >
          <v-card-title>Projetos FTTH</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                Projetos: {{counts.projects}} <br>
                Caixas: {{counts.boxes.total}} <br>
                Portas: {{counts.ports.total}}
              </v-col>
              <v-col>
                Ativas: {{counts.projects}} <br>
                Ativas: {{counts.boxes.ativa}} <br>
                Ativas: {{counts.ports.ativa}}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>

    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  data: () => ({
    counts: {
      projects: 0,
      boxes: {
        total: 0,
        ativa: 0
      },
      ports: {
        total: 0,
        ativa: 0
      }
    }
  }),

  mounted () {
    this.getProjects()
      .then((response) => {
        this.counts.projects = this.projects.length
        this.projects.forEach(project => {
          this.counts.boxes.total = this.counts.boxes.total + project.numberBoxes
          this.counts.ports.total = this.counts.ports.total + (project.numberBoxes * project.numberBoxPorts)

          project.boxes.forEach(box => {
            if (box.status === 'ATIVA') {
              this.counts.boxes.ativa = this.counts.boxes.ativa + 1
            }
            box.ports.forEach(port => {
              if (port.status === 'ATIVA' || port.status === 'OCUPADA') {
                this.counts.ports.ativa = this.counts.ports.ativa + 1
              }
            })
          })
        })
      })
  },

  computed: {
    ...mapState({
      projects: state => state.projects.projects
    })
  },

  methods: {
    ...mapActions([
      'getProjects'
    ])

  }
}
</script>
