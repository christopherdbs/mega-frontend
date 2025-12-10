<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="not-found-page">
    <div class="error-container">
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-description">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div class="error-actions">
        <button @click="goHome" class="btn btn-primary">
          <i class="fas fa-home"></i> Go to Home
        </button>
        <button @click="goBack" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Go Back
        </button>
      </div>

      <div class="error-illustration">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#ff0055" stroke-width="2" opacity="0.3"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#ff0055" stroke-width="2" opacity="0.5"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="#ff0055" stroke-width="2" opacity="0.7"/>
          <path d="M 60 80 Q 80 60, 100 80 T 140 80" stroke="#ff0055" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="75" cy="90" r="5" fill="#ff0055"/>
          <circle cx="125" cy="90" r="5" fill="#ff0055"/>
          <path d="M 70 120 Q 100 105, 130 120" stroke="#ff0055" stroke-width="3" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1c1b29 0%, #2a2838 100%);
  color: white;
  padding: 20px;
}

.error-container {
  text-align: center;
  max-width: 600px;
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #ff0055 0%, #ff0077 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-shadow: 0 0 50px rgba(255, 0, 85, 0.3);
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fff;
}

.error-description {
  font-size: 1.1rem;
  color: #aaa;
  margin-bottom: 40px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.btn {
  padding: 14px 32px;
  border-radius: 25px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.9em;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn-primary {
  background: linear-gradient(90deg, #ff0055 0%, #ff0077 100%);
  color: white;
}

.btn-primary:hover {
  box-shadow: 0 10px 30px rgba(255, 0, 85, 0.4);
}

.btn-secondary {
  background: transparent;
  border: 2px solid #555;
  color: white;
}

.btn-secondary:hover {
  border-color: #ff0055;
  color: #ff0055;
}

.error-illustration {
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

.error-illustration svg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>
