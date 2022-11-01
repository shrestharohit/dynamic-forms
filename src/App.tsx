import { getIn, useFormik } from "formik";
import * as yup from "yup";

const App = () => {
  const addUser = () => {
    return {
      name: "",
    };
  };

  const deleteUser = (recordIndex: any) => {
    const users = [...formik.values.users];
    users.splice(recordIndex, 1);
    formik.setFieldValue("users", users);
  };

  const validationSchema = yup.object().shape({
    users: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please enter"),
      })
    ),
  });

  const handleSubmit = () => {
    alert(JSON.stringify(formik.values));
  };

  const formik = useFormik<{ users: Array<{ name: string }> }>({
    initialValues: {
      users: [{ name: "" }],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className="container">
        <div className="title">Dynamic Form</div>
        <form onSubmit={formik.handleSubmit}>
          {formik.values.users?.map((item: any, index: number) => (
            <div key={index} className="row">
              <div className="index">{index + 1}. </div>
              <div className="input-container">
                <input
                  name={`users[${index}]['name']`}
                  value={getIn(formik.values, `users[${index}]['name']`)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {getIn(formik.touched, `users[${index}].name`) &&
                getIn(formik.errors, `users[${index}].name`) ? (
                  <div className="error">
                    {getIn(formik.errors, `users[${index}].name`)}
                  </div>
                ) : null}
              </div>
              <button
                style={{ background: "red" }}
                onClick={() => {
                  deleteUser(index);
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="row">
            <button
              style={{ background: "green" }}
              onClick={(e) => {
                e.preventDefault();
                formik.setFieldValue(
                  "users",
                  [...formik.values.users, addUser()],
                  false
                );
              }}
            >
              Add New
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
