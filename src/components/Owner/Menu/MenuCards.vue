<template>
  <v-container fluid class="d-flex justify-center align-center" style="padding: 0 25px 20px 25px;">
    <v-row align="center" justify="left">
      <v-col cols="12">
        <!-- Search field and tabs -->
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="searchQuery" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
              hide-details @input="search"></v-text-field>
          </v-col>
          <v-col cols="12" md="7" class="d-flex align-center">
            <v-tabs v-model="selectedTab">
              <v-tab v-for="menu in menus" :key="menu.id" :value="menu.id" @click="selectMenu(menu)">
                {{ menu.menu_name }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12" md="2">

            <v-btn variant="tonal" class="add-actions" prepend-icon="mdi-chart-bar" color="pink"
              @click="openReportsDialog()">Sales report</v-btn>

          </v-col>
        </v-row>
      </v-col>

      <!-- Display cards -->
      <v-col v-for="menuItem in filteredMenuItems" :key="menuItem.id" cols="9" md="3" sm="4" lg="3">
        <v-card elevation="3" outlined class="card-custom">
          <v-card-title class="card-title"><br>{{ menuItem.menuitem_name }}</v-card-title>
          <v-card-text>
            {{ menuItem.menuitem_description }}
            <br><br>
            {{ menuItem.menuitem_price }}
          </v-card-text>
          <v-card-actions>
            <v-btn variant="tonal" class="add-actions" icon="mdi-plus" density="comfortable" color="blue"
              @click="openAddMenuitemIngredientDialog(menuItem)"></v-btn>
            <v-btn variant="tonal" class="add-actions" icon="mdi-circle-edit-outline" density="comfortable" color="blue"
              @click="editMenuItem(menuItem)"></v-btn>
            <v-btn variant="tonal" class="add-actions" icon="mdi-close-circle-outline" density="comfortable" color="red"
              @click="confirmDeleteMenuItem(menuItem)"></v-btn>
            <v-btn variant="tonal" class="add-actions" icon="mdi-eye" density="comfortable" color="green"
              @click="viewIngredients(menuItem)"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <menuitem-ingredients-table ref="ingredientsTable" :menu-item="selectedMenuItem" />
    <reports ref="salesReports" />


    <!-- AddMenuitemIngredientDialog -->
    <v-dialog v-model="addMenuitemIngredientDialog" max-width="500px">
      <v-card>
        <v-card-title>Add Menuitem Ingredient</v-card-title>
        <v-card-text>
          <ul v-if="Object.keys(errorlist).length > 0">
            <li v-for="(error, index) in errorlist" :key="index">{{ error[0] }}</li>
          </ul>
          <v-autocomplete variant="outlined" v-model="selectedIngredient" :items="ingredientNames"
            label="Ingredient Name" outlined></v-autocomplete>
          <v-text-field variant="outlined" v-model="quantity" label="Quantity" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="saveMenuitemIngredient">Save</v-btn>
          <v-btn color="red" text @click="cancelAddMenuitemIngredient">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Menu Dialog -->
    <v-dialog v-model="createMenuDialog" max-width="500">
      <v-card>
        <v-card-title><br>Create New Menu</v-card-title>
        <v-card-text>
          <ul v-if="Object.keys(errorlist).length > 0">
            <li v-for="(error, index) in errorlist" :key="index">{{ error[0] }}</li>
          </ul>
          <v-text-field variant="outlined" v-model="model.Menu.menu_name" label="Menu Name"></v-text-field>
          <v-text-field variant="outlined" v-model="model.Menu.establishment_id"
            label="Establishment ID"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveMenu">Save</v-btn>
          <v-btn color="primary" @click="createMenuDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add MenuItem Dialog -->
    <v-dialog v-model="createItemDialog" max-width="500">
      <v-card>
        <v-card-title><br>Create New Menu Item</v-card-title>
        <v-card-text>
          <ul v-if="Object.keys(errorlist).length > 0">
            <li v-for="(error, index) in errorlist" :key="index">{{ error[0] }}</li>
          </ul>
          <v-text-field variant="outlined" v-model="model.MenuItem.menuitem_name" label="Menu Item Name"></v-text-field>
          <v-text-field variant="outlined" v-model="model.MenuItem.menuitem_description"
            label="Description"></v-text-field>
          <v-text-field variant="outlined" v-model="model.MenuItem.menuitem_price" label="Price"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveMenuItem">Save</v-btn>
          <v-btn color="primary" @click="createItemDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit MenuItem Dialog -->
    <v-dialog v-model="editMenuItemDialog" max-width="500">
      <v-card>
        <v-card-title><br>Edit MenuItem</v-card-title>
        <v-card-text>
          <ul v-if="Object.keys(this.errorlist).length > 0">
            <li v-for="(error, index) in this.errorlist" :key="index">{{ error[0] }}</li>
          </ul>
          <v-text-field variant="outlined" v-model="selectedMenuItem.menuitem_name"
            label="Menu Item Name"></v-text-field>
          <v-text-field variant="outlined" v-model="selectedMenuItem.menuitem_description"
            label="Description"></v-text-field>
          <v-text-field variant="outlined" v-model="selectedMenuItem.menuitem_price" label="Price"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEditMenuItem(selectedMenuItem.id)">Save</v-btn>
          <v-btn color="primary" @click="editMenuItemDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteMenuItemDialog" max-width="500">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete {{ selectedMenuItem.menuitem_name }}?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteMenuItem">Delete</v-btn>
          <v-btn color="primary" @click="deleteMenuItemDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Ingredients Dialog -->
    <v-dialog v-model="ingredientsDialog" max-height="700px" max-width="800">
      <v-card>
        <v-card-title><br>Manage Ingredients</v-card-title>
        <v-card-item>
          <v-data-table-virtual :headers="ingredientHeaders" :items="ingredients" variant="outlined"
            class="elevation-1">
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editIngredient(item)">mdi-pencil</v-icon>
              <v-icon small @click="confirmDeleteIngredient(item)">mdi-delete</v-icon>
            </template>
          </v-data-table-virtual>
        </v-card-item>
        <v-card-actions>
          <v-btn color="primary" @click="openAddIngredientDialog">Add Ingredient</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add/Edit Ingredient Dialog -->
    <v-dialog v-model="addEditIngredientDialog" max-width="500">
      <v-card>
        <v-card-title><br>{{ editIngredientMode ? 'Edit' : 'Add' }} Ingredient</v-card-title>
        <v-card-text>
          <ul v-if="Object.keys(errorlist).length > 0">
            <li v-for="(error, index) in errorlist" :key="index">{{ error[0] }}</li>
          </ul>
          <v-text-field variant="outlined" v-model="ingredientForm.ingredient_name"
            label="Ingredient Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveIngredient">Save</v-btn>
          <v-btn color="primary" @click="addEditIngredientDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Ingredient Confirmation Dialog -->
    <v-dialog v-model="deleteIngredientDialog" max-width="500">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete {{ selectedIngredient.ingredient_name }}?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteIngredient">Delete</v-btn>
          <v-btn color="primary" @click="deleteIngredientDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Menu Dialog -->
    <v-dialog v-model="deleteMenuDialog" max-width="500">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete the selected menu?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteMenu">Delete</v-btn>
          <v-btn color="primary" @click="deleteMenuDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Buttons -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn variant=outlined class="menu-btn" icon="mdi-apps" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-btn variant=tonal class="add-btn" color="primary" @click="createMenuDialog = true">
              Add Menu
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn variant=tonal class="add-btn" color="primary" @click="createItemDialog = true">
              Add Menu Item
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn variant=tonal class="add-btn" color="primary" @click="openIngredientsDialog()">
              Ingredients
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn v-if="selectedTab" variant=tonal class="add-btn" color="red" @click="confirmDeleteMenu(selectedTab)">
              Delete Menu
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-container>
</template>


<script>
import axios from 'axios';
import MenuitemIngredientsTable from './MenuitemIngredientsTable.vue';
import Reports from './Reports.vue';

export default
  {
    name: 'Menu',
    components: {
      MenuitemIngredientsTable,
      Reports,
    },
    data() {
      return {
        errorlist: [],
        menus: [],
        menuItems: [],
        ingredients: [],
        selectedTab: 0,
        searchQuery: '',
        deleteMenuDialog: false,
        createMenuDialog: false,
        createItemDialog: false,
        editMenuItemDialog: false,
        deleteMenuItemDialog: false,
        ingredientsDialog: false,
        addEditIngredientDialog: false,
        deleteIngredientDialog: false,
        editIngredientMode: false,
        addMenuitemIngredientDialog: false,
        selectedMenuItem: null,
        ingredientName: '',
        selectedIngredient: null,
        ingredientNames: [],
        quantity: '',
        editedMenuItem: {},
        ingredientForm: {
          id: null,
          ingredient_name: '',
        },
        model: {
          Menu: {
            menu_name: '',
            date_created: '',
            establishment_id: '',
          },
          MenuItem: {
            menuitem_name: '',
            menuitem_description: '',
            menuitem_price: '',
            menu_id: '',
          },
        },
        selectedMenuItem: {
          id: null,
          menuitem_name: '',
          menuitem_description: '',
          menuitem_price: ''
        },
        selectedIngredient: {
          id: null,
          ingredient_name: ''
        },
        ingredientHeaders: [
          { title: "ID", value: 'id' },
          { title: "Ingredient Name", value: 'ingredient_name' },
          { title: "Actions", value: 'actions', sortable: false },
        ]
      };
    },

    computed: {
      filteredMenuItems() {
        return this.menuItems.filter(item =>
          item.menu_id === this.selectedTab &&
          item.menuitem_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },

    methods: {

      viewIngredients(menuItem) {
        this.selectedMenuItem = menuItem;
        this.$refs.ingredientsTable.open();
      },

      openReportsDialog() {
        this.$refs.salesReports.open();
      },

      fetchMenusAndMenuItems() {
        axios.get('http://127.0.0.1:8000/api/menus')
          .then(response => {
            this.menus = response.data.menus;
            if (this.menus.length > 0) {
              this.selectedTab = this.menus[0].id;
            }
            this.fetchMenuItems();
          })
          .catch(error => {
            console.error('Error fetching menus:', error);
          });
      },

      fetchMenuItems() {
        axios.get('http://127.0.0.1:8000/api/menu-items')
          .then(response => {
            this.menuItems = response.data.menuItems;
          })
          .catch(error => {
            console.error('Error fetching menu items:', error);
          });
      },

      fetchIngredients() {
        axios.get('http://127.0.0.1:8000/api/ingredients')
          .then(response => {
            this.ingredients = response.data.ingredients;
          })
          .catch(error => {
            console.error('Error fetching menu items:', error);
          });
      },

      fetchIngredientNames() {
        axios.get('http://127.0.0.1:8000/api/ingredients/names')
          .then(response => {
            this.ingredientNames = response.data.ingredient_names;
          })
          .catch(error => {
            console.error('Error fetching ingredient names:', error);
          });
      },

      selectMenu(menu) {
        this.selectedTab = menu.id;
      },

      confirmDeleteMenu(menuId) {
        this.selectedMenuId = menuId;
        this.deleteMenuDialog = true;
      },
      deleteMenu() {
        axios.delete(`http://127.0.0.1:8000/api/menus/${this.selectedMenuId}/delete`)
          .then(response => {
            console.log(response.data);
            alert("Menu deleted successfully");
            this.deleteMenuDialog = false;
            this.fetchMenusAndMenuItems();
          })
          .catch(error => {
            console.error('Error deleting menu:', error);
          });
      },

      editMenuItem(menuItem) {
        axios.get(`http://127.0.0.1:8000/api/menu-items/${menuItem.id}/edit`)
          .then(response => {
            this.selectedMenuItem = response.data.menuItem;
            this.editMenuItemDialog = true;
          })
          .catch(error => {
            console.error('Error fetching menu item data:', error);
          });
      },

      saveEditMenuItem(id) {
        axios.put(`http://127.0.0.1:8000/api/menu-items/${id}/update`, this.selectedMenuItem)
          .then(response => {
            console.log(response.data);
            alert("Menu item updated successfully");
            this.editMenuItemDialog = false;
            this.fetchMenuItems();
          })
          .catch(error => {
            console.error('Error updating menu item:', error);
          });
      },

      confirmDeleteMenuItem(menuItem) {
        this.selectedMenuItem = menuItem;
        this.deleteMenuItemDialog = true;
      },

      deleteMenuItem() {
        axios.delete(`http://127.0.0.1:8000/api/menu-items/${this.selectedMenuItem.id}/delete`)
          .then(response => {
            console.log(response.data);
            alert("Menu item deleted successfully");
            this.deleteMenuItemDialog = false;
            this.fetchMenuItems();
          })
          .catch(error => {
            console.error('Error deleting menu item:', error);
          });
      },

      saveMenu() {
        this.model.Menu.date_created = new Date().toISOString().slice(0, 10);
        axios.post('http://127.0.0.1:8000/api/menus', this.model.Menu)
          .then(response => {
            console.log(response.data);
            alert(response.data.message);
            this.model.Menu = { menu_name: '', date_created: '', establishment_id: '' };
            window.location.reload();
            this.createMenuDialog = false;
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              this.errorlist = error.response.data.errors;
            } else {
              console.error('Error:', error.message);
            }
          });
      },

      saveMenuItem() {
        this.model.MenuItem.menu_id = this.selectedTab;
        axios.post('http://127.0.0.1:8000/api/menu-items', this.model.MenuItem)
          .then(response => {
            console.log(response.data);
            alert(response.data.message);
            this.model.MenuItem = {
              menuitem_name: '',
              menuitem_description: '',
              menuitem_price: '',
              menu_id: '',
            };
            this.fetchMenuItems();
            this.createItemDialog = false
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              this.errorlist = error.response.data.errors;
            } else {
              console.error('Error:', error.message);
            }
          });
      },

      openIngredientsDialog() {
        this.ingredientsDialog = true;
        this.fetchIngredients();
      },

      openAddIngredientDialog() {
        this.editIngredientMode = false;
        this.ingredientForm = { id: null, ingredient_name: '' };
        this.addEditIngredientDialog = true;
      },

      editIngredient(ingredient) {
        this.editIngredientMode = true;
        this.ingredientForm = { ...ingredient };
        this.addEditIngredientDialog = true;
      },

      saveIngredient() {
        if (this.editIngredientMode) {
          axios.put(`http://127.0.0.1:8000/api/ingredients/${this.ingredientForm.id}`, this.ingredientForm)
            .then(response => {
              console.log(response.data);
              alert("Ingredient updated successfully");
              this.addEditIngredientDialog = false;
              this.fetchIngredients();
            })
            .catch(error => {
              console.error('Error updating ingredient:', error);
            });
        } else {
          axios.post('http://127.0.0.1:8000/api/ingredients', this.ingredientForm)
            .then(response => {
              console.log(response.data);
              alert("Ingredient added successfully");
              this.addEditIngredientDialog = false;
              this.fetchIngredients();
            })
            .catch(error => {
              console.error('Error adding ingredient:', error);
            });
        }
      },

      confirmDeleteIngredient(ingredient) {
        this.selectedIngredient = ingredient;
        this.deleteIngredientDialog = true;
      },

      deleteIngredient() {
        axios.delete(`http://127.0.0.1:8000/api/ingredients/${this.selectedIngredient.id}`)
          .then(response => {
            console.log(response.data);
            alert("Ingredient deleted successfully");
            this.deleteIngredientDialog = false;
            this.fetchIngredients();
          })
          .catch(error => {
            console.error('Error deleting ingredient:', error);
          });
      },

      openAddMenuitemIngredientDialog(menuItem) {
        this.selectedMenuItem = menuItem;
        this.selectedIngredient = null;
        this.addMenuitemIngredientDialog = true;
        this.fetchIngredientNames();
      },

      saveMenuitemIngredient() {
        axios.get(`http://127.0.0.1:8000/api/ingredients/find-id-by-name?name=${this.selectedIngredient}`)
          .then(response => {
            const ingredientId = response.data.id;
            if (ingredientId) {
              const data = {
                ingredient_id: ingredientId,
                menuitem_id: this.selectedMenuItem.id,
                itemingredients_quantity: this.quantity // Ensure this field is properly named
              };
              axios.post('http://127.0.0.1:8000/api/menuitem-ingredients', data)
                .then(response => {
                  alert('Menuitem ingredient added successfully:', response.data);
                  this.addMenuitemIngredientDialog = false;
                })
                .catch(error => {
                  if (error.response && error.response.status === 422) {
                    this.errorlist = error.response.data.errors;
                    console.error('Validation Error:', error.response.data);
                  } else {
                    console.error('Error:', error.message);
                  }
                });
            } else {
              alert('Ingredient not found');
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              this.errorlist = error.response.data.errors;
              console.error('Validation Error:', error.response.data);
            } else {
              console.error('Error:', error.message);
            }
          });
      },

      cancelAddMenuitemIngredient() {
        this.addMenuitemIngredientDialog = false;
      }

    },

    created() {
      this.fetchMenusAndMenuItems();
    }
  };
</script>

<style scoped>
.card-custom {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.card-custom:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.v-card-text {
  text-align: center;
  font-size: 14px;
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

.add-actions .v-icon {
  color: #1E4E72;
}

.menu-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.add-btn {
  width: 200px;
}
</style>
