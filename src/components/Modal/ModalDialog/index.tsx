import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

interface ModalDialogProps {
  onClose: () => void;
  message: string;
  actionButtonText: string;
  onActionButtonClick: () => void;
}

export const ModalDialog = component$<ModalDialogProps>((props) => {
  useStyles$(styles);
  return (
    <div class="modal-dialog">
      <div class="modal-dialog-message">
        <p>{props.message}</p>
      </div>
      <div class="modal-dialog-buttons">
        <button class="modal-dialog-cancel" onClick$={props.onClose}>
          Cancel
        </button>
        <button
          class="modal-dialog-action"
          onClick$={props.onActionButtonClick}
        >
          {props.actionButtonText}
        </button>
      </div>
    </div>
  );
});
