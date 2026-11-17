import { getStore } from '@netlify/blobs';
import { isAdmin } from './auth.mjs';
const store=()=>getStore({name:'engetop-site-media',consistency:'strong'});
export default async (req)=>{
 const db=store();
 if(req.method==='POST'){
  if(!isAdmin(req))return Response.json({error:'Acesso não autorizado.'},{status:401});
  try{const {name,type,data}=await req.json();if(!/^image\/(jpeg|png|webp|gif)$/.test(type)||typeof data!=='string'||data.length>12_000_000)return Response.json({error:'Imagem inválida ou maior que o limite.'},{status:400});const key=crypto.randomUUID()+'.'+(type.split('/')[1]==='jpeg'?'jpg':type.split('/')[1]);const bytes=Buffer.from(data.split(',')[1]||'','base64');if(bytes.length>8*1024*1024)return Response.json({error:'A imagem deve ter até 8 MB.'},{status:400});await db.set(key,bytes,{metadata:{type,name:String(name||'imagem').slice(0,120)}});return Response.json({url:'/.netlify/functions/media?key='+encodeURIComponent(key)})}catch{return Response.json({error:'Falha ao enviar imagem.'},{status:400})}
 }
 if(req.method==='GET'){const key=new URL(req.url).searchParams.get('key');if(!key||key.includes('/')||key.includes('..'))return new Response('Not found',{status:404});const obj=await db.getWithMetadata(key,{type:'arrayBuffer'});if(!obj)return new Response('Not found',{status:404});return new Response(obj.data,{headers:{'Content-Type':obj.metadata?.type||'application/octet-stream','Cache-Control':'public, max-age=31536000, immutable'}})}
 return new Response('Method not allowed',{status:405});
};
