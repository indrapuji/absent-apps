import React, { useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CInput,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import newAlert from "../../components/NewAlert";

const ChangePassword = () => {
  const history = useHistory();
  const [val, setVal] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    new_password: "",
  });

  const onFormChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFormValidate = (event) => {
    setVal(event.target.value);
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      console.log(localStorage.getItem("nama"));
      if (formData.new_password !== val || formData.nama !== localStorage.getItem("nama")) {
        newAlert({ status: "error", message: "password atau nama tidak sama" });
        return;
      }
      await axios({
        method: "PUT",
        url: HostUrl + "/update-password",
        data: {
          new_password: formData.new_password,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      newAlert({ status: "success", message: "Berhasil" });
      localStorage.clear();
      history.push("/login");
    } catch (error) {
      console.log(error.response);
      const { msg } = error.response.data;
      newAlert({ status: "error", message: msg });
    }
  };
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="9">
          <CCard>
            <CCardHeader color="primary">
              <strong>Ganti Password</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Nama</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput custom size="sm" name="nama" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Password Baru</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput custom size="sm" name="new_password" type="password" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Verifikasi</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput custom size="sm" name="verifikasi" type="password" onChange={onFormValidate} />
                  </CCol>
                </CFormGroup>
                <CCardFooter>
                  <CButton type="submit" size="sm" color="primary" className="float-right">
                    <CIcon name="cil-scrubber" /> Update
                  </CButton>
                </CCardFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ChangePassword;
