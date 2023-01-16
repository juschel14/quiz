<template>
    <div class="constrained bg-grey-2">
        <QLayout view="hHR lpr lfr">
            <!--// Header //-->
            <QHeader bordered class="bg-white text-primary">
                <QToolbar>                 
                    <QToolbarTitle v-if="authStore.$state.token"> {{'hello annonymus' }}</QToolbarTitle>             
                    
                    <QToolbarTitle v-else>Vue3 + Vite + Quasar Quiz</QToolbarTitle>
                </QToolbar>
                 <QTabs align="left">                    
                    <div class="auth-tabs" v-if="authStore.$state.token">
                        <QTab  @click="logout" :label="'Logout'" />
                        <QRouteTab to="/easy" :label="'Quiz Easy'" />
                        <QRouteTab to="/medium" :label="'Quiz Medium'" />
                        <QRouteTab to="/hard" :label="'Quiz Hard'" />
                    </div>
                    <div class="not-auth-tabs" v-else>
                        <QRouteTab to="/login" :label="'Login'" />                        
                    </div>
                </QTabs>
            </QHeader>

            <!--// Left drawer //
            <QDrawer
                :hidden="!authStore.$state.user.email"
                show-if-above
                v-model="leftDrawerOpen"
                @before-hide="leftDrawerOpen = false"
                content-class="bg-white"
                :width="220"
            >
                
                <QBtn  to="/easy" :label="'Easy Quiz'" stack color="blue" class="q-mt-md"/>
                
            </QDrawer>-->

            <!--// Main content //-->
            <QPageContainer class="bg-grey-2">
                <router-view />
            </QPageContainer>
        </QLayout>
    </div>
</template>

<style lang="scss" scoped>
    .not-auth-tabs {
        display: inline-flex;
    }
</style>

<script setup lang="ts">

    import { ref, onMounted } from 'vue'
    import {  useAuthStore, useQuizStore } from './stores';
    import { useQuasar } from 'quasar'
    
    const $q = useQuasar()
    const leftDrawerOpen = ref(true);
    const authStore = useAuthStore()
    const quizStore = useQuizStore()
    const admin = ref(false)
    onMounted(async () => {   
      await quizStore.getToken()
    })
   
    
    const  logout = async () => {
        await authStore.logout()        
    } 
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap");

.constrained {
    width: 100%;
    height: 100%;
}

.constrained .q-layout,
.constrained .q-header,
.constrained .q-footer {
    margin: 0 auto;
    /* max-width: 1245px !important; */
}

.nav-btn {
    min-width: 90px;
}

.auth-tabs {
    display: inline-flex;
}
</style>
