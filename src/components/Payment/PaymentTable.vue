<template>
  <div>
    <v-text-field v-model="search" label="Search" variant="outlined" clearable prepend-inner-icon="mdi-magnify"></v-text-field>
    <v-data-table-virtual :headers="headers" :items="filteredPaymentDetails" height="700" item-value="id"></v-data-table-virtual>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: 'id', value: 'id' },
        { title: 'Name', value: 'name' },
        { title: 'Accommodation', value: 'accommodation' },
        { title: 'Date', value: 'date' },
        { title: 'Payment Type', value: 'paymentType' },
        { title: 'Amount', value: 'amount' },
      ],
      paymentDetails: [
        {
          id: 1,
          name: 'Rayven Clores',
          accommodation: 'Accommodation A',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '2',
          name: 'Emmanuel V. Collao',
          accommodation: 'Accommodation B',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '3',
          name: 'Voun Irish Florence C. Dejumo',
          accommodation: 'Accommodation C',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '4',
          name: 'Hans Gabriel Candor',
          accommodation: 'Accommodation D',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '5',
          name: 'Jeno Aldrei Laurente',
          accommodation: 'Accommodation D',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '6',
          name: 'Rayven Clores',
          accommodation: 'Accommodation E',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '7',
          name: 'Rayven Clores',
          accommodation: 'Accommodation F',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '8',
          name: 'Rayven Clores',
          accommodation: 'Accommodation G',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '9',
          name: 'Rayven Clores',
          accommodation: 'Accommodation H',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '10',
          name: 'Rayven Clores',
          accommodation: 'Accommodation I',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '11',
          name: 'Rayven Clores',
          accommodation: 'Accommodation J',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '12',
          name: 'Rayven Clores',
          accommodation: 'Accommodation K',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '13',
          name: 'Rayven Clores',
          accommodation: 'Accommodation L',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '14',
          name: 'Rayven Clores',
          accommodation: 'Accommodation M',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '15',
          name: 'Rayven Clores',
          accommodation: 'Accommodation N',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
        {
          id: '16',
          name: 'Rayven Clores',
          accommodation: 'Accommodation O',
          date: '02/24/2024',
          paymentType: 'Monthly Fee',
          amount: 500,
        },
      ],search: '',
    }
  },
  computed: {
    filteredPaymentDetails() {
      if (!this.search) {
        return this.paymentDetails;
      }
      const searchTerm = this.search.toLowerCase();
      return this.paymentDetails.filter(item =>
        Object.values(item).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        )
      );
    }
  },
}
</script>

<style></style>