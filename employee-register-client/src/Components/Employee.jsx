import { useEffect, useState } from "react";

const defaultImageSrc = "/img/default-user.jpg";

const initialFieldValue = {
  employeeId: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

function Employee({ addOrEdit, recordForEdit }) {
  const [values, setValues] = useState(initialFieldValue);
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (recordForEdit) {
      setValues(recordForEdit);
    }
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(name, value);
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      console.log(imageFile);

      const reader = new FileReader();
      reader.onload = (x) => {
        console.log(x);

        setValues({
          ...values,
          imageFile,
          imageName: imageFile.name,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName == "" ? false : true;
    temp.occupation = values.occupation == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    console.log(temp);

    return Object.values(temp).every((x) => x == true);
  };

  const resetForm = () => {
    setValues(initialFieldValue);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("submitted=", values.imageName);
      const formData = new FormData();
      formData.append("employeeId", values.employeeId);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    errors && field in errors && errors[field] == false ? " invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("employeeName")}
                placeholder="Emaployee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("occupation")}
                placeholder="Occupation"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Employee;
