import React from 'react'
import Header from '../../Component/user/Header/Header'
import HeaderAdmin from '../../Component/user/Header/HeaderAdmin'
import AdminAccount from '../../Component/user/MyAccount/AdminAccount'
import AddAdmin from '../../Component/user/AddAdmin/AddAdmin'
function AddAdminPage() {
  return (
    <div>
        <div><HeaderAdmin/></div>
        
        <div><AdminAccount/></div>

        <div><AddAdmin/></div>
    </div>
  )
}

export default AddAdminPage