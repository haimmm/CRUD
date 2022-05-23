import { Button } from "components";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import userApi from "utils/userAPI";
import { editValidator } from "utils/validators";
import "./User.css"

const User = () => {
    const { id } = useParams();
    const { isLoading, error, fetchData } = useFetch();
    const initValues = {
        email: "",
        first_name: "",
        last_name: ""
    }
    const [formValues, setFormValues, reset] = useValue({ ...initValues });

    useEffect(() => {
        fetchData(async () => {
            const data = await userApi.getUserById(id);
            reset(data.data);
        }, false);
    }, []);

    const handleEdit = e => {
        fetchData(async () => {
            editValidator(formValues);
            await userApi.updateUser(id, formValues);
        }, false, "/dashboard");
    }

    const handleDelete = e => {
        fetchData(async () => {
            await userApi.deleteUser(id);
        }, false, "/dashboard");
    }

    return (
        <form className="userContainer">
            <h1>Profile</h1>
            <div>
                <label>Email:</label>
                <input type="text" name="email" value={formValues.email} onChange={setFormValues} />
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
            <Button onClick={handleEdit}>SAVE CHANGES</Button>
            <Button onClick={handleDelete}>DELETE</Button>
        </form>
    );

}

export default User;