<!-- <template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :single-select="singleSelect"
      item-key="name"
      show-select
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ item }">
        <tr v-for="op in ops" :key="op.id">
          <div v-if="op.menuid == item.id">
              <v-sheet class="mx-auto" max-width="700" v-if="op.price == 0">
                <v-slide-group multiple show-arrows>
                  <v-slide-item
                    v-slot:default="{ active, toggle }"
                  >
                    <v-btn
                      class="mx-2"
                      :input-value="active"
                      active-class="purple white--text"
                      depressed
                      rounded
                      @click="toggle"
                    >
                      Includes {{ op.name }}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
              <v-sheet class="mx-auto" max-width="700" v-else>
                <v-slide-group multiple show-arrows>
                  <v-slide-item
                    v-slot:default="{ active, toggle }"
                  >
                    <v-btn
                      class="mx-2"
                      :input-value="active"
                      active-class="purple white--text"
                      depressed
                      rounded
                      @click="toggle"
                    >
                      {{ op.name }} for ${{ op.price }}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
          </div>
        </tr>
      </template>
    </v-data-table>
    <p>{{ selected }}</p>
  </div>
</template>

<script> -->
/*export default { data() { return { singleSelect: false, dialog: false,
selected: [], headers: [ { text: "Name", align: "start", sortable: true, value:
"name", }, { text: "Price", value: "price" }, ], items: [], ops: [], editedItem:
{ name: "", price: "", }, }; }, mounted() { this.show(); }, methods: { show() {
//DISPLAY ITEMS const urlall = "http://localhost:8080/menu/all"; fetch(urlall,
{}) .then((response) => response.json()) .then((data) => (this.items = data))
.then((response) => { console.log(response); this.showop(); }) .catch((err) =>
console.log(err)); }, showop() { //DISPLAY CUST const urlall =
"http://localhost:8080/option/all"; fetch(urlall, { //headers: { //}, })
.then((response) => response.json()) .then((data) => (this.ops = data))
.catch((err) => console.log(err)); //router.push("login"); }, close() {
this.dialog = false; this.$nextTick(() => { this.editedItem = Object.assign({},
this.defaultItem); this.editedIndex = -1; }); }, save() { if (this.editedIndex >
-1) { this.update(this.editedItem); } else { this.submit(); } }, }, }; */
<!-- </script> -->

<template>
  <div>
    <h1 class="center" v-if="anon" >You must sign in or sign up to place an order! </h1>
    <v-stepper v-model="e1" v-if="!anon">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Entree</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Customizations</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">Notes</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">Cart</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1">
            <template>
              <v-data-table
                scrollable
                v-model="selectedItem"
                :headers="headers"
                :items="items"
                :single-select="true"
                item-key="name"
                show-select
                class="elevation-1"
              >
                <template v-slot:top>
                  <h1>Step 1: Choose Your Entree</h1>
                </template>
              </v-data-table>
            </template>
          </v-card>

          <v-btn color="primary" @click="optionNames">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1">
            <template>
              <v-data-table
                v-model="selectedOption"
                :headers="headers"
                :items="options"
                item-key="name"
                show-select
                class="elevation-1"
              >
                <template v-slot:top>
                  <h1>Step 2: Customize {{ itemName }}</h1>
                </template>
              </v-data-table>
            </template>
          </v-card>

          <v-btn color="primary" @click="getEntreePrice">
            Continue
          </v-btn>

          <v-btn text @click="backItems">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <!-- <h1 >Confirm Entree</h1> -->
          <td class="px-2">
          <v-card  color="grey lighten-1" width="400" >
            <v-simple-table>
              <template wv-slot:default >
                <tbody>
                  <tr v-for="item in selectedItem" :key="item.name" >
                    <td>{{ item.name }}.........................${{item.price}}</td>
                  </tr>
                </tbody>
                <v-spacer></v-spacer>
                <tbody>
                  <tr v-for="op in selectedOption" :key="op.name">
                    <th v-if="op.price == 0">
                     <td >Add {{ op.name }}</td>
                    </th>
                    <th v-else>
                      <td >Add {{ op.name }} for ${{op.price}}</td>
                    </th>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            
            </v-card>
          </td>
          <td class="px-2">
          <v-card  color="grey lighten-1" width="200" >
            <v-simple-table>
              <template wv-slot:default >
                <tbody class="center">
                  <v-row
                 align="center"
                 justify="center"
               >
                 <v-col cols="12">
                   <p class="text-center">Quantity</p>
                 </v-col>
                 <v-btn-toggle
                  >
                    <v-btn @click="decQ">
                      <v-icon>mdi-minus-box</v-icon>
                   </v-btn>
                   <h1 class="mx-2 pa-2">{{quantity}}</h1>
                   <v-btn @click="incQ">
                     <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
                </tbody>
              </template>
            </v-simple-table>
            
            </v-card>
          </td>
          
            <v-card-title  class="mx-12"	> Entree total is: ${{entreeTotal}} </v-card-title>

          <v-btn color="primary" @click="toCart">
            Add To Cart
          </v-btn>

          <v-btn text @click="backOptions">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <h1> Your Cart </h1>
          <v-card  color="grey lighten-1" class="mx-auto" max-width="500"> 
            <v-list  >
            <v-list-item-group
               v-model="model"
               
             >
                <template v-for="(item, i) in cart">
                 <v-divider
                    v-if="!item"
                    :key="`divider-${i}`"
                 ></v-divider>

                  <v-list-item
                    v-else
                    :key="`item-${i}`"
                    :value="item"
                    
               >
                   <template v-slot:default>
                      <v-list-item-content >
                       <v-list-item-title >
                         <v-row>
                           <v-col>
                              <pre> {{item.quant}}: &emsp;  {{item.name}} &#9; ${{item.price}}</pre>
                           </v-col>
                           <v-col>
                             <v-btn @click="logIt(i)" >
                              <v-icon color="red" >mdi-delete</v-icon>
                             </v-btn>
                           </v-col>
                         </v-row>
                         </v-list-item-title>
                       <div v-for="op in item.opt" v-bind:key="op.id">
                          <v-list-item-subtitle ><pre> &#9;Add {{op.name}} +${{op.price}}</pre> </v-list-item-subtitle>
                       </div>
                      </v-list-item-content>
                   </template>
                 </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
         </v-card>
          <h1> Overall Total: ${{overallTotal}}</h1>
          <v-btn color="primary" @click="addMore">
            Add More
          </v-btn>
          <v-btn class="mx-2" @click="backCart">
            Cancel
          </v-btn>
          <v-row >
            <v-col>
              <v-btn color="primary" class="right" @click="checkout">
                Checkout
               </v-btn>
            </v-col>
          </v-row>
          
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
     <p>Entree: {{ entree }}</p>
     <p>Entree Total: {{ entreeTotal }}</p>
     <p>overallTotal: {{ overallTotal }}</p>
   

  </div>
</template>

<script>
export default {
  created() {
    this.anon = this.$store.state.role == "anon";
  },
  data() {
    return {
      anon: '',
      e1: 1,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Price", value: "price" },
      ],
      items: [],
      ops: [],
      selectedItem: [],
      selectedOption: [],
      options: [],
      model:[],
      itemName: "your Entree",
      entree: 0,
      entreeTotal: 0,
      overallTotal: 0,
      quantity: 1,
      cart: [],
      cartItems: [],
      cartOptions: [],
      order: []
    };
  },

  mounted() {
    this.show();
  },

  methods: {
    //Get items to display
    show() {
      // //DISPLAY ITEMS
      // const urlall = "http://localhost:8080/menu/all";
      // fetch(urlall, {})
      //   .then((response) => response.json())
      //   .then((data) => (this.items = data))
      //   .then((response) => {
      //     console.log(response);
      //     this.showop();
      //   })
      //   .catch((err) => console.log(err));
      this.items = this.$store.state.items
      this.showop()
    },

    //Gets options to display
    showop() {
      // //DISPLAY CUST
      // const urlall = "http://localhost:8080/option/all";
      // fetch(urlall, {
      //   //headers: {
      //   //},
      // })
      //   .then((response) => response.json())
      //   .then((data) => (this.ops = data))
      //   .catch((err) => console.log(err));
      //router.push("login");
      this.ops = this.$store.state.ops
      console.log("ops: ",this.ops)
    },

    //Gets the name of the options for the selected item
    optionNames() {
      this.selectedItem.forEach((item) => {
        this.ops.forEach((op) => {
          if (op.menuid == item.id) {
            this.options.push(op);
            this.itemName = item.name;
          }
        });
      });
      this.e1 = 2;
      return this.options;
    },
   
      //Increases the quantity, adjusts price accoringly
    incQ(){
      this.quantity++;
      this.entreeTotal = (this.quantity*this.entree).toFixed(2)
    },

      //Decreases the quantity, adjusts price accoringly
    decQ(){
      this.quantity--;
      if(this.quantity < 0){
        this.quantity=0
      }
      this.entreeTotal = (this.quantity*this.entree).toFixed(2)
    },

      //Gets the price of the entree the user has selected
    getEntreePrice(){
      this.quantity = 1
      this.entree = 0
      this.selectedItem.forEach((item) => {
        this.entree += parseFloat(item.price)
      });
      this.selectedOption.forEach((op) => {
          this.entree += parseFloat(op.price)
      });
      this.entreeTotal = (this.entree).toFixed(2)
      this.e1=3
    },

   
    //Reset Selected Options array when the user goes back
    backItems() {
      this.selectedItem = []
      this.options = []
      this.backOptions()
      this.getEntreePrice()
      this.e1 = 1
    },

    //Reset Selected Options array when the user goes back
    backOptions() {
      this.selectedOption = []
      this.quantity = 1
      this.entreeTotal = 0
      this.getEntreePrice()
      this.e1 = 2
    },

    //Prepares items for cart
   toCart(){
      this.overallTotal += parseFloat(this.entreeTotal)
      //this.overallTotal = parseFloat(String(this.overallTotal).replace(/^0/, '')).toFixed(2)
      this.entree=0
      //this.entreeTotal=0
      if(this.quantity == 0){
        this.e1=4
        return;
      }
      let cartItem = {
        name: '',
        id: 0,
        price: '',
        opt: [],
        quant: 0,
      };
      cartItem.name = this.selectedItem[0].name;
      cartItem.id = this.selectedItem[0].id
      this.selectedOption.forEach((sel)=>{
        cartItem.opt.push(sel)
      })
      cartItem.price = this.selectedItem[0].price;
      cartItem.quant = this.quantity;
      this.e1 = 4
      this.cart.push(cartItem)
      this.cart.push('')
      console.log(cartItem)
  },

      //Resets cart for user to get more
    addMore(){
      this.entreeTotal = 0
      this.selectedItem = []
      this.options = []
      this.selectedOption = []
      this.quantity = 1
      this.e1 = 1
    },

    backCart(){
      this.overallTotal -= this.entreeTotal
      this.entreeTotal = 0
      this.cart.pop();
      this.cart.pop().quant;
      this.getEntreePrice()
      this.e1=3
      console.log(this.cart)
    },

    logIt(i){
      console.log("clciked", i)
      const c = confirm('Are you sure you want to delete this item?');
      if(c == false){
        return;
      }
      this.overallTotal -= parseFloat(this.cart[i].price*this.cart[i].quant).toFixed(2)
      this.cart[i].opt.forEach((op) => {
        this.overallTotal -= parseFloat(op.price*this.cart[i].quant).toFixed(2)
      })
      this.cart.splice(i, 2);
      this.overallTotal = (this.overallTotal).tofixed(2)
    },

    checkout(){
      this.newOrder()
      //this.addOrderItems()
    },

    newOrder(){
      const urladdOrder = "http://localhost:8080/order/add"; // site that doesn’t send Access-Control-*
      const data = new URLSearchParams();
      data.append('userId', this.$store.state.id);
      fetch(urladdOrder, {
      method: 'post',
      body: data,
      }).then((response) => response.text())
      .then(result => {
        this.order = JSON.parse(result)
        console.log(this.order.id)
        this.$store.commit('handleOrderId', JSON.stringify(this.order.id))
        console.log(this.$store.state.orderId)
        this.orderId = parseInt(this.$store.state.orderId)
        this.addOrderItems()
      })

      .catch(() => console.log("Can’t access " + urladdOrder + " response. Blocked by browser?")) 
    },

    addOrderItems(){
      const urladdOrderItem = "http://localhost:8080/order/items/add"; // site that doesn’t send Access-Control-*
      this.cart.forEach((item) => {
        if(!item){
          return;
        }
        this.addOrderOption(item.opt, this.orderId, item.quant)
        const data = new URLSearchParams();
        data.append('orderId', this.orderId);
        data.append('menuId', String(item.id));
        data.append('quantity',item.quant);
        data.append('price',item.price);
        fetch(urladdOrderItem, {
        method: 'post',
        body: data,
        }).then((response) => { 
        console.log(response)
        })
        .catch(() => console.log("Can’t access " + urladdOrderItem + " response. Blocked by browser?"))
      })
     
    },

    addOrderOption(opt, orderId, quantity){
      const urladdOrderOption = "http://localhost:8080/order/options/add"; // site that doesn’t send Access-Control-*
      opt.forEach((op) => {
        const data = new URLSearchParams();
        data.append('orderId', orderId);
        data.append('menuOpId', String(op.id));
        data.append('quantity',quantity);
        data.append('price',op.price);
        fetch(urladdOrderOption, {
        method: 'post',
        body: data,
        }).then((response) => { 
        console.log(response)
        })
        .catch(() => console.log("Can’t access " + urladdOrderOption + " response. Blocked by browser?"))
      })
    }
  

  },
};
</script>
<style scoped>
</style>