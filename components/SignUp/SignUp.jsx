import React, { useState } from "react";
import { switchToCardonaChain, web3Provider } from "../../context/constants";

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
    const provider = await web3Provider();
    const network = await provider.getNetwork();

    if (network.chainId !== parseInt(Cardona.chainId, 16)) {
      await switchToCardonaChain();
    }

    const data = await SIGN_UP(user);
  };

  return (
    <section className="login-content">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center height-self-center">
          <div className="col-md-5 col-sm-12 col-12 align-self-center">
            <div className="sign-user_card">
              <img
                src="../assets/images/logo-log.png"
                className="img-fluid rounded-normal light-logo custom-logo-size"
                alt="logo"
              />
              <h3 className="mb-3">Sign Up</h3>
              <p>Create your account.</p>
              <div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="floating-label form-group">
                      <input
                        className="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("fullname", e)}
                      />
                      <label>Full Name</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="floating-label form-group">
                      <input
                        className="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("username", e)}
                      />
                      <label>User Name</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="floating-label form-group">
                      <input
                        className="floating-input form-control"
                        type="text"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("email", e)}
                      />
                      <label>Email</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="floating-label form-group">
                      <input
                        className="floating-input form-control"
                        type="password"
                        placeholder=" "
                        onChange={(e) => handleFormFieldChange("password", e)}
                      />
                      <label>Password</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="floating-label form-group">
                      <input
                        className="floating-input form-control"
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
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button onClick={() => connect()} className="btn btn-primary">
                    Connect
                  </button>
                )}

                <p className="mt-3">
                  Already have an Account{" "}
                  <a
                    onClick={() => (setSignUp(false), setLogin(true))}
                    className="text-primary"
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
