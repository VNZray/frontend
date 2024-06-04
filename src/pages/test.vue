<template>
    <div class="center-container">
        <v-card class="mx-auto" color="grey" max-width="650" min-height="350" theme="dark" variant="flat">
            <v-sheet color="grey">
                <v-card-item style="height: 70px;">
                    <template v-slot:prepend>
                        <v-card-title>
                            <v-icon icon="mdi-calendar" start></v-icon>
                            Sacramental Events
                        </v-card-title>
                    </template>

                    <v-divider class="mx-2" vertical></v-divider>

                    <v-btn style="margin-left: 60%;" class="text-none text-subtitle-1" color="blue" size="small" variant="flat">
                        Make Schedule
                    </v-btn>

                </v-card-item>
            </v-sheet>


            <v-card class="ma-4" color="white" rounded="lg" variant="flat">
                <v-card-item>
                    <v-card-title class="text-body-2 d-flex align-center">
                        <v-icon color="black" icon="mdi-calendar" start></v-icon>

                        <span class="text-medium font-weight-bold" style="color: black;">Events</span>

                        <v-spacer></v-spacer>

                        <v-avatar image="https://cdn.vuetifyjs.com/images/john-smirk.png" size="x-small"></v-avatar>
                    </v-card-title>

                    <div class="py-2">


                        <div class="font-weight-light text-medium text-color-black">
                            Join us for the Sacrament of Baptism and welcome new members into our community.
                        </div>
                    </div>
                </v-card-item>

                <v-divider></v-divider>

                <v-row>
                    <v-col style="padding: 30px;">
                        <v-btn style="margin-left: 72%" class="text-none" prepend-icon="mdi-check" variant="text" border>
                            View Schedule
                        </v-btn>
                    </v-col>
                </v-row>

            </v-card>

            <!-- Funeral Event -->
            <v-card class="ma-4" color="black" rounded="lg" variant="flat">
                <!-- Content for Funeral Event -->
            </v-card>

            <!-- Wedding Event -->
            <v-card class="ma-4" color="#2f3136" rounded="lg" variant="flat">
                <!-- Content for Wedding Event -->
            </v-card>

            <!-- Confession Event -->
            <v-card class="ma-4" color="#2f3136" rounded="lg" variant="flat">
                <!-- Content for Confession Event -->
            </v-card>

        </v-card>
    </div>
</template>

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>