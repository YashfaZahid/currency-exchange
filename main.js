import {countryList} from "/codes.js"
console.log(countryList)

const api_key = ENV.API_KEY;
const base_url=`https://v6.exchangerate-api.com/v6/${api_key}/pair`

document.getElementById("get-rate").addEventListener("click", handleClick);
async function handleClick(){
  console.log("handleClick inside")
    const baseAmount=document.getElementsByName("base-amount")[0]
    const baseCurrency=document.getElementsByName("Base-Currency")[0]
    const targetCurrency=document.getElementsByName("Target-Currency")[0]
    const baseValue=baseCurrency.value
    const targetValue=targetCurrency.value
    const baseAmountValue=baseAmount.value
    console.log(baseValue)
    console.log(targetValue)
    try{
    const response=await fetch(`${base_url}/${baseValue}/${targetValue}/`)
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json(); 
    console.log('Data:', data);
    let result=document.getElementsByName("target-amount")[0]
    result.value=`${Math.round(data.conversion_rate*baseAmountValue).toFixed(2)} ${targetValue}`
    
  } catch (error) {
    console.error(error.message);
  }    

}

async function updateFlag(event){
  let countrycode;
  console.log("dropdown value changed")
  console.log(event.target.value)
  countrycode=countryList[event.target.value]
  let flagApiUrl= `https://flagsapi.com/${countrycode}/flat/64.png`
  console.log(countrycode)
  if(event.target.name=="Base-Currency"){
    let image=document.getElementById("base-flag")
    image.src=flagApiUrl
    console.log(flagApiUrl)
  }
  else{
    let image=document.getElementById("target-flag")
    image.src=flagApiUrl
  }
}

function fillDropdowns(){
  const countries=Object.keys(countryList)
  const baseList = document.getElementById("basecurrency-list");
  const targetList = document.getElementById("targetcurrency-list");
  countries.forEach(code => {
    const option1 = document.createElement("option");
    option1.value = code;
    baseList.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = code;
    targetList.appendChild(option2);
  });
}

fillDropdowns();
let base_dropdown=document.getElementsByName("Base-Currency")[0]
let target_dropdown=document.getElementsByName("Target-Currency")[0]
base_dropdown.addEventListener("change",updateFlag)
target_dropdown.addEventListener("change",updateFlag)
