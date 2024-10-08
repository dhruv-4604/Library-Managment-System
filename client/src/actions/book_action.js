import axios from "axios"

export const addOneBook = (book)=> async dispatch =>{
    dispatch({
        type:'ADD_BOOK_REQUEST'
    })
  
    try {
        const response = await axios.post('/api/books/addBook',book);
         
        dispatch({
           type:'ADD_BOOK_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_BOOK_FAILED',
           payload:error
       })
    }
}

export const getAllBook = ()=> async dispatch =>{
    dispatch({
        type:'GET_BOOKS_REQUEST'
    })
    try {
        const response = await axios.get('/api/books/allBook');
     
        dispatch({
           type:'GET_BOOKS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_BOOKS_FAILED',
           payload:error
       })
    }
}

export const filterBook = (searchKey)=> async dispatch =>{
    dispatch({
        type:'GET_BOOKS_REQUEST'
    })
    var filterItem ;
    try {
        const response = await axios.get('/api/books/allBook');
        filterItem = response.data.filter(pizza => pizza.title.toLowerCase().includes(searchKey.toLowerCase()));
      
        dispatch({
           type:'GET_BOOKS_SUCCESS',
           payload:filterItem
       })
    } catch (error) {
       dispatch({
           type:'GET_BOOKS_FAILED',
           payload:error
       })
    }
}

export const deleteBook = (bookId) => async (dispatch) => {
    try {
        
        const response = await axios.delete(`/api/books/${bookId}`);
        dispatch({ type: 'DELETE_BOOK_SUCCESS', payload: bookId });
        dispatch(getAllBook()); // Refresh the book list
    } catch (error) {
        console.error('Error deleting book:', error.response ? error.response.data : error.message);
        dispatch({ type: 'DELETE_BOOK_FAIL', payload: error.response ? error.response.data : error.message });
    }
};

export const getAllBooks = () => async (dispatch) => {
    dispatch({ type: 'GET_ALL_BOOKS_REQUEST' });

    try {
        const response = await axios.get('/api/books/allBook');
        dispatch({
            type: 'GET_ALL_BOOKS_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_ALL_BOOKS_FAILED',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};