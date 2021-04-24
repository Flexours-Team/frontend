<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with credentials</small>
          </div>

          <form role="form">
            <!-- <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
            > -->
        <!-- <input type="text" id="email" class="form__input" autocomplete="off" placeholder=" ">
        <label for="email" class="form__label">Email</label>
        <input type="password" id="password" class="form__input" autocomplete="off" placeholder=" ">
        <label for="email" class="form__label">Password</label> -->
<!-- 
              <input
              class="input-group-alternative mb-3"
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                class="input-group-alternative mb-3"
                type="password"
                placeholder="password..."
                v-model="password"
            /> -->


<div class="container">
	<div class="container__item">
		<form class="form">
			<input v-model="email" type="email" class="form__field" placeholder="Your E-Mail Address" />
			<input v-model="password" type="password" class="form__field" placeholder="Your Password Address" />
		</form>
	</div>
	</div>


            <!-- </base-input> -->

            <div class="text-center">
              <base-button type="submit" class="my-4" @click="login">Sign in</base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase"
export default {
  name: "login",
  data() {
    return {
        email: "",
        password: "",
      
    };
  },
      methods: {
        login() {
          console.log(this.email, this.password);
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    // alert('Successfully logged in');
                    this.$router.push('/dashboard');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },

};
</script>
<style lang="scss" scoped>
//** variables
$background: #f5f6fa;
$text: #9c9c9c;
$input-bg-color: #fff;
$input-text-color: #a3a3a3;
$button-bg-color: #7f8ff4;
$button-text-color: #fff;

//** root
:root {
	background: $background;
	color: $text;
	font: 1rem "PT Sans", sans-serif;
}

html,
body,
.container {
	height: 100%;
}

a {
	color: inherit;
	
	&:hover {
		color: $button-bg-color;
	}
}

//** helper
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.uppercase {
	text-transform: uppercase;
}

//** button
.btn {
	display: inline-block;
	background: transparent;
	color: inherit;
	font: inherit;
	border: 0;
	outline: 0;
	padding: 0;
	transition: all 200ms ease-in;
	cursor: pointer;
	
	&--primary {
		background: $button-bg-color;
		color: $button-text-color;
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
		border-radius: 2px;
		padding: 12px 36px;
		
		&:hover {
			background: darken($button-bg-color, 4%);
		}
		
		&:active {
			background: $button-bg-color;
			box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
		}
	}
	
	&--inside {
		margin-left: -96px;
	}
}

//** form
.form {	
	&__field {
		width: 360px;
		background: #fff;
		color: $input-text-color;
		font: inherit;
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);
		border: 0;
		outline: 0;
		padding: 22px 18px;
	}
}

</style>









