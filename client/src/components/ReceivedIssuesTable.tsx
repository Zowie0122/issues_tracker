import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Table } from "antd";
import { formatToTimeAgo, formatToDateTime } from "../util";

interface OBJ {
  key: string;
  title: string;
  priority: string;
  deadline: string;
  from: string;
}

interface AxiosResponse {
  i_data_created: string;
  i_deadline: string;
  i_description: string;
  i_priority: string;
  i_status: string;
  i_title: string;
  iid: number;
  username: string;
}

interface Props {
  url: string;
  status: string;
}

const ReceivedIssuesTable: React.FC<Props> = ({ url, status }) => {
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
          <a href={`/issue_details/received/${record.key}`}>More details</a>
        </span>
      ),
    },
  ];

  const format_data_source = (rawData: []): [] => {
    const formated_array: OBJ[] | any = [];
    rawData.forEach((data: AxiosResponse) => {
      let obj: OBJ = {
        key: data.iid.toString(),
        title: data.i_title,
        priority: data.i_priority,
        deadline: formatToDateTime(data.i_deadline),
        from: data.username,
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
        <h3>No issue found</h3>
      )}
    </div>
  );
};

export default ReceivedIssuesTable;
