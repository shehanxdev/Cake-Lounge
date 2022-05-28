import React, { useEffect, useState } from "react";
import axios from "axios";

//component imports
import AdminLogPreview from "./AdminLogPreview";
import AdminLogEditor from "./AdminLogEditor";
export default function AdminLog(props) {
  //initializing component states

  const [currentLog, setCurrentLog] = useState(null);
  const [logs, setLogs] = useState(null);
  const [updated, setUpdated] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [created, setCreated] = useState(0);

  //This useEffect hook monitors and fetch log data from the database
  useEffect(() => {
    const fetchLogs = async () => {
      await axios
        .post("http://localhost:8080/admin/log/fetchLogs", {})
        .then((result) => {
          let tempLog = [...result.data.logs];
          setLogs(tempLog);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchLogs();
  }, [updated, deleted, created]);

  //Update,delete,create methods for respective operations on Logs
  const updateLog = async (log) => {
    console.log("inside");
    await axios
      .post("http://localhost:8080/admin/log/update", { log })
      .then((result) => {
        if (result.data.updated) {
          setLogs(null);
          let temp = updated;
          ++temp;
          setUpdated(temp);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteLog = async (log) => {
    await axios
      .post("http://localhost:8080/admin/log/delete", { log })
      .then((result) => {
        if (result.data.deleted) {
          let temp = deleted;
          ++temp;
          setLogs(null);
          setDeleted(temp);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const createLog = async (log) => {
    await axios
      .post("http://localhost:8080/admin/log/create", { log })
      .then((result) => {
        setLogs(null);
        let temp = created;
        ++temp;
        setCreated(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //setting the current log
  const setLog = (log) => {
    setCurrentLog(log);
  };

  //Conditional rendering of the component
  if (logs === null) {
    return <></>;
  } else {
    return (
      <div
        className="d-flex flex-grow-1 justify-content-center custom_admin_log align-items-center admin_dashboard_overview_container"
        deleted={deleted}
      >
        <AdminLogPreview
          logs={logs}
          setCurrentLog={setLog}
          deleteLog={deleteLog}
          createLog={createLog}
        />
        <AdminLogEditor currentLog={currentLog} updateLog={updateLog} />
      </div>
    );
  }
}
