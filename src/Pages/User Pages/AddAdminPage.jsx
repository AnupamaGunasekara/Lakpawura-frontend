import React from 'react'
import AddAdmin from '../../Component/user/AddAdmin/AddAdmin'
import HeaderAdmin from '../../Component/user/Header/HeaderAdmin'
import AddAdminSidemenu from '../../Component/user/AddAdmin/AddAdminSideMenus'
function AddAdminPage() {
  return (
    <div>
        <div><HeaderAdmin/></div>
        
        <div><AddAdminSidemenu/></div>

        <div><AddAdmin/></div>
    </div>
  )
}

export default AddAdminPage