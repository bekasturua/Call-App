import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import DataTable from "react-data-table-component";

function App() {
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
    {
      cell: (user: User) => (
        <Button color="danger" onClick={(e) => onDeleteHandler(e, user._id)}>
          Delete
        </Button>
      ),
    },
  ];

  const onDeleteHandler = async (event: any, id: any) => {
    event.preventDefault();

    const res = await axios.delete("http://localhost:3000/users/" + id);
  };

  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(Object.values(res.data));
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

    console.log(res);
  };

  return (
    <div>
      <div>
        <Button color="success" onClick={toggle}>
          Add User
        </Button>
        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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
