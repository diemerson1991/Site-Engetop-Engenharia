import { getStore } from '@netlify/blobs';
import { isAdmin } from './auth.mjs';
const store=()=>getStore({name:'engetop-site-content',consistency:'strong'});
const defaults={
  company:'ENGETOP Engenharia e Serviços', tagline:'Soluções que transformam projetos em resultados.',
  intro:'A Engetop é uma empresa genuinamente brasileira, composta por um time de profissionais altamente qualificados e comprometidos com o cliente. Fundada em 06 de junho de 2010, oferece ao mercado soluções em Engenharia e tecnologia, com atendimento especializado, segurança, qualidade e eficiência.',
  city:'Canaã dos Carajás — PA', phone1:'5594991888143', phone2:'5594992448612', email:'comercial@engetopservicos.com.br',
  address:'Rua B, nº 40, Bairro Ouro Preto • Canaã dos Carajás – PA • CEP 68537-000',
  cnpj:'12.888.144/0001-05', externalLink:'',
  categories:[
    {id:'engenharia',name:'Engenharia & Construção',subtitle:'Obras civis, estruturas e infraestrutura',icon:'⌂',description:'Projetos, construções e soluções de infraestrutura para diferentes setores.'},
    {id:'energia',name:'Elétrica & Energia',subtitle:'Redes, subestações, SPDA e prevenção contra incêndio',icon:'ϟ',description:'Instalações, inspeções e manutenção de sistemas elétricos e de proteção.'},
    {id:'ambiental',name:'Serviços Ambientais',subtitle:'Gestão ambiental e engenharia rural',icon:'✳',description:'Licenciamento, regularização, georreferenciamento e recuperação ambiental.'},
    {id:'facilities',name:'Facilities & Conservação',subtitle:'Limpeza, jardinagem e climatização',icon:'✧',description:'Conservação de ambientes, áreas verdes e instalações.'},
    {id:'consultoria',name:'Projetos & Consultoria',subtitle:'Gestão, fiscalização e planejamento',icon:'◇',description:'Apoio técnico, gestão de contratos, auditorias e planejamento.'}
  ],
  services:[
    ['Construção de edificações','engenharia','Construção de edificações residenciais, comerciais e industriais; fundações, estruturas, galpões, coberturas, acabamentos, reformas e ampliações.','portfolio-07.webp'],
    ['Construção e manutenção de pontes','engenharia','Construção de pontes em concreto armado e estruturas metálicas, montagem de vigas e tabuleiros, recuperação, reforço e manutenção.','portfolio-11.webp'],
    ['Pontes de madeira e acessos','engenharia','Construção de pontes de madeira para acessos provisórios e permanentes, áreas de pesquisa, propriedades rurais e frentes de obra.','portfolio-12.webp'],
    ['Serviços topográficos','engenharia','Levantamentos planialtimétricos e cadastrais, locação de obras, nivelamento, acompanhamento de terraplenagem e relatórios técnicos.','portfolio-17.webp'],
    ['Pintura e restauração predial e industrial','engenharia','Pintura interna e externa, preparação de superfícies, recuperação de fachadas e aplicação de revestimentos protetivos e anticorrosivos.','portfolio-19.webp'],
    ['Fabricação e montagem de estruturas metálicas','engenharia','Fabricação, corte, preparação, soldagem e montagem de estruturas, plataformas, escadas, passarelas, galpões e coberturas.','portfolio-40.webp'],
    ['Redes elétricas de baixa e alta tensão','energia','Instalação e manutenção de redes elétricas prediais e industriais, quadros, painéis, circuitos, cabos e infraestrutura elétrica.','portfolio-23.webp'],
    ['Componentes de subestações','energia','Montagem, inspeção e manutenção de transformadores, disjuntores, seccionadoras, barramentos, isoladores e aterramento.','portfolio-28.webp'],
    ['Sistemas de prevenção e combate a incêndio (SPCI)','energia','Hidrantes, mangotinhos, sprinklers, bombas, alarmes, inspeções, testes e documentação técnica dos sistemas.','portfolio-30.webp'],
    ['Proteção contra descargas atmosféricas (SPDA)','energia','Instalação, inspeção e manutenção de captores, condutores de descida, aterramento e sistemas de proteção.','portfolio-33.webp'],
    ['Calhas, rufos e pingadeiras','engenharia','Fabricação, instalação e manutenção de calhas metálicas, rufos, contra-rufos, pingadeiras e drenagem pluvial.','portfolio-36.webp'],
    ['Licenciamento ambiental','ambiental','Acompanhamento de processos de Licença Prévia, Licença de Instalação e Licença de Operação para diversos setores.','portfolio-01.webp'],
    ['Cadastro Ambiental Rural (CAR)','ambiental','Inscrição e retificação do CAR para regularidade ambiental de imóveis rurais.','portfolio-05.webp'],
    ['Georreferenciamento e regularização fundiária','ambiental','Georreferenciamento de imóveis rurais, desmembramento, parcelamento e regularização de propriedades.','portfolio-16.webp'],
    ['Recuperação de áreas degradadas','ambiental','Projetos PRADA e PRA, restauração de ecossistemas e desenvolvimento de projetos de recuperação ambiental.','portfolio-04.webp'],
    ['Limpeza industrial e predial','facilities','Limpeza e conservação de ambientes internos e externos, higienização, limpeza pós-obra e rotinas periódicas.','portfolio-45.webp'],
    ['Jardinagem e áreas verdes','facilities','Implantação e manutenção de jardins, corte de grama, poda, plantio, irrigação e conservação paisagística.','portfolio-47.webp'],
    ['Roço e limpeza em geral','facilities','Roçagem mecanizada e manual, limpeza de terrenos e áreas industriais, remoção de vegetação e conservação de acessos.','portfolio-44.webp'],
    ['Manutenção de ar-condicionado','facilities','Instalação e manutenção preventiva e corretiva de equipamentos de climatização, limpeza de filtros e diagnóstico de falhas.','portfolio-46.webp'],
    ['Consultoria, gerenciamento e fiscalização de obras','consultoria','Gerenciamento de obras, fiscalização de serviços, controle de qualidade, cronogramas, custos e indicadores de desempenho.','portfolio-08.webp'],
    ['Gestão de contratos e auditorias','consultoria','Gestão documental, auditoria de medições e contratos, análise de quantitativos, conformidade e relatórios técnicos.','portfolio-28.webp'],
    ['Treinamentos e palestras ambientais','ambiental','Capacitação em gestão ambiental para equipes e empresas, com foco na melhoria da gestão ambiental dos empreendimentos.','portfolio-05.webp'],
    ['Perícias e laudos técnicos','ambiental','Perícias, vistorias, laudos e pareceres técnicos com base científica e metodologias fundamentadas.','portfolio-35.webp']
  ].map((s,i)=>({id:'svc-'+(i+1),title:s[0],category:s[1],description:s[2],image:'/assets/'+s[3]})),
  process:[['Levantamento','Entendemos as necessidades e as condições de execução.'],['Planejamento','Definimos recursos, prioridades, prazos e responsabilidades.'],['Execução','Realizamos os serviços com organização e acompanhamento.'],['Verificação','Conferimos a execução e realizamos os ajustes necessários.'],['Entrega','Concluímos e formalizamos o encerramento do serviço.']]
};
export { defaults };
export default async (req)=>{
 const db=store();
 if(req.method==='GET') {const data=await db.get('content.json',{type:'json'});return Response.json(data||defaults,{headers:{'Cache-Control':'no-store'}})}
 if(req.method==='PUT') {if(!isAdmin(req))return Response.json({error:'Acesso não autorizado.'},{status:401});try{const data=await req.json();await db.setJSON('content.json',data);return Response.json({ok:true})}catch{return Response.json({error:'Não foi possível salvar os dados.'},{status:400})}}
 return new Response('Method not allowed',{status:405});
};
