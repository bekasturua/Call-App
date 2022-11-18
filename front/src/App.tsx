import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";

import { Button } from "reactstrap";

import DataTable from "react-data-table-component";
import ReactApexChart from "react-apexcharts";
import { useUserStore } from "./store";
import AddUserModal from "./components/AddUserModal";
import EditUserModal from "./components/EditUserModal";

function App() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("add");
  const state = useUserStore();
  const [user, setUser] = useState<User>({
    _id: "",
    id: null,
    name: "",
    phone: "",
    gender: "",
    email: "",
    address: {
      city: "",
      street: "",
    },
  });

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
    {
      cell: (user: User) => (
        <Button color="primary" onClick={() => toggle("edit", user)}>
          Edit
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

  const toggle = (mode: "add" | "edit", user?: User) => {
    setModal(!modal);
    setMode(mode);
    if (user) {
      setUser(user);
    }
  };

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
        state.setSeries(Object.values(cities));
        state.setOpts({ ...state.opts, labels: Object.keys(cities) });
        state.setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  return (
    <div>
      <div>
        <Button color="success" onClick={() => toggle("add")}>
          Add User
        </Button>
        {mode === "add" ? (
          <AddUserModal
            loading={loading}
            modal={modal}
            setLoading={setLoading}
            setModal={setModal}
            toggle={() => toggle("add")}
          />
        ) : (
          <EditUserModal
            loading={loading}
            modal={modal}
            setLoading={setLoading}
            setModal={setModal}
            toggle={() => toggle("edit")}
            id={user._id}
            name={user.name}
            city={user.address.city}
            email={user.email}
            gender={user.gender}
            phone={user.phone}
            street={user.address.street}
          />
        )}
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
