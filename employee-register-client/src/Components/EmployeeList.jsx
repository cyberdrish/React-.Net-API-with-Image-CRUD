import axios from "axios";
import Employee from "./Employee";
import { useEffect, useState } from "react";

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const employeeAPI = (url = "https://localhost:7182/api/Employee") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
      delete: (id) => axios.delete(url + "/" + id),
    };
  };

  const refreshEmployeeList = () => {
    employeeAPI()
      .fetchAll()
      .then((res) => setEmployeeList(res.data))
      .catch((err) => console.log(err));
  };

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("employeeId") == "0") {
      employeeAPI()
        .create(formData)
        .then((res) => {
          console.log("onCreate");
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
    } else {
      employeeAPI()
        .update(formData.get("employeeId"), formData)
        .then((res) => {
          console.log("onUpdate");
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
    }
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
    console.log(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure to delete this record?"))
      employeeAPI()
        .delete(id)
        .then((res) => {
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
  };

  const imageCard = (data) => (
    <div
      className="card-register"
      onClick={() => {
        showRecordDetails(data);
      }}
    >
      <div className="card-register-body">
        <img
          src={data.imageSrc}
          className="card-img-top rounded-circle"
          alt="userimg"
        />
        <h5>{data.employeeName}</h5>
        <span>{data.occupation}</span> <br />
        <button
          className="btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.employeeId))}
        >
          🗑️
        </button>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <h1 className="display-4">Employee Register</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <div className="col-md-8">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {employeeList.map((employee, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 calc(33.333% - 10px)", // Three items in one row
                maxWidth: "calc(33.333% - 10px)", // Prevent items from overflowing
              }}
              className="card-wrapper"
            >
              {imageCard(employee)}{" "}
              {/* Assuming imageCard is a function or component */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
