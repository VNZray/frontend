<template>
  <v-dialog v-model="itemingredienttable" max-width="600px">
    <v-card>
      <v-card-title>
        Ingredients for {{ menuItem.menuitem_name }}
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="ingredients" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteIngredient(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Delete Dialog -->
  <v-dialog v-model="deleteMenuitemIngredientDialog" max-width="500px">
    <v-card>
      <v-card-title>Delete Menuitem Ingredient</v-card-title>
      <v-card-text>Are you sure you want to delete this menuitem ingredient?</v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="deleteMenuitemIngredient">Delete</v-btn>
        <v-btn color="blue" text @click="cancelDeleteMenuitemIngredient">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import axios from 'axios';

export default {
  name: "MenuitemIngredientsTable",
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      itemingredienttable: false,
      ingredients: [],
      editing: false,
      addMenuitemIngredientDialog: false,
      deleteMenuitemIngredientDialog: false,
      selectedIngredient: null,
      quantity: '',
      editingMenuitemIngredient: null,
      headers: [
        { title: "Ingredient Name", value: "ingredient.ingredient_name" },
        { title: "Quantity", value: "itemingredients_quantity" },
        { title: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    open() {
      this.itemingredienttable = true;
      this.fetchIngredients();
    },
    close() {
      this.itemingredienttable = false;
    },
    fetchIngredients() {
      axios
        .get(`http://127.0.0.1:8000/api/menuitem-ingredients/${this.menuItem.id}`)
        .then((response) => {
          this.ingredients = response.data.menuitemIngredients;
        })
        .catch((error) => {
          console.error("Error fetching ingredients:", error);
        });
    },

    editIngredient(item, index) {
      this.editing = true;
      this.editingMenuitemIngredient = { ...item };
      this.addMenuitemIngredientDialog = true;
    },

    deleteIngredient(item, index) {
      axios
        .delete(`http://127.0.0.1:8000/api/menuitem-ingredients/${item.id}`)
        .then(() => {
          // Remove ingredient from the list
          this.ingredients.splice(index, 1);
        })
        .catch((error) => {
          console.error("Error deleting ingredient:", error);
        });
    },
  },
};
</script>

<style scoped>
.v-card-text {
  font-size: 18px;
  font-weight: bold;
}

.v-card-actions {
  justify-content: flex-end;
}

.v-card-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #1E4E72;
}
</style>