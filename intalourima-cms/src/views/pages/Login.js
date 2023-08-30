import React, {
  useState,
  // useEffect
} from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import NewAlert from "src/components/NewAlert";
import { Logo } from "src/utilities/CustomData";

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   socket.emit("send_message", { test: "data" });
  // }, [socket]);

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFormSubmit = async (e) => {
    try {
      console.log(formData);
      e.preventDefault();
      const { data } = await axios({
        method: "POST",
        url: HostUrl + "/user/login",
        data: { email: formData.email, password: formData.password },
      });
      console.log(data);
      if (data.role !== "super-admin") {
        NewAlert({ status: "error", message: "You are not allowed" });
        return;
      }
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("nama", data.nama);
      NewAlert({ status: "success", message: "Berhasil" });
      history.push("/");
    } catch (error) {
      const { msg } = error.response.data;
      NewAlert({ status: "error", message: msg });
      console.log(error.response.data.msg);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CImg src={Logo} align="center" height={100} className="mt-2" />
                <h1 align="center" className="mt-2 font-weight-bold">
                  INTALOURIMA
                </h1>
                <CCardBody>
                  <CForm action="" method="post" onSubmit={onFormSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="email"
                        autoComplete="email"
                        name="email"
                        onChange={onFormChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={onFormChange}
                      />
                    </CInputGroup>
                    <CButton color="primary" size="lg" block type="submit">
                      Login
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
