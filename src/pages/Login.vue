<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const loginError = ref("");

const handleLogin = async () => {
    loginError.value = "";

    if (!email.value || !password.value) {
        loginError.value = "Please fill out all fields.";
        return;
    }

    isLoading.value = true;

    try {
        email.value = "";
        password.value = "";
    } catch (error) {
        loginError.value = "Error whilel signing in. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Sign in</h2>

            <p v-if="loginError" class="error-message">{{ loginError }}</p>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    required
                    :disabled="isLoading"
                    placeholder="your.mail@example.com"
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    required
                    :disabled="isLoading"
                    placeholder="••••••••••••••••"
                />
            </div>

            <button type="submit" :disabled="isLoading" class="submit-button">
                <span v-if="isLoading">Loading...</span>
                <span v-else>Sign in</span>
            </button>

            <div class="form-footer">
                <p>
                    Don't have an account ?
                    <a href="#" @click.prevent="">Create an account</a>
                </p>
                <p><a href="#" @click.prevent="">Forgot password ?</a></p>
            </div>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
}

.login-form {
    background-color: #3a3853;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 400px;
    color: #fff;
}

h2 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    color: white;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #ccc;
}

input {
    width: 100%;
    padding: 12px;
    border: 1px solid #5a5775;
    border-radius: 12px;
    background-color: #29273b;
    color: #fff;
    font-size: 16px;
    transition: border-color 0.3s;
}

input:focus {
    border-color: #ff0055;
    outline: none;
}

input::placeholder {
    font-size: 20px;
}

.submit-button {
    width: 100%;
    padding: 15px;
    background: linear-gradient(0deg, #b9003e, #ff0055 45%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.3s;
    margin-top: 15px;
}

.submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    background-color: #b9003e;
    color: white;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
}

.form-footer {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
}

.form-footer a {
    color: #ff0055;
    text-decoration: none;
    transition: color 0.3s;
}

.form-footer a:hover {
    color: #fff;
    text-decoration: underline;
}
</style>
