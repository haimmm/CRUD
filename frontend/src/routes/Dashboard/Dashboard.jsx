import { Button } from "components";
import AuthContext from "context/AutoContext";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import userApi from "utils/userAPI";
import "./Dashboard.css"
import { registerValidator } from "utils/validators";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, error, fetchData } = useFetch();
    const initValues = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        isAdmin: false
    }
    const [formValues, setFormValues, reset] = useValue({ ...initValues });

    const fetchUsers = () => {
        fetchData(async () => {
            return await userApi.getAllUsers();
        });
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const handleAdd = e => {
        fetchData(async () => {
            registerValidator(formValues);
            const user = await userApi.addUser(formValues);
            reset(initValues);
            fetchUsers()
        }, false);
    }



    return (
        <>
            <h1>Dashboard</h1>
            <h3>Users List:</h3>
            <ul className="usersList">
                {data?.map(u => (
                    <li key={u.id}>
                        {user.isAdmin && <Link to={`/users/${u.id}`}>{u.email}</Link>}
                        <span>name: {u.first_name}</span>
                        <span>last name: {u.last_name}</span>
                    </li>
                ))}
            </ul>

            {user.isAdmin &&
                <form className="addUserContainer">
                    <h1>Add user</h1>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" value={formValues.email} onChange={setFormValues} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={formValues.password} onChange={setFormValues} />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="first_name" value={formValues.first_name} onChange={setFormValues} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="last_name" value={formValues.last_name} onChange={setFormValues} />
                    </div>

                    {isLoading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <Button onClick={handleAdd}>ADD USER</Button>
                </form>
            }
        </>
    );
}

export default Dashboard;
