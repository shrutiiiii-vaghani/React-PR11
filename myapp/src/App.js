import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection ,deleteDoc,getDocs,doc,updateDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const tbl = collection(db,"users");
  const[record,setRecord]= useState([]);
  const[name,setName] = useState("");
  const[edit,setEdit] = useState("");


 //show record
  const getUser = async() => {
     const data = await getDocs(tbl);
    setRecord(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
  }

  useEffect(()=>{
    getUser();
  },[])

  const handleSubmit = async() => {
    let insert = await addDoc(tbl,{name:name});
    if(insert){
      alert('Data inserted successfully');
    }else{
      alert("Error in inserting the data")
    }
    setName("");
    getUser();
  }

  const deleteData = async(id) => {
    const userDoc = doc(db,"users",id);
    let res = await deleteDoc(userDoc);
    alert("succesfully deleted");
    getUser();
  }

  const editData = (id,name) => {
   setEdit(id);
   setName(name);
  }
  const handleUpdate = async() => {
    const userDoc = doc(db,"users",edit);
    const newfield = {name:name};
     await updateDoc(userDoc,newfield);
     alert(`Succesfully updated`);
     setEdit("");
     getUser();
  }

  return (
   <body  style={{backgroundImage:"url('https://images.pexels.com/photos/11112151/pexels-photo-11112151.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",backgroundRepeat:"no-repeat",backgroundSize:"cover",width:"100%",height:"100vh"}}>
    <center>

    <h2 style={{color:"white"}}>Add a Beautiful Quotes</h2>

    <table style={{marginTop:"20px"}}>
    <tbody>
            <tr>
              <td>
                <input type="text" onChange={(e) => setName(e.target.value)} name="name" value={name}/>
              </td>
              <td>
                {
                  edit ? (<input type="button" value="Edit" onClick={() => handleUpdate()} style={{backgroundColor:"#dfc2c4",border:"2px solid #212529"}}/>) : (<input type="button" value="Submit" onClick={() => handleSubmit()} style={{backgroundColor:"#dfc2c4",border:"2px solid #212529"}}/>)
                }
              </td>
            </tr>
         </tbody>
    </table>
    <br></br>
  <div className='container'>
  <table border={1} cellPadding={10}  class="table table-danger">
      <tr style={{backgroundColor:"#f8d7da",textAlign:"center"}}>
        <td >Quotes</td>
        <td >Action</td>
      </tr>
      {
        record.map((val)=>{
         return(
          <tr style={{backgroundColor:"#dfc2c4",textAlign:"center"}}>
            <td>{val.name}</td>
            <td>
                <button onClick={() => deleteData(val.id)} style={{marginRight:"10px"}}><i class="bi bi-trash3"></i></button> 
                <button onClick={() => editData(val.id,val.name)}><i class="bi bi-pencil-square"></i></button> 
            </td>
          </tr>
         )
        })
      }
    </table>
  </div>
   </center>
   </body>
  );
}

export default App;
