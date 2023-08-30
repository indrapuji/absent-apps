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
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import newAlert from "../../components/NewAlert";
import Swal from "sweetalert2";

const DetailEventPage = () => {
  const { dataId } = useParams();
  const history = useHistory();
  const [oldData, setOldData] = useState();
  const [edit, setEdit] = useState({});
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${HostUrl}/event/${dataId}`,
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
        url: `${HostUrl}/event/update/${dataId}`,
        data: {
          nama: edit.nama,
          lokasi: edit.lokasi,
          start: edit.start,
          end: edit.end,
          event_status: JSON.parse(edit.event_status),
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      newAlert({ status: "success", message: "Berhasil" });
      history.push("/event");
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
              <strong>Detail Event</strong>
              <div className="float-right" style={{ cursor: "pointer" }} onClick={() => setDisable(userValidation)}>
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
                      <small>Lokasi</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      size="sm"
                      name="lokasi"
                      disabled={disable}
                      value={edit.lokasi}
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Start</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      type="date"
                      size="sm"
                      name="start"
                      disabled={disable}
                      value={edit.start}
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>End</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      type="date"
                      size="sm"
                      name="end"
                      disabled={disable}
                      value={edit.end}
                      onChange={onFormChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Status</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CSelect
                      id="select"
                      name="event_status"
                      size="sm"
                      onChange={onFormChange}
                      disabled={disable}
                      value={edit.event_status}
                    >
                      <option value="0">Silahkan Pilih</option>
                      <option value={true}>Aktif</option>
                      <option value={false}>Tidak Aktif</option>
                    </CSelect>
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

export default DetailEventPage;
