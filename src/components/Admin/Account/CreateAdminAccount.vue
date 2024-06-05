<template>
    <v-container style="padding-bottom: 0;">
        <v-row>
            <v-col cols="6">
                <v-text-field prepend-inner-icon="mdi-magnify" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-select label="Account Type" :items="['Guest', 'Admin', 'Member']" variant="outlined"></v-select>
            </v-col>
        </v-row>
    </v-container>

    <v-container>

        <v-row>
            <v-col cols="8">
                <v-table>
                        <thead style="background-color: #1E4E72; color: white;">
                            <tr>
                                <th class="text-left">User ID</th>
                                <th class="text-left">Name</th>
                                <th class="text-left">Email</th>
                                <th class="text-center">Created At</th>
                                <th class="text-center">Updated At</th>
                            </tr>
                        </thead>
                    </v-table>
                <v-card elevation="6" style="height: 673px; overflow: auto;">
                    <v-table>
                        <tbody>
                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>

                            <tr>
                                <td>User ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td class="text-center">Created At</td>
                                <td class="text-center">Updated At</td>
                            </tr>
                        </tbody>

                    </v-table>
                </v-card>
            </v-col>

            <v-col cols="4">
                <form action="">
                    <v-card style="padding: 40px; background-color: #1E4E72; color: white; height: 730px" elevation="4">
                        <v-row>
                            <v-col>
                                <h1>Create Account</h1>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-select label="Name:" variant="outlined">

                                </v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Email:" type="email" variant="outlined">

                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Password:" type="password" variant="outlined">

                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Confirm Password:" type="password" variant="outlined">

                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-select label="Account Type" :items="['Admin', 'Member']" variant="outlined">

                                </v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-btn color="secondary" type="button" style="width: 100%; height: 40px;">Clear</v-btn>
                            </v-col>


                            <v-col>
                                <v-btn color="primary" type="submit" style="width: 100%; height: 40px;">Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>

                </form>
            </v-col>
        </v-row>


    </v-container>
</template>

<script>
export default {
    data() {
        return {
            loop: 10,
        };
    }
}
</script>

<style></style>