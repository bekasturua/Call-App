import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";

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

  return <DataTable columns={columns} data={users} />;
}

export default App;
