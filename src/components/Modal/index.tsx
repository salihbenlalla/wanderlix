import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import CloseIcon from "~/assets/icomoon_svg/close-outline.svg";
import styles from "./style.css?inline";

interface ModalProps {
  onClose?: () => void;
}

// write a modal component
export const Modal = component$<ModalProps>((props) => {
  useStyles$(styles);

  return (
    <div class="modal">
      <div class="modal-overlay"></div>
      <div class="modal-content custom-scrollbar">
        <div class="modal-close-button" onClick$={props.onClose}>
          <CloseIcon />
        </div>
        <Slot />
      </div>
    </div>
  );
});
