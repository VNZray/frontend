<template>
    <v-container style="padding: 10px 20px; display: flex; flex-direction: column; align-items: center;">
      <v-dashboard-title>
        <h1>Payment</h1>
      </v-dashboard-title>
  
      <v-container>
        <PaymentTable />
        <PaymentForm />
      </v-container>
  
    </v-container>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  v-dashboard-title {
    width: 100%;
    display: flex;
    align-items: center;
  }
  
  h1 {
    margin: 0 10px;
    color: #607683;
  }
  
  .title-line-left,
  .title-line-right {
    border: 3px solid #607683;
  }
  
  .title-line-left {
    width: 200px;
  }
  
  .title-line-right {
    flex: 1;
  }
  
  /* Centering the button */
  .add-card-btn {
    margin: 20px auto;
  }
  </style>
  