<template>
    <div>
        <h1>Accounts</h1>
        <ul>
            <li v-for="establishment in establishments" :key="establishment.id">
                <router-link :to="{ name: 'AccountDetails', params: { id: establishment.id } }">{{ establishment.establishment_name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            establishments: []
        };
    },
    created() {
        this.fetchAccounts();
    },
    methods: {
        fetchAccounts() {
            axios.get('http://127.0.0.1:8000/api/establishment')
                .then(response => {
                    this.establishments = response.data.Establishment;
                })
                .catch(error => {
                    console.error('Error fetching accounts:', error);
                });
        }
    }
};
</script>