import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import WidgetCards from '../../components/WidgetCards'
import axios from 'axios'
import HostUrl from '../../utilities/HostUrl'

const Dashboard = () => {
   const history = useHistory()
   const [dashboardData, setDashboardData] = useState(null)

   useEffect(() => {
      if (localStorage.getItem('type') === '1') {
         history.push('/pasien')
      }
      getDashboardData()
      // eslint-disable-next-line
   }, [])

   const getDashboardData = async () => {
      try {
         const { data } = await axios({
            method: 'GET',
            url: HostUrl + '/v1/dashboards/main',
         })
         console.log(data)
         setDashboardData(data.content.data)
      } catch (err) {
         console.log(err)
      }
   }

   return <>{dashboardData && <WidgetCards dashboardData={dashboardData} />}</>
}

export default Dashboard
