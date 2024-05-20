import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
  Header,
  Footer,
  SideBar,
  Loader,
  Home,
  MyImage,
  MyAudio,
  MyPDF,
  MyVideo,
  Marketplace,
  Recent,
  Certificate,
  User,
  UpdateUser,
  UserList,
  Login,
  SignUp,
  Lock,
  Price,
  Error,
  Maintenance,
  Upload,
  Modal,
  BuyCard,
} from "../components/index";
import { CONTEXT } from "../context/context";

const index = () => {
  // const [openComponent, setOpenComponent] = useState("Home");
  const [maintenance, setMaintenance] = useState(false);
  const [selectedFileBuy, setSelectedFileBuy] = useState();
  const [buyCardModel, setBuyCardModel] = useState(false);

  //LOAD PFD FILE
  const [selectedPDF, setselectedPDF] = useState();

  const {
    SIGN_UP,
    LOGIN,
    CREATE_FILE,
    RESET_PASSWORD,
    connect,
    address,
    login,
    signUp,
    setSignUp,
    setLogin,
    loader,
    currentUser,
    getAllUserFiles,
    getAllPublicFiles,
    allDappUsers,
    setLoader,
    notifySuccess,
    notifyError,
    openComponent,
    setOpenComponent,
    BUY_RIGHT,
    getFileRights,
    memberships,
    BUY_CRADIT,
    LOAD_INITIAL_DATA,
  } = useContext(CONTEXT);

  return (
    <div>
      {login ? (
        <div className="wrapper">
          <Login
            LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            LOGIN={LOGIN}
            connect={connect}
            setSignUp={setSignUp}
            setLogin={setLogin}
            address={address}
          />
        </div>
      ) : signUp ? (
        <div className="wrapper">
          <SignUp
            LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            SIGN_UP={SIGN_UP}
            connect={connect}
            address={address}
            setSignUp={setSignUp}
            setLogin={setLogin}
          />
        </div>
      ) : maintenance ? (
        <div className="wrapper">
          <Maintenance />
        </div>
      ) : (
        <div class="wrapper">
          <SideBar
            setOpenComponent={setOpenComponent}
            currentUser={currentUser}
            memberships={memberships}
            LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            BUY_CRADIT={BUY_CRADIT}
          />
          <Header
            LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            currentUser={currentUser}
            setOpenComponent={setOpenComponent}
          />
          {openComponent == "Home" ? (
            <Home
              getAllPublicFiles={getAllPublicFiles}
              getAllUserFiles={getAllUserFiles}
              currentUser={currentUser}
              setOpenComponent={setOpenComponent}
              setselectedPDF={setselectedPDF}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "MyImage" ? (
            <MyImage
              getAllUserFiles={getAllUserFiles}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "MyPDF" ? (
            <MyPDF
              getAllUserFiles={getAllUserFiles}
              setselectedPDF={setselectedPDF}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "MyAudio" ? (
            <MyAudio
              getAllUserFiles={getAllUserFiles}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "MyVideo" ? (
            <MyVideo
              getAllUserFiles={getAllUserFiles}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "Marketplace" ? (
            <Marketplace
              setSelectedFileBuy={setSelectedFileBuy}
              getAllPublicFiles={getAllPublicFiles}
              setselectedPDF={setselectedPDF}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "Recent" ? (
            <Recent
              getAllPublicFiles={getAllPublicFiles}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "Certificate" ? (
            <Certificate
              getFileRights={getFileRights}
              currentUser={currentUser}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "Price" ? (
            <Price
              memberships={memberships}
              BUY_CRADIT={BUY_CRADIT}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "User" ? (
            <User
              getAllUserFiles={getAllUserFiles}
              setOpenComponent={setOpenComponent}
              currentUser={currentUser}
              getAllPublicFiles={getAllPublicFiles}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "UpdateUser" ? (
            <UpdateUser
              RESET_PASSWORD={RESET_PASSWORD}
              setLoader={setLoader}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "UserList" ? (
            <UserList
              allDappUsers={allDappUsers}
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
            />
          ) : openComponent == "Error" ? (
            <Error />
          ) : openComponent == "Upload" ? (
            <Upload
              LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
              CREATE_FILE={CREATE_FILE}
              setLoader={setLoader}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
              setOpenComponent={setOpenComponent}
            />
          ) : (
            ""
          )}
          <Footer />
        </div>
      )}

      <Modal
        selectedPDF={selectedPDF}
        setselectedPDF={setselectedPDF}
        LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
      />
      {loader && (
        <div className="new_loader">
          <Loader />
        </div>
      )}
      {selectedFileBuy && (
        <div className="new_loader">
          <BuyCard
            setSelectedFileBuy={setSelectedFileBuy}
            selectedFileBuy={selectedFileBuy}
            BUY_RIGHT={BUY_RIGHT}
            LOAD_INITIAL_DATA={LOAD_INITIAL_DATA}
          />
        </div>
      )}
    </div>
  );
};

export default index;
