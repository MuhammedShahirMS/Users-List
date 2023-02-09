import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const  entries  = useSelector((state) => state.users.entries);
  const loading = useSelector((state) => state.users.loading);
  const emptyData = entries.length === 0;

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Users Dashboard</h1>
      </div>
      <div className="row">
        <div className="two columns">
          
        </div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone:</th>
              </tr>
            </thead>
            <tbody>
              {emptyData && <p>No Data</p>}
              {!emptyData && entries.length &&
                entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>{entry._id}</td>
                    <td>{entry.firstName}</td>
                    <td>{entry.lastName}</td>
                    <td>{entry.phoneNumber}</td>
                    <td>
                      <button onClick={() => handleDelete(entry._id)}>Delete</button>
                      <Link to={`/edit-user/${entry._id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
