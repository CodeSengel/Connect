<template>
  
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar class="bg-purple">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> 
         <div style="width:100%;">
          <div class=" text-h5 q-my-none" style="position:relative;width:60%" > Connect </div> 
          
         </div>
            
          
        </q-toolbar-title>
        <div class="q-pr-xl"><q-badge color="purple" text-color="white" class="q-ma-md">
          {{todaysDate}} 
        </q-badge></div> 
        <div> Connect v1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>

      <q-list v-if="user"   >
        <div class="relative q-px-xl q-pt-xl">
          <q-avatar size="200px" >
            <img src="~assets/profileMorty.jpg"> 
          </q-avatar> 
        </div>
        <div >
          <p class=" text-h6 q-my-none"  style="text-align: center;"> {{user.user_metadata.name}} </p>
          <p class="text-h10 q-pb-xs q-my-none"  style="text-align: center;"> {{user.user_metadata.role}} </p> 
          <p class="text-h10 q-pb-lg q-my-none"  style="text-align: center;"> {{user.email}} </p>
        </div>
        
        <div>
        <EssentialLink
          v-for="to in essentialLinks"
          :key="to.title"
          v-bind="to"  
        />

        <LinkLogout
        v-for="link in linkout"
        :key="link.title"
        v-bind="link"
        @click="handleLogout"

        />
        </div>
        
      
      
      </q-list>
    </q-drawer>

    <q-page-container>
      
        <router-view />
      
      
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import LinkLogout from "components/LinkLogout.vue";
import { defineComponent, ref } from "vue";
import { date } from 'quasar'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'


const SourceAvatar2 = "https://cdn.quasar.dev/img/avatar.png"
const linkout = [
{
    title: "Se déconnecter",
    caption: "Déconnexion",
    icon: "fas fa-sign-out-alt",
    
  },
]


const linksList = [
{
    title: "Profile",
    caption: "Aller sur ton profile",
    icon: "far fa-user",
    
    to: "/me",
  },
  {
    title: "Tableau de bord",
    caption: "Aller sur ton tableau de bord",
    icon: "far fa-calendar-alt",
    to: "/dashboard",
  },
  

  
];



export default defineComponent({
  name: "MainLayout",
  
  computed: {
    todaysDate(){
      
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },

  components: {
    EssentialLink,
    LinkLogout
    
  },

  setup() {
    const {user}=useAuthUser();
    const $q = useQuasar()
    const router = useRouter()
    const {logout} = useAuthUser()
    const leftDrawerOpen = ref(false);
    const   handleLogout = async () => {
      $q.dialog({
        title : 'Logout',
        message : 'Do you really want to leave ?',
        cancel : true,
        persistent : true
      }).onOk(async () => {
        await logout()
        router.push({name : 'login'})
      })
    }

    return {
      handleLogout,
      user,
      essentialLinks: linksList,
      linkout:linkout,
      sourceAvatar: SourceAvatar2,
      leftDrawerOpen,
      AccountName: "",
      PositionName:"emm",
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
