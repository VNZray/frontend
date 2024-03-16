<template>
    <v-container fluid
        style="height: 100vh; background-image: url('/public/Matukad-Island-Caramoan.webp'); background-size: cover; background-repeat: no-repeat;">
        <v-row justify="center" align="center" style="height: 100%;">
            <v-col cols="12" sm="12" md="4">
                <v-card width="100%" style=" background-color: rgba(255, 255, 255, 0.8);  backdrop-filter: blur(5px);">
                    <div class="container">
                        <h1>Register Account</h1>

                        <form @submit.prevent="submitForm" method="post">
                            <label for="fname">First name:</label>
                            <input type="text" id="fname" name="fname" v-model="firstName" required><br><br>
                            <label for="lname">Last name:</label>
                            <input type="text" id="lname" name="lname" v-model="lastName" required><br><br>
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" v-model="email" required><br><br>
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" v-model="password" required><br><br>
                            <label for="confirmPassword">Confirm password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                                required><br><br>

                            <div class="error" v-if="passwordMismatch">{{ passwordMismatch }}</div>

                            <div class="buttons">
                                <v-btn to="/" style="background-color: #1e1e1e;" >Back</v-btn>
                                <v-btn type="submit" value="Submit" style="background-color: #1E4E72;">Submit</v-btn>
                            </div>
                        </form>
                    </div>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordMismatch: "",
        };
    },
    methods: {
        submitForm() {
            if (this.password !== this.confirmPassword) {
                this.passwordMismatch = "Passwords do not match";
                return;
            }

            console.log("First Name:", this.firstName);
            console.log("Last Name:", this.lastName);
            console.log("Email:", this.email);
            console.log("Password:", this.password);
            console.log("Confirm Password:", this.confirmPassword);

            const userData = {
                email: this.email,
                password: this.password,
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            this.clearForm();
            this.$router.push("/");
        },
        clearForm() {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
            this.passwordMismatch = "";
        },
    },
};
</script>
<style scoped>
.container {
    height: auto;
    box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.3);
    padding: 40px 40px 40px 40px;
    border-radius: 15px;
}

input[type="submit"] {
    width: 100%;
    height: 55px;
    margin: 15px 0 0 0;
    background-color: #1E4E72;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 18px;
}

input[type="button"], .v-btn {
    width: 50%;
    height: 55px;
    margin: 15px 0 0 0;
    box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.2);
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 18px;
    border-style: none;
}


input[type="submit"]:hover {
    background-color: #15344c;
}

input[type="button"]:hover {
    background-color: #15344c;
}


h1 {
    color: #1E4E72;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
}

label {
    font-size: 20px;
}

.email_field,
.password_field {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 0 15px 0;
    row-gap: 5px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    padding: 10px;
    background-color: #efefef;
    color: #15344c;
    font-size: 18px;
}

.buttons {
    display: flex;
    gap: 15px;
}

.error {
    color: red;
    margin-top: 5px;
    font-size: 14px;
}
</style>