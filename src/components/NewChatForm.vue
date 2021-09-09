<template>

    <form>

        <textarea placeholder="enter a message and hit enter to send message" 
        v-model="message" 
        @keypress.enter="enterMessage">
        </textarea>

    </form>

</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from "../composables/getUser"
import { timestamp } from '../firebase/config'
import useCollection from "../composables/useCollection"
export default {
    setup() {
        let message = ref("");
        let { user } = getUser();
        let { error, addDoc }= useCollection("message");

        let enterMessage = async () => {
                let chat = {

                    message: message.value,
                    user: user.value.displayName,
                    created_at: timestamp()
                }

                // console.log(chat);
                await addDoc(chat)
                message.value = "";
        }
        return { message, enterMessage }
    }
}
</script>

<style>
    form {
        margin: 10px;
    }
    form textarea {
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        outline: none;
        border-color: #ccc;
    }
</style>