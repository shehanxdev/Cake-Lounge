import React, { Component, useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

export default function AdminLogEditor(props) {
  const [currentLog, setCurrentLog] = useState(null);
  const [currentContent, setContent] = useState(null);
  //use effect hook to change the log as user clicks on different logs in preview section
  useEffect(() => {
    const settingstate = () => {
      if (props.currentLog !== null) {
        setCurrentLog(props.currentLog);
        setContent(props.currentLog.content);
      }
    };
    settingstate();
  }, [props.currentLog]);

  //Tech change handler
  const handleChange = (event) => {
    currentLog.content = event.target.value;
    setContent(event.target.value);
  };

  //handle update submit
  const handleSubmit = () => {
    props.updateLog(currentLog);
  };
  //conditional rendering of the component
  if (currentContent === null) {
    return (
      <>
        <div className="col-8 custom_admin_log_editor h-100 p-4">
          <div className="custom_admin_log_editor_content px-4">
            <textarea
              value={`No Log Selected`}
              className="p-4"
              name="logContent"
              id="logContent"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="col-8 custom_admin_log_editor h-100 p-4">
        <div className="custom_admin_log_editor_content px-4 ">
          <textarea
            value={currentContent}
            className="p-4"
            name="logContent"
            id="logContent"
            cols="30"
            rows="10"
            onChange={handleChange}
          >
            {currentLog.content}
          </textarea>
        </div>
        <div
          className=" shadow-lg p-4  m-auto rounded rounded-circle custom_admin_log_editor_save_btn_container"
          style={{ aspectRatio: "1/1", cursor: "pointer" }}
        >
          <SaveIcon
            className="m-auto w-100 "
            onClick={handleSubmit}
            fontSize="large"
            sx={{
              color: "blue",
              cursor: "pointer",
              "&:hover": { color: "white" },
            }}
          />
        </div>
      </div>
    );
  }
}
