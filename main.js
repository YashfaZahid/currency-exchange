async function handleClick(){
    const baseAmount=document.getElementsByName("base-amount")[0]
    const baseCurrency=document.getElementsByName("Base-Currency")[0]
    const targetCurrency=document.getElementsByName("Target-Currency")[0]
    const baseValue=baseCurrency.value
    const targetValue=targetCurrency.value
    const baseAmountValue=baseAmount.value

    try{
        const response = await fetch(`/api/rate?base=${baseValue}&target=${targetValue}`);
        const data = await response.json();
        let result=document.getElementById("result")
        result.innerHTML=`${baseAmountValue} ${baseValue} = ${Math.round(data.conversion_rate*baseAmountValue)} ${targetValue}`
    } catch (error) {
        console.error(error.message);
    }    
}