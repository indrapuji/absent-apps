import React, { useState, useEffect } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CInput,
  CSelect,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CInputFile,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import newAlert from "../../components/NewAlert";
import ServiceAPI from "../../services";

const API = new ServiceAPI();

const RegisterUserPage = () => {
  const history = useHistory();
  const [referalList, setReferalList] = useState();
  const [pengawasList, setPengawasList] = useState();
  const [koordinatorList, setKoordinatorList] = useState();
  const [leaderList, setLeaderList] = useState();
  const [eventList, setEventList] = useState();
  const [chooseRole, setChooseRole] = useState({
    pengawas: false,
    koordinator: false,
    leader: false,
  });
  const [dataForm, setDataForm] = useState({
    nama: "",
    alamat: "",
    email: "",
    img_url: null,
    no_telp: "",
    ttl: "",
    no_rek: "",
    pengawas_id: null,
    leader_id: null,
    koordinator_id: null,
    referal: "",
    role: "",
    event: "",
  });

  useEffect(() => {
    getComponent();
  }, []);

  const getComponent = async () => {
    API.getReferal().then(({ data }) => {
      setReferalList(data);
    });
    API.getPengawas().then(({ data }) => {
      setPengawasList(data);
    });
    API.getKoordinator().then(({ data }) => {
      setKoordinatorList(data);
    });
    API.getLeader().then(({ data }) => {
      setLeaderList(data);
    });
    API.getEvent().then(({ data }) => {
      setEventList(data);
    });
  };

  const onFormChange = (event) => {
    const { value, name, files } = event.target;
    if (name === "role") {
      if (value === "pengawas") {
        setChooseRole({ ...chooseRole, pengawas: false, koordinator: false, leader: false });
        setDataForm({ ...dataForm, [name]: value });
      } else if (value === "koordinator") {
        setChooseRole({ ...chooseRole, pengawas: true, koordinator: false, leader: false });
        setDataForm({ ...dataForm, [name]: value });
      } else if (value === "leader") {
        setChooseRole({ ...chooseRole, pengawas: true, koordinator: true, leader: false });
        setDataForm({ ...dataForm, [name]: value });
      } else {
        setChooseRole({ ...chooseRole, pengawas: true, koordinator: true, leader: true });
        setDataForm({ ...dataForm, [name]: value });
      }
    } else if (files) {
      setDataForm({ ...dataForm, [name]: files[0] });
    } else {
      setDataForm({ ...dataForm, [name]: value });
    }
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { role, pengawas_id, koordinator_id, leader_id } = dataForm;
      if (role === "pengawas") {
        setDataForm({ ...dataForm, pengawas_id: null, koordinator_id: null, leader_id: null });
      }
      if (role === "koordinator") {
        setDataForm({ ...dataForm, koordinator_id: null, leader_id: null });
      }
      if (role === "leader") {
        setDataForm({ ...dataForm, leader_id: null });
      }
      if (role === "security" || role === "cs") {
        if (!pengawas_id || !koordinator_id || !leader_id) {
          newAlert({ status: "error", message: "Input all require field" });
          return;
        }
      }
      var formData = new FormData();
      for (let key in dataForm) {
        formData.append(`${key}`, dataForm[key]);
      }
      await axios({
        method: "POST",
        url: HostUrl + "/user/register",
        data: formData,
        headers: {
          token: localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      });
      newAlert({ status: "success", message: "Berhasil" });
      history.push("/user");
    } catch (error) {
      const { msg } = error.response.data;
      newAlert({ status: "error", message: msg });
      console.log(error.response.data);
    }
  };
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader color="primary">
              <strong>Daftar User Baru</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">
                      <small>Nama</small>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CInput custom size="sm" name="nama" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">
                      <small>Alamat</small>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CInput custom size="sm" name="alamat" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">
                      <small>Email</small>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CInput custom size="sm" name="email" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">
                      <small>No Telp</small>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CInput custom size="sm" name="no_telp" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">
                      <small>Tanggal Lahir</small>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CInput type="date" size="sm" name="ttl" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">
                      <small>No Rekening</small>
                    </CLabel>
                  </CCol>
                  <CCol md="9">
                    <CInput custom size="sm" name="no_rek" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      <small>Role</small>
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect id="select" name="role" size="sm" onChange={onFormChange}>
                      <option value="">Silahkan Pilih</option>
                      <option value="pengawas">Pengawas</option>
                      <option value="koordinator">Koordinator</option>
                      <option value="leader">Leader</option>
                      <option value="security">Security</option>
                      <option value="cs">CS</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                {chooseRole.pengawas && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>
                        <small>Pengawas</small>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect id="select" name="pengawas_id" size="sm" onChange={onFormChange}>
                        <option value="0">Silahkan Pilih</option>
                        {pengawasList &&
                          pengawasList.map((data) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {data.nama}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}

                {chooseRole.koordinator && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>
                        <small>Koordinator</small>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect id="select" name="koordinator_id" size="sm" onChange={onFormChange}>
                        <option value="0">Silahkan Pilih</option>
                        {koordinatorList &&
                          koordinatorList.map((data) => {
                            return (
                              <option key={data.id} value={Number(data.id)}>
                                {data.nama}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}
                {chooseRole.leader && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>
                        <small>Leader</small>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect id="select" name="leader_id" size="sm" onChange={onFormChange}>
                        <option value="0">Silahkan Pilih</option>
                        {leaderList &&
                          leaderList.map((data) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {data.nama}
                              </option>
                            );
                          })}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                )}

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      <small>Event</small>
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect id="select" name="event" size="sm" onChange={onFormChange}>
                      <option value="0">Silahkan Pilih</option>
                      {eventList &&
                        eventList.map((data) => {
                          return (
                            <option key={data.id} value={data.nama}>
                              {data.nama}
                            </option>
                          );
                        })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      <small>Referal</small>
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect id="select" name="referal" size="sm" onChange={onFormChange}>
                      <option value="0">Silahkan Pilih</option>
                      {referalList &&
                        referalList.map((data) => {
                          return (
                            <option key={data.id} value={data.nama}>
                              {data.nama}
                            </option>
                          );
                        })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>
                      <small>Image</small>
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile type="file" name="img_url" size="sm" onChange={onFormChange} />
                  </CCol>
                </CFormGroup>

                <CCardFooter>
                  <CButton type="submit" size="sm" color="primary" className="float-right" onClick={submitForm}>
                    <CIcon name="cil-scrubber" /> Simpan
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

export default RegisterUserPage;
