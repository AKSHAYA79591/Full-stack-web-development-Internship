import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./TLogin.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) return navigate("/teacher")
    }, [user, loading, navigate]);
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => signInWithEmailAndPassword(auth,email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/treset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/tregister">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;