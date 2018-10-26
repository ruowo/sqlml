<template>
  <v-layout align-space-around column>
    <v-toolbar card color="white">
      <v-toolbar-title>连接管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">新建连接</v-btn>
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
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.host" label="地址"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.port" label="端口"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userName" label="用户名"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="password" v-model="editedItem.password" label="密码"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn flat small @click.native="test">测试</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.host }}</td>
        <td>{{ props.item.port }}</td>
        <td>{{ props.item.userName }}</td>
        <td>{{ props.item.type }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '名称', value: 'name'},
        { text: '主机/IP', value: 'host' },
        { text: '端口', value: 'port' },
        { text: '用户名', value: 'userName' },
        { text: '类型', value: 'type' },
        { text: '操作', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '默认连接',
        host: 'localhost',
        port: 3306,
        userName: 'root',
        password: '',
        type: 'mysql',
      },
      defaultItem: {
        name: '默认连接',
        host: 'localhost',
        port: 3306,
        userName: 'root',
        password: '',
        type: 'mysql',
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
            name: 'Frozen Yogurt',
            host: 'localhost',
            port: 3306,
            userName: 'root',
            password: '',
            type: 'mysql',
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
      },
      test () {
        this.$snack('info', '连接成功')
        // this.$snack('error', '连接失败')
      }
    }
  }
</script>