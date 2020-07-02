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

          <v-btn :disabled="selectedItem.length<=0" color="primary" @click="optionNames">
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
                             <v-btn @click="deleteFromCart(i)" >
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
  
  //when page is loaded, role is designated
  created() {
    this.anon = this.$store.state.role == "anon";
  },
  
  //data to be returned/used
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
      order: [],
    };
  },

  //when view is loaded, calls methods
  mounted() {
    this.loadMenuItems();
  },

  methods: {
    
    //Get items to display
    loadMenuItems() {
      this.items = this.$store.state.items
      this.loadMenuOptions()
    },

    //Gets options to display
    loadMenuOptions() {
      this.ops = this.$store.state.ops
      console.log("ops: ",this.ops)
    },

    //Gets the name of the options for the selected item
    optionNames: function() { 
      console.log("Num items selected: ", this.selectedItem.length)
      //double for-each loop to compare ids that determine which options correspond to the item selected
      this.selectedItem.forEach((item) => {
        this.ops.forEach((op) => {
          if (op.menuid == item.id) {
            this.options.push(op);
            this.itemName = item.name;
          }
        });
      });
     //next page
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
      //adds the item price to the entree price
      this.selectedItem.forEach((item) => {
        this.entree += parseFloat(item.price)
      });
      //adds the option price to the entree price
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
      //if the quantity is zero, nothing added to the cart
      if(this.quantity == 0){
        this.e1=4
        return;
      }
      //create a new cart item, assign values based on entree
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
      //add to the cart
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

    //undo the addition of the cart, takes the user back to quanitity page
    backCart(){
      console.log("Quantity: ",this.quantity)
      if(this.quantity == 0){
        //if the previous quantity was zero, take the user back
        this.e1 = 3
        this.quantity = 1
        this.entreeTotal = this.entree + this.quantity
      }
      else {
        //remove the item and options from the cart
        this.overallTotal -= this.entreeTotal
        this.entreeTotal = 0
        this.cart.pop();
        this.cart.pop().quant;
        this.getEntreePrice()
        this.e1=3
        console.log(this.cart)
      }
      
    },

    //delete item and corresponding options from cart
    deleteFromCart(i){
      console.log("clciked", i)
      const c = confirm('Are you sure you want to delete this item?');
      if(c == false){
        return;
      }
      //update price
      this.overallTotal -= parseFloat(this.cart[i].price*this.cart[i].quant).toFixed(2)
      this.cart[i].opt.forEach((op) => {
        this.overallTotal -= parseFloat(op.price*this.cart[i].quant).toFixed(2)
      })
      this.cart.splice(i, 2);
      this.overallTotal = (this.overallTotal).toFixed(2)
    },

    //checkout
    checkout(){
      this.newOrder()
      this.$store.commit("orderPlaced", "true")
    },

    //create new order
    newOrder(){
      const urladdOrder = "http://localhost:8080/order/add"; // site that doesn’t send Access-Control-*
      const data = new URLSearchParams();
      data.append('userId', this.$store.state.id);
      //fetch post method to add order to database
      fetch(urladdOrder, {
      method: 'post',
      body: data,
      }).then((response) => response.text())
      .then(result => {
        this.order = JSON.parse(result)
        console.log(this.order.id)
        //store the id of the order
        this.$store.commit('handleOrderId', JSON.stringify(this.order.id))
        console.log(this.$store.state.orderId)
        this.orderId = parseInt(this.$store.state.orderId)
        //call for the items in the order to be added
        this.addOrderItems()
      })

      .catch(() => console.log("Can’t access " + urladdOrder + " response. Blocked by browser?")) 
    },

    //add items in the order to database
    addOrderItems(){
      const urladdOrderItem = "http://localhost:8080/order/items/add"; // site that doesn’t send Access-Control-*
      this.cart.forEach((item) => {
        if(!item){
          return;
        }
        //call for each option in the item to be added
        this.addOrderOption(item.opt, this.orderId, item.quant)
        const data = new URLSearchParams();
        //parse through array and add each item to body
        data.append('orderId', this.orderId);
        data.append('menuId', String(item.id));
        data.append('quantity',item.quant);
        data.append('price',item.price);
        //fetch post method to add item to database
        fetch(urladdOrderItem, {
        method: 'post',
        body: data,
        }).then((response) => { 
        console.log(response)
        })
        .catch(() => console.log("Can’t access " + urladdOrderItem + " response. Blocked by browser?"))
      })
     
    },

    //add item options to database
    addOrderOption(opt, orderId, quantity){
      const urladdOrderOption = "http://localhost:8080/order/options/add"; // site that doesn’t send Access-Control-*
      opt.forEach((op) => {
        //pasrse through array and add each option to body data
        const data = new URLSearchParams();
        data.append('orderId', orderId);
        data.append('menuOpId', String(op.id));
        data.append('quantity',quantity);
        data.append('price',op.price);
        //fetch post method to add item options to database
        fetch(urladdOrderOption, {
        method: 'post',
        body: data,
        }).then((response) => { 
        console.log(response)
        //push user to contact page
        this.$router.push('/contact')
        })
        .catch(() => console.log("Can’t access " + urladdOrderOption + " response. Blocked by browser?"))
      })
    }
  

  },
};
</script>
<style scoped>
</style>