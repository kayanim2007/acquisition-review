export const numeric = x => typeof x === 'number' && Number.isFinite(x);
export const categories = ['normalization','owner','proforma'];
export const statuses = ['assumed','rejected','unresolved'];
export function validateShape(d) {
  if (!d || d.version !== 1 || !d.financials || !d.cash || !d.price || !d.stress || !Array.isArray(d.adjustments) || d.adjustments.length > 200) throw Error('Use a version 1 project JSON with financials, price, cash, stress, and at most 200 adjustments.');
  for (const k of ['name','period','basis','currency','memo']) if (typeof d[k] !== 'string' || d[k].length > 12000) throw Error('Invalid text field: '+k);
  if (!['USD','EUR','GBP','CAD'].includes(d.currency)) throw Error('Unsupported currency.');
  if (!['Accrual','Cash','Tax','Unknown'].includes(d.basis)) throw Error('Unsupported accounting basis.');
  if (typeof d.price.terms !== 'string' || typeof d.price.confirmed !== 'boolean') throw Error('Price terms must be text and confirmation must be true or false.');
  const required=[[d.financials,['months','revenue','netIncome','interest','incomeTax','da']],[d.price,['ev','sellerNote','earnout']],[d.cash,['newOpex','maintenance','growth','nwc','tax','other','debtService']],[d.stress,['revenueChange','contribution','extraCost']]];
  for(const [object,keys] of required)for(const key of keys)if(object[key]!==null&&!numeric(object[key]))throw Error('Expected a number or null: '+key);
  for (const obj of [d.financials,d.price,d.cash,d.stress]) for (const [k,v] of Object.entries(obj)) if (v !== null && !numeric(v) && typeof v !== 'string' && typeof v !== 'boolean') throw Error('Invalid input: '+k);
  for (const a of d.adjustments) {
    if (!a || !categories.includes(a.category) || !statuses.includes(a.status) || !['seller','buyer'].includes(a.origin)) throw Error('Invalid adjustment classification.');
    for (const k of ['id','label','period','evidence','note','overlap']) if (typeof a[k] !== 'string' || a[k].length > 12000) throw Error('Invalid adjustment text: '+k);
    for (const k of ['seller','buyer','replacement']) if (a[k] !== null && !numeric(a[k])) throw Error('Invalid adjustment amount: '+k);
  }
  return d;
}
export function analyze(d) {
  const issues=[]; const warn=(level,text)=>issues.push({level,text}); const f=d.financials,p=d.price,c=d.cash,s=d.stress;
  const fields=['netIncome','interest','incomeTax','da'];
  const missing=fields.filter(k=>!numeric(f[k]));
  let historical=missing.length?null:fields.reduce((v,k)=>v+f[k],0);
  if(missing.length)warn('error','Missing EBITDA reconstruction inputs: '+missing.join(', '));
  if(!d.period.trim()) {historical=null;warn('error','Specify one complete annual or LTM period.');}
  if(f.months!==12){historical=null;warn('error','This version requires a 12-month financial period. No automatic annualization.');}
  if(d.basis!=='Accrual')warn('warning','Accounting basis is '+d.basis+'. Timing differences may limit earnings and cash comparisons.');
  let normal=0,proforma=0,replacement=0,sellerSum=0,invalid=false;const ids=new Set(),groups=new Set();
  for(const a of d.adjustments){
    if(!a.id.trim()||ids.has(a.id)){invalid=true;warn('error','Missing or duplicate adjustment ID: '+a.id);}ids.add(a.id);
    if(a.period!==d.period){invalid=true;warn('error',a.label+': adjustment period differs from the financial period.');}
    if(a.origin==='seller'){
      if(!numeric(a.seller)){invalid=true;warn('error',a.label+': seller claim is missing.');}else sellerSum+=a.seller;
    }
    if(a.status==='unresolved')warn('warning',a.label+': unresolved; excluded from buyer base case.');
    if(a.status==='assumed'){
      if(!numeric(a.buyer)){invalid=true;warn('error',a.label+': specify the buyer amount, including explicit zero.');continue;}
      if(a.category==='proforma')proforma+=a.buyer;else normal+=a.buyer;
      if(a.category==='owner'&&a.buyer>0){
        if(!numeric(a.replacement)||a.replacement<0){invalid=true;warn('error',a.label+': specify nonnegative annual replacement cost; use explicit zero if justified.');}
        else replacement+=a.replacement;
      }
      if(!a.evidence.trim())warn('warning',a.label+': no evidence reference recorded.');
      if(a.overlap.trim()){if(groups.has(a.overlap))warn('warning','Potential double count in overlap group '+a.overlap+'. Review manually.');groups.add(a.overlap);}
      if(a.category==='proforma')warn('warning',a.label+': forward-looking assumption, excluded from normalized historical earnings.');
    }
  }
  const seller=historical===null||invalid?null:historical+sellerSum;
  const normalized=historical===null||invalid?null:historical+normal-replacement;
  const opValid=numeric(c.newOpex)&&c.newOpex>=0;
  if(!opValid)warn('error','Specify additional annual operating costs, including explicit zero.');
  const operating=normalized===null||!opValid?null:normalized+proforma-c.newOpex;
  const priceValid=numeric(p.ev)&&p.ev>0&&p.confirmed===true;
  if(!priceValid)warn('error','Enter a positive enterprise value and confirm its price basis before displaying multiples.');
  if(numeric(p.earnout)&&p.earnout>0)warn('warning','Contingent consideration exists. EV must include your explicitly selected earnout value; no automatic valuation is performed.');
  if(!p.terms?.trim())warn('warning','Record cash, debt, normal working capital, and consideration assumptions in price terms.');
  const multiple=x=>priceValid&&numeric(x)&&x>0?p.ev/x:null;
  if(normalized!==null&&normalized<=0)warn('warning','Normalized earnings are nonpositive; earnings multiple is not meaningful.');
  if(numeric(f.revenue)&&f.revenue>0&&numeric(normalized)&&normalized>0&&normalized/f.revenue<0.02)warn('warning','Normalized margin is below 2%; small earnings changes can cause large multiple changes.');
  const cashKeys=['maintenance','growth','nwc','tax','other'];
  const cashMissing=cashKeys.filter(k=>!numeric(c[k]));
  const badCash=cashKeys.filter(k=>k!=='nwc'&&numeric(c[k])&&c[k]<0);
  if(cashMissing.length)warn('warning','Cash estimate incomplete: '+cashMissing.join(', '));
  if(badCash.length)warn('error','Cash outflows must be nonnegative: '+badCash.join(', '));
  const cash=operating===null||cashMissing.length||badCash.length?null:operating-c.maintenance-c.growth-c.nwc-c.tax-c.other;
  const debtValid=numeric(c.debtService)&&c.debtService>0;
  if(numeric(c.debtService)&&c.debtService<0)warn('error','Annual debt service cannot be negative.');
  const coverage=cash===null||!debtValid?null:cash/c.debtService;
  const afterDebt=cash===null||!numeric(c.debtService)||c.debtService<0?null:cash-c.debtService;
  const stressValid=numeric(f.revenue)&&f.revenue>0&&numeric(s.revenueChange)&&s.revenueChange>=-1&&s.revenueChange<=1&&numeric(s.contribution)&&s.contribution>=0&&s.contribution<=1&&numeric(s.extraCost)&&s.extraCost>=0;
  if(!stressValid)warn('warning','Sensitivity requires positive revenue, a revenue change between −100% and +100%, a 0–100% contribution margin, and nonnegative additional costs.');
  const delta=stressValid?f.revenue*s.revenueChange*s.contribution-s.extraCost:null;
  const stressOperating=operating===null||delta===null?null:operating+delta;
  const stressCash=cash===null||delta===null?null:cash+delta;
  const questions=[];
  for(const a of d.adjustments){if(a.status==='unresolved'||!a.evidence.trim())questions.push(a.label+': obtain supporting detail and document the treatment.');if(a.category==='owner')questions.push(a.label+': verify replacement responsibilities, salary, benefits, and payroll taxes.');if(a.category==='proforma')questions.push(a.label+': confirm timing, execution costs, and overlap with historical adjustments.');}
  if(cashMissing.length)questions.push('Obtain the missing cash assumptions: '+cashMissing.join(', ')+'.');
  return {historical,seller,normalized,operating,normal,proforma,replacement,cash,coverage,afterDebt,stressOperating,stressCash,stressCoverage:stressCash===null||!debtValid?null:stressCash/c.debtService,multiples:{historical:multiple(historical),seller:multiple(seller),normalized:multiple(normalized),operating:multiple(operating)},issues,questions:[...new Set(questions)]};
}
export function csvCell(v){const str=String(v??'');const safe=/^[\s]*[=+\-@]/.test(str)?"'"+str:str;return '"'+safe.replaceAll('"','""')+'"';}
