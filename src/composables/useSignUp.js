import { ref } from "vue"
import { auth } from "../firebase/config"
let error = ref(null);
let createAccount = async (email, password, displayName) => {
    try {

        let res = await auth.createUserWithEmailAndPassword(email, password)
        if(!res) {
            throw new Error ("Could not create new user")
        }
        res.user.updateProfile({displayName})
        return res;

    }catch(err) {
        error.value = err.message
    }
}
let useSignUp = () => {
    return { error, createAccount }
}
export default useSignUp