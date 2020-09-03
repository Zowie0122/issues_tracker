import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Navbar from "./Navbar";

const OngoingTasks: React.FC = () => {
  const [userInfo, setUserInfo] = useState<AxiosResponse | null>(null);

  interface AxiosResponse {
    // did: number;
    // username: string;
    // email: string;
    // password: string;
    // department_name: number;
    // department_id: number;
    // uid: number;
  }

  async function fetch_ongoing_assignments() {
    try {
      const auth_id = localStorage.getItem("i_id");
      const auth_token = localStorage.getItem("i_token");

      if (auth_id !== null && auth_token !== null) {
        const data = await axios.get(
          `http://localhost:5000/user/assignments/ongoing`,
          {
            headers: {
              token: auth_token,
              id: auth_id,
            },
          }
        );
        console.log(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch_ongoing_assignments();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Ongoing Tasks</h1>
    </div>
  );
};

export default OngoingTasks;
