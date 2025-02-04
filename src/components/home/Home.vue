<template>
    <div class="grid">
        <div class="grid">
            <p class="text-white font-black text-xl">Verdurão Center</p>
        </div>
        <div class="mx-auto my-auto flex max-w-4x1 items-center gap-x-10 rounded-xl p-6 shadow-lg">
            <div 
                class="mouse-cursor-gradient-tracking flex items-center justify-center w-80 h-100 rounded-lg shadow-lg bg-sky-900 cursor-pointer transition-colors duration-300"
                @mousemove="handleMouseMove($event, 'admin')"
                @mouseleave="handleMouseLeave('admin')"
                :style="adminStyle">
                <p class="relative z-10 text-xl font-bold text-white pointer-events-none">Administrador</p>
            </div>
        
            <div 
                class="mouse-cursor-gradient-tracking flex items-center justify-center w-80 h-100 rounded-lg shadow-lg bg-green-800 cursor-pointer transition-colors duration-300"
                @mousemove="handleMouseMove($event, 'cliente')"
                @mouseleave="handleMouseLeave('cliente')"
                :style="clienteStyle">
                <p class="relative z-10 text-xl font-bold text-white pointer-events-none">Cliente</p>
            </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    name: "UserCards",
    data() {
      return {
        adminStyle: {},
        clienteStyle: {},
      };
    },
    methods: {
      handleMouseMove(event, card) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const style = {
          '--x': `${x}px`,
          '--y': `${y}px`,
          '--size': '200px'
        };
        if (card === 'admin') {
          this.adminStyle = style;
        } else {
          this.clienteStyle = style;
        }
      },
      handleMouseLeave(card) {
        if (card === 'admin') {
          this.adminStyle = { '--size': '0' };
        } else {
          this.clienteStyle = { '--size': '0' };
        }
      }
    }
  };
</script>
  
<style scoped>
  .mouse-cursor-gradient-tracking {
    position: relative;
    overflow: hidden;
  }
  
  .mouse-cursor-gradient-tracking::before {
    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, rgba(255, 255, 255, 0.2), transparent);
    transform: translate(-50%, -50%);
    transition: none;
  }
</style>