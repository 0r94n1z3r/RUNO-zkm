// remToPx
export default (rem)=>{
    if(!process.client)return rem*10;
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}