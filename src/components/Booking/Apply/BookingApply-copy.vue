<template>
  <div style="
      height: 100vh;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url('/public/Matukad-Island-Caramoan.webp');
      background-size: cover;
      background-repeat: no-repeat;
    ">
    <div style="
        width: 40%;
        height: auto;
        max-height: 90%;
        margin-top: 80px;
        background-color: rgba(255, 255, 255);
        backdrop-filter: blur(5px);
        overflow-y: auto;
      ">
      <div class="container">
        <v-tabs v-model="tab" bg-color="primary" class="hiddenTab">
          <v-tab value="owner">Owner Information</v-tab>
          <v-tab value="establishment">Establishment Information</v-tab>
        </v-tabs>

        <v-card-text>
          <form @submit.prevent="submitForm">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="owner">
                <h1>Owner Information</h1>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_first_name" label="First Name:"
                      variant="outlined"></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_middle_name" label="Middle Name:"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_last_name" label="Last Name:"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_contact_number" label="Contact Number:"
                      variant="outlined"></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_email" label="Email Address:"
                      variant="outlined"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.owner.owner_birthdate" label="Birthdate:" placeholder="YYYY-MM-DD"
                      variant="outlined"></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_gender" label="Gender" :items="owner_gender_options"
                      variant="outlined" type="text" required></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.owner.owner_civil_status" label="Civil Status"
                      :items="owner_civil_status_options" variant="outlined" type="text" required></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-combobox v-model="model.owner.owner_province" label="Province:" :items="province_options"
                      variant="outlined" type="text" required></v-combobox>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-combobox v-model="model.owner.owner_municipality" label="Municipality"
                      :items="municipality_options" variant="outlined" type="text" required></v-combobox>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-combobox v-model="model.owner.owner_barangay" label="Barangay" :items="barangay_options"
                      variant="outlined" type="text" required></v-combobox>
                  </v-col>
                </v-row>

                <div class="owner-btn">
                  <v-btn style="background-color: #1e1e1e" @click="prevTab">Back</v-btn>
                  <v-btn type="button" @click="nextTab" style="background-color: #1e4e72">Next</v-btn>
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="establishment">
                <h1>Establishment Information</h1>
                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_name" label="Establishment Name"
                      variant="outlined" required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_address" label="Establishment Address"
                      variant="outlined" required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_email" label="Establishment Email"
                      variant="outlined" required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="padding: 10px 15px">
                    <v-text-field v-model="model.establishment.establishment_contact_number"
                      label="Establishment Contact Number" variant="outlined" type="number" required></v-text-field>
                  </v-col>

                  <v-col style="padding: 10px 15px">
                    <v-select v-model="model.establishment.establishment_type" :items="establishment_options"
                      label="Establishment Type" variant="outlined" required></v-select>
                  </v-col>
                </v-row>

                <h4 style="font-size: 20px; color: #1e4e72; text-align: center">Business Permits</h4>

                <div class="box">
                  <v-row style="margin: 15px 0">
                    <v-col style="padding: 10px 15px">
                      <h5 style="font-size: 16px;">Permit 1</h5>
                      <h5 style="font-size: 16px;">Permit 2</h5>
                      <h5 style="font-size: 16px;">Permit 3</h5>
                    </v-col>

                    <v-col style="padding: 10px 15px">
                      <h5 style="font-size: 16px;">Permit 4</h5>
                      <h5 style="font-size: 16px;">Permit 5</h5>
                      <h5 style="font-size: 16px;">Permit 6</h5>
                    </v-col>
                  </v-row>
                </div>

                <v-row style="margin-top: 10px;">
                  <v-col style="padding: 10px 15px 0 15px">
                    <v-file-input v-model="model.establishment.business_permits" label="Upload Business Permits"
                      multiple variant="outlined"></v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <hr style="margin-bottom: 10px;">
                  </v-col>
                </v-row>

                <v-col>
                  <v-row>
                    <v-icon left>mdi-information-outline</v-icon>
                    <p> Note: We only accept Establishments located in Caramoan Area</p>
                  </v-row>
                </v-col>

                <v-row v-for="(establishment, index) in additional_establishments" :key="index">
                  <v-col style="margin-top: 20px;" cols="12" md="12">
                    <v-text-field v-model="establishment.establishment_name"
                      :label="'Establishment Name ' + (index + 2)" variant="outlined" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="establishment.establishment_address" label="Establishment Address"
                      variant="outlined" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="establishment.establishment_email" label="Establishment Email"
                      variant="outlined" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="establishment.establishment_contact_number"
                      label="Establishment Contact Number" variant="outlined" type="number" required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select v-model="establishment.establishment_type" :items="establishment_options"
                      label="Establishment Type" variant="outlined" required></v-select>
                  </v-col>

                  <v-col cols="12">
                    <h4 style="font-size: 20px; color: #1e4e72; text-align: center">Business Permits</h4>
                  </v-col>

                  <v-col cols="12">
                    <div class="box">
                      <v-row style="margin: 15px 0">
                        <v-col style="padding: 10px 15px">
                          <h5 style="font-size: 16px;">Permit 1</h5>
                          <h5 style="font-size: 16px;">Permit 2</h5>
                          <h5 style="font-size: 16px;">Permit 3</h5>
                        </v-col>

                        <v-col style="padding: 10px 15px">
                          <h5 style="font-size: 16px;">Permit 4</h5>
                          <h5 style="font-size: 16px;">Permit 5</h5>
                          <h5 style="font-size: 16px;">Permit 6</h5>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-file-input v-model="establishment.business_permits" label="Upload Business Permits" multiple
                      variant="outlined"></v-file-input>
                  </v-col>

                  <v-col cols="12">
                    <v-row>
                      <v-col>
                        <hr>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12">
                    <v-col style="padding-top: 0;">
                      <v-row>
                        <v-icon left>mdi-information-outline</v-icon>
                        <p> Note: We only accept Establishments located in Caramoan Area</p>
                      </v-row>
                    </v-col>
                  </v-col>
                </v-row>

                <div class="establishment-btn">
                  <v-btn type="button" @click="prevTab" style="background-color: #1e1e1e">Back</v-btn>
                  <v-btn class="deleteButton" color="red" @click="delete_establishment_form(index)">
                    Remove
                  </v-btn>
                  <v-btn class="AddButton" color="primary" @click="add_establishment_form">
                    Add
                  </v-btn>
                  <v-btn type="submit" style="background-color: #1e4e72">Submit</v-btn>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </form>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "owner",
      model: {
        owner: {
          owner_first_name: null,
          owner_middle_name: null,
          owner_last_name: null,
          owner_contact_number: null,
          owner_email: null,
          owner_age: null,
          owner_province: null,
          owner_municipality: null,
          owner_barangay: null,
          owner_civil_status: null,
          owner_gender: null,
          owner_birthdate: null,
        },
        establishment: {
          owner_id: null,
          establishment_name: null,
          establishment_address: null,
          establishment_email: null,
          establishment_contact_number: null,
          establishment_type: null,
          business_permits: null,
        },
      },
      additional_establishments: [],
      owner_gender_options: ["M", "F"],
      owner_civil_status_options: ["Single", "Married", "Divorced", "Widowed"],
      province_options: [
        "Abra",
        "Agusan del Norte",
        "Agusan del Sur",
        "Aklan",
        "Albay",
        "Antique",
        "Apayao",
        "Aurora",
        "Basilan",
        "Bataan",
        "Batanes",
        "Batangas",
        "Benguet",
        "Biliran",
        "Bohol",
        "Bukidnon",
        "Bulacan",
        "Cagayan",
        "Camarines Norte",
        "Camarines Sur",
        "Camiguin",
        "Capiz",
        "Catanduanes",
        "Cavite",
        "Cebu",
        "Cotabato",
        "Davao de Oro (Compostela Valley)",
        "Davao del Norte",
        "Davao del Sur",
        "Davao Occidental",
        "Davao Oriental",
        "Dinagat Islands",
        "Eastern Samar",
        "Guimaras",
        "Ifugao",
        "Ilocos Norte",
        "Ilocos Sur",
        "Iloilo",
        "Isabela",
        "Kalinga",
        "La Union",
        "Laguna",
        "Lanao del Norte",
        "Lanao del Sur",
        "Leyte",
        "Maguindanao del Norte",
        "Maguindanao del Sur",
        "Marinduque",
        "Masbate",
        "Misamis Occidental",
        "Misamis Oriental",
        "Mountain Province",
        "Negros Occidental",
        "Negros Oriental",
        "Northern Samar",
        "Nueva Ecija",
        "Nueva Vizcaya",
        "Occidental Mindoro",
        "Oriental Mindoro",
        "Palawan",
        "Pampanga",
        "Pangasinan",
        "Quezon",
        "Quirino",
        "Rizal",
        "Romblon",
        "Samar",
        "Sarangani",
        "Siquijor",
        "Sorsogon",
        "South Cotabato",
        "Southern Leyte",
        "Sultan Kudarat",
        "Sulu",
        "Surigao del Norte",
        "Surigao del Sur",
        "Tarlac",
        "Tawi-Tawi",
        "Zambales",
        "Zamboanga del Norte",
        "Zamboanga del Sur",
        "Zamboanga Sibugay",
      ],
      municipality_options: [
        "Cabusao",
        "Del Gallego",
        "Lupi",
        "Ragay",
        "Sipocot",
        "Gainza",
        "Libmanan",
        "Milaor",
        "Minalabac",
        "Pamplona",
        "Pasacao",
        "San Fernando",
        "Bombon",
        "Calabanga",
        "Camaligan",
        "Canaman",
        "Magarao",
        "Ocampo",
        "Pili",
        "Caramoan",
        "Garchitorena",
        "Goa",
        "Lagonoy",
        "Presentacion",
        "Sagnay",
        "San Jose",
        "Siruma",
        "Tigaon",
        "Tinambac",
        "Baao",
        "Balatan",
        "Bato",
        "Buhi",
        "Bula",
        "Nabua",
        "Naga City",
      ],
      barangay_options: [
        "Agaas",
        "Antolon",
        "Bacgong",
        "Bahay",
        "Bikal",
        "Binanuahan",
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
        "Ili-Centro",
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
        "Solnopan (Poblacion)",
        "Tabgon",
        "Tabiguian",
        "Tabog",
        "Tawog",
        "Toboan",
        "Terogo",
      ],
      establishment_options: ["Hotel", "Homestay", "Resort", "Inn"],
    };
  },
  computed: {
    ownerAge() {
      const birthdate = this.model.owner.owner_birthdate;
      if (!birthdate) return null;

      const today = new Date();
      const birthDate = new Date(birthdate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  methods: {
    async submitForm() {

      const ownerData = {
        owner_first_name: this.model.owner.owner_first_name,
        owner_middle_name: this.model.owner.owner_middle_name,
        owner_last_name: this.model.owner.owner_last_name,
        owner_contact_number: this.model.owner.owner_contact_number,
        owner_email: this.model.owner.owner_email,
        owner_age: 20,
        owner_province: this.model.owner.owner_province,
        owner_municipality: this.model.owner.owner_municipality,
        owner_barangay: this.model.owner.owner_barangay,
        owner_civil_status: this.model.owner.owner_civil_status,
        owner_gender: this.model.owner.owner_gender,
        owner_birthdate: this.model.owner.owner_birthdate,
      };

      console.log(ownerData);

      try {
        const ownerResponse = await axios.post("http://127.0.0.1:8000/api/owner", ownerData);
        console.log("owner data:", ownerResponse.data);
        const owner_id = ownerResponse.data.Owner.id;
        this.owner = ownerResponse.data.Owner;

        console.log("Owner ID: " + owner_id);

        const establishmentData = {
          owner_id: owner_id,
          establishment_email: this.model.establishment.establishment_email,
          establishment_contact_number: this.model.establishment.establishment_contact_number,
          establishment_type: this.model.establishment.establishment_type,
          establishment_address: this.model.establishment.establishment_address,
          establishment_name: this.model.establishment.establishment_name,
        };

        console.log(establishmentData);

        const establishmentResponse = await axios.post("http://127.0.0.1:8000/api/establsihment", establishmentData);
        console.log("Establishment data:", establishmentResponse.data);
        const establishment_id = establishmentResponse.data.Establsihment.id;
        this.payment = establishmentResponse.data.Establsihment;


        console.log("Owner ID: " + owner_id);
        console.log("Establishment ID: " + establishment_id);

      } catch (error) {
        console.error("Error during form submission:", error);
      }
    },
    nextTab() {
      if (this.tab === "owner") {
        this.tab = "establishment";
      }
    },
    prevTab() {
      if (this.tab === "establishment") {
        this.tab = "owner";
      }
    },
    add_establishment_form() {
      // Add a new empty establishment object to additional_establishments array
      this.additional_establishments.push({
        establishment_name: '',
        establishment_address: '',
        establishment_email: '',
        establishment_contact_number: '',
        establishment_type: ''
      });
    },
    delete_establishment_form(index) {
      // Remove establishment at given index from additional_establishments array
      this.additional_establishments.splice(index, 1);
    },
  },
};
</script>


<style scoped>
.hiddenTab {
  display: none;
}

.container {
  height: auto;
  box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 15px;
}

.establishment-btn .v-btn {
  width: 22%;
  height: 40px;
  margin: 15px 0 0 0;
  color: white;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  border-style: none;
  display: flex;
}

.owner-btn .v-btn {
  width: 47.3%;
  height: 40px;
  margin: 15px 0 0 0;
  color: white;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  border-style: none;
  display: flex;
}

.v-btn:hover {
  background-color: #15344c;
}

h1 {
  color: #1e4e72;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 20px;
}

label {
  font-size: 18px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: #ffff;
  color: #15344c;
  font-size: 16px;
}

.establishment-btn,
.owner-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
  border-radius: 10px;
}

.error {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: #1e4e72;
}

.box {
  border-color: #1e4e72;
  border-style: dashed;
  border-width: 3px;
}
</style>