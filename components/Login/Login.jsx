import React, { useState } from "react";

const Login = ({ LOGIN, address, connect, setSignUp, setLogin }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleFormFieldChange = (fileName, e) => {
    setUser({ ...user, [fileName]: e.target.value });
  };

  const CALLING_LOGIN = async (user) => {
    const data = await LOGIN(user);
  };
  return (
    <section class="login-content">
      <div class="container h-100">
        <div class="row justify-content-center align-items-center height-self-center">
          <div class="col-md-5 col-sm-12 col-12 align-self-center">
            <div class="sign-user_card">
              <img
                src="../assets/images/logo.png"
                class="img-fluid rounded-normal light-logo logo"
                alt="logo"
              />
              <h3 class="mb-3">Sign In</h3>
              <p>Login to stay connected.</p>
              <div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="floating-label form-group">
                      <input
                        class="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("username", e)}
                      />
                      <label>Username</label>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="floating-label form-group">
                      <input
                        class="floating-input form-control"
                        type="password"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("password", e)}
                      />
                      <label>Password</label>
                    </div>
                  </div>
                </div>
                {address ? (
                  <button
                    onClick={() => CALLING_LOGIN(user)}
                    class="btn btn-primary"
                  >
                    Sign In
                  </button>
                ) : (
                  <button onClick={() => connect()} class="btn btn-primary">
                    Connect
                  </button>
                )}

                <p class="mt-3">
                  Create an Account{" "}
                  <a
                    onClick={() => (setSignUp(true), setLogin(false))}
                    class="text-primary"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
