import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modal/modalSlice";
import Login from "../components/modalDialog/Login";
import LogOut from "../components/modalDialog/LogOut";
import Modal from "../Layout/modal/Modal";
import UserDetails from "../components/modalDialog/UserDetails";
import DeleteProduct from "../components/modalDialog/DeleteProduct";
import DeleteRequest from "../components/modalDialog/DeleteRequest";
import DeleteSpecific from "../components/modalDialog/DeleteSpecific";
import EditSpecific from "../components/modalDialog/EditSpecific";
import AddSpecific from "../components/modalDialog/AddSpecific";
import DeleteOrder from "../components/modalDialog/DeleteOrder";

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName } = useSelector((state) => state.modal);

  const closeModalHandler = () => dispatch(closeModal());
  const componentsLookup = {
    Login,
    LogOut,
    UserDetails,
    DeleteProduct,
    DeleteRequest,
    DeleteSpecific,
    EditSpecific,
    AddSpecific,
    DeleteOrder
  };
  let renderComponent;

  if (componentName) {
    const SelectedComponent = componentsLookup[componentName];
    if (SelectedComponent) {
      renderComponent = <SelectedComponent />;
    }
  }

  return (
    <Modal isOpen={isOpen} closeModalHandler={closeModalHandler}>
      {renderComponent}
    </Modal>
  );
};

export default ModalManager;
