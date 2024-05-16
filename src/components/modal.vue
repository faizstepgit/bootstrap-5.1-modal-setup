<template>
  <div ref="myModal" id="globalModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog draggable" :class="[modalSize]" ref="modalDialog">
      <div class="modal-content">
        <div class="modal-header" id="modalHeader" style="cursor: move;">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" ref="close_btn" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-if="closeButton"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer" v-if="!hideFooter">
          <slot name="footer"></slot>
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
          <!-- <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      useCloseFunction: {
        type: Boolean,
        default: false
      },
      closeFunction: {
        type: Function
      },
      closeButton: {
        type: Boolean,
        default: true
      },
      notEsc: {
        type: Boolean,
        default: true
      },
      scale: {
        type: Number,
        default: 0
      },
      hideFooter: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        modalSize: 'modal-md',
        ui: window.ui
      }
    },
  methods: {
    openModal() {
      new bootstrap.Modal(this.$refs.myModal).show();
      return new Promise(resolve => {
        this.$nextTick(() => {
          this.makeModalDraggable()
        })
        const closeBtn = this.$refs.close_btn;
        closeBtn.addEventListener('click', () => {
          this.callback()
          resolve(true)
        })
      })

    },
    closeModal(){
      bootstrap.Modal.getInstance(this.$refs.myModal).hide();
    },
    callback() {
      if (this.useCloseFunction) {
        this.$emit('close-function')
      }
      else {
        this.closeModal()
      }
    },
    setSize(t) {
      this.modalSize = t
      // this.$set(this, 'modalSize', t)
    },
    adjustScreen() {
        if (this.scale != 0) {
          const modalBody = this.$refs.modalBody;
          const windowHeight = window.innerHeight;
          const scale = this.scale || 310;
          modalBody.style.height = `${windowHeight - scale}px`;
        }
      },
    makeModalDraggable() {
      let draggableModal = document.getElementById('globalModal');
      let modalHeader = document.querySelector('.modal-header');

      modalHeader.addEventListener('mousedown', function(e) {
        draggableModal.style.position = 'absolute';
        let offsetX = e.clientX - draggableModal.getBoundingClientRect().left;
        let offsetY = e.clientY - draggableModal.getBoundingClientRect().top;

        function moveModal(e) {
          draggableModal.style.left = e.clientX - offsetX + 'px';
          draggableModal.style.top = e.clientY - offsetY + 'px';
        }

        function stopModal() {
          document.removeEventListener('mousemove', moveModal);
          document.removeEventListener('mouseup', stopModal);
        }

        document.addEventListener('mousemove', moveModal);
        document.addEventListener('mouseup', stopModal);
      });
    },
  },
  mounted() {
    // this.makeModalDraggable();
    this.$nextTick(() => {
        window.addEventListener('resize', () => this.adjustScreen());
        window.dispatchEvent(new Event('resize'));
        console.log('-1');
    });
  },
  created() {
      document.addEventListener('keyup', (evt) => {
        if (evt.keyCode === 27) {
          this.callback()
        }
      })
  }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
