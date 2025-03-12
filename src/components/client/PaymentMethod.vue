<template>
  <div>
    <form @submit.prevent="processPayment">
      <div v-if="paymentMethod === 'credit_card'">
        <input v-model="cardNumber" type="text" placeholder="Número do Cartão" required />
        <input v-model="expiryDate" type="text" placeholder="Data de Expiração" required />
        <input v-model="cvv" type="text" placeholder="CVV" required />
      </div>

      <div v-else>
        <input v-model="pixKey" type="text" placeholder="Chave Pix" required />
      </div>

      <button type="submit">Pagar</button>
    </form>
  </div>
</template>

<script>
import paymentService from '@/services/paymentService'

export default {
  data() {
    return {
      paymentMethod: 'credit_card', // Pode ser 'credit_card' ou 'pix'
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      pixKey: '',
    }
  },
  methods: {
    async processPayment() {
      try {
        const paymentData =
          this.paymentMethod === 'credit_card'
            ? {
                cardNumber: this.cardNumber,
                expiryDate: this.expiryDate,
                cvv: this.cvv,
              }
            : { pixKey: this.pixKey }

        const response = await paymentService.processPayment(paymentData, this.paymentMethod)
        if (response.status === 200) {
          alert('Pagamento realizado com sucesso!')
        }
      } catch (error) {
        alert('Erro no pagamento!')
      }
    },
  },
}
</script>
