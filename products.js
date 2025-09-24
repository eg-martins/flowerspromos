// Lista de produtos
const productsData = [
{
    id: "P001",
    img: "https://i.imgur.com/XfuJFf9.png",
    title: "Escova Secadora 3 em 1 — Seca, Alisa e Modela com Brilho de Salão",
    desc: "Diga adeus à rotina demorada com secador, prancha e modelador! A Escova Secadora Elétrica 3 em 1 combina tudo em um só aparelho, permitindo secar, alisar e modelar os fios em poucos minutos. Com tecnologia de íons negativos, elimina o frizz, protege a umidade natural e deixa o cabelo macio, sedoso e cheio de brilho. Potência de 1000W para resultados rápidos e eficazes. Ideal para todos os tipos de cabelo!",
    platform: "Shopee",
    category: ["beleza"], 
    subcategory: ["cabelo"],
    link: "https://s.shopee.com.br/70AqHmYs5l"
  },
  {
    id: "P002",
    img: "https://i.imgur.com/xf49VdO.png",
    title: "Máquina Automática Para Descascar Alho e Frutas — Praticidade Instantânea",
    desc: "Chega de perder tempo descascando alho, tomates, uvas e outras frutas pequenas! Com a Máquina Automática de Descascamento, basta apertar um botão e o trabalho pesado é feito em segundos. Perfeita para uso doméstico ou comercial, ela descasca de forma rápida e delicada, preservando a polpa dos alimentos e trazendo muito mais agilidade para sua cozinha.",
    platform: "Shopee",
    category: ["casa"], 
    subcategory: ["cozinha"], 
    link: "https://s.shopee.com.br/50Pn6vyS3c"
  },
  {
    id: "P003",
    img: "https://i.imgur.com/R19ZaBF.png",
    title: "Suporte de Parede Multifuncional para Vassouras e Rodos — Organização Fácil",
    desc: "Mantenha sua casa organizada e seus utensílios de limpeza sempre à mão com o Suporte Multifuncional de Parede. Compatível com vassouras, rodos, panos e outros itens, ele economiza espaço e protege seus objetos do desgaste. Fabricado em plástico resistente, suporta múltiplos itens e é ideal para cozinhas, banheiros ou áreas de serviço. Instalação simples e segura, mantendo tudo sempre no lugar!",
    platform: "Shopee",
    category: ["casa"],
    subcategory: ["organizacao"],
    link: "https://s.shopee.com.br/1BD4jlnm42"
  },
  {
    id: "P004",
    img: "https://i.imgur.com/JkkdQYc.png",
    title: "Protetor de Calcanhar Adesivo – Conforto e Proteção para Seus Sapatos",
    desc: "Diga adeus ao desconforto causado por sapatos apertados! O Protetor de Calcanhar Adesivo oferece acolchoamento macio e proteção eficaz contra fricção, prevenindo bolhas e irritações. Fácil de aplicar e remover, discreto e compatível com todos os tipos de calçados, garante conforto prolongado durante o uso de tênis, botas ou saltos altos. Ideal para quem passa longas horas calçando sapatos e deseja um ajuste perfeito!",
    platform: "Shopee",
    category: ["acessorios"],
    link: "https://s.shopee.com.br/3qDpwQvBjN"
  },
  {
    id: "P005",
    img: "https://i.imgur.com/ERHmTFa.png",
    title: "Aparador Retrô 2 Prateleiras — Cantinho do Café Elegante e Funcional",
    desc: "Deixe seu cantinho do café organizado e com estilo com o Aparador Retrô de 2 Prateleiras. Fabricado em MDF de alta qualidade, com acabamento branco e mogno, ele combina beleza e funcionalidade. Montagem prática e rápida, sem necessidade de ferramentas. Ideal para organizar bebidas, utensílios ou objetos decorativos, tornando seu espaço mais elegante e funcional.",
    platform: "Shopee",
    category: ["casa"],
    subcategory: ["decoracao"],
    link: "https://s.shopee.com.br/7Kni94AWPp"
  },
    {
    id: "P006",
    img: "https://i.imgur.com/zSzcpD8.png",
    title: "Focus by Floow — Aumente seu Foco e Desempenho",
    desc: "Entre em estado de super foco e aumente sua produtividade com o Focus by Floow. Ideal para quem deseja manter a concentração máxima, otimizar tarefas e alcançar resultados mais rápidos, ajudando você a dar o seu melhor em todas as atividades do dia.",
    platform: "Site Oficial",
    category: ["suplementos"],
    subcategory: ["vitaminas"],
    link: "https://www.mktcorporate.com/focus"
  },
    {
    id: "P007",
    img: "https://i.imgur.com/N45MfEG.png",
    title: "BigBoom Creatina 3 em 1 — Força, Recuperação e Beleza",
    desc: "A BigBoom Creatina 3 em 1 é a primeira do Brasil a unir creatina, colágeno e BCAA em um único suplemento. A creatina ajuda no aumento da força, o colágeno preserva sua beleza e saúde das articulações, pele, cabelo e unhas, e o BCAA garante melhor recuperação muscular. Disponível nos deliciosos sabores Pink Lemonade e Melancia (em breve). Ideal para quem quer performance completa com sabor incrível!",
    platform: "Site Oficial",
    category: ["suplementos"],
    subcategory: ["fitness"],
    link: "https://www.mktcorporate.com/bigboom"
  },
    {
    id: "P008",
    img: "https://i.imgur.com/n1dou6o.png",
    title: "Sonotonina — Fórmula Natural para Dormir Bem e Acordar Revigorada",
    desc: "O Sonotonina é uma fórmula natural com melatonina, projetada para regular o ciclo do sono e proporcionar noites tranquilas. Além de ajudar a dormir melhor, auxilia no bem-estar geral do corpo e possui ação antioxidante. Acorde revigorada e pronta para o dia com Sonotonina!",
    platform: "Site Oficial",
    category: ["suplementos"],
    subcategory: ["vitaminas"],
    link: "https://www.mktcorporate.com/sonotonina"
  },
    {
    id: "P009",
    img: "https://i.imgur.com/XmFhesM.png",
    title: "DiurieFit Black — Pó Diurético 10x Mais Eficaz",
    desc: "O DiurieFit Black é um pózinho diurético especialmente formulado para eliminar a retenção de líquidos, desinflamar o corpo e acelerar o metabolismo, queimando gordura muito mais rápido do que produtos em cápsulas. Perfeito para quem busca leveza, bem-estar e resultados eficientes de forma prática e saborosa.",
    platform: "Site Oficial",
    category: ["suplementos"],
    subcategory: ["emagrecimento"],
    link: "https://www.mktcorporate.com/diuriefitblack"
  },
    {
    id: "P010",
    img: "https://i.imgur.com/0K2m5Gu.png",
    title: "Nulle — Reset Natural do Corpo e Mente",
    desc: "O Nulle é uma fórmula com 5 tipos de magnésio e aminoácidos essenciais que ajudam seu corpo a desligar o “modo sobrevivência” ativado pelo estresse. Ele acalma o sistema nervoso, desinflama internamente e prepara seu organismo para funcionar da forma que deveria. Um sachê por dia é suficiente para sentir o efeito de reorganização interna e equilíbrio corporal.",
    platform: "Site Oficial",
    category: ["suplementos"],
    subcategory: ["emagrecimento"],
    link: "https://www.mktcorporate.com/nulle"
  },
    {
    id: "P011",
    img: "https://i.imgur.com/Befd9t3.png",
    title: "CandCaps — Solução Natural para Candidíase",
    desc: "O CandCaps é um suplemento natural desenvolvido para tratar a candidíase de dentro para fora. Equilibra a flora intestinal, fortalece o sistema imunológico e previne novas crises, oferecendo alívio duradouro e restaurando seu bem-estar íntimo. Diferente de tratamentos temporários, CandCaps promove saúde e conforto contínuos, ajudando você a viver sem desconfortos.",
    platform: "Site Oficial",
    category: ["saude"],
    subcategory: ["bemestar"],
    link: "https://www.mktcorporate.com/nulle"
  },
    {
    id: "P012",
    img: "https://i.imgur.com/pVnACwi.png",
    title: "Kit Banheiro Osaka 4 Peças em Cerâmica e Bambu",
    desc: "O Kit de Banheiro Osaka combina sofisticação e sustentabilidade em cada detalhe. Composto por porta escova de dentes, porta sabonete líquido, porta algodão/cotonete e bandeja, ele traz elegância e praticidade para o seu dia a dia. A cerâmica oferece resistência e charme, enquanto o bambu adiciona um toque natural e sustentável. Ideal para deixar seu banheiro mais organizado e aconchegante.",
    platform: "Shopee",
    category: ["casaa"],
    subcategory: ["decoracao"],
    link: "https://s.shopee.com.br/AA81KNo1Dt"
  },
];
