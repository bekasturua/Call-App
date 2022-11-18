import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store";

interface EditUserProps {
  modal: boolean;
  toggle: (mode: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  email: string;
  city: string;
  street: string;
  phone: string;
  gender: string;
  id: string;
}

const EditUserModal = (props: EditUserProps) => {
  const state = useUserStore();
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [city, setCity] = useState(props.city);
  const [street, setStreet] = useState(props.street);
  const [phone, setPhone] = useState(props.phone);
  const [gender, setGender] = useState(props.gender);

  const onEditSubmitHandler = async (event: any) => {
    event.preventDefault();
    const user = { name, email, city, street, phone, gender };

    const res = await axios.put(
      "http://localhost:3000/users/" + props.id,
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        address: { city: user.city, street: user.street },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    state.editUser({
      _id: props.id,
      name,
      email,
      phone,
      gender,
      address: { city, street },
      id: null,
    });
    props.setLoading(!props.loading);
    props.setModal(false);
  };

  return (
    <Modal
      isOpen={props.modal}
      fade={false}
      toggle={() => props.toggle("edit")}
    >
      <ModalHeader toggle={() => props.toggle("edit")}>Edit User</ModalHeader>
      <ModalBody>
        <form className="input" onSubmit={onEditSubmitHandler}>
          <span>Name: </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Email: </span>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>City: </span>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <span>Street: </span>
          <input
            type="text"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <span>Phone: </span>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span>Gender: </span>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">male</option>
            <option value="Famale">famale</option>
          </select>
          <ModalFooter>
            <Button color="primary" on>
              Edit
            </Button>
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditUserModal;
