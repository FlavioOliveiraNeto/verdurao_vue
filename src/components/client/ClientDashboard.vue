<template>
    <button @click="logout">Sair</button>
    <p>Dashboard do Cliente</p>
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