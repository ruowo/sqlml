<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <v-list dense>
          <template v-for="item in items">
            <v-list-tile :key="item.text" @click="$router.push(item.route)">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">SQLML</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </v-container>
      </v-content>
    </v-app>
    <v-snackbar
      v-model="snackbar.show"
      style="margin-top:10px"
      :color="snackbar.color"
      :timeout="3000"
      :top = "true"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click="snackbar.show = false">关闭</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data: () => ({
      snackbar: {
        show: false,
        color: '',
        text: ''
      },
      drawer: null,
      items: [
        { icon: 'folder', text: '包管理', route: {name:'packages'} },
        { icon: 'dashboard', text: '项目管理', route: {name: 'projects'}},
        { icon: 'settings', text: '连接管理', route: {name:'conns'} },
      ]
    }),
    created () {
      Vue.prototype.$snack = this.snack.bind(this)
    },
    methods: {
      snack (color, text) {
        Object.assign(this.snackbar, {
          text: text,
          color: color,
          show: true
        })
      }
    }
  }
</script>
