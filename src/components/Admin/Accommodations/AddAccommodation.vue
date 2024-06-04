<template>
  <v-container style="width: 100%; padding: 10px">
    <v-container style="background-color: #1E4E72; color: white; margin: 0 0 20px 0">
      <h2>Accommodation Membership Form</h2>
    </v-container>

    <v-form @submit.prevent="submitForm">
      <!-- Accommodation Information -->
      <v-row>
        <v-col cols="12">
          <h3>Accommodation Information</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="Name of Accommodation" v-model="accommodationInfo.name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select label="Type of Accommodation" :items="accommodationTypes"
            v-model="accommodationInfo.type"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select label="Location" :items="locations" v-model="accommodationInfo.location"></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Business Contact Number" v-model="accommodationInfo.contactNumber"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Business Email" v-model="accommodationInfo.email"></v-text-field>
        </v-col>
      </v-row>

      <!-- Business Permits and Licenses -->
      <v-row>
        <v-col cols="12">
          <h3>Business Permits and Licenses</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="businessPermits.mayorsPermit" label="Mayor’s Permit"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="businessPermits.dtiRegistration" label="DTI/SEC Registration"></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="businessPermits.birRegistration" label="BIR Cert. of Registration"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="businessPermits.brgyClearance" label="Brgy. Business Clearance"></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-checkbox v-model="businessPermits.dotAccreditation" label="DOT Accreditation (If any)"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6">
          <v-file-input label="Photo of Establishment"></v-file-input>
        </v-col>
      </v-row>

      <!-- Submit and Clear Buttons -->
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="submitForm">Submit</v-btn>
          <v-btn @click="clearForm">Clear</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      accommodationInfo: {
        name: "",
        type: "",
        location: "",
        contactNumber: "",
        email: "",
      },
      accommodationTypes: ["Hotel", "Homestay", "Resort", "Inn"],
      locations: [
        "Agaas",
        "Antolon",
        "Bacgong",
        "Bahay",
        "Bikal",
        "Binanuahan (Pob.)",
        "Cabacongan",
        "Cadong",
        "Colongcogong",
        "Canatuan",
        "Caputatan",
        "Gogon",
        "Daraga",
        "Gata",
        "Gibgos",
        "Guijalo",
        "Hanopol",
        "Hanoy",
        "Haponan",
        "Ilawod",
        "Ili-Centro (Pob.)",
        "Lidong",
        "Lubas",
        "Malabog",
        "Maligaya",
        "Mampirao",
        "Mandiclum",
        "Maqueda",
        "Minalaba",
        "Oring",
        "Oroc-Osoc",
        "Pagolinan",
        "Pandanan",
        "Paniman",
        "Patag-Belen",
        "Pili-Centro",
        "Pili-Tabiguian",
        "Poloan",
        "Salvacion",
        "San Roque",
        "San Vicente",
        "Santa Cruz",
        "Solnopan",
        "Tabgon",
        "Tabiguian",
        "Tabog",
        "Tawog (Pob.)",
        "Toboan",
        "Terogo",
      ],
      businessPermits: {
        mayorsPermit: false,
        dtiRegistration: false,
        birRegistration: false,
        brgyClearance: false,
        dotAccreditation: false,
      },
    };
  },
  methods: {
    submitForm() {
      // Here you can handle form submission logic
      console.log("Form submitted");
    },
    clearForm() {
      // Here you can clear the form fields
      this.accommodationInfo = {
        name: "",
        type: "",
        location: "",
        contactNumber: "",
        email: "",
      };
      this.businessPermits = {
        mayorsPermit: false,
        dtiRegistration: false,
        birRegistration: false,
        brgyClearance: false,
        dotAccreditation: false,
      };
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

h3 {
  color: #1E4E72;
  text-align: left;
}
</style>
