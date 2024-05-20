import React, { useState } from "react";

const SignUp = ({ SIGN_UP, connect, address, setSignUp, setLogin }) => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleFormFieldChange = (fileName, e) => {
    setUser({ ...user, [fileName]: e.target.value });
  };

  const CALLING_SIGNUP = async (user) => {
    const data = await SIGN_UP(user);
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

              <h3 class="mb-3">Sign Up</h3>
              <p>Create your account.</p>
              <div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="floating-label form-group">
                      <input
                        class="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("fullname", e)}
                      />
                      <label>Full Name</label>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="floating-label form-group">
                      <input
                        class="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("username", e)}
                      />
                      <label>User Name</label>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="floating-label form-group">
                      <input
                        class="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("email", e)}
                      />
                      <label>Email</label>
                    </div>
                  </div>
                  <div class="col-lg-6">
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
                  <div class="col-lg-6">
                    <div class="floating-label form-group">
                      <input
                        class="floating-input form-control"
                        type="password"
                        placeholder=" "
                        onChange={(e) =>
                          handleFormFieldChange("confirmpassword", e)
                        }
                      />
                      <label>Confirm Password</label>
                    </div>
                  </div>
                </div>
                {address ? (
                  <button
                    onClick={() => CALLING_SIGNUP(user)}
                    class="btn btn-primary"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button onClick={() => connect()} class="btn btn-primary">
                    Connect
                  </button>
                )}

                <p class="mt-3">
                  Already have an Account{" "}
                  <a
                    onClick={() => (setSignUp(false), setLogin(true))}
                    class="text-primary"
                  >
                    Sign In
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

export default SignUp;
