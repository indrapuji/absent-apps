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
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import newAlert from "../../components/NewAlert";
import ServiceAPI from "../../services";
import Swal from "sweetalert2";

const API = new ServiceAPI();

const DetailEventPage = () => {
  const { dataId } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState({});
  const [disable, setDisable] = useState(true);
  const [pengawasList, setPengawasList] = useState();
  const [koordinatorList, setKoordinatorList] = useState();
  const [leaderList, setLeaderList] = useState();
  const [eventList, setEventList] = useState();
  const [oldData, setOldData] = useState();

  useEffect(() => {
    getDataUser();
    // eslint-disable-next-line
  }, []);

  const getDataUser = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${HostUrl}/user/${dataId}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(data);
      setEdit(data);
      setOldData(data);
      API.getPengawas().then(({ data }) => {
        setPengawasList(data);
        console.log(data);
      });
      API.getKoordinator().then(({ data }) => {
        setKoordinatorList(data);
        console.log(data);
      });
      API.getLeader().then(({ data }) => {
        setLeaderList(data);
        console.log(data);
      });
      API.getEvent().then(({ data }) => {
        setEventList(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      const { role, pengawas_id, koordinator_id, leader_id } = edit;
      if (role === "pengawas") {
        setEdit({ ...edit, pengawas_id: null, koordinator_id: null, leader_id: null });
      }
      if (role === "koordinator") {
        setEdit({ ...edit, koordinator_id: null, leader_id: null });
      }
      if (role === "leader") {
        setEdit({ ...edit, leader_id: null });
      }
      if (role === "security" || role === "cs") {
        if (!pengawas_id || !koordinator_id || !leader_id) {
          newAlert({ status: "error", message: "Input all require field" });
          return;
        }
      }
      console.log(edit);

      var formData = new FormData();
      for (let key in edit) {
        formData.append(`${key}`, edit[key]);
      }
      console.log(formData);
      await axios({
        method: "PUT",
        url: `${HostUrl}/user/update/${dataId}`,
        data: edit,
        headers: {
          token: localStorage.getItem("token"),
          // "content-type": "multipart/form-data",
        },
      });
      newAlert({ status: "success", message: "Berhasil" });
      history.push("/user");
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

  const resetPass = (resetId, resetName) => {
    Swal.fire({
      title: "Yakin ingin reset password?",
      text: `${resetName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, reset!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios({
            method: "PUT",
            url: `${HostUrl}/user/reset-password/${resetId}`,
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          getDataUser();
          newAlert({ status: "success", message: `Password ${resetName} berhasil direset` });
          // window.location.reload();
        } catch (error) {
          console.log(error);
          const { msg } = error.response.data;
          newAlert({ status: "error", message: msg });
        }
      } else {
        newAlert({ status: "error", message: "Cancel" });
      }
    });
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader color="primary">
              <strong>Detail User</strong>
              <div className="float-right" style={{ cursor: "pointer" }} onClick={userValidation}>
                <CIcon name="cil-pencil" color="white" />
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 50 }}>
                  <div className="thumbnail">
                    <CImg
                      src={edit.img_url}
                      alt="Image"
                      style={{ borderRadius: 100, width: 150, height: 150, objectFit: "cover" }}
                    />
                  </div>
                </div>
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
                      <small>Email</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput custom size="sm" name="email" disabled value={edit.email} onChange={onFormChange} />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Referal</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput custom size="sm" name="referal" disabled value={edit.referal} onChange={onFormChange} />
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
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Tanggal Lahir</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CInput
                      custom
                      type="date"
                      size="sm"
                      name="ttl"
                      disabled={disable}
                      value={edit.ttl}
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
                      <small>Role</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CSelect
                      id="select"
                      name="role"
                      size="sm"
                      onChange={onFormChange}
                      disabled={disable}
                      value={edit.role}
                    >
                      <option value="">Silahkan Pilih</option>
                      <option value="pengawas">Pengawas</option>
                      <option value="koordinator">Koordinator</option>
                      <option value="leader">Leader</option>
                      <option value="security">Security</option>
                      <option value="cs">CS</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                {edit.role !== "pengawas" && (
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel>
                        <small>Pengawas</small>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        id="select"
                        name="pengawas_id"
                        size="sm"
                        value={edit.pengawas_id}
                        onChange={onFormChange}
                        disabled={disable}
                      >
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

                {edit.role !== "pengawas" && edit.role !== "koordinator" && (
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel>
                        <small>Koordinator</small>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        id="select"
                        name="pengawas_id"
                        size="sm"
                        value={edit.koordinator_id}
                        onChange={onFormChange}
                        disabled={disable}
                      >
                        <option value="0">Silahkan Pilih</option>
                        {koordinatorList &&
                          koordinatorList.map((data) => {
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

                {edit.role !== "pengawas" && edit.role !== "koordinator" && edit.role !== "leader" && (
                  <CFormGroup row>
                    <CCol md="4">
                      <CLabel>
                        <small>Leader</small>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        id="select"
                        name="leader_id"
                        size="sm"
                        value={edit.leader_id}
                        onChange={onFormChange}
                        disabled={disable}
                      >
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
                  <CCol md="4">
                    <CLabel>
                      <small>Event</small>
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      id="select"
                      name="event"
                      size="sm"
                      value={edit.event}
                      onChange={onFormChange}
                      disabled={disable}
                    >
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
                  <CCol md="4">
                    <CLabel htmlFor="text-input">
                      <small>Status</small>
                    </CLabel>
                  </CCol>
                  <CCol md="8">
                    <CSelect
                      id="select"
                      name="user_status"
                      size="sm"
                      onChange={onFormChange}
                      disabled={disable}
                      value={edit.user_status}
                    >
                      <option value="0">Silahkan Pilih</option>
                      <option value={true}>Aktif</option>
                      <option value={false}>Tidak Aktif</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CCardFooter>
                  <div className="float-right">
                    <CButton
                      size="sm"
                      disabled={disable}
                      color={disable ? "secondary" : "warning"}
                      className="mr-3"
                      onClick={() => resetPass(edit.id, edit.nama)}
                    >
                      <CIcon name="cil-scrubber" /> Reset Password
                    </CButton>

                    <CButton type="submit" size="sm" color="primary">
                      <CIcon name="cil-scrubber" /> {edit === oldData ? "Back" : "Update"}
                    </CButton>
                  </div>
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
