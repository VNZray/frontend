<template>
  <v-container fluid class="d-flex justify-center align-center" style="padding: 0 25px 20px 25px;">

    <v-row align="center" justify="left">
      <!-- Search field and tabs -->
      <v-col style="padding: 0;" cols="12">
        <v-row>
          <v-col cols="12" md="3">
            <v-select label="Select Accommodation" :items="establishments.map(est => est.establishment_name)"
              v-model="selectedEstablishmentName" variant="outlined"></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field v-model="searchQuery" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
              hide-details @input="search"></v-text-field>
          </v-col>

          <!--Menu tabs-->
          <v-col cols="12" md="5" class="d-flex align-center">
            <v-tabs style="height: 100%" v-model="selectedTab">
              <v-tab v-for="menu in menus" :key="menu.id" :value="menu.id" @click="selectMenu(menu)">
                {{ menu.menu_name }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12" md="1">
            <!-- Add Buttons -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn class="menu-btn" v-bind="props" color="#1E4E72" prepend-icon="mdi-view-headline">ACTIONS</v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn style="width: 280px;" variant=outlined class="add-btn" color="primary"
                      @click="createMenuDialog = true">
                      Add New Menu
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn style="width: 280px;" variant=outlined class="add-btn" color="primary"
                      @click="createItemDialog = true">
                      Add New Menu Item
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn style="width: 280px;" variant=outlined class="add-btn" color="primary"
                      @click="openIngredientsDialog()">
                      Ingredients Management
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn style="width: 280px;" v-if="selectedTab" variant=outlined class="add-btn" color="red"
                      @click="confirmDeleteMenu(selectedTab)">
                      Delete Current Menu
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <!-- <v-list-item>
                  <v-list-item-title>
                    <v-btn disabled variant="tonal" class="add-btn" prepend-icon="mdi-chart-bar" color="pink"
                      @click="openReportsDialog()">Sales report</v-btn>
                  </v-list-item-title>
                </v-list-item> -->
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>

      <v-row>
        <template v-if="loading">
          <v-col cols="12" class="text-center">
            <h3>Loading...</h3>
            <v-progress-linear color="#1E4E72" indeterminate></v-progress-linear>
          </v-col>
        </template>
        <template v-else-if="filteredMenuItems.length > 0">
          <v-col v-for="menuItem in filteredMenuItems" :key="menuItem.id" cols="12" md="3" sm="4" lg="3">
            <v-card elevation="6" max-width="430" max-height="540" min-height="540">
              <v-img height="250" :src="menuItem.menuitem_image" cover></v-img>
              <v-card-item>
                <v-card-title class="text-center">{{ menuItem.menuitem_name }}
                  <p style="color: red;">{{
                    menuItem.menuitem_price }} Pesos</p>
                </v-card-title>
              </v-card-item>
              <v-card-text style="padding-bottom: 0">
                <p style="min-height: 60px;" class="text-center">{{ menuItem.menuitem_description }}</p>
              </v-card-text>
              <v-card-title class="text-center">Ingredients</v-card-title>
              <div class="px-4 mb-2">
                <v-chip-group>
                  <v-chip color="primary" v-for="ingredient in menuItem.ingredients" :key="ingredient.id">
                    {{ ingredient.ingredient_name }}
                  </v-chip>
                </v-chip-group>
              </div>
              <div style="display: flex; align-items: last baseline; justify-content: center;">
                <v-card-actions style="width: 430px;">
                  <v-row>
                    <v-col>
                      <v-btn prepend-icon="mdi-delete" width="100%" color="red"
                        @click="confirmDeleteMenuItem(menuItem)">
                        Remove    
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn prepend-icon="mdi-pencil" width="100%" color="primary" @click="editMenuItem(menuItem)">
                        Edit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="12" class="text-center">
            <h3>No items found.</h3>
          </v-col>
        </template>
      </v-row>

    </v-row>

    <!-- <reports ref="salesReports" /> -->

    <!-- Add Menu Dialog -->
    <v-dialog v-model="createMenuDialog" max-width="500">
      <v-card>
        <v-card-title><br>Create New Menu</v-card-title>
        <v-card-text>
          <v-text-field variant="outlined" v-model="model.Menu.menu_name" label="Menu Name"></v-text-field>
          <v-select label="Select Accommodation" :items="establishments.map(est => est.establishment_name)"
            v-model="selectedEstablishmentName" variant="outlined"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createMenuDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveMenu">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Menu Item Dialog -->
    <v-dialog v-model="createItemDialog" max-width="500">
      <v-card>
        <v-card-title><br>Create New Menu Item</v-card-title>
        <v-card-text>
          <v-file-input variant="outlined" v-model="filename" label="Upload Image"></v-file-input>
          <v-text-field variant="outlined" v-model="model.MenuItem.menuitem_name" label="Menu Item Name"></v-text-field>
          <v-text-field variant="outlined" v-model="model.MenuItem.menuitem_description"
            label="Description (OPTIONAL)"></v-text-field>
          <v-text-field variant="outlined" v-model="model.MenuItem.menuitem_price" label="Price"></v-text-field>
          <v-autocomplete variant="outlined" v-model="selectedIngredients" :items="ingredientNames"
            label="Ingredients (OPTIONAL)" multiple outlined chips deletable-chips></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createItemDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveMenuItemAndIngredients">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit MenuItem Dialog -->
    <v-dialog v-model="editMenuItemDialog" max-width="500" max-height="700px">
      <v-card>
        <v-card-title>Edit MenuItem</v-card-title>
        <v-card-text>
          <v-text-field variant="outlined" v-model="selectedMenuItem.menuitem_name"
            label="Menu Item Name"></v-text-field>
          <v-text-field variant="outlined" v-model="selectedMenuItem.menuitem_description"
            label="Description"></v-text-field>
          <v-text-field variant="outlined" v-model="selectedMenuItem.menuitem_price" label="Price"></v-text-field>

          <v-row>
            <v-col cols="12" md="10">
              <v-autocomplete variant="outlined" v-model="selectedMenuItemIngredients" :items="ingredientNames"
                label="Ingredients" multiple outlined chips deletable-chips></v-autocomplete>
            </v-col>
            <v-col cols="12" md="2">
              <v-card-actions>
                <v-btn color="primary" @click="addNewIngredients">Add</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>

          <!-- Custom Table with v-table -->
          <v-table>
            <thead style="background-color: #1E4E72; color: white;">
              <tr>
                <th class="text-center">Ingredient Name</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody style="max-height: 672px; overflow: auto;">
              <tr v-for="(ingredient, index) in ingredients" :key="index" :class="{ 'even-row': index % 2 === 0 }">
                <td>{{ ingredient.ingredient_name }}</td>
                <td class="text-center">
                  <v-btn style="background-color: transparent" elevation="0" icon
                    @click="deleteItemIngredient(ingredient)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>

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
        <v-card-actions>
          <v-btn color="blue" @click="openAddIngredientDialog">Add Ingredient</v-btn>
        </v-card-actions>
        <v-card-item>
          <v-table>
            <template v-slot:default>
              <thead style="background-color: #1E4E72; color: white;">
                <tr>
                  <th v-for="header in ingredientHeaders" :key="header.value" class="text-center">
                    {{ header.title }}
                  </th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" v-for="(item, index) in ingredients" :key="index">
                  <td v-for="header in ingredientHeaders" :key="header.value">
                    {{ item[header.value] }}
                  </td>
                  <td class="text-center" style="width: 150px;">
                    <v-btn style="background-color: transparent" elevation="0" icon @click="editIngredient(item)">
                      <v-icon color="primary">mdi-pencil</v-icon></v-btn>
                    <v-btn style="background-color: transparent" elevation="0" icon
                      @click="confirmDeleteIngredient(item)">
                      <v-icon color="red">mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-table>
        </v-card-item>
      </v-card>
    </v-dialog>

    <!-- Add/Edit Ingredient Dialog -->
    <v-dialog v-model="addEditIngredientDialog" max-width="500">
      <v-card>
        <v-card-title><br>{{ editIngredientMode ? 'Edit' : 'Add' }} Ingredient</v-card-title>
        <v-card-text>
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
    <v-dialog v-model="deleteMenuDialog" max-width="600">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          <h4>Are you sure you want to delete the selected menu?</h4>
          <h4 style="color: red">MENU ITEMS WITHIN THE MENU WILL ALSO BE DELETED</h4>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteMenu">Delete</v-btn>
          <v-btn color="primary" @click="deleteMenuDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import axios from 'axios';
import Reports from './Reports.vue';

export default
  {
    name: 'Menu',
    components: {
      Reports,
    },
    data() {
      return {
        filename: null,
        selectedFile: null,
        owner: {},
        establishment: null,
        establishments: [],
        selectedEstablishment: null,
        selectedEstablishmentName: null,
        errorlist: [],
        menus: [],
        menuItems: [],
        ingredients: [],
        selectedIngredients: [],
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
        selectedMenuItem: null,
        ingredientName: '',
        selectedIngredient: null,
        ingredientNames: [],
        selectedMenuItemIngredients: [],
        selectedMenuItemId: null,
        quantity: '',
        loading: true,
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
            menuitem_image: null,
            menuitem_name: '',
            menuitem_description: '',
            menuitem_price: '',
            menu_id: '',
          },
        },
        selectedMenuItem: {
          id: null,
          menuitem_image: null,
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
      async fetchOwner() {
        const owner_id = this.$route.params.owner_id;
        if (owner_id) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/owner/${owner_id}`);
            console.log("Owner data:", response.data);
            this.owner = response.data.Owner;
            this.fetchEstablishments();
          } catch (error) {
            console.error("Error fetching Owner:", error);
          }
        }
      },

      async fetchEstablishments() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/establishment/private`);
          console.log("Establishments data:", response.data);
          const establishments = response.data.Establishment.filter(est => est.owner_id === this.owner.id);
          this.establishments = establishments;

          if (this.establishments.length > 0) {
            this.selectedEstablishment = this.establishments[0].id;
            this.selectedEstablishmentName = this.establishments[0].establishment_name;
            this.fetchMenusAndMenuItems();
          }
        } catch (error) {
          console.error("Error fetching establishments:", error);
        }
      },

      async fetchMenusAndMenuItems() {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/menus/establishment/${this.selectedEstablishment}`);
          this.menus = response.data.menus;
          if (this.menus.length > 0) {
            this.selectedTab = this.menus[0].id;
            this.fetchMenuItemsWithIngredients();
          }
        } catch (error) {
          console.error('Error fetching menus:', error);
        }
      },

      async fetchMenuItemsWithIngredients() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/menu-items');
          const menuItems = response.data.menuItems;

          const menuItemsWithIngredients = await Promise.all(menuItems.map(async (menuItem) => {
            const ingredients = await this.fetchItemIngredientChips(menuItem.id);
            return { ...menuItem, ingredients };
          }));

          // Update menuItemsWithIngredients to include the menuitem_image URL
          this.menuItems = menuItemsWithIngredients.map(item => ({
            ...item,
            menuitem_image: this.getImageUrl(item.menuitem_image) // Replace with actual URL from your API
          }));
        } catch (error) {
          console.error('Error fetching menu items:', error);
        } finally {
          this.loading = false; // Ensure loading is set to false after fetching
        }
      },

      getImageUrl(filename) {
        return process.env.BASE_URL + '../../../../public/menuitem/' + filename;
      },

      async fetchItemIngredientChips(menuItemId) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/menuitem-ingredients/${menuItemId}`);
          return response.data.menuitemIngredients.map(item => ({
            id: item.id,
            ingredient_name: item.ingredient.ingredient_name
          }));
        } catch (error) {
          console.error('Error fetching ingredients:', error);
          return [];
        }
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

      fetchItemIngredients(menuItemId) {
        axios.get(`http://127.0.0.1:8000/api/menuitem-ingredients/${menuItemId}`)
          .then(response => {
            console.log('Fetched ingredients:', response.data.menuitemIngredients);
            this.ingredients = response.data.menuitemIngredients.map(item => {
              return {
                id: item.id,
                ingredient_name: item.ingredient.ingredient_name
              };
            });
          })
          .catch(error => {
            console.error('Error fetching ingredients:', error);
          });
      },

      viewIngredients(menuItem) {
        this.selectedMenuItem = menuItem;
      },

      openReportsDialog() {
        this.$refs.salesReports.open();
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
            this.selectedMenuItemId = menuItem.id;
            this.editMenuItemDialog = true;
            this.fetchItemIngredients(menuItem.id);
          })
          .catch(error => {
            console.error('Error fetching menu item data:', error);
          });
      },

      addNewIngredients() {
        if (!this.selectedMenuItemId) {
          console.error('No menu item selected.');
          return;
        }

        if (this.selectedMenuItemIngredients.length === 0) {
          return;
        }

        const ingredientRequests = this.selectedMenuItemIngredients.map(ingredientName => {
          return axios.get(`http://127.0.0.1:8000/api/ingredients/find-id-by-name?name=${ingredientName}`)
            .then(response => {
              console.log('Ingredient response for name:', ingredientName, response);
              const ingredientId = response.data.id;
              if (ingredientId) {
                const data = {
                  menuitem_id: this.selectedMenuItemId,
                  ingredient_id: ingredientId
                };
                return axios.post('http://127.0.0.1:8000/api/menuitem-ingredients', data);
              } else {
                console.error('Ingredient not found for name:', ingredientName);
              }
            })
            .catch(error => {
              console.error('Error fetching ingredient ID:', error);
            });
        });

        Promise.all(ingredientRequests)
          .then(results => {
            console.log('All ingredients saved:', results);
            this.selectedMenuItemIngredients = [];
            this.fetchItemIngredients(this.selectedMenuItemId);
            this.fetchMenuItemsWithIngredients();
          })
          .catch(error => {
            console.error('Error adding new ingredients:', error);
          });
      },

      saveEditMenuItem(id) {
        axios.put(`http://127.0.0.1:8000/api/menu-items/${id}/update`, this.selectedMenuItem)
          .then(response => {
            console.log(response.data);
            this.editMenuItemDialog = false;
            this.fetchMenuItemsWithIngredients()();
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
            this.deleteMenuItemDialog = false;
            this.fetchMenuItemsWithIngredients()();
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
            this.selectedEstablishmentName = '';
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

      saveMenuItemAndIngredients() {
        const menu_item_data = {
          menuitem_image: this.filename.name,
          menuitem_name: this.model.MenuItem.menuitem_name,
          menuitem_description: this.model.MenuItem.menuitem_description,
          menuitem_price: this.model.MenuItem.menuitem_price,
          menu_id: this.selectedTab
        }
        axios.post('http://127.0.0.1:8000/api/menu-items', menu_item_data)
          .then(response => {
            console.log('MenuItem save response:', response);

            const menuItemId = response.data.menuItem ? response.data.menuItem.id : null;
            if (!menuItemId) {
              throw new Error('MenuItem ID is not found in the response');
            }
            console.log('MenuItem ID:', menuItemId);
            const ingredientRequests = this.selectedIngredients.map(ingredientName => {
              return axios.get(`http://127.0.0.1:8000/api/ingredients/find-id-by-name?name=${ingredientName}`)
                .then(response => {
                  console.log('Ingredient response for name:', ingredientName, response);
                  const ingredientId = response.data.id;
                  if (ingredientId) {
                    const data = {
                      menuitem_id: menuItemId,
                      ingredient_id: ingredientId
                    };
                    return axios.post('http://127.0.0.1:8000/api/menuitem-ingredients', data);
                  } else {
                    console.error('Ingredient not found for name:', ingredientName);
                  }
                })
                .catch(error => {
                  console.error('Error fetching ingredient ID:', error);
                });
            });

            Promise.all(ingredientRequests)
              .then(results => {
                console.log('All ingredients saved:', results);
                this.resetMenuItemForm();
              })
              .catch(error => {
                console.error('Error saving ingredients:', error);
              });
          })
          .catch(error => {
            console.error('Error saving menu item:', error);
            if (error.response && error.response.status === 422) {
              this.errorlist = error.response.data.errors;
            } else {
              console.error('Error saving menu item:', error);
            }
          });
      },

      deleteItemIngredient(ingredient) {
        if (!ingredient.id) {
          console.error('Ingredient ID not found.');
          alert('Error: Ingredient ID not found.');
          return;
        }

        axios.delete(`http://127.0.0.1:8000/api/menuitem-ingredients/${ingredient.id}`)
          .then(response => {
            console.log('Ingredient deleted:', response.data);
            alert('Ingredient deleted successfully');
            this.fetchItemIngredients(this.selectedMenuItem.id);
            this.fetchMenuItemsWithIngredients();

          })
          .catch(error => {
            console.error('Error deleting ingredient:', error);
            if (error.response) {
              // Server responded with a status code out of the range of 2xx
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
              alert(`Error deleting ingredient: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
              // No response received
              console.error('Request data:', error.request);
              alert('Error deleting ingredient: No response from server');
            } else {
              console.error('Error message:', error.message);
              alert(`Error deleting ingredient: ${error.message}`);
            }
          });
      },

      resetMenuItemForm() {
        this.model.MenuItem = {
          menuitem_image: null,
          menuitem_name: '',
          menuitem_description: '',
          menuitem_price: '',
          menu_id: '',
        };
        this.selectedIngredients = [];
        this.createItemDialog = false;
        this.fetchMenuItemsWithIngredients();
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
            this.deleteIngredientDialog = false;
            this.fetchIngredients();
          })
          .catch(error => {
            console.error('Error deleting ingredient:', error);
          });
      }

    },
    created() {
      this.fetchOwner();
      this.fetchEstablishments();
      this.fetchIngredientNames();
    },
    watch: {
      selectedEstablishment(newEstablishment) {
        if (newEstablishment) {
          this.fetchMenusAndMenuItems();
        }
      },
      selectedEstablishmentName(newVal) {
        this.selectedEstablishment = this.establishments.find(est => est.establishment_name === newVal);
        if (this.selectedEstablishment) {
          this.model.Menu.establishment_id = this.selectedEstablishment.id;
        }
      },

      selectedFile(newValue, oldValue) {
        if (newValue) {
          console.log('File name:', newValue.name);
          this.filename = newValue.name;
        }
      }
    }
  };
</script>

<style scoped>
.name_container {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1E4E72;
}

.item_container {
  height: 180px;
}

.action_container {
  height: 30px;
}

h1 {
  text-align: center;
  font-size: 20px;
  color: white;
}

h2 {
  font-size: 13px;
}

h3 {
  text-align: center;
  font-size: 20px;
  color: #1E4E72;
}

h4 {
  font-size: 16px;
}

.item_card {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.item_card:hover {
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

.add-actions {
  color: #1E4E72;
  min-width: 100px;
}

.add-btn {
  width: 200px;
}
</style>
