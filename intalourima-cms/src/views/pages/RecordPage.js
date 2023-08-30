import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton } from "@coreui/react";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import { useHistory } from "react-router-dom";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const RecordPage = () => {
  const history = useHistory();
  const [recordList, setRecordList] = useState(null);

  useEffect(() => {
    getUserList();
    socket.on("receive_leaderboard", (data) => {
      console.log("==> ini", data);
    });
  }, []);

  const getUserList = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${HostUrl}/record/all`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // setRecordList(data.sort((a, b) => a.id - b.id));
      setRecordList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (newId) => {
    history.push(`/record/${newId}`);
    // socket.emit("get_leaderboard", {tanggal: '2022-12-30', event: 'SOUNDRENALIN'})
  };

  const fields = [
    { key: "nama", label: "Nama", _style: { width: "20%" } },
    { key: "event", label: "Event", _style: { width: "15%" } },
    { key: "tanggal", label: "Tanggal", _style: { width: "10%" } },
    { key: "role", label: "Role", _style: { width: "10%" } },
    { key: "loc", label: "Location", _style: { width: "20%" } },
    { key: "masuk", label: "Checkin", filter: false, _style: { width: "10%" } },
    { key: "checkout", label: "Checkout", filter: false, _style: { width: "10%" } },
    { key: "detail", label: "Action", filter: false, _style: { width: "3%" } },
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="primary">
            <strong>Record</strong>
          </CCardHeader>
          {recordList && (
            <CCardBody>
              <CDataTable
                items={recordList}
                fields={fields}
                cleaner
                hover
                striped
                bordered
                columnFilter
                tableFilter
                pagination
                itemsPerPageSelect
                itemsPerPage={20}
                size="sm"
                scopedSlots={{
                  checkout: (item) => <td>{item.keluar ? item.keluar : "-"}</td>,
                  detail: (item, index) => {
                    return (
                      <td>
                        <CButton color="warning" size="sm" onClick={() => handleDetail(item.id)}>
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

export default RecordPage;
