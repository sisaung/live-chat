<template>
  <div class="chat-window">
      <div class="messages" ref="msgBox">
          <div class="single" v-for="message in formatteMessages" :key="message.id" :class="{ current: current.displayName === message.user }">
              <span class="created-at">{{ message.created_at }}</span>
              <span class="name">{{ message.user }}</span>
              <span class="message">{{ message.message }}</span>
          </div>
      </div>
  </div>
</template>

<script>
import { auth, db } from '../firebase/config'
import {onSnapshot } from "firebase/firestore";
import { computed, ref } from '@vue/reactivity';
import { formatDistanceToNow } from 'date-fns'
import { onUpdated } from '@vue/runtime-core';
export default {
    setup() {
        let messages = ref([]);       
        let msgBox = ref(null);
        let current = auth.currentUser
        // console.log(current.displayName);

        //auto scrolling feature
        onUpdated( () => {
            msgBox.value.scrollTop = msgBox.value.scrollHeight;
            
        })

        let formatteMessages = computed( () => {

            return messages.value.map( (msg) => { 
              
               let formatTime = formatDistanceToNow(msg.created_at.toDate());
                return { ...msg, created_at: formatTime}      // ,message,user, created-at:sec
            })
        }) //[{}]

       db.collection("message").orderBy("created_at").onSnapshot((snap) => {
           
           let results = [];  

           snap.forEach((doc) => {

               let document = { id:doc.id, ...doc.data()}
               doc.data().created_at && results.push(document)
               
           })
          //  console.log(results);
            messages.value = results
            // console.log(messages.value);
       })

       return { messages, current, formatteMessages, msgBox }
    }
}
</script>

<style>
    .chat-window {
        background: #fafafa;
        padding: 30px 20px;
      }
      .single {
        margin: 18px 0;  
      }
      .current {
          text-align: right;
            
      }
      .created-at {
        display: block;
        color: #999;
        font-size: 12px;
        margin-bottom: 15px;
      }
      .name {
        font-weight: bold;
        margin-right: 6px;
      }
      
      .messages {
        max-height: 400px;
        overflow: auto;
      }
      
      .current .message {
          background-color: #ff304f;
          color: white;
          padding: 9px;
          box-sizing: border-box;
          border-radius: 14px;
      }
      .message {
          background-color: #ddd;
          color: #222;
          padding: 9px;
          box-sizing: border-box;
          border-radius: 14px;
      }
</style>