const api_key = process.env.EXCHANGE_RATE_PI_KEY;
base_url=`https://v6.exchangerate-api.com/v6/${api_key}/pair`

async function handleClick(){
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
    let result=document.getElementById("result")
    result.innerHTML=`${baseAmountValue} ${baseValue} = ${Math.round(data.conversion_rate*baseAmountValue)} ${targetValue}`
    
  } catch (error) {
    console.error(error.message);
  }    

}

