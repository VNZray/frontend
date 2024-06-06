<template>
    <v-container style="padding-bottom: 0;">
        <v-row>
            <v-col cols="6">
                <v-text-field prepend-inner-icon="mdi-magnify" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-select label="Account Type" :items="['Guest', 'Admin', 'Member']" variant="outlined"></v-select>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col cols="8">
                <v-card elevation="6" style="height: 730px; overflow: auto;">
                    <v-data-table :headers="headers" :items="account" class="elevation-1">
                        <template v-slot:[`item.created_at`]="{ item }">
                            <span>{{ formatDate(item.created_at) }}</span>
                        </template>
                        <template v-slot:[`item.updated_at`]="{ item }">
                            <span>{{ formatDate(item.updated_at) }}</span>
                        </template>
                    </v-data-table>
                </v-card>
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
                                <v-select v-model="model.account.name" label="Name:" variant="outlined"
                                    :items="ownerNames"></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field v-model="model.account.email" label="Email:" type="email"
                                    variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field v-model="model.account.password" label="Password:" type="password"
                                    variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Confirm Password:" type="password"
                                    variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-select v-model="model.account.account_type" label="Account Type"
                                    :items="['Admin', 'Member']" variant="outlined"></v-select>
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
                },
            },
            headers: [
                { text: 'User ID', value: 'id', align: 'start' },
                { text: 'Name', value: 'name', align: 'start' },
                { text: 'Email', value: 'email', align: 'start' },
                { text: 'Created At', value: 'created_at', align: 'center' },
                { text: 'Updated At', value: 'updated_at', align: 'center' },
            ],
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
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
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
