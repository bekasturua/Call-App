import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store";

interface AddUserProps {
  modal: boolean;
  toggle: (mode: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserModal = (props: AddUserProps) => {
  const state = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");

  const onAddSubmitHandler = async (event: any) => {
    event.preventDefault();
    const user = { name, email, city, street, phone, gender };

    const res = await axios.post(
      "http://localhost:3000/users",
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

    const _id = res.data as string;

    state.addUser({
      _id,
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
    <Modal isOpen={props.modal} fade={false} toggle={() => props.toggle("add")}>
      <ModalHeader toggle={() => props.toggle("add")}>Modal title</ModalHeader>
      <ModalBody>
        <form onSubmit={onAddSubmitHandler}>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name..."
          />
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City..."
          />
          <input
            type="text"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street..."
          />
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone..."
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">male</option>
            <option value="Famale">famale</option>
          </select>
          <ModalFooter>
            <Button color="primary" on>
              Add
            </Button>
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddUserModal;
