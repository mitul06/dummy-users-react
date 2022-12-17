import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import VisibilityIcon from '@mui/icons-material/Visibility'

import {
  Avatar,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const UsersLists = () => {
  const [userData, setUserData] = useState([])
  const limit = 5
  const [skip, setSkip] = useState(0)
  const [viewUser, setviewUser] = useState(null)
  const [open, setopen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
      )
      // console.log("res", response)
      if (response.status === 200) {
        setUserData(response.data?.users)
      } else {
        setUserData([])
      }
    })()
  }, [skip])

  const handleBack = async () => {
    setSkip(skip - 5)

    // if (skip > 0) {
    //   const response = await axios.get(
    //     `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
    //   )
    //   // console.log("res", response)
    //   if (response.status === 200) {
    //     setUserData(response.data?.users)
    //   } else {
    //     setUserData([])
    //   }
    // }
  }

  const handleNext = async () => {
    setSkip(skip + 5)

    // if (skip > 0) {
    //   const response = await axios.get(
    //     `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
    //   )
    //   // console.log("res", response)
    //   if (response.status === 200) {
    //     setUserData(response.data?.users)
    //   } else {
    //     setUserData([])
    //   }
    // }
  }

  const handleViewData = user => {
    // console.log('v', user)
    setviewUser(user)
    setopen(true)
  }

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <TableContainer component={Paper} sx={{ width: '80%', mt: 4 }}>
        <Table>
          <TableHead>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          <TableBody>
            {userData.length > 0 ? (
              <>
                {userData?.map((v, i) => (
                  <TableRow>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={v?.image} alt='profile' />
                        <Typography sx={{ mr: 1 }}>{v?.firstName}</Typography>
                        <Typography>{v?.lastName}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{v?.email}</TableCell>
                    <TableCell>{v?.phone}</TableCell>
                    <TableCell>
                      {moment(v?.birthDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{v?.address?.address}</TableCell>
                    <TableCell>
                      <VisibilityIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleViewData(v)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>No Data</>
            )}
          </TableBody>
        </Table>
        <div style={{ float: 'right' }}>
          {skip > 0 && (
            <ArrowBackIosIcon
              sx={{ cursor: 'pointer', mt: 2, mb: 2 }}
              onClick={() => handleBack()}
            />
          )}
          <ArrowForwardIosIcon
            sx={{ cursor: 'pointer', ml: 5, mt: 2, mb: 2, mr: 1 }}
            onClick={() => handleNext()}
          />
        </div>
      </TableContainer>

      <Drawer anchor='right' open={open} onClose={() => setopen(false)}>
        <div style={{ width: '500px', padding: '15px' }}>
          <p>FullName : {viewUser?.firstName + ' ' + viewUser?.lastName}</p>
          <p>Email : {viewUser?.email}</p>
          <p>PhoneNumber : {viewUser?.phone}</p>
          <p>Birth Date :{moment(viewUser?.birthDate).format('DD/MM/YYYY')}</p>
          <p>Address : {viewUser?.address.address}</p>
        </div>
      </Drawer>
    </div>
  )
}

export default UsersLists
