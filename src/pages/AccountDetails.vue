<template>
    <div>
        <h1>Account Details</h1>
        <div v-if="establishment">
            <p>ID: {{ establishment.id }}</p>
            <p>Name: {{ establishment.establishment_name }}</p>
            <p>Email: {{ establishment.establishment_email }}</p>
            <p>Address: {{ establishment.establishment_address }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            establishment: null
        };
    },
    created() {
        this.fetchAccount();
    },
    methods: {
        fetchAccount() {
            const establishment_id = this.$route.params.id;
            axios.get(`http://127.0.0.1:8000/api/establishment/${establishment_id}`)
                .then(response => {
                    this.establishment = response.data.Establishment;
                })
                .catch(error => {
                    console.error('Error fetching account:', error);
                });
        }
    }
};
</script>