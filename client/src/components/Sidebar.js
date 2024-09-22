import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../actions/user_action";
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
   const dispatch = useDispatch();
   const { currentUser } = useSelector(state => state.userLoginReducer);
   const location = useLocation();

   const linkStyle = {
     display: 'flex',
     alignItems: 'center',
     padding: '10px',
     textDecoration: 'none',
     color: '#333',
     fontSize: '14px',
     fontWeight: 'normal',
     marginBottom: '5px',
     borderRadius: '5px',
     transition: 'all 0.3s ease',
   };

   const activeLinkStyle = {
     ...linkStyle,
     backgroundColor: '#1a73e8',
     color: 'white',
   };

   const isActive = (path) => {
     return location.pathname === path;
   };

   return (
     <div style={{ padding: '20px' }}>
       <Link to="/dashboard/" style={isActive('/dashboard/') ? activeLinkStyle : linkStyle}>
         <i className="fas fa-home" style={{ marginRight: '10px' }}></i>
         Home
       </Link>
       <Link to="/dashboard/allBook" style={isActive('/dashboard/allBook') ? activeLinkStyle : linkStyle}>
         <i className="fas fa-book" style={{ marginRight: '10px' }}></i>
         All Books
       </Link>
       {currentUser.user.isAdmin && (
         <Link to="/dashboard/Recommandation" style={isActive('/dashboard/Recommandation') ? activeLinkStyle : linkStyle}>
           <i className="fas fa-star" style={{ marginRight: '10px' }}></i>
           Recommendation
         </Link>
       )}
       {currentUser.user.isAdmin ? (
         <>
           <Link to="/dashboard/addBook" style={isActive('/dashboard/addBook') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-plus" style={{ marginRight: '10px' }}></i>
             Add Book
           </Link>
           <Link to="/dashboard/manageStudent" style={isActive('/dashboard/manageStudent') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
             Manage Students
           </Link>
           <Link to="/dashboard/stuReqIssue" style={isActive('/dashboard/stuReqIssue') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-clipboard-list" style={{ marginRight: '10px' }}></i>
             Issue Request
           </Link>
           <Link to="/dashboard/allissuedBook" style={isActive('/dashboard/allissuedBook') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-book-reader" style={{ marginRight: '10px' }}></i>
             All Issued Books
           </Link>
           <Link to="/dashboard/issue_return" style={isActive('/dashboard/issue_return') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-exchange-alt" style={{ marginRight: '10px' }}></i>
             Today's Issues
           </Link>
        
        
         </>
       ) : (
         <>
           <Link to="/dashboard/RecomBook" style={isActive('/dashboard/RecomBook') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-thumbs-up" style={{ marginRight: '10px' }}></i>
             Recommend A Book
           </Link>
           <Link to="/dashboard/issuedBook" style={isActive('/dashboard/issuedBook') ? activeLinkStyle : linkStyle}>
             <i className="fas fa-book-open" style={{ marginRight: '10px' }}></i>
             Currently Issued Books
           </Link>
         </>
       )}
       <button
         onClick={() => dispatch(logoutUser())}
         style={{
           ...linkStyle,
           border: '1px solid #ccc',
           backgroundColor: 'white',
           marginTop: '20px',
           cursor: 'pointer',
         }}
       >
         <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>
         Logout
       </button>
     </div>
   );
};

export default Sidebar;