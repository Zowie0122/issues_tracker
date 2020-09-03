import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<AxiosResponse | null>(null);

  interface AxiosResponse {
    did: number;
    username: string;
    email: string;
    password: string;
    department_name: number;
    department_id: number;
    uid: number;
  }

  async function fetch_user_info() {
    try {
      const auth_id = localStorage.getItem("i_id");
      const auth_token = localStorage.getItem("i_token");

      if (auth_id !== null && auth_token !== null) {
        const userData = await axios.get(
          `http://localhost:5000/user/${auth_id}`,
          {
            headers: {
              token: auth_token,
              id: auth_id,
            },
          }
        );
        console.log(userData.data);
        setUserInfo(userData.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch_user_info();
  }, []);

  return (
    <div>
      <Navbar />
      {userInfo && <h1>Hi ! {userInfo.username}</h1>}
    </div>
  );
};

export default Dashboard;
