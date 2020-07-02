<template>
  <div>
    <h1 v-if="anon"> You must sign in or sign up before viewing the menu! </h1>
    <v-data-table
      v-if="visible"
      ref="dTable"
      :headers="headers"
      :items="items"
      sort-by="name"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="pink darken-4">
          <v-toolbar-title>CafeGoogoo Menu</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="deep-purple lighten-1" dark class="ma-2" v-on="on"
                >New Item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formItemTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Item name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog2" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="light-blue darken-4" dark class="ma-2" v-on="on"
                >New Option</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formOptionTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu open-on-hover top offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn color="primary" dark v-on="on">
                            {{ title }}
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, name) in items"
                            :key="name"
                            @click="menuop(item)"
                          >
                            <v-list-item-title>{{
                              item.name
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedOption.name"
                        label="Option name"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedOption.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeop"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveMenuOption">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          v-if="editable"
          color="cyan darken-1"
          class="mr-2"
          @click="edit(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="editable"
          small
          color="red lighten-1"
          @click="deleteItem(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:expanded-item="{ item }">
        <tr v-for="op in ops" :key="op.id">
          <div v-if="op.menuid == item.id">
            <th v-if="op.price == 0">Includes {{ op.name }}</th>
            <th v-else>Add {{ op.name }} for ${{ op.price }}</th>
            <td>
              <v-icon
                small
                color="cyan darken-1"
                class="mr-2"
                @click="editop(op)"
              >
                mdi-pencil
              </v-icon>
              <v-icon color="red lighten-1" small @click="deleteOp(op.id)">
                mdi-delete
              </v-icon>
            </td>
          </div>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="loadMenuItems">Reset</v-btn>
      </template>
    </v-data-table>

    <v-card color="pink-darken-4" class="mx-auto" max-width="500" v-if="!visible">
      <h1 class="center">CAFE GOOGOO MENU </h1>
      <v-list>
        <v-list-item-group v-model="model">
          <template v-for="(item, i) in itemsList">
            <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>
            <v-list-item v-else :key="`item-${i}`" :value="item">
              <template v-slot:default>
                <v-list-item-content>
                  <v-list-item-title>
                          {{ item.name }} &#9; ${{ item.price }}
                  </v-list-item-title>
                  <div v-for="op in ops" v-bind:key="op.id">
                    <v-list-item-subtitle v-if="op.menuid == item.id"
                      ><pre> &#9;Add {{ op.name }} +${{ op.price }}</pre>
                    </v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  //when page is loaded, role is designated
  created() {
    this.visible = this.$store.state.role == "ROLE_ADMIN";
    this.anon = this.$store.state.role == "anon";
  },

  //data returned
  data: () => ({
    editable: true,
    anon:'',
    title: "Menu Item",
    dialog: false,
    dialog2: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Price", value: "price" },
      { text: "ID", value: "id" },
      { text: "Action", value: "actions", sortable: false },
    ],
    items: [],
    model: [],
    itemsList: [],
    ops: [],
    editedIndex: -1,
    editedOpIndex: -1,
    editedItem: {
      name: "",
      price: "",
    },
    editedOption: {
      menuid: "",
      name: "",
      price: "",
    },
    defaultItem: {
      name: "",
      price: "",
    },
    defaultOption: {
      menuid: "",
      name: "",
      price: "",
    },
  }),

  computed: {
    //determines form title for menu item to be edited or created
    formItemTitle() {
      console.log(this.editedIndex);
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    //determines the form title for menu option to be edited or created
    formOptionTitle() {
      console.log(this.editedOpIndex);
      return this.editedOpIndex === -1 ? "New Option" : "Edit Option";
    },
  },

  //recurring data checks
  watch: {
    dialog(val) {
      val || this.close();
    },

    dialog2(val) {
      val || this.closeop();
    },

    created() {
      this.loadMenuItems();
    },
  },

  //when view is loaded, calls methods
  mounted() {
    this.loadMenuItems();
    this.loadMenuOptions();
    this.makeItemsList();
  },

  methods: {
    
    /////////////////////MENU ITEMS////////////////////
    
    //Add item
    submit() {
      //ADD ITEM
      console.log(this.editedItem.name, this.editedItem.price);
      const urladd = "http://localhost:8080/menu/add"; // site that doesn’t send Access-Control-*
      const data = new URLSearchParams();
      data.append("name", this.editedItem.name);
      data.append("price", this.editedItem.price);
      //fetch post method to add menu item
      fetch(urladd, {
        method: "post",
        body: data,
      })
        .then((response) => {
          console.log(response);
          this.loadMenuItems();
          this.close();
        })
        .catch(() =>
          console.log(
            "Can’t access " + urladd + " response. Blocked by browser?"
          )
        );
    },

    //Get and display items
    loadMenuItems() {
      this.items = this.$store.state.items;
    },

    //Clear new item form
    clear() {
      this.name = "";
      this.price = "";
    },

    //Delete item
    deleteItem(id) {
      //DELETE ITEMS
      const urldelete = "http://localhost:8080/menu" + "/" + id;
      console.log(id);
      const c = confirm("Are you sure you want to delete this item?");
      if (c == false) {
        return;
      }
      //fetch delete method to delete item
      fetch(urldelete, {
        method: "delete",
      })
        .then((response) => {
          response.json();
          //update view
          this.loadMenuItems();
          this.loadMenuOptions();
        })
        .catch((err) => console.log(err));
    },

    //Close item form
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //Edit item form
    edit(item) {
      this.editedIndex = 0;
      this.editedItem = Object.assign({}, item);
      console.log(item.name);
      this.dialog = true;
    },

    //Decide to update or save item
    save() {
      //for edited items
      if (this.editedIndex > -1) {
        this.update(this.editedItem);
      //for new items
      } else {
        this.submit();
      }
    },

    //Update item
    update(editedItem) {
      //UPDATE ITEM
      const urlupdate = "http://localhost:8080/menu" + "/" + this.editedItem.id;
      //fetch put method to update items
      fetch(urlupdate, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify(editedItem),
      })
        .then((response) => {
          response.json();
          //update view
          this.close();
          this.loadMenuItems();
          this.loadMenuOptions();
        })
        .catch((err) => console.log(err));
    },

    ////////////////////OPTIONS//////////////////////////
    
    //Add Option
    submitOption() {
      console.log(this.menuid, this.option, this.priceop);
      const urladd = "http://localhost:8080/option/add"; // site that doesn’t send Access-Control-*
      //ADD OPTION
      const data = new URLSearchParams();
      data.append("menuid", this.editedOption.menuid);
      data.append("name", this.editedOption.name);
      data.append("price", this.editedOption.price);
      //fetch post method to add menu option
      fetch(urladd, {
        method: "post",
        body: data,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 500) {
            alert("Bad request bruv");
          }
          //update view
          this.loadMenuOptions();
          this.loadMenuItems();
          this.clearop();
          this.closeop();
        })
        .catch(() =>
          console.log(
            "Can’t access " + urladd + " response. Blocked by browser?"
          )
        );
    },

    //Display options
    loadMenuOptions() {
      this.ops = this.$store.state.ops
    },

    //Clear Option Form
    clearop() {
      this.menuid = "";
      this.option = "";
      this.priceop = "";
    },

    //Delete Option
    deleteOp(id) {
      const urldelete = "http://localhost:8080/option" + "/" + id;
      console.log(id);
      //confirm user wants to delete menu option
      const c = confirm("Are you sure you want to delete this item?");
      if (c == false) {
        return;
      }
      //fetch delete method to delete menu option
      fetch(urldelete, {
        method: "delete",
      })
        .then((response) => {
          response.json();
          //update view
          this.loadMenuItems();
          this.loadMenuOptions();
        })
        .catch((err) => console.log(err));
    },

    //Close Option Form
    closeop() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedOption = Object.assign({}, this.defaultOption);
        this.editedOpIndex = -1;
        this.title = "Menu Item";
      });
    },

    //Display Dropdown title based on menu id
    menuop(i) {
      this.editedOption.menuid = String(i.id);
      this.title = i.name;
    },

    //Edit Option Form
    editop(op) {
      this.editedOpIndex = 0;
      this.editedOption = Object.assign({}, op);
      //for-each loop to determine the options that correspond to each item
      this.items.forEach((item) => {
        if (item.id == this.editedOption.menuid) {
          this.title = item.name;
        }
      });

      console.log(op.name);
      this.dialog2 = true;
    },

    //Decide to either save or update option
    saveMenuOption() {
      //if updating menu option
      if (this.editedOpIndex > -1) {
        this.updateop(this.editedOption);
      //if creating new menu option
      } else {
        this.submitOption();
      }
    },

    //Update Option
    updateop(editedOption) {
      const urlupdate =
        "http://localhost:8080/option" + "/" + this.editedOption.id;
      //fetch put method to update menu options
      fetch(urlupdate, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify(editedOption),
      })
        .then((response) => {
          response.json();
          //update view
          this.closeop();
          this.loadMenuItems();
          this.loadMenuOptions();
        })
        .catch((err) => console.log(err));
    },

    //add space between each item in the menu items array to create table with spacer
    makeItemsList() {
      this.items.forEach((item) => {
        this.itemsList.push(item);
        this.itemsList.push('');
      })
      console.log(this.itemsList)
  }
  },
};
</script>
