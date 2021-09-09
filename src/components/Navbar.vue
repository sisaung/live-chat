<template>

  <nav v-if="user">
    <div>
      <p>Hi {{ user.displayName }}</p>
      <p class="email">log in as {{ user.email }}</p>
    </div>
    <div v-if="error">
        {{ error }}
    </div>
        <button @click="logout">logout</button>
        
  </nav>
</template>

<script>
import { ref } from '@vue/reactivity'
import { auth } from '../firebase/config'
import useLogout from "../composables/useLogout"
import getUser from "../composables/getUser"
export default {

    setup() {
        
        
        let { signout, error } = useLogout();
        let { user } = getUser();
        
        let logout = async () => {
            await signout()
            // console.log("signout");
        }
        
      return { logout, error, user }
    }
}
</script>

<style>
    nav {
        padding: 20px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      nav p {
        margin: 2px auto;
        font-size: 16px;
        color: #444;
      }
      nav p.email {
        font-size: 14px;
        color: #999;
      }
      button {
          background-color: white;
          color: #444;
      }
    button:hover {
        cursor: pointer;
        background-color: #36d8ba;
        transition: 0.6s;
    }
   
</style>