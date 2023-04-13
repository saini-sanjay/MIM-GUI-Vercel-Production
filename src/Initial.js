import './App.css';
import {formatDate,nextUpdateForInitial,selectElementContents,formatDateTwo} from './Dateformat';
import emailjs from '@emailjs/browser';
import axios from 'axios';

function sendSMS(formik,msg,email,time2){
  var templateParams = {
    ticket: formik.values.incident,
    message: msg,
    to_email:email
};

  emailjs.send('service_rqhtxb7', 'template_wza3icy',templateParams, 'VhHT2tewEIsLz03C0')
  .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
const newmsg=`Incident No:${formik.values.incident}
%0ASeverity: ${formik.values.severity}
%0AImpacted OPCO: ${formik.values.country}
%0AImpacted Application/s: ${formik.values.ip_details}
%0AInitial Issue Reported: ${formik.values.incident_description}
%0AStart Time (OPCO Time): ${time2}
%0AStatus: In Progress
%0ARecovery Plan:${formik.values.comments}`


axios({
  method: 'post',
  url: 'http://localhost:3001/sendMessage',
  data: {
    a:formik.values.incident,
    b: formik.values.severity,
    c: formik.values.country,
    d: formik.values.ip_details,
    e: formik.values.incident_description,
    f: time2,
    g: 'In Progress',
    h: formik.values.comments
  }
}).then((res)=>console.log(res)).catch(err=>console.log(err));

//Sending notification on Telegram group

// axios.get(`https://api.telegram.org/bot5744972442:AAFV223bOamMbyvAmrgp2-cHFK_h7k9VVkg/sendMessage?chat_id=-619631270&text=${newmsg}`
// ).then(
//   (res)=>{
//     //console.log(res)
//   }
// ).catch((err)=>{
//   console.log(err);
// })

};


  


function Initial(props) {
    const formik=props.data;
    const myDate=new Date(formik.values.incident_start_time);
    const time=formatDate(myDate);
    const time2=formatDateTwo(myDate);
    const next=nextUpdateForInitial(formik);
    let msgbody=`
    <div style="margin:0;color:red;">Incident No:${formik.values.incident}</div>
    <div style="margin:0;">Severity: ${formik.values.severity}</div>
    <div style="margin:0;">Impacted OPCO: ${formik.values.country}</div>
    <div style="margin:0;">Impacted Application/s: ${formik.values.ip_details}</div>
    <div style="margin:0;">Initial Issue Reported: ${formik.values.incident_description}</div>
    <div style="margin:0;">Start Time (OPCO Time): ${time2}</div>
    <div style="margin:0;">Status: In Progress</div>
    <div style="margin:0;">Recovery Plan:${formik.values.comments} </div>    
    `

  return (
      <div>
      <div id='copytable'>
      <h3>Initial : Incident #{formik.values.incident}-{formik.values.severity}-{formik.values.country}- {formik.values.incident_description}</h3>
      <br></br> 
         
      <table className='mytable'>
    <tbody>
    <tr className='top-row' id='initial'>
    <th colSpan={2}>Major Incident Alert Notification</th>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Incident #</td>
    <td>{formik.values.incident}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Incident Reported By</td>
    <td>{formik.values.reporter}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Incident Severity/Priority Reported</td>
    <td>{formik.values.severity}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Location(OPCO)</td>
    <td>{formik.values.country}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Incident Reported Time(OPCO)</td>
    <td>{time}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Incident Description</td>
    <td>{formik.values.incident_description}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Business / IT Services Impacted</td>
    <td>{formik.values.business_service_impact}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Device / CI /Application /IP Details</td>
    <td>{formik.values.ip_details}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Domain </td>
    <td>{formik.values.domain}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Domain Owner</td>
    <td>{formik.values.domain_owner}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Incident Status</td>
    <td>{formik.values.incident_status}</td>
    </tr>
    <tr className='my-row'>
    <td className='mycolumn' id='initial'>Current Status of Impacted Services</td>
    <td>{formik.values.comments}</td>
    </tr>
    <tr className='my-row bottom-row'>
    <td className='mycolumn'>Incident Manager (Contact Details)</td>
    <td style={{color:'rgb(5,99,193)'}}><u>Incident-Management@africa.airtel.com</u></td>
    </tr>
    </tbody>
    </table>
    <br></br>
    <b style={{backgroundColor:'yellow'}}>Next Update@{next}</b>
    
  </div>
  <div className='d-flex justify-content-center'>
  <button type="button" className="btn btn-success" onClick={()=>{
    sendSMS(formik,msgbody,props.to_email,time2);
  selectElementContents(document.getElementById('copytable'));
  }
  }>Copy Initial Notification + Send on Telegram</button>
  </div>
  
  <hr></hr>
    <br></br>
  </div>
  );
}
 
export default Initial;