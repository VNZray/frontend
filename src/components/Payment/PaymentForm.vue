<template>
  <div class="text-center">
    <v-btn class="add-card-btn" fab dark color="primary" @click="openDialog">
      <v-icon dark>mdi-plus</v-icon>PAYMENT
    </v-btn>
  </div>

  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-actions>
        <v-container>
          <v-dashboard-title>
            <hr class="title-line-left">
            <h1>Payment</h1>
            <hr class="title-line-right">
          </v-dashboard-title>  

          <v-row class="d-flex flex-column align-center rounded-lg">
            <v-col cols="12" row="6">
              <div class="text-center">
                <h2>Payment Type</h2> <br>
                <v-btn-toggle v-model="toggle" variant="outlined" color="primary" mandatory>
                  <v-btn width="370px" value="Membership Fee">Membership Fee <br> PHP 2,000</v-btn>
                  <v-btn width="370px" value="Monthly Fee">Monthly Fee <br> PHP 500/month</v-btn>
                </v-btn-toggle>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" :rules="nameRules" clearable label="Name" variant="outlined"></v-text-field>
              <v-text-field v-model="accommodation" :rules="accommodationRules" clearable label="Accommodation Name"
                variant="outlined"></v-text-field>
              <v-text-field v-model="formattedDate" :rules="dateRules" clearable label="Date" variant="outlined"
                readonly append-icon="mdi-calendar" @click:append="DateMenu = !DateMenu" required></v-text-field>
              <v-menu v-model="DateMenu" :close-on-content-click="false" :nudge-right="40"
                class="d-flex flex-column align-center rounded-lg date-picker-menu" transition="scale-transition">
                <v-date-picker v-model="date" no-title no-time scrollable></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showPaymentPopup">Pay</v-btn>
                <v-btn color="error" @click="cancelForm">Cancel</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>

          <v-dialog v-model="paymentPopup" max-width="500">
            <v-card variant="flat">
              <v-card-text>
                <v-dashboard-title>
                  <hr class="title-line-left">
                  <h1>Payment Confirmation</h1>
                  <hr class="title-line-right">
                </v-dashboard-title>
                <v-text-field readonly variant="outlined" label="Payment Type" class="text-center"
                  :model-value="toggle"></v-text-field>
                <v-text-field readonly variant="outlined" label="Name" class="text-center"
                  :model-value="name"></v-text-field>
                <v-text-field readonly variant="outlined" label="Accommodation Name" class="text-center"
                  :model-value="accommodation"></v-text-field>
                <v-text-field readonly variant="outlined" label="Date" class="text-center"
                  :model-value="formattedDate"></v-text-field>
                <br>
                <h2>Amount: <span class="text-center">{{ total }}</span></h2>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="confirmPayment">CONFIRM</v-btn>
                <v-btn @click="cancelPayment">CANCEL</v-btn> <!-- Added cancel button -->
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>


</template>

<script>
export default {
  data() {
    return {
      name: '',
      accommodation: '',
      date: null,
      toggle: null,
      DateMenu: false,
      submitted: false,
      paymentPopup: false,
      dialog: false,
      nameRules: [
        value => !!value || 'Name is required',
      ],
      accommodationRules: [
        value => !!value || 'Accommodation Name is required',
      ],
      dateRules: [
        value => !!value || 'Date is required',
      ],
      toggleRules: [
        value => !!value || 'Payment Type is required',
      ],
    };
  },
  computed: {
    formattedDate() {
      if (!this.date) return null;
      const date = new Date(this.date);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    },
    total() {
      if (this.toggle === 'Membership Fee') {
        return 'PHP 2,000';
      } else if (this.toggle === 'Monthly Fee') {
        return 'PHP 500';
      }
      return '';
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    submitForm() {
      console.log('Submitted');
      this.submitted = true;
    },
    cancelForm() {
      console.log('Cancelled');
      this.dialog = false;
      this.name = null;
      this.accommodation = null;
      this.date = null;
      this.toggle = null;
      this.submitted = false;
    },
    showPaymentPopup() {
      if (this.name && this.accommodation && this.formattedDate && this.toggle) {
        this.paymentPopup = true;
      } else {
        alert('Please fill all required fields.');
      }
    },
    confirmPayment() {
      console.log('Payment confirmed');
      this.paymentPopup = false;
      this.dialog = false;

      this.name = null;
      this.accommodation = null;
      this.date = null;
      this.toggle = null;
      this.submitted = false;
    },
    cancelPayment() {
    console.log('Payment cancelled');
    this.paymentPopup = false;
  }
  }
};
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
  width: 50px;
}

.title-line-right {
  flex: 1;
}

.add-card-btn {
  margin: 20px auto;
}

.date-picker-menu {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
</style>
