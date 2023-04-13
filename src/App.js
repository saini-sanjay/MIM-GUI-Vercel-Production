import { useFormik } from 'formik';
import React, { useState } from 'react';
import './App.css';
import './mainpage.css';
import Initial from './Initial';
import Update from './Update';
import Restoration from './Restoration';
import { opcoTimeConvert } from './Dateformat';
import Particles from 'react-tsparticles';
import {particlesConfig} from './Dateformat'
import { loadFull } from "tsparticles";
import Login from './Login';

const validate = values => {
  const errors = {};
    let diff= new Date(values.incident_start_time)-new Date(values.service_impact_start_time);
    let ohrs=new Date(values.service_restoration_time)-new Date(values.service_impact_start_time)
    diff=diff/(1000*60*60);
    ohrs=ohrs/(1000*60*60)
if(diff<0){
  errors.service_impact_start_time='Warning! Impact start time is greater than ticket created time.Please revalidate'
}
if(Math.abs(diff)>24){
  errors.service_impact_start_time='Warning! Impact start time is more than 24hrs before.Please revalidate'
}
if(ohrs<0){
  errors.service_restoration_time="Warning! Outage hours negative. Check again"
}

  return errors;
};

function App() {

 const [loggedIn,setLoggedIn] =useState(false);
 const [user,setUser]=useState('');

const setLogIn=(user)=>{
   setUser(user);
   setLoggedIn(true);
}
  const formik = useFormik({
    initialValues: {
      incident: '',
      reporter: '',
      severity: 'Sev-1',
      country:'Niger',
      incident_start_time:'',
      service_impact_start_time:'',
      service_restoration_time:'',
      ticket_resolution_time:'',
      ist_to_opco_converter:'',
      incident_description:'',
      business_service_impact:'',
      ip_details:'',
      domain:'',
      domain_owner:'Airtel',
      incident_status:'Open',
      comments:''
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // const particlesInit = async (main) => {
  //   console.log(main);

  //   // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  //   // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //   // starting from v2 you can add only the features you need reducing the bundle size
  //   await loadFull(main);
  // };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  


return (
    <div className="App" style={{ position: 'relative', overflow: "hidden" }}>
    {loggedIn?
    
     <div className='container'>
    <form className="row g-3" id="formcss" onSubmit={formik.handleSubmit} autoComplete='true'>
    <div className="col-md-3">
      <label htmlFor="incident" className="form-label">Incident Number</label>
      <input type="text" className="form-control" id="incident" name="incident" onChange={formik.handleChange} value={formik.values.incident}/>
    </div>
    <div className="col-md-3">
      <label htmlFor="reporter" className="form-label">Reported By</label>
      <input type="text" className="form-control" id="reporter" name="reporter" onChange={formik.handleChange} value={formik.values.reporter}/>
    </div>
    <div className="col-md-3">
      <label htmlFor="severity" className="form-label">Severity</label>
      <select id="severity" name="severity" className="form-select" onChange={formik.handleChange} value={formik.values.severity}>
        <option>Sev-1</option>
        <option>Sev-2</option>
        <option>Sev-2(Upgraded)</option>
        <option>Sev-1(Upgraded)</option>
      </select>
    </div>
    <div className="col-md-3">
      <label htmlFor="country" className="form-label">Country</label>
      <select id="country" name="country" className="form-select" onChange={formik.handleChange} value={formik.values.country}>
        <option>Niger</option>
        <option>Nigeria</option>
        <option>Congo B</option>
        <option>Congo DRC</option>
        <option>SmartCash</option>
        <option>Chad</option>
        <option>Rwanda</option>
        <option>Malawi</option>
        <option>Madagascar</option>
        <option>Seychelles</option>
        <option>Tanzania</option>
        <option>Kenya</option>
        <option>Gabon</option>
        <option>Zambia</option>
        <option>Uganda</option>
        <option>KHQ</option>
        <option>All</option>
      </select>
    </div>
    <div className="col-md-3">
      <label htmlFor="incident_start_time" className="form-label">Incident Start Time(OPCO)</label>
      <input type="datetime-local" className="form-control" id="incident_start_time" name="incident_start_time" onChange={formik.handleChange} value={formik.values.incident_start_time}/>
    </div>
    <div className="col-md-3">
      <label htmlFor="service_impact_start_time" className="form-label">Service Impact Start Time(OPCO)</label>
      <input type="datetime-local" onBlur={formik.handleBlur} className="form-control" id="service_impact_start_time" name="service_impact_start_time" onChange={formik.handleChange} value={formik.values.service_impact_start_time}/>
      {formik.touched.service_impact_start_time && formik.errors.service_impact_start_time ? (
         <div style={{color:'red'}}>{formik.errors.service_impact_start_time}</div>
       ) : null}
    </div>
    <div className="col-md-3">
      <label htmlFor="service_restoration_time" className="form-label">Service Restoration Time(OPCO)</label>
      <input type="datetime-local" onBlur={formik.handleBlur} className="form-control" id="service_restoration_time" name="service_restoration_time" onChange={formik.handleChange} value={formik.values.service_restoration_time}/>
      {formik.touched.service_restoration_time && formik.errors.service_restoration_time ? (
         <div style={{color:'red'}}>{formik.errors.service_restoration_time}</div>
       ) : null}
    </div>
    <div className="col-md-3">
      <label htmlFor="ticket_resolution_time" className="form-label">Ticket Resolution Time(OPCO)</label>
      <input type="datetime-local" className="form-control" id="ticket_resolution_time" name="ticket_resolution_time" onChange={formik.handleChange} value={formik.values.ticket_resolution_time}/>
    </div>
    <div className="col-md-4 bg-warning">
      <label htmlFor="ist_to_opco_converter" className="form-label">Convert IST to OPCO</label>
      <p>Enter IST time: </p>    
      <input type="datetime-local" className="form-control" id="ist_to_opco_converter" name="ist_to_opco_converter" onChange={formik.handleChange} value={formik.values.ist_to_opco_converter}/>
    </div>
    <div className="col-md-8 bg-warning">
      <br/><br/>
      <p>OPCO Time:</p>
      <p>{opcoTimeConvert(formik.values.ist_to_opco_converter,formik.values.country)}</p>
    </div>
    <div className="col-md-6">
      <label htmlFor="incident_description" className="form-label">Incident Description</label>
      <textarea rows="2" className="form-control" name="incident_description" id="incident_description" onChange={formik.handleChange} value={formik.values.incident_description}/>
    </div>
    <div className="col-md-6">
      <label htmlFor="business_service_impact" className="form-label">Business/Service impacted</label>
      <textarea rows="2" className="form-control" name="business_service_impact" id="business_service_impact" onChange={formik.handleChange} value={formik.values.business_service_impact}/>
    </div>
    <div className="col-md-6">
      <label htmlFor="ip_details" className="form-label">Device / CI /Application /IP Details</label>
      <input type="text" className="form-control" name="ip_details" id="ip_details" onChange={formik.handleChange} value={formik.values.ip_details}/>
    </div>
    <div className="col-md-2">
      <label htmlFor="domain" className="form-label">Domain</label>
      <input type="text" className="form-control" name="domain" id="domain" onChange={formik.handleChange} value={formik.values.domain}/>
    </div>
    <div className="col-md-2">
      <label htmlFor="domain_owner" className="form-label">Domain Owner</label>
      <select id="domain_owner" name="domain_owner" className="form-select" onChange={formik.handleChange} value={formik.values.domain_owner}>
        <option>Airtel</option>
        <option>Wipro</option>
        <option>Comviva</option>
        <option>CSG</option>
        <option>Airtel Internal Apps</option>
        <option>Aujas</option>
        <option>ISON Tech</option>
      </select>
    </div>
    <div className="col-md-2">
      <label htmlFor="incident_status" className="form-label">Incident Status</label>
      <select id="incident_status" name="incident_status" className="form-select" onChange={formik.handleChange} value={formik.values.incident_status}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Under monitoring</option>
        <option>Resolved</option>
      </select>
    </div>
    <div className="col-md-12">
      <label htmlFor="comments" className="form-label">Resolution Comments/Action Details</label>
      <textarea rows="4" className="form-control" name="comments" id="comments" onChange={formik.handleChange} value={formik.values.comments}/>
    </div>
    
    <div className="col-12">
    <button name="reset" className='btn btn-danger mb-2' onClick={formik.handleReset}>Reset</button>
    </div>
  </form>
  <br></br>
  <br></br>

 

 <Initial data={formik} to_email={user}/>
 <Update  data={formik}/>
 <Restoration data={formik}/>

 

 
   </div>
    :<Login setLoggedIn={setLogIn}/>
    }
    </div>
  );
}

 

export default App;

