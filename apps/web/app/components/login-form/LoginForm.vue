<script setup lang="ts">
  import { useAuth } from '@/composables/useAuth';
  const { loginWithGoogle } = useAuth();
  const handleLogin = () => {
    console.log("Logging in with Google...");
    loginWithGoogle();
  };
</script>

<template>
  <ShadCard class="mx-auto max-w-sm">
    <ShadCardHeader>
      <ShadCardTitle class="text-2xl"> Login </ShadCardTitle>
      <ShadCardDescription> Enter your email below to login to your account </ShadCardDescription>
    </ShadCardHeader>
    <ShadCardContent>
      <ShadButton @click="handleLogin" class="w-full">Googleでログイン</ShadButton>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="#" class="underline">
          Sign up
        </a>
      </div>
    </ShadCardContent>
  </ShadCard>
</template>

