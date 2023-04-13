function opco_converter(country){
  const  data=[
   { opco:'Niger',diff:4},
   { opco:'Nigeria',diff:4},
   { opco:'Congo B',diff:4},
   { opco:'Congo DRC',diff:4},
   { opco:'SmartCash',diff:4},
   { opco:'Chad',diff:4},
   { opco:'Gabon',diff:4},
   { opco:'Rwanda',diff:3},
   { opco:'Malawi',diff:3},
   { opco:'Zambia',diff:3},
   { opco:'Madagascar',diff:2},
   { opco:'Tanzania',diff:2},
   { opco:'Kenya',diff:2},
   { opco:'Uganda',diff:2},
   { opco:'KHQ',diff:2},
   { opco:'All',diff:2},
   { opco:'Seychelles',diff:1},
]
let value=0;
data.forEach(element => {
    if(element.opco===country)
    value=element.diff;
});
return value;
}
function sev(severity){
    if(severity==='Sev-1'||severity==='Sev-1(Upgraded)'){
        return 1;
    }
    else
    return 2;
}
export  function formatDateTwo(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour=''+d.getHours(),
        minute=''+d.getMinutes();
 
        
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2) {
        
        hour = '0' + hour;
    }
        
    if (minute.length < 2) 
        minute = '0' + minute;
 
    return [year,month,day].join('-')+' '+hour+':'+minute;
}

export  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour=''+d.getHours(),
        minute=''+d.getMinutes();
 
        
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2) {
        
        hour = '0' + hour;
    }
        
    if (minute.length < 2) 
        minute = '0' + minute;
 
    return [day,month,year].join('-')+' '+hour+':'+minute;
}
export  function formatTime(date) {
    var d = new Date(date),
        hour=''+d.getHours(),
        minute=''+d.getMinutes();
    
    if (hour.length < 2) {  
        hour = '0' + hour;
    }
        
    if (minute.length < 2) 
        minute = '0' + minute;
 
    return hour+':'+minute;
}
export function opcoTimeConvert(val,country){
  var d=new Date(val);
  d.setMinutes(d.getMinutes()-30);
  d.setHours(d.getHours()-opco_converter(country));

  return formatTime(d);
}

export function nextUpdateForInitial(formik){
let next_ist_time=new Date();

next_ist_time.setMinutes(next_ist_time.getMinutes()+35);
// console.log(next_ist_time);
let next_opco_time= new Date(next_ist_time);

next_opco_time.setMinutes(next_opco_time.getMinutes()-30);
next_opco_time.setHours(next_opco_time.getHours()-opco_converter(formik.values.country));
// console.log(next_opco_time)

return formatTime(next_ist_time)+'(IST)/'+formatTime(next_opco_time)+'(OpCo)'
}
export function nextUpdateForUpdate(formik){
    let next_ist_time=new Date();
    
    next_ist_time.setHours(next_ist_time.getHours()+sev(formik.values.severity));
    
    let next_opco_time= new Date(next_ist_time);
    
    next_opco_time.setMinutes(next_opco_time.getMinutes()-30);
    next_opco_time.setHours(next_opco_time.getHours()-opco_converter(formik.values.country));
    
    
    return formatTime(next_ist_time)+'(IST)/'+formatTime(next_opco_time)+'(OpCo)'
    }

    export function selectElementContents(el) {
        var body = document.body,
          range, sel;
        if (document.createRange && window.getSelection) {
          range = document.createRange();
          sel = window.getSelection();
          sel.removeAllRanges();
          range.selectNodeContents(el);
          sel.addRange(range);
        }
        document.execCommand("Copy");
      }

export const particlesConfig = {
    
        background: {
          color: {
            value: "#0d47a1",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }
