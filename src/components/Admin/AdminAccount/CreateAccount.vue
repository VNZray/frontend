<template>
        <v-row justify="center" align="center" style="height: 100%">
            <v-col cols="12" sm="12" md="4">
                <v-card width="100%" style="
            background-color: rgba(255, 255, 255);
            backdrop-filter: blur(5px);
          ">
                    <div class="container">
                        <h1>Register Account</h1>

                        <form @submit.prevent="submitForm" method="post">
                            <v-row>
                                <v-col>
                                    <v-text-field label="First Name:" variant="outlined" type="text" id="first_name"
                                        name="first_name" v-model="model.account.first_name" required></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field label="Middle Name:" variant="outlined" type="text" id="middle_name"
                                        name="middle_name" v-model="model.account.middle_name"></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field label="Last Name:" variant="outlined" type="text" id="last_name"
                                        name="last_name" v-model="model.account.last_name" required></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="Contact Number:" variant="outlined" type="text"
                                        id="contact_number" name="contact_number" v-model="model.guest.contact_number"
                                        required></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field label="Email Address:" variant="outlined" type="email" id="email"
                                        name="email" v-model="model.account.email" required></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-combobox label="Province" :items="['Camarines Sur', 'Manila']"
                                        variant="outlined"></v-combobox>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-combobox label="Municipality" :items="['Caramoan', 'Naga City', 'Pili']"
                                        variant="outlined"></v-combobox>
                                </v-col>

                                <v-col>
                                    <v-combobox label="Barangay" :items="['Paniman', 'Bikal', 'Gota']"
                                        variant="outlined"></v-combobox>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field label="Password:" variant="outlined" type="password" id="password"
                                        name="password" v-model="model.account.password" required></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field label="Confirm Password:" variant="outlined" type="password"
                                        id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                                        required></v-text-field>
                                </v-col>
                            </v-row>

                            <div v-if="passwordMismatch" class="error">
                                {{ passwordMismatch }}
                            </div>

                            <div class="buttons">
                                <v-btn to="/login" style="background-color: #1e1e1e">Back</v-btn>
                                <v-btn type="submit" style="background-color: #1e4e72">Submit</v-btn>
                            </div>
                        </form>
                    </div>
                </v-card>
            </v-col>
        </v-row>
</template>

