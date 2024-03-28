import React from "react";

function DepartmentConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      class="modal-backdrop"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div class="card">
        <div className="card-header bg-primary text-light d-flex justify-content-between">
          <h5>Confirm</h5>
        </div>
        <div class="card-body">
          <div className="m-0">
            <p>Are you sure you want to delete this department?</p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginRight: "8px" }}
            title="Cancel"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Ok"
            onClick={() => onConfirm()}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentConfirmModal;
