<template>
    <v-navigation-drawer expand-on-hover rail style="background-color: #1E4E72; color: white;">
        <v-list>
            <v-list-item prepend-avatar="https://cdn-icons-png.flaticon.com/128/10438/10438143.png"
                title="ACOTA" subtitle="System Administrator"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Dashboard" value="dashboard"
                to="/admin/dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-file-document-edit-outline" title="New Application" value="new_application"
                to="/admin/apply-membership"></v-list-item>
            <v-list-item prepend-icon="mdi-account-plus-outline" title="Applicants" value="applicants"
                to="/admin/applicants"></v-list-item>
            <v-list-item prepend-icon="mdi-credit-card-outline" title="Payment" value="payment"
                to="/admin/membership-payment"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple-outline" title="Members" value="members"
                to="/admin/member/list"></v-list-item>
            <v-list-item prepend-icon="mdi-office-building-outline" title="Establishments" value="establishment"
                to="/admin/establishment/list"></v-list-item>
            <v-list-item prepend-icon="mdi-account-outline" title="Create Account" value="create-account"
                to="/admin/create-account"></v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pb-2">
                <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" to="/login"></v-list-item>
            </div>
        </template>
    </v-navigation-drawer>
</template>