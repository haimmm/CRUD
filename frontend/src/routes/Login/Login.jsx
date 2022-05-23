import { useFetch } from "hooks/useFetch";
import { loginValidator } from "utils/validators";
import userApi from "utils/userAPI";
import "./Login.css"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components";
import AuthContext from "context/AutoContext";
import { useValue } from "hooks/useValue";

const Login = () => {
    const navigator = useNavigate();
    const { setUser } = useContext(AuthContext);
    const { data, isLoading, error, fetchData } = useFetch();
    const initValues = {
        email: "",
        password: ""
    }
    const [formValues, setFormValues] = useValue({ ...initValues });

    const handleLogin = () => {
        if (!isLoading) {
            fetchData(async () => {
                loginValidator(formValues);
                return await userApi.login(formValues);
            });
        }
    }

    useEffect(() => {
        if (data) { //succesful login!
            setUser(data);
            navigator("/dashboard");
        }
    }, [data]);

    return (
        <form className="loginContainer">
            <h1>Login</h1>
            <div>
                <label>Email:</label>
                <input type="text" name="email" value={formValues.email} onChange={setFormValues} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formValues.password} onChange={setFormValues} />
            </div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <Button onClick={handleLogin}>LOGIN</Button>
        </form>
    );

}

export default Login;