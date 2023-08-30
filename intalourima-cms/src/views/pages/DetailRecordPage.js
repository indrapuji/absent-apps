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
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";

const DetailEventPage = () => {
  const { dataId } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState({});

  useEffect(() => {
    getDataUser();
    // eslint-disable-next-line
  }, []);

  const getDataUser = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${HostUrl}/record/${dataId}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(data);
      setEdit(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          {edit.User && (
            <CCard>
              <CCardHeader color="primary">
                <strong>Detail Record</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: 50,
                      justifyContent: "center",
                    }}
                  >
                    <div className="thumbnail">
                      <CImg src={edit.User.img_url} alt="Image" style={{ width: 300, height: 400 }} />
                      <CImg src={edit.image_url} alt="Image" style={{ width: 300 }} />
                    </div>
                    <div className="thumbnail"></div>
                  </div>
                  <div
                    style={{
                      display: "flex",

                      marginBottom: 50,
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <iframe
                      title="lokasi member"
                      width="300"
                      height="170"
                      frameborder="0"
                      marginheight="0"
                      marginwidth="0"
                      src={`https://maps.google.com/maps?q=${edit.lat},${edit.long}&hl=id&z=14&amp;&output=embed`}
                    />
                    <div className="mt-2">
                      <h3>{edit.loc}</h3>
                    </div>
                  </div>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">
                        <small>Nama & Email</small>
                      </CLabel>
                    </CCol>
                    <CCol md="5">
                      <CInput custom size="sm" disabled value={edit.User.nama} />
                    </CCol>
                    <CCol md="4">
                      <CInput custom size="sm" disabled value={edit.User.email} />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">
                        <small>Email</small>
                      </CLabel>
                    </CCol>
                    <CCol md="9">
                      <CInput custom size="sm" disabled value={edit.User.role} />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">
                        <small>Event</small>
                      </CLabel>
                    </CCol>
                    <CCol md="9">
                      <CInput custom size="sm" disabled value={edit.event} />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">
                        <small>Time</small>
                      </CLabel>
                    </CCol>
                    <CCol md="3">
                      <CInput custom size="sm" disabled value={edit.tanggal} />
                    </CCol>
                    <CCol md="3">
                      <CInput custom size="sm" disabled value={edit.masuk} />
                    </CCol>
                    <CCol md="3">
                      <CInput custom size="sm" disabled value={edit.keluar} />
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <div className="float-right">
                  <CButton type="submit" size="sm" color="primary" onClick={() => history.goBack()}>
                    <CIcon name="cil-scrubber" /> Back
                  </CButton>
                </div>
              </CCardFooter>
            </CCard>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default DetailEventPage;
