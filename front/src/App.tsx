import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: (user: User) => user.name,
  },
  {
    name: "Email",
    selector: (user: User) => user.email,
  },
  {
    name: "City",
    selector: (user: User) => user.address.city,
  },
  {
    name: "Street",
    selector: (user: User) => user.address.street,
  },
  {
    name: "Gender",
    selector: (user: User) => user.gender,
  },
  {
    name: "Phone",
    selector: (user: User) => user.phone,
  },
];

function App() {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");

  return (
    <div>
      <div>
        <Button color="success" onClick={toggle}>
          Add User
        </Button>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form>
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
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
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
      </div>
      <div>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}

export default App;
