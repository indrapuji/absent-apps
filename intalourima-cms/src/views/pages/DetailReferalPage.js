import React, { useState, useEffect } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import newAlert from "../../components/NewAlert";
import Swal from "sweetalert2";

const DetailReferalPage = () => {
  const { dataId } = useParams();
  const history = useHistory();
  const [oldData, setOldData] = useState();
  const [edit, setEdit] = useState({});
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${HostUrl}/referal/${dataId}`,
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(({ data }) => {
        setEdit(data);
        setOldData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const onFormChange = (event) => {
    const { value, name } = event.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (edit === oldData) {
        history.goBack();
        return;
      }
      await axios({
        method: "PUT",
        url: `${HostUrl}/referal/update/${dataId}`,
        data: { nama: edit.nama, alamat: edit.alamat, no_telp: edit.no_telp, no_rek: edit.no_rek },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      newAlert({ status: "success", message: "Berhasil" });
      history.push("/referal");
    } catch (error) {
      const { msg } = error.response.data;
      newAlert({ status: "error", message: msg });
    }
  };

  const userValidation = async () => {
    try {
      const { value: userPassword } = await Swal.fire({
        title: "Validation",
        input: "password",
        inputPlaceholder: "Enter password",
        inputAttributes: {
          maxlength: 15,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });
      if (userPassword) {
        await axios({
          method: "POST",
          url: `${HostUrl}/user/validation`,
          data: { password: userPassword },
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setDisable(!disable);
      }
    } catch (error) {
      console.log(error);
      newAlert({ status: "error", message: "need validation" });
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader color="primary">
              <strong>Detail Referal</strong>
              <div className="float-right" style={{ cursor: "pointer" }} onClick={userValidation}>
                <CIcon name="cil-pencil" color="white" />
              </div>
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
                    <CInput custom size="sm" name="nama" disabled={disable} value={edit.nama} onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Alamat</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      size="sm"
                      name="alamat"
                      disabled={disable}
                      value={edit.alamat}
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>No Rekening</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      size="sm"
                      name="no_rek"
                      disabled={disable}
                      value={edit.no_rek}
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>No Telp</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      size="sm"
                      name="no_telp"
                      disabled={disable}
                      value={edit.no_telp}
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                <CCardFooter>
                  <CButton type="submit" size="sm" color="primary" className="float-right" onClick={submitForm}>
                    <CIcon name="cil-scrubber" /> {edit === oldData ? "Back" : "Update"}
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

export default DetailReferalPage;
