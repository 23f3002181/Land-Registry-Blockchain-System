import React from "react";
import Modal from "@/components/common/modal";

interface UpdateModalProps {
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ onClose }) => {
  // Add your form fields and update logic here
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <label htmlFor="fullName" className="block font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Update Full Name"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Update Phone Number"
              />
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <div className="mb-4">
              <label htmlFor="address" className="block font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Update Address"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="text"
                id="dateOfBirth"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Update Date of Birth"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Update Profile
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateModal;
