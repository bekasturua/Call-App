import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";

import React from "react";
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

  const toggle = () => setModal(!modal);

  const [users, setUsers] = useState<Array<User>>([]);

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

  return (
    <div>
      <div>
        <Button color="danger" onClick={toggle}>
          Add User
        </Button>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <input type="text" placeholder="Name..." />
            <input type="text" placeholder="Email..." />
            <input type="text" placeholder="City..." />
            <input type="text" placeholder="Street..." />
            <input type="text" placeholder="Phone..." />
            <select>
              <option value="Male">Male</option>
              <option value="Famale">Famale</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Add
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}

export default App;
