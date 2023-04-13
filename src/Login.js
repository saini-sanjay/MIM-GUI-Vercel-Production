
import './mainpage.css';
import { useState } from 'react';

const userList=['sanjay.saini4@rediffmail.com',
                'sakshipandey05012001@gmail.com',
                'pinakibanerjee288@gmail.com',
                'awasthi.aditya1795@gmail.com',
                'mimp@test.com',
                'arushichaubeyforspace@gmail.com',
                'pandaeuphoric@gmail.com']



const submitLogin=(email,method)=>{
    let match=false;
   userList.forEach(
       (item)=>{
          if(item===email){
            method(email);
            match=true;
          }
       }
   );
   if(!match){
    alert("Email not correct, Please Contact Admin")
   }
   
}
function Login(props) {
 const [email,setEmail]=useState('');
  return (
    <div>
      <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" >
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Welcome to MIM GUI</h2>
              <p className="text-white-50 mb-5">Please enter your login email registered with System Admin!</p>

              <div className="form-outline form-white mb-4">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="typeEmailX">Email</label>
              </div>


              <button className="btn btn-outline-light btn-lg px-5" onClick={()=>submitLogin(email,props.setLoggedIn)}  type="submit">Login</button>
             <br/>
             <br/>
             <br/>
             <div>Developed By: Sanjay Saini</div>

            </div>

            

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login