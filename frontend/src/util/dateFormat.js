import dateformat from 'dateformat'

export default (date)=>{
       return dateformat(date, "dddd, mmmm dS, yyyy");
}