<template>
  <v-container style="padding: 0;">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card style="box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);">
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12">
                <v-sheet>
                  <v-row justify="center">
                    <v-col cols="12" md="12">
                      <v-card style="border-style: none; box-shadow: none; border: none;">
                        <v-card-text>
                          <v-container>
                            <v-row justify="center">
                              <v-col cols="12">
                                <canvas id="bar-chart" width="600" height="380"></canvas>
                              </v-col>
                            </v-row>
                            <v-row justify="center">
                              <v-col cols="12">
                                <v-select v-model="selectedYear" :items="years" label="Select Year" outlined dense
                                  @change="updateBarChart"></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      selectedYear: null,
      years: [2022, 2023, 2024], // Example years
      monthlyPaymentsData: {
        2022: [80, 70, 60, 40, 30, 20, 80, 70, 60, 40, 75, 80],
        2023: [70, 20, 80, 20, 50, 20, 70, 50, 30, 80, 40, 50],
        2024: [80, 70, 60, 40, 30, 20, 80, 70, 60, 40, 75, 80],
      },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      chartInstance: null
    };
  },
  mounted() {
    this.generateBarChart();
  },
  watch: {
    selectedYear() {
      this.updateBarChart();
    }
  },
  methods: {
    generateBarChart() {
      const ctx = document.getElementById('bar-chart').getContext('2d');
      const selectedYear = this.selectedYear || this.years[0]; // Default to the first year if none is selected
      const monthlyPayments = this.monthlyPaymentsData[selectedYear];

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [{
            label: `Monthly Payments for ${selectedYear}`,
            data: monthlyPayments,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 80, // Set maximum value for y-axis
              }
            }]
          }
        }
      });
    },
    updateBarChart() {
      const selectedYear = this.selectedYear || this.years[0];
      const monthlyPayments = this.monthlyPaymentsData[selectedYear];

      this.chartInstance.data.labels = this.months;
      this.chartInstance.data.datasets[0].label = `Monthly Payments for ${selectedYear}`;
      this.chartInstance.data.datasets[0].data = monthlyPayments;
      this.chartInstance.update();
    },
  },
};
</script>

<style scoped></style>
