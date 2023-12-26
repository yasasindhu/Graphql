
const {UserList}=require("../mockData");
const resolvers={
    Query:{
        users(_,args){
            return UserList;
        }
    }
}