import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [details,setdetails]=useState({
    age:"",
    gender:"",
    height:"",
    weight:""
  });
  const [formerror,setformError]=useState({});
  const [bim,setBmi]=useState("");
  const [category,setCategory]=useState("");
  const [submit,setSubmit]=useState(false);

const handleChange=(e)=>{
  const {name,value}=e.target;
  setdetails({...details,[name]:value});
}
const handleSubmit=(e)=>{
  e.preventDefault();
 setformError(validate(details));
 console.log(formerror);
 console.log(Object.keys(formerror))
 if(Object.keys(formerror).length===0){
   let BIM=eval(details.weight/(details.height/100)**2);
   setBmi(parseInt(BIM));
   if(bim<16){
    setCategory("severe thinness")
   }
   if(bim>=16 && bim<=17){
    setCategory("Moderate Thinness")
   }
   if(bim>17 && bim<=18.5){
    setCategory("Mild Thinness")
   }
   if(bim>18.5 && bim<=25){
    setCategory("Normal")
   }
   if(bim>25 && bim<=30){
    setCategory("over weight");
   }
   if(bim>30 && bim<=35){
    setCategory("Obess class 1")
   }
   if(bim>35 && bim<=40){
    setCategory("Obess class 2")
   }
   if(bim>40){
    setCategory("Obess class 3")
   }
   setSubmit(true);
 }
 else{
  setSubmit(false);
 }
}

const validate=()=>{
  const error={};
  if(details.age===""|| details.gender==="" || details.height==="" || details.weight===""){
    error.details="all fields are mandatory"
  } 
return error;
}
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className='age'>
          <label>Age</label>
          <input type="text" name='age' value={details.age} onChange={handleChange}/>
          <span>ages : 2-120</span>
        </div>
        <div className='gender'>
          <label>Gender</label>
          <input type="radio" name="gender" value={details.gender} 
          onChange={(e)=>{
           setdetails({...details,[e.target.name]:"male"})
          }} /> <span>male</span>
          <input type="radio" name="gender" value={details.gender} onChange={(e)=>{
            setdetails({...details,[e.target.name]:"female"})
          }}/> <span>female</span>
        </div>
        <div className='height'>
           <label>Height</label>
           <input type="text" name='height' value={details.height} onChange={handleChange} /><span>cm</span>
        </div>
        <div className='weight'>
           <label>Weight</label>
           <input type="text" name="weight" value={details.weight} onChange={handleChange}/><span>kg</span>
        </div>
        <div className='buttons'>
          <button>Calculate</button>
          <button>Clear</button>
        </div>
        <div>{formerror.details}</div>
      </form>
      {
        (submit)?  <p>{category}</p> : null
      }
      
    </div>
  );
}

export default App;
