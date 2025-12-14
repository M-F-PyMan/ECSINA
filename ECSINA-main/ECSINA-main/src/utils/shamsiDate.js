
export const shamsiDateLong=(date)=>{
const faDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(date);
return faDate
}
export const shamsiDateShort=(date)=>{
const faDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
  day: ('2-digit'),
  month: ('2-digit'),
  year: ('2-digit')
}).format(date);
return faDate.replace(/\//g, '.');
 
}