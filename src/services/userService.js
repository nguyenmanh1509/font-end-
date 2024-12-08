import axios from '../axios';

const handleLoginApi =(userEmail, userPassword)=>{
    return axios.post('/api/login',{email:userEmail,password:userPassword});
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
        .then(response => {
            // Kiểm tra và trả về data
            return response && response.data ? response.data : response;
        });
}

const createNewUserService = (data)=>{
    console.log ('check:',data)
    return axios.post('/api/create-new-user',data)

}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }, 
    });
};

const editUserService =(inputData) =>{
    return axios.put('api/edit-user',inputData)
}
export{handleLoginApi,getAllUsers,
    createNewUserService,deleteUserService,
    editUserService};