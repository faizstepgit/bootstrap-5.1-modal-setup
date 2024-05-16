<template>
  <div class="container mt-5">
    <h1>Hello, Bootstrap 5.1 with Vite!</h1>
    <button class="btn btn-primary" @click="openModal">Open Modal</button>

    <GlobalModal ref="globalModal" title="My Global Modal" @confirm="handleConfirm">
      <p>This is the content of the modal.</p>
    </GlobalModal>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
    openModal() {
      this.$refs.globalModal.openModal()
      this.$refs.globalModal.setSize('modal-xl')
    },
    handleConfirm() {
      console.log('Modal confirmed');
      const modal = bootstrap.Modal.getInstance(this.$refs.globalModal.$el);
      modal.hide();
    },
  },
  mounted(){
    // new bootstrap.Modal(this.$refs.globalModal.$el).show()
  }
};
</script>

<style>
/* Add any global styles here */
</style>
