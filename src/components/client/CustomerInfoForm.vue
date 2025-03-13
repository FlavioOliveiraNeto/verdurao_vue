<template>
  <div v-if="user" class="container mx-auto text-black">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Form Section -->
    <div class="customer-info-form">
      <!--<button
        @click="backTo"
        class="w-fit mb-[1rem] text-white bg-blue-500 hover:bg-blue-700 hover:border-blue-700 hover:text-white cursor-pointer text-start border-[1px] border-transparent px-1.5 py-0.5 rounded-md"
      >
        ⭠ Voltar
      </button>-->

      <form @submit.prevent="submitForm" class="grid gap-1">
        <div class="grid gap-6">
          <!-- Seção de Informações do Cliente -->
          <div class="grid gap-2">
            <h2 class="text-2xl font-bold">Informações do Cliente</h2>
            <div class="flex justify-between gap-3.5">
              <!-- CPF -->
              <div class="grid gap-0.5 flex-auto">
                <label for="cpf" class="px-1">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  v-model="form.cpf"
                  v-mask="'###.###.###-##'"
                  placeholder="Digite seu CPF"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Nome -->
              <div class="grid gap-0.5 flex-auto">
                <label for="name" class="px-1">Nome completo:</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  placeholder="Digite seu nome"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Telefone -->
              <div class="grid gap-0.5 flex-auto">
                <label for="cpf" class="px-1">Telefone:</label>
                <input
                  type="textasdasd"
                  id="telefone"
                  v-model="form.telephone"
                  v-mask="'(##) #####-####'"
                  placeholder="Digite seu Telefone"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Email -->
              <div class="grid gap-0.5 flex-auto">
                <label for="email" class="px-1">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="Digite seu e-mail"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Seção de Endereço de Entrega -->
          <div class="grid gap-2">
            <h2 class="text-2xl font-bold">Endereço de entrega</h2>
            <div class="flex justify-between gap-3.5">
              <!-- CEP -->
              <div class="grid gap-0.5 flex-auto">
                <label for="cep" class="px-1">CEP:</label>
                <input
                  type="text"
                  id="cep"
                  v-model="form.zip_code"
                  v-mask="'#####-###'"
                  placeholder="Digite seu CEP"
                  @blur="fetchAddress"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Logradouro -->
              <div class="grid gap-0.5 flex-auto">
                <label for="street" class="px-1">Logradouro:</label>
                <input
                  type="text"
                  id="street"
                  v-model="form.street"
                  placeholder="Rua/Avenida"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Número -->
              <div class="grid gap-0.5 flex-auto">
                <label for="number" class="px-1">Número:</label>
                <input
                  type="text"
                  id="number"
                  v-model="form.number"
                  placeholder="Número"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Complemento -->
              <div class="grid gap-0.5 flex-auto">
                <label for="complement" class="px-1">Complemento:</label>
                <input
                  type="text"
                  id="complement"
                  v-model="form.complement"
                  placeholder="Complemento"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div class="flex justify-between gap-3.5">
              <!-- Bairro -->
              <div class="grid gap-0.5 flex-auto">
                <label for="neighborhood" class="px-1">Bairro:</label>
                <input
                  type="text"
                  id="neighborhood"
                  v-model="form.neighborhood"
                  placeholder="Bairro"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Cidade -->
              <div class="grid gap-0.5 flex-auto">
                <label for="city" class="px-1">Cidade:</label>
                <input
                  type="text"
                  id="city"
                  v-model="form.city"
                  placeholder="Cidade"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <!-- Estado -->
              <div class="grid gap-0.5 flex-auto">
                <label for="state" class="px-1">Estado:</label>
                <input
                  type="text"
                  id="state"
                  v-model="form.state"
                  placeholder="Estado"
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Seção de Resumo da Compra -->
          <div class="grid gap-2">
            <h2 class="text-2xl font-bold">Resumo da Compra</h2>
            <div v-if="cartItems.length > 0" class="grid gap-4">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-4">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p class="font-medium">{{ item.name }}</p>
                    <p class="text-sm text-gray-600">Quantidade: {{ item.quantity }}</p>
                  </div>
                </div>
                <p class="font-medium">
                  {{
                    (
                      parseFloat(
                        item.price.replace('R$', '').replace('.', '').replace(',', '.').trim(),
                      ) * item.quantity
                    ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }}
                </p>
              </div>
              <div class="flex justify-between border-t pt-4">
                <p class="font-bold">Total:</p>
                <p class="font-bold">
                  {{ totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                </p>
              </div>
            </div>
            <div v-else>
              <p class="text-gray-600">Nenhum item no carrinho.</p>
            </div>
          </div>
        </div>

        <!-- Botão de Envio -->
        <button
          type="submit"
          class="w-fit px-8 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-lg hover:cursor-pointer justify-self-center"
        >
          Avançar
        </button>
      </form>
    </div>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mask } from 'vue-the-mask'
import Navigation from '@/templates/Navigation.vue'
import Footer from '@/templates/Footer.vue'
import OrderApi from '@/services/order'

export default {
  directives: { mask },
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      form: {
        cpf: '',
        name: '',
        telephone: '',
        email: '',
        zip_code: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
    }
  },
  created() {
    this.loadFormData()

    if (this.user) {
      this.form.cpf = this.user.cpf || ''
      this.form.name = this.user.name || ''
      this.form.email = this.user.email || ''
    }
  },
  computed: {
    // Obtém as informações do usuário logado do Vuex
    ...mapState('auth', ['user']),
    // Obtém os itens do carrinho do Vuex
    ...mapState('cart', ['cartItems']),
    // Calcula o preço total da compra
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) =>
          total +
          parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.').trim()) *
            item.quantity,
        0,
      )
    },
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.form.cpf = newUser.cpf || ''
        this.form.name = newUser.name || ''
        this.form.email = newUser.email || ''
      }
    },
    form: {
      handler(newValue) {
        this.saveFormData()
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('cart', ['saveCustomerInfo']),
    backTo() {
      history.back()
    },
    // Carrega os dados preenchidos do formulário
    loadFormData() {
      const savedFormData = localStorage.getItem('customerFormData')
      if (savedFormData) {
        this.form = JSON.parse(savedFormData)
      }
    },
    // Salva os dados preenchidos do formulário
    saveFormData() {
      localStorage.setItem('customerFormData', JSON.stringify(this.form))
    },
    // Busca o endereço a partir do CEP usando a API ViaCEP
    async fetchAddress() {
      if (this.form.zip_code.length === 9) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${this.form.zip_code}/json/`)
          const data = await response.json()

          if (!data.erro) {
            this.form.street = data.logradouro
            this.form.neighborhood = data.bairro
            this.form.city = data.localidade
            this.form.state = data.uf
          } else {
            alert('CEP não encontrado. Verifique o CEP digitado.')
          }
        } catch (error) {
          console.error('Erro ao buscar o endereço:', error)
          alert('Erro ao buscar o endereço. Tente novamente.')
        }
      }
    },
    // Envia o formulário
    async submitForm() {
      try {
        this.form.zip_code.replace(/\D/g, '')

        const orderData = {
          user_id: this.user.id,
          ...this.form,
          situation: 1, // Status inicial (1 - Aguardando pagamento)
        }
        const response = await OrderApi.createOrder(orderData)

        if (response.data.success) {
          localStorage.removeItem('customerFormData')
          this.$router.push({
            name: 'PaymentMethod',
            params: { orderId: response.data.order.id },
          })
        }
      } catch (error) {
        console.error('Erro ao salvar pedido:', error)
        alert('Erro ao processar pedido. Tente novamente.')
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 85vw;
  display: grid;
  align-items: center;
}

.customer-info-form {
  width: -webkit-fill-available;
  margin: 1rem auto;
  padding: 0.7rem 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

form {
  h2 {
    color: #1f2937;
  }

  label {
    font-weight: 500;
    color: #374151;
  }

  input {
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }

  button {
    transition: background-color 0.2s;
  }
}
</style>
