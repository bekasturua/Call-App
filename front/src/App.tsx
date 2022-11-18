import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import DataTable from "react-data-table-component";
import ReactApexChart from "react-apexcharts";
import { useUserStore } from "./store";

function App() {
  const [loading, setLoading] = useState(false);
  const state = useUserStore();

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

    state.deleteUser(id);
    setLoading(!loading);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        const users: User[] = [];
        const cities: { [key: string]: number } = {};
        for (const [key, value] of Object.entries(res.data)) {
          (value as User)._id = key;
          const user: User = value as User;
          users.push(user);

          const cityAmount = cities[user.address.city];
          if (cityAmount) {
            cities[user.address.city] = cityAmount + 1;
          } else {
            cities[user.address.city] = 1;
          }
        }
        state.setSeries(Object.values(cities))
        state.setOpts({ ...state.opts, labels: Object.keys(cities) })
        state.setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

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
    setLoading(!loading);
    setModal(false);
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
        <DataTable columns={columns} data={state.users} />
        <ReactApexChart
          options={state.opts as any}
          series={state.series as any}
          type="pie"
          width={500}
          height={320}
        />
      </div>
    </div>
  );
}

export default App;
