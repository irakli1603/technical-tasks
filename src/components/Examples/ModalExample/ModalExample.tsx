import { useState } from "react";
import { Modal } from "src/components/Modal";
import { ModalSize } from "src/constants";

export const ModalExample = () => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isMediumModalOpen, setIsMediumModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const openSmallModal = () => setIsSmallModalOpen(true);
  const closeSmallModal = () => setIsSmallModalOpen(false);

  const openMediumModal = () => setIsMediumModalOpen(true);
  const closeMediumModal = () => setIsMediumModalOpen(false);

  const openLargeModal = () => setIsLargeModalOpen(true);
  const closeLargeModal = () => setIsLargeModalOpen(false);

  return (
    <div className="example-wrapper">
      <h1>Modal Examples</h1>
      <button onClick={openSmallModal}>Open Small Modal</button>
      <button onClick={openMediumModal}>Open Medium Modal</button>
      <button onClick={openLargeModal}>Open Large Modal</button>

      <Modal
        isOpen={isSmallModalOpen}
        onClose={closeSmallModal}
        title="Small Modal"
        size={ModalSize.SMALL}
        footerActions={[
          { label: "Close", onClick: closeSmallModal },
          { label: "Save", onClick: () => alert("Small Modal Saved!") },
        ]}
      >
        <p>This is a small modal.</p>
      </Modal>

      <Modal
        isOpen={isMediumModalOpen}
        onClose={closeMediumModal}
        title="Medium Modal"
        size={ModalSize.MEDIUM}
        footerActions={[
          { label: "Cancel", onClick: closeMediumModal },
          { label: "Confirm", onClick: () => alert("Medium Modal Confirmed!") },
        ]}
      >
        <p>This modal has medium size with more content.</p>
      </Modal>

      <Modal
        isOpen={isLargeModalOpen}
        onClose={closeLargeModal}
        title="Large Modal"
        size={ModalSize.LARGE}
        footerActions={[
          { label: "Dismiss", onClick: closeLargeModal },
          { label: "Accept", onClick: () => alert("Large Modal Accept!") },
        ]}
      >
        <p>
          This is a large modal. It can include much more content! For example
          images, forms or more complex cmoponents.
        </p>
      </Modal>
    </div>
  );
};
