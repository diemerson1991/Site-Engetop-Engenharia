import { timingSafeEqual, createHmac } from 'node:crypto';
const enc = new TextEncoder();
const b64 = (s) => Buffer.from(s).toString('base64url');
const sign = (value, secret) => createHmac('sha256', secret).update(value).digest('base64url');
export default async (req) => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return Response.json({error:'Configure ADMIN_SESSION_SECRET nas variáveis do Netlify.'},{status:503});
  if (req.method === 'DELETE') return new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json','Set-Cookie':'engetop_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'}});
  if (req.method !== 'POST') return new Response('Method not allowed',{status:405});
  try {
    const {password}=await req.json();
    const expected=process.env.ADMIN_PASSWORD || '199100';
    const a=Buffer.from(String(password||'')); const b=Buffer.from(expected);
    if(a.length!==b.length || !timingSafeEqual(a,b)) return Response.json({error:'Senha incorreta.'},{status:401});
    const payload=b64(JSON.stringify({exp:Date.now()+8*60*60*1000,scope:'admin'}));
    const token=payload+'.'+sign(payload,secret);
    return Response.json({ok:true},{headers:{'Set-Cookie':`engetop_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`}});
  } catch { return Response.json({error:'Não foi possível validar o acesso.'},{status:400}); }
};
export function isAdmin(req){
  const secret=process.env.ADMIN_SESSION_SECRET; if(!secret) return false;
  const cookie=req.headers.get('cookie')||''; const token=cookie.split(';').map(x=>x.trim()).find(x=>x.startsWith('engetop_session='))?.slice(16);
  if(!token) return false;
  const [payload,signature]=token.split('.'); if(!payload||!signature) return false;
  const expected=sign(payload,secret); const a=Buffer.from(signature),b=Buffer.from(expected);
  if(a.length!==b.length||!timingSafeEqual(a,b)) return false;
  try {const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.scope==='admin'&&data.exp>Date.now();}catch{return false;}
}
