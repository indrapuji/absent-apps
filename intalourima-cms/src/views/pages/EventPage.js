import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CBadge } from "@coreui/react";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import { useHistory } from "react-router-dom";
import { formatDate } from "node-format-date";
import Swal from "sweetalert2";
import newAlert from "src/components/NewAlert";

const ReferalPage = () => {
  const history = useHistory();
  const [eventList, setEventList] = useState(null);

  useEffect(() => {
    getEventList();
  }, []);

  const getEventList = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${HostUrl}/event/all`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setEventList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = (changeId, changeName, changeStatus) => {
    Swal.fire({
      title: "Yakin ingin ubah status?",
      text: `${changeName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, ubah!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios({
            method: "PUT",
            url: `${HostUrl}/event/update/${changeId}`,
            data: { event_status: !changeStatus },
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          getEventList();
          newAlert({ status: "success", message: `Status ${changeName} berhasil diubah` });
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

  const handleDetail = (newId) => {
    history.push(`/event/${newId}`);
  };

  const fields = [
    { key: "nama", label: "Nama", _style: { width: "30%" } },
    { key: "lokasi", label: "Lokasi", _style: { width: "25%" } },
    { key: "start", label: "Start", _style: { width: "15%" } },
    { key: "end", label: "End", _style: { width: "15%" } },
    { key: "event_status", label: "Status", _style: { width: "10%" } },
    { key: "detail", label: "Action", _style: { width: "3%" } },
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="primary">
            <strong>Event</strong>
          </CCardHeader>
          <CCol>
            <div style={{ marginTop: 15, marginLeft: 5 }}>
              <CButton color="success" to="/event/register">
                Tambah
              </CButton>
            </div>
          </CCol>
          {eventList && (
            <CCardBody>
              <CDataTable
                items={eventList}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                scopedSlots={{
                  start: (item) => <td>{formatDate(item.start)}</td>,
                  end: (item) => <td>{formatDate(item.end)}</td>,
                  event_status: (item) => (
                    <td>
                      <CBadge
                        color={item.event_status ? "success" : "danger"}
                        onClick={() => {
                          handleStatus(item.id, item.nama, item.event_status);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {item.event_status ? "active" : "not active"}
                      </CBadge>
                    </td>
                  ),
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
