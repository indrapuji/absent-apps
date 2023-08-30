import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from "@coreui/react";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import { useHistory } from "react-router-dom";

const ReferalPage = () => {
  const history = useHistory();
  const [referalList, setReferalList] = useState(null);

  useEffect(() => {
    getReferalList();
  }, []);

  const getReferalList = async () => {
    try {
      console.log("-------");
      const { data } = await axios({
        method: "GET",
        url: `${HostUrl}/referal/all`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("====>", data);
      setReferalList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (newId) => {
    history.push(`/referal/${newId}`);
  };

  const fields = [
    { key: "nama", label: "Nama", _style: { width: "20%" } },
    { key: "alamat", label: "Alamat", _style: { width: "39%" } },
    { key: "no_telp", label: "Telp", _style: { width: "20%" } },
    { key: "no_rek", label: "Rekening", _style: { width: "20%" } },
    { key: "detail", label: "Action", _style: { width: "3%" } },
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="primary">
            <strong>Referal</strong>
          </CCardHeader>
          <CCol>
            <div style={{ marginTop: 15, marginLeft: 5 }}>
              <CButton color="success" to="/referal/register">
                Tambah
              </CButton>
            </div>
          </CCol>
          {referalList && (
            <CCardBody>
              <CDataTable
                items={referalList}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                scopedSlots={{
                  event: (item) => <td>{item.event === null ? "Not Define" : item.event}</td>,
                  detail: (item, index) => {
                    return (
                      <td>
                        <CButton
                          color="warning"
                          size="sm"
                          onClick={() => {
                            handleDetail(item.id);
                          }}
                        >
                          Detail
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ReferalPage;
