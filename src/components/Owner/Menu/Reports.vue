<template>
  <v-dialog v-model="report" max-width="1700px">
    <v-container>
      <v-card>
        <v-container v-model="contents">
          <v-card-title>SALE STATISTICS</v-card-title>

          <!-- Month Selector -->
          <v-row justify="center">
            <v-col cols="12" sm="12">
              <v-select variant="outlined"
                v-model="selectedMonth"
                :items="months"
                label="Select Month"
              ></v-select>
            </v-col>
          </v-row>

          <!-- Total Monthly and Yearly Revenue Cards -->
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-card v-model="rev" variant="outlined">
                <v-card-title>Current Month Revenue</v-card-title>
                <v-card-text>{{ monthlyRevenue }}</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card v-model="rev" variant="outlined">
                <v-card-title>Total Yearly Revenue</v-card-title>
                <v-card-text>{{ yearlyRevenue }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Bar Chart -->
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-card min-height="500px">
                <v-card-title>Menu Item Sales {{  }}</v-card-title>
                <v-card-text>
                  <canvas id="menuItemSalesChart"></canvas>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Table -->
            <v-col cols="12" sm="6">
              <v-card max-height="500px">
                <v-card-title>Menu Item Sales</v-card-title>
                <v-data-table-virtual fixed-header :headers="headers" :items="menuItems" item-key="id" :search="search">
                  <template v-slot:item.menu_item="{ item }">
                      <tr>
                        <td>{{ item.menu_item.menuitem_name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.sub_total }}</td>
                      </tr>
                  </template>
                </v-data-table-virtual>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import { Bar } from 'chart.js';

export default {
  name: "Reports",
  data() {
    return {
      report: false,
      selectedMonth: new Date().getMonth() + 1, // Default to current monthS
      monthlyRevenue: 0,
      yearlyRevenue: 0,
      search: '',
      headers: [
        { title: 'Menu Item', value: 'menu_item.menuitem_name' },
        { title: 'Quantity', value: 'quantity' },
        { title: 'Price', value: 'price' },
        { title: 'Sub Total', value: 'sub_total' }
      ],
      menuItems: [],
      months: [
        { title: 'January', value: 1 },
        { title: 'February', value: 2 },
        { title: 'March', value: 3 },
        { title: 'April', value: 4 },
        { title: 'May', value: 5 },
        { title: 'June', value: 6 },
        { title: 'July', value: 7 },
        { title: 'August', value: 8 },
        { title: 'September', value: 9 },
        { title: 'October', value: 10 },
        { title: 'November', value: 11 },
        { title: 'December', value: 12 }
      ],
      chartInstance: null
    };
  },
  created() {
    this.fetchMonthlyYearlyRevenue();
    this.fetchMenuItems();
  },
  watch: {
    selectedMonth() {
      this.fetchMenuItems();
    }
  },
  methods: {
    open() {
      this.report = true;
      this.fetchMonthlyYearlyRevenue();
      this.fetchMenuItems();
    },
    close() {
      this.report = false;
    },
    fetchMonthlyYearlyRevenue() {
      axios.get('http://127.0.0.1:8000/api/sales-items/monthly-yearly-sales')
        .then(response => {
          this.monthlyRevenue = response.data.monthly_sales;
          this.yearlyRevenue = response.data.yearly_sales;
        })
        .catch(error => {
          console.error('Error fetching monthly and yearly revenue:', error);
        });
    },
    fetchMenuItems() {
      axios.get('http://127.0.0.1:8000/api/sales-items')
        .then(response => {
          const salesItems = response.data.salesItems;
          const filteredItems = this.filterItemsBySelectedMonth(salesItems);
          const aggregatedItems = this.aggregateMenuItems(filteredItems);
          this.menuItems = aggregatedItems;
          this.updateChart(aggregatedItems);
        })
        .catch(error => {
          console.error('Error fetching menu items:', error);
        });
    },
    filterItemsBySelectedMonth(items) {
      return items.filter(item => {
        const itemMonth = new Date(item.created_at).getMonth() + 1;
        return itemMonth === this.selectedMonth;
      });
    },
    aggregateMenuItems(items) {
      const itemMap = new Map();
      items.forEach(item => {
        const key = item.menu_item_id;
        if (itemMap.has(key)) {
          const existingItem = itemMap.get(key);
          existingItem.quantity += item.quantity;
          existingItem.sub_total += parseFloat(item.sub_total);
        } else {
          itemMap.set(key, { ...item, sub_total: parseFloat(item.sub_total) });
        }
      });
      return Array.from(itemMap.values());
    },
    updateChart(data) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      const labels = data.map(item => item.menu_item.menuitem_name);
      const quantities = data.map(item => item.quantity);
      const ctx = document.getElementById('menuItemSalesChart').getContext('2d');
      this.chartInstance = new Bar(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Quantity Sold',
            data: quantities,
            backgroundColor: 'rgba(30,78,114, 1)',
            borderColor: 'rgba(30,78,114, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>


<style scoped>
.v-card-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #1E4E72;
}

.v-select{
  text-align: center;

}

.v-card-text {
  text-align: center;
  font-size: 17px;
  color: #27618d;
}

.contents {
  padding: 20px;
}
</style>
