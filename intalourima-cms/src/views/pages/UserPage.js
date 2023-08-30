import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CBadge } from "@coreui/react";
import axios from "axios";
import HostUrl from "../../utilities/HostUrl";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import newAlert from "src/components/NewAlert";

const UserPage = () => {
  const history = useHistory();
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${HostUrl}/user?filter=super-admin`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // setUserList(data.sort((a, b) => a.id - b.id));
      setUserList(data);
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
            url: `${HostUrl}/user/status/${changeId}`,
            data: { user_status: !changeStatus },
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          getUserList();
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
    history.push(`/user/${newId}`);
  };

  const fields = [
    { key: "nama", label: "Nama", _style: { width: "30%" } },
    { key: "email", label: "Email", _style: { width: "20%" } },
    { key: "role", label: "Role", _style: { width: "20%" } },
    { key: "event", label: "Event", _style: { width: "20%" } },
    { key: "status", label: "Status", _style: { width: "20%" } },
    { key: "detail", label: "Action", _style: { width: "3%" } },
  ];

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="primary">
            <strong>User</strong>
          </CCardHeader>
          <CCol>
            <div style={{ marginTop: 15, marginLeft: 5 }}>
              <CButton color="success" to="/user/register">
                Tambah
              </CButton>
            </div>
          </CCol>
          {userList && (
            <CCardBody>
              <CDataTable
                items={userList}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                scopedSlots={{
                  event: (item) => <td>{item.event === null ? "-" : item.event}</td>,
                  status: (item) => (
                    <td>
                      <CBadge
                        color={item.user_status ? "success" : "danger"}
                        onClick={() => {
                          handleStatus(item.id, item.nama, item.user_status);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {item.user_status ? "active" : "not active"}
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

export default UserPage;
