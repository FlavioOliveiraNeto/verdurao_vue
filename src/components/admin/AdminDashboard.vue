<template>
    <div class="flex items-center justify-around w-[50%] h-fit m-auto">
        <button @click="logout" class="text-white text-lg font-bold bg-red-500 hover:bg-red-400 hover:cursor-pointer w-fit h-8 rounded-md px-4">
            Sair
        </button>
        <p class="text-black text-center text-5xl">Dashboard do Administrador</p>
    </div>
</template>

<script>
    import LoginApi from '@/services/login';

    export default {
        methods: {
            async logout() {
                try {
                    LoginApi.logout();
                    this.$store.dispatch('showMessage', {
                        text: 'Usuário deslogado com sucesso.',
                        type: 'success',
                    });
                    this.$router.push('/login');
                } catch (error) {
                    this.$store.dispatch('showMessage', {
                        text: 'Usuário não pôde ser deslogado. Tente novamente.',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>