<template>
    <v-container style="padding-bottom: 0;">
        <v-row>
            <v-col cols="6">
                <v-text-field style="color: #1E4E72; font-weight: 600;" v-model="searchQuery"
                    prepend-inner-icon="mdi-magnify" label="Search" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-select style="color: #1E4E72; font-weight: 600;" v-model="filteredAccountType"
                    label="Filter by Account Type" :items="['Guest', 'Admin', 'Member']" variant="outlined"
                    @change="filterAccounts"></v-select>
            </v-col>
        </v-row>
    </v-container>

    <v-container>

        <v-row>
            <v-col cols="8">
                <v-card elevation="6" style="max-height: 730px; overflow: auto;">
                    <v-table>
                        <thead style="background-color: #1E4E72; color: white;">
                            <tr>
                                <th class="text-left">User ID</th>
                                <th class="text-left">Name</th>
                                <th class="text-left">Email</th>
                                <th class="text-left">Created At</th>
                                <th class="text-left">Updated At</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody style="max-height: 672px; overflow: auto;">
                            <tr v-for="(acc, index) in filteredAccounts" :key="index"
                                :class="{ 'even-row': index % 2 === 0 }">
                                <td>{{ acc.id }}</td>
                                <td>{{ acc.name }}</td>
                                <td>{{ acc.email }}</td>
                                <td class="text-left">{{ formatDate(acc.created_at) }}</td>
                                <td class="text-left">{{ formatDate(acc.updated_at) }}</td>
                                <td class="text-center" style="width: 150px;">
                                    <v-btn style="background-color: transparent" elevation="0" icon
                                        @click="editAccount(acc)">
                                        <v-icon color="primary">mdi-pencil</v-icon></v-btn>
                                    <v-btn style="background-color: transparent" elevation="0" icon
                                        @click="deleteAccount(acc)">
                                        <v-icon color="red">mdi-delete</v-icon></v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
                <br>
                <p>Created by: Rayven Clores</p>
            </v-col>

            <v-col cols="4">
                <form @submit.prevent="createAccount">
                    <v-card style="padding: 40px; background-color: #1E4E72; color: white; height: 730px" elevation="4">
                        <v-row>
                            <v-col>
                                <h1>Create Account</h1>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-select prepend-inner-icon="mdi-account" v-model="model.account.name" label="Name:"
                                    variant="outlined" :items="ownerNames"></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field prepend-inner-icon="mdi-email" v-model="model.account.email"
                                    label="Email:" type="email" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field prepend-inner-icon="mdi-lock" v-model="model.account.password"
                                    label="Password:" type="password" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field v-model="confirm_password" prepend-inner-icon="mdi-lock"
                                    label="Confirm Password:" type="password" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-select prepend-inner-icon="mdi-account-group" v-model="model.account.account_type"
                                    label="Account Type" :items="['Admin', 'Member']" variant="outlined"></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-btn color="secondary" type="button" style="width: 100%; height: 40px;"
                                    @click="clearForm">Clear</v-btn>
                            </v-col>

                            <v-col>
                                <v-btn color="primary" type="submit" style="width: 100%; height: 40px;">Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            confirm_password: null,
            owner: [],
            account: [],
            model: {
                account: {
                    name: null,
                    email: null,
                    password: null,
                    account_type: null,
                    guest_id: null,
                    owner_id: null,
                    admin_id: null,
                },
            },
            filteredAccountType: null,
            filteredAccounts: [], // New property to hold filtered accounts
            searchQuery: '', // New property to hold search query
        };
    },
    computed: {
        ownerNames() {
            return this.owner.map(owner => `${owner.owner_first_name} ${owner.owner_last_name}`);
        },
        ownerNameToIdMap() {
            return this.owner.reduce((map, owner) => {
                map[`${owner.owner_first_name} ${owner.owner_last_name}`] = owner.id;
                return map;
            }, {});
        },
        filteredAccounts() {
            let filtered = this.account;
            if (this.filteredAccountType) {
                filtered = filtered.filter(acc => acc.account_type === this.filteredAccountType);
            }
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(acc =>
                    acc.name.toLowerCase().includes(query) ||
                    acc.email.toLowerCase().includes(query)
                );
            }
            return filtered;
        }
    },
    methods: {
        fetchOwnerData() {
            axios
                .get("http://127.0.0.1:8000/api/owner")
                .then((response) => {
                    console.log("Owner data:", response.data);
                    this.owner = response.data.Owner;
                })
                .catch((error) => {
                    console.error("Error fetching owner:", error);
                });
        },
        fetchAccountData() {
            axios
                .get("http://127.0.0.1:8000/api/account")
                .then((response) => {
                    console.log("Account data:", response.data);
                    this.account = response.data.Account;
                })
                .catch((error) => {
                    console.error("Error fetching account:", error);
                });
        },
        createAccount() {
            const accountData = {
                name: this.model.account.name,
                email: this.model.account.email,
                password: this.model.account.password,
                account_type: this.model.account.account_type,
                owner_id: this.ownerNameToIdMap[this.model.account.name],
            };

            axios
                .post("http://127.0.0.1:8000/api/account", accountData)
                .then((response) => {
                    console.log("account data:", response.data);
                    this.account.push(response.data.Account);
                    this.clearForm();
                })
                .catch((error) => {
                    console.error("Error creating account:", error);
                });
        },
        clearForm() {
            this.model.account = {
                name: null,
                email: null,
                password: null,
                account_type: null,
                guest_id: null,
                owner_id: null,
            };

            this.confirm_password = null;
        },
        deleteAccount(account) {
            const accountId = account.id;
            axios
                .delete(`http://127.0.0.1:8000/api/account/${accountId}/delete`)
                .then(response => {
                    // Filter out the deleted account from the list
                    this.account = this.account.filter(acc => acc.id !== accountId);
                    // Reapply filters if necessary
                    this.filterAccounts();
                    console.log(`Account with ID ${accountId} has been deleted.`);
                })
                .catch(error => {
                    console.error("Error deleting account:", error);
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        filterAccounts() {
            if (this.filteredAccountType) {
                // If a filter is selected
                this.filteredAccounts = this.account.filter(acc => acc.account_type === this.filteredAccountType);
            } else {
                // If no filter is selected, display all accounts
                this.filteredAccounts = this.account;
            }
        },
    },
    created() {
        this.fetchOwnerData();
        this.fetchAccountData();
    },
};
</script>

<style>
.even-row {
    background-color: #f0f0f0;
    /* Or any other color for even rows */
}
</style>
