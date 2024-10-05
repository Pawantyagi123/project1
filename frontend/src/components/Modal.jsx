// Modal.js
import React from 'react';

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times; {/* Close button */}
                </button>
                {children} {/* Render any child components passed to the modal */}
            </div>
        </div>
    );
};

export default Modal;
