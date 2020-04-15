import React, { useState, useEffect } from "react";
import axios from "axios";

import UserPage from "./UserPage"

const Users = () => {

  let [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:4000/api/v1/user");
      setData(result.data);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <UserPage 
        users={data}
    />
  );
};

export default Users;
