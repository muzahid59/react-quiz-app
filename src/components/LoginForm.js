import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setloading] = useState();
    const {login} = useAuth();
    const [error, setError] = useState();
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setloading(true);
            setError("");
            await login(email, password);
            navigate("/");

        } catch (error) {
            setloading(false);
            setError("Failed to login");
            console.log(error);
        }
    }

    return (
        <>
            <Form style={{ height: '300px' }} onSubmit={handleSubmit}>
                    <TextInput
                        required={true}
                        type="text" 
                        placeholder="Enter email" 
                        icon="alternate_email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        required={true}
                        type="password"
                        placeholder="Enter password" 
                        icon="lock" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type='submit'
                        disabled={loading}
                    >
                        <span>Submit now</span>
                    </Button>
                    {error && <p className="error"> {error} </p>}
                    <div className="info">Don't have an account? <Link to="/signup">Signup</Link> instead.</div>
            </Form>
        </>
    );
}