
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyD1N3t2-kfk6XcSgv70qw1v_xDRARXg358",
    authDomain: "hliwhr-5fdc3.firebaseapp.com",
    projectId: "hliwhr-5fdc3",
    storageBucket: "hliwhr-5fdc3.appspot.com",
    messagingSenderId: "887601969228",
    appId: "1:887601969228:web:e8bf942936d2752513dce9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.4.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>


// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");
