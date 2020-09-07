import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Table, Spin } from "antd";

interface OBJ {
  key: string;
  title: string;
  priority: string;
  deadline: string;
  from: string;
}

interface AxiosResponse {
  i_data_created: null;
  i_deadline: null;
  i_description: string;
  i_priority: string;
  i_status: string;
  i_title: string;
  iid: number;
  receiver_id: number;
  sender_id: number;
}

interface Props {
  url: string;
  status: string;
}

const IssuesTable: React.FC<Props> = ({ url, status }) => {
  const [dataSource, setDataSource] = useState<OBJ[] | null>(null);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priotiry",
      dataIndex: "priority",
      key: "priotiry",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "Details",
      key: "details",
      render: (text: any, record: OBJ) => (
        <span>
          <a href={`/issue_details/${record.key}`}>More details</a>
        </span>
      ),
    },
  ];

  const format_data_source = (rawData: []): [] => {
    const formated_array: OBJ[] | any = [];
    console.log(rawData);
    rawData.forEach((data: AxiosResponse) => {
      let obj: OBJ = {
        key: data.iid.toString(),
        title: data.i_title,
        priority: data.i_priority,
        deadline: "2020-09-22 19:10:25-07",
        from: data.sender_id.toString(),
      };
      formated_array.push(obj);
    });
    return formated_array;
  };

  async function fetch_user_info() {
    try {
      const token = localStorage.getItem("auth");
      const id = localStorage.getItem("id");

      if (token !== null && id !== null) {
        const res = await axios.get(url, {
          headers: {
            authorization: token,
            id: id,
            status: status,
          },
        });

        const formated_data = format_data_source(res.data);
        setDataSource(formated_data);
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
      {dataSource !== null && dataSource.length !== 0 ? (
        <Table dataSource={dataSource} columns={columns} />
      ) : (
        <Spin tip="Loading..."></Spin>
      )}
    </div>
  );
};

export default IssuesTable;
