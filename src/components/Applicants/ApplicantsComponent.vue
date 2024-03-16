<template>
  <div>
    <v-text-field v-model="search" label="Search" placeholder="Type to search..."></v-text-field>

    <v-data-table :headers="tableHeaders" :items="filteredApplicants" item-key="ID"
      @click:row="showApplicantDetails"></v-data-table>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Applicant Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-img :src="`/profile.jpg`" alt="Applicant Image" aspect-ratio="1"></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Full Name: {{ selectedApplicant.name }}</v-list-item-title>
                    <v-list-item-title>Email: {{ selectedApplicant.email }}</v-list-item-title>
                    <v-list-item-title>Address: {{ selectedApplicant.address }}</v-list-item-title>
                    <v-list-item-title>Date: {{ selectedApplicant.date }}</v-list-item-title>
                    <v-list-item-title>Accommodation: {{ selectedApplicant.status }}</v-list-item-title>
                    <v-list-item-title>Status: {{ selectedApplicant.status }}</v-list-item-title>
                    <!-- Add more details as needed -->
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="approveApplicant">Approve</v-btn>
          <v-btn color ="blue" @click="openHoldDialog">Hold</v-btn>
          <v-btn color="error" @click="openDenyDialog">Deny</v-btn>
          <v-btn @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="denyDialog" max-width="400">
      <v-card>
        <v-card-title>Deny Applicant</v-card-title>
        <v-card-text>
          <v-textarea v-model="denyReason" label="Denial Reason" outlined rows="5"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click="denyApplicant">Deny</v-btn>
          <v-btn @click="closeDenyDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="holdDialog" max-width="400">
      <v-card>
        <v-card-title>Hold Applicant</v-card-title>
        <v-card-text>
          <v-textarea v-model="holdReason" label="Hold Reason" outlined rows="5"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" @click="holdApplicant">Hold</v-btn>
          <v-btn @click="closeHoldDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      tableHeaders: [
        { title: 'ID', key: 'ID', sortable: false },
        { title: 'Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Address', key: 'address' },
        { title: 'Date', key: 'date' },
        { title: 'Status', key: 'status' },
      ],
      applicants: [
        {
          ID: '1',
          name: 'Rayven Clores',
          email: 'rayven@example.com',
          address: 'Paniman, Caramoan, Camarines Sur',
          date: '02/24/2024',
          status: 'pending',
        },
        {
          ID: '2',
          name: 'Emmanuel V. Collao',
          email: 'emmanuel@example.com',
          address: 'San Felipe, Naga City, Camarines Sur',
          date: '02/24/2024',
          status: 'pending',
        },
        {
          ID: '3',
          name: 'Rayven Clores',
          email: 'rayven@example.com',
          address: 'Paniman, Caramoan, Camarines Sur',
          date: '02/24/2024',
          status: 'pending',
        },
        {
          ID: '4',
          name: 'Rayven Clores',
          email: 'rayven@example.com',
          address: 'Paniman, Caramoan, Camarines Sur',
          date: '02/24/2024',
          status: 'pending',
        },
        {
          ID: '5',
          name: 'Hans candor',
          email: 'rayven@example.com',
          address: 'Paniman, Caramoan, Camarines Sur',
          date: '02/24/2024',
          status: 'pending',
        },
        {
          ID: '6',
          name: 'Voun Dejumo',
          email: 'rayven@example.com',
          address: 'Paniman, Caramoan, Camarines Sur',
          date: '02/24/2024',
          status: 'pending',
        },
      ],
      dialog: false,
      denyDialog: false,
      holdDialog: false,
      denyReason: '',
      holdReason: '',
      selectedApplicant: {},
    };
  },
  computed: {
    filteredApplicants() {
      if (!this.search) {
        return this.applicants;
      }
      const lowerCaseSearch = this.search.toLowerCase();
      return this.applicants.filter(applicant =>
        Object.values(applicant).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearch)
        )
      );
    },
  },
  methods: {
    showApplicantDetails(applicant) {
      this.selectedApplicant = applicant;
      this.dialog = true;
    },
    openDenyDialog() {
      this.denyDialog = true;
    },
    openHoldDialog() {
      this.holdDialog = true;
    },
    holdApplicant() {
      // Perform the hold applicant logic here
      // You can access the holdReason via this.holdReason
      console.log('Applicant held with reason:', this.holdReason);

      // Close the dialog
      this.closeDialog();
      this.closeHoldDialog();
    },
    closeHoldDialog() {
      
      this.holdDialog = false;
    },
    approveApplicant() {
      // Implement logic to approve the selected applicant
      console.log('Approving applicant:', this.selectedApplicant);
      this.closeDialog();
    },
    denyApplicant() {
      // Implement logic to deny the selected applicant with reason
      console.log('Denying applicant with reason:', this.selectedApplicant, this.denyReason);
      this.closeDialog();
      this.closeDenyDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.selectedApplicant = {};
    },
    closeDenyDialog() {
      this.denyDialog = false;
      this.denyReason = '';
    },
  },
};
</script>

<style scoped>
/* 
  
   ID: '1',
                    name: 'Rayven Clores',
                    email: 'rayven@example.com',
                    address: 'Paniman, Caramoan, Camarines Sur',
                    date: '02/24/2024',
                    status: 'pending',
                ,
                {
                    ID: '2',
                    name: 'Emmanuel V. Collao',
                    email: 'emmanuel@example.com',
                    address: 'San Felipe, Naga City, Camarines Sur',
                    date: '02/24/2024',
                    status: 'pending',
                },
                {
                    ID: '3',
                    name: 'Rayven Clores',
                    email: 'rayven@example.com',
                    address: 'Paniman, Caramoan, Camarines Sur',
                    date: '02/24/2024',
                    status: 'pending',
                },
                {
                    ID: '4',
                    name: 'Rayven Clores',
                    email: 'rayven@example.com',
                    address: 'Paniman, Caramoan, Camarines Sur',
                    date: '02/24/2024',
                    status: 'pending',
                },
                {
                    ID: '5',
                    name: 'Hans candor',
                    email: 'rayven@example.com',
                    address: 'Paniman, Caramoan, Camarines Sur',
                    date: '02/24/2024',
                    status: 'pending',
                },
                {
                    ID: '6',
                    name: 'Voun Dejumo',
                    email: 'rayven@example.com',
                    address: 'Paniman, Caramoan, Camarines Sur',
                    date: '02/24/2024',
                    status: 'pending',
                },
  
  */
</style>
