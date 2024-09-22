import axios from "axios"
import { getAllBooks } from './book_action';  // Add this import

export const issueABook = (book)=> async dispatch =>{
    dispatch({
        type:'ISSUE_REQUEST'
    })
  
    try {
        const response = await axios.post('/api/issues/issueRequest',book);
        // const response2 = await axios.get('/api/books/allBook');
     
       
        dispatch({
           type:'ISSUE_REQUEST_SUCCESS',
           payload:response.data
       })
      
    } catch (error) {
       dispatch({
           type:'ISSUE_REQUEST_FAILED',
           payload:error
       })

    }
}

export const singleissueABook = (postId)=> async dispatch =>{
    dispatch({
        type:'SINGLE_ISSUE_REQUEST'
    })
    
    try {
        const response = await axios.post('/api/issues/singleIssuedBook',{postId});
        dispatch({
           type:'SINGLE_ISSUE_REQUEST_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'SINGLE_ISSUE_REQUEST_FAILED',
           payload:error
       })
       
    }
}

export const getUserIssuedBook = () => async (dispatch, getState) => {
    dispatch({
        type: "USER_ISSUED_BOOK"
    });
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    };

    try {
        const response = await axios.get(`/api/issues/issuedBook`, config);
        dispatch({
            type: "USER_ISSUED_BOOK_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "USER_ISSUED_BOOK_FAILED",
            payload: error,
        });
    }

};

export const getAllIssuedBook = () => async (dispatch) => {
    dispatch({
        type: "ALL_ISSUED_BOOK"
    });
   

    try {
        const response = await axios.get(`/api/issues/allIssuedBook`);
      
        dispatch({
            type: "ALL_ISSUED_BOOK_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_ISSUED_BOOK_FAILED",
            payload: error,
        });
    }

};
export const filterallIssuedBook = (searchKey)=> async dispatch =>{
   
    var filterItem ;
    try {
        const response = await axios.get('/api/issues/allIssuedBook');
        
        filterItem = response.data.filter(item => item.userName.toLowerCase().includes(searchKey.toLowerCase()));
      
        dispatch({
            type: "ALL_ISSUED_BOOK_SUCCESS",
           payload:filterItem
       })
    } catch (error) {
       dispatch({
        type: "ALL_ISSUED_BOOK_FAILED",
           payload:error
       })
    }
}

export const getAllBookIssueReq = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_ISSUES_REQUEST'
    })
    try {
        const response = await axios.get('/api/issues/allIssueRequest');
        dispatch({
           type:'GET_All_ISSUES_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_ISSUES_FAILED',
           payload:error
       })
    }
}

export const getAllBookReturnReq = ()=> async dispatch =>{
    dispatch({
        type:'GET_All_RETURN_REQUEST'
    })
    try {
        const response = await axios.get('/api/issues/allreturnedBook');
        dispatch({
           type:'GET_All_RETURN_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_All_RETURN_FAILED',
           payload:error
       })
    }
}

export const issuedReq = (bookId,postId)=> async dispatch =>{
   
    try {
         await axios.post('/api/issues/issuedReqAccept' , {bookId,postId})
       
        const response2 = await axios.get('/api/issues/allIssueRequest');
        dispatch({
           type:'GET_All_ISSUES_SUCCESS',
           payload:response2.data
       })
      } catch (error) {
        console.log(error);
      }
  
}


export const returnReqAction = (obj)=> async dispatch =>{
   
    try {
         await axios.post('/api/issues/returnReq' , obj)
       
       
        dispatch({
           type:'GET_RETURN_SUCCESS',
           
       })
      } catch (error) {
        console.log(error);
      }
  
}


export const issuedReqDeletedByAdmin = (postId)=> async dispatch =>{
     
    
    
    try {
       await axios.post('/api/issues/issueReqDelete' , {postId})
       
        const response2 = await axios.get('/api/issues/allIssueRequest');
        dispatch({
           type:'GET_All_ISSUES_SUCCESS',
           payload:response2.data
       })
      } catch (error) {
        console.log(error);
      }
  
}

export const issueABookReturn = (postId)=> async dispatch =>{

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
    };
 
    try {
        await axios.post('/api/issues/issuedBookDelete',{postId});
        const response2 = await axios.get(`/api/issues/issuedBook`, config);
       
        dispatch({
            type: "USER_ISSUED_BOOK_SUCCESS",
            payload: response2.data,
        });
      } catch (error) {
        console.log(error);
      }
  
    
}

export const acceptRecommendedBook = (bookId) => async (dispatch) => {
    dispatch({
        type: 'ACCEPT_RECOMMENDED_BOOK_REQUEST'
    });

    try {
        const response = await axios.post('/api/issues/acceptRecommendedBook', { bookId });
        
        // Fetch updated list of issue requests
        const updatedIssues = await axios.get('/api/issues/allIssueRequest');
        
        dispatch({
            type: 'ACCEPT_RECOMMENDED_BOOK_SUCCESS',
            payload: updatedIssues.data
        });

        // Optionally, you can dispatch an action to update the books list
        dispatch(getAllBooks());  // Assuming you have an action to fetch all books

    } catch (error) {
        dispatch({
            type: 'ACCEPT_RECOMMENDED_BOOK_FAILED',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};