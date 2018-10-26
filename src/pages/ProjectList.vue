<template>
  <v-layout align-space-around column>
    <v-toolbar card color="white">
      <v-toolbar-title>项目管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px" :disabled.native="model ==='projects-public'">
        <v-btn slot="activator" color="primary" dark class="mb-2"
          :disabled.native="model ==='projects-public'"
          >新建项目</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="名称"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 v-if= "this.editedIndex === -1">
                  <v-text-field v-model="editedItem.package" label="包名"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4 v-if= "this.model === 'projects-private'">
                  <v-checkbox label="公开" v-model="checkbox"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tabs
        slot="extension"
        v-model="model"
      >
        <v-tab :href="`#projects-private`">我的项目</v-tab>
        <v-tab :href="`#projects-team`">团队项目</v-tab>
        <v-tab :href="`#projects-public`">公开项目</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-divider></v-divider>
    <v-tabs-items v-model="model">
      <v-tab-item value="projects-team">
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="projects-public">
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="projects-private">
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="desserts"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.package }}</td>
              <td>{{ props.item.total }}</td>
              <td>{{ props.item.createdBy }}</td>
              <td>{{ props.item.createdAt | formatDate }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      model: 'projects-private',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      dialog: false,
      headers: [
        { text: '名称', value: 'name'},
        { text: '包名', value: 'package' },
        { text: '文件个数', value: 'total' },
        { text: '创建者', value: 'createdBy' },
        { text: '创建时间', value: 'createdAt' },
        { text: '操作', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '默认项目',
        createdBy: '张三',
        createdAt: 0,
        total: 10,
        package: 'com.sqlml.demo',
      },
      defaultItem: {
        name: '默认项目',
        createdBy: '张三',
        createdAt: 3306,
        total: 10,
        package: 'com.sqlml.demo',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '添加' : '编辑'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: '一个项目',
            createdBy: '李四',
            createdAt: +new Date(),
            total: 5,
            package: 'com.sqlml.editor',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>