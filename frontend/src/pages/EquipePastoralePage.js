import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Phone, GraduationCap } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Données du curé
const cureData = {
  name: 'P. Daniel BROUARD-DERVAL',
  role: 'Curé de la paroisse',
  image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp',
  description: `Le Père Daniel Brouard-Derval est le curé de notre paroisse Notre Dame d'Autan. Ordonné prêtre il y a de nombreuses années, il guide notre communauté avec sagesse et bienveillance.

Responsable de l'ensemble de la vie paroissiale, il veille à l'animation spirituelle de notre communauté et à la coordination de tous les services pastoraux. Passionné par l'accompagnement des familles et la transmission de la foi, il est à l'écoute de tous les paroissiens.

Son ministère s'exerce particulièrement dans la célébration des sacrements, l'accompagnement des personnes en recherche spirituelle et le soutien aux équipes de bénévoles qui font vivre notre paroisse au quotidien.`
};

// Données des prêtres
const pretresData = {
  intro: `Notre paroisse a la chance d'être accompagnée par trois prêtres dévoués qui, aux côtés du curé, assurent l'animation spirituelle de notre communauté. Chacun apporte ses dons et sa sensibilité au service de tous les paroissiens.`,
  priests: [
    {
      name: 'P. Donald ZAGORE',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/bwicpjkm_pere-donald.webp',
      description: `Le Père Donald Zagore accompagne notre communauté paroissiale avec enthousiasme et dévouement. Il est particulièrement investi dans l'accompagnement des jeunes et l'animation des temps de prière.`
    },
    {
      name: 'P. Anthony MAIA',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/mrvxn6kf_pere-anthony.webp',
      description: `Le Père Anthony Maia est un jeune prêtre dynamique qui apporte fraîcheur et énergie à notre paroisse. Il est particulièrement engagé auprès des familles et dans la préparation aux sacrements.`
    },
    {
      name: 'P. Arnaud FRANC',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/parx1ojm_pere-arnaud.webp',
      description: `Le Père Arnaud Franc est reconnu pour sa profondeur spirituelle et sa pédagogie. Il accompagne avec attention les personnes en recherche de sens et anime des groupes de formation à la foi.`
    }
  ]
};

// Données des diacres
const diacresData = {
  intro: `Les diacres permanents sont des hommes mariés ou célibataires, ordonnés pour le service de la charité, de la Parole et de la liturgie. Ils exercent leur ministère au sein de notre communauté paroissiale.`,
  deacons: [
    {
      name: 'Jean-Luc HARTMANN',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/93eecwnj_Jean-Luc.webp',
      description: `Jean-Luc Hartmann est diacre permanent au service de notre paroisse. Il accompagne la communauté avec bienveillance et se consacre particulièrement au service des plus fragiles.`
    },
    {
      name: 'Philippe RODIER',
      image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/hcevlmtr_philippe.webp',
      description: `Philippe Rodier est diacre permanent engagé au service de la communauté paroissiale. Son ministère s'exerce dans l'accompagnement des familles et la préparation aux sacrements.`
    }
  ]
};

// Données de l'EAP
const eapData = {
  intro: `L'Équipe d'Animation Pastorale (EAP) est composée de laïcs engagés qui, en lien avec le curé, participent à l'animation et à la coordination de la vie paroissiale. L'EAP se réunit régulièrement pour réfléchir aux orientations pastorales et accompagner les différents services de la paroisse.`,
  castanet: {
    title: 'Secteur Castanet',
    members: [
      {
        name: 'P. Daniel BROUARD-DERVAL',
        role: 'Curé',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp'
      },
      {
        name: 'Marie-Pierre PAWLAK',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/ov4xlacu_mariepierre.webp'
      },
      {
        name: 'Julien BOURDIEU',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izl5m6vm_Julien.webp'
      },
      {
        name: 'François BERÇOT',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/lmqsw3m9_francois.webp'
      }
    ]
  },
  saintOrens: {
    title: 'Secteur Saint-Orens',
    members: [
      {
        name: 'P. Daniel BROUARD-DERVAL',
        role: 'Curé',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp'
      },
      {
        name: 'Anne POUSSINES',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/dzxc4z93_anne.webp'
      },
      {
        name: 'Jean-Michel DEROIN',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/caj7zc9q_jean-michel.webp'
      },
      {
        name: 'Carole MATTHIA',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_church-community-16/artifacts/hgj44udx_Carole.webp'
      },
      {
        name: 'Arnaud CEYTE',
        role: 'Membre EAP',
        image: 'https://customer-assets.emergentagent.com/job_church-community-16/artifacts/x1mip634_Arnaud.webp'
      }
    ]
  }
};

// Liste combinée EAP pour le carrousel simple (Castanet puis Saint-Orens)
const eapCarouselMembers = [
  {
    name: 'P. Daniel BROUARD-DERVAL',
    role: 'Curé',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp',
    city: 'Castanet & St Orens',
    cityColor: 'teal'
  },
  {
    name: 'Marie-Pierre PAWLAK',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/ov4xlacu_mariepierre.webp',
    city: 'Castanet',
    cityColor: 'teal'
  },
  {
    name: 'Julien BOURDIEU',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izl5m6vm_Julien.webp',
    city: 'Castanet',
    cityColor: 'teal'
  },
  {
    name: 'François BERÇOT',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/lmqsw3m9_francois.webp',
    city: 'Castanet',
    cityColor: 'teal'
  },
  {
    name: 'Anne POUSSINES',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/dzxc4z93_anne.webp',
    city: 'Saint-Orens',
    cityColor: 'rose'
  },
  {
    name: 'Jean-Michel DEROIN',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/caj7zc9q_jean-michel.webp',
    city: 'Saint-Orens',
    cityColor: 'rose'
  },
  {
    name: 'Carole MATTHIA',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_church-community-16/artifacts/hgj44udx_Carole.webp',
    city: 'Saint-Orens',
    cityColor: 'rose'
  },
  {
    name: 'Arnaud CEYTE',
    role: 'Membre EAP',
    image: 'https://customer-assets.emergentagent.com/job_church-community-16/artifacts/x1mip634_Arnaud.webp',
    city: 'Saint-Orens',
    cityColor: 'rose'
  }
];

const teamMembers = [
  {
    id: 'cure',
    title: 'Le Curé',
    name: 'P. Daniel BROUARD-DERVAL',
    role: 'Curé de la paroisse',
    description: 'Responsable de la communauté paroissiale',
    image: 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp',
    hasModal: true
  },
  {
    id: 'pretres',
    title: 'Les Prêtres',
    name: 'P. Donald, P. Anthony, P. Arnaud',
    role: 'Au service de la communauté',
    description: 'Accompagnement spirituel et sacrements',
    images: [
      'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/bwicpjkm_pere-donald.webp',
      'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/mrvxn6kf_pere-anthony.webp',
      'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/parx1ojm_pere-arnaud.webp'
    ],
    hasModal: true
  },
  {
    id: 'diacres',
    title: 'Les Diacres',
    name: 'Jean-Luc Hartmann, Philippe Rodier',
    role: 'Service de la charité',
    description: 'Au service de la communauté et des plus fragiles',
    hasModal: true
  },
  {
    id: 'seminaristes',
    title: 'Les Séminaristes',
    name: 'En formation',
    role: 'Futurs prêtres',
    description: 'Accompagnés par notre communauté dans leur cheminement',
    hasModal: true
  },
  {
    id: 'eap',
    title: "L'EAP",
    name: "Équipe d'Animation Pastorale",
    role: 'Coordination pastorale',
    description: 'Laïcs engagés au service de la mission paroissiale',
    hasModal: true
  }
];

const EquipePastoralePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentPriestIndex, setCurrentPriestIndex] = useState(0);
  const [currentDeaconIndex, setCurrentDeaconIndex] = useState(0);
  const [currentEapIndex, setCurrentEapIndex] = useState(0);

  // Carousel for priests photos - 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPriestIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Carousel for deacons photos - 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeaconIndex((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Carousel for EAP - 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEapIndex((prev) => (prev + 1) % eapCarouselMembers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const priestImages = [
    'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/bwicpjkm_pere-donald.webp',
    'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/mrvxn6kf_pere-anthony.webp',
    'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/parx1ojm_pere-arnaud.webp'
  ];

  const deaconImages = [
    'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/93eecwnj_Jean-Luc.webp',
    'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/hcevlmtr_philippe.webp'
  ];

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="equipe-pastorale-page">
      <SEO title="\u00c9quipe Pastorale" description="L'\u00e9quipe pastorale de la paroisse Notre Dame d'Autan - Pr\u00eatres, diacres et la\u00efcs au service de la communaut\u00e9." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/x8y0e2d8_Equipe-pastorale.png"
            alt="\u00c9quipe pastorale de la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Équipe Pastorale
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Une équipe au service de la communauté</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez les membres de notre équipe pastorale qui accompagnent la vie de notre paroisse
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {teamMembers.map((member) => {
            const CardWrapper = member.hasModal ? 'button' : Link;
            const cardProps = member.hasModal 
              ? { onClick: () => openModal(member.id), type: 'button' }
              : { to: member.path };

            return (
              <CardWrapper
                key={member.id}
                {...cardProps}
                className="group text-left"
                data-testid={`team-card-${member.id}`}
              >
                <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full border border-slate-100 dark:border-slate-700 flex flex-col hover:-translate-y-1">
                  {member.id === 'pretres' ? (
                    // Carousel for priests
                    <div className="aspect-square overflow-hidden relative">
                      {priestImages.map((img, idx) => (
                        <img loading="lazy" 
                          key={idx}
                          src={img} 
                          alt={`Prêtre ${idx + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${
                            idx === currentPriestIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                      {/* Dots indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                        {priestImages.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === currentPriestIndex ? 'bg-white w-3' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : member.id === 'diacres' ? (
                    // Carousel for deacons
                    <div className="aspect-square overflow-hidden relative">
                      {deaconImages.map((img, idx) => (
                        <img loading="lazy" 
                          key={idx}
                          src={img} 
                          alt={`Diacre ${idx + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${
                            idx === currentDeaconIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                      {/* Dots indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                        {deaconImages.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === currentDeaconIndex ? 'bg-white w-3' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : member.id === 'eap' ? (
                    // Simple carousel for all EAP members with city badge
                    <div className="aspect-square overflow-hidden relative">
                      {eapCarouselMembers.map((m, idx) => (
                        <img
                loading="lazy"
                key={idx}
                          src={m.image}
                          alt={m.name}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 ${
                            idx === currentEapIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                      {/* City badge */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold shadow-md backdrop-blur-sm ${
                          eapCarouselMembers[currentEapIndex]?.cityColor === 'rose'
                            ? 'bg-[#d0ada6]/80 text-white'
                            : 'bg-[#93B5B7]/80 text-white'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block"></span>
                          {eapCarouselMembers[currentEapIndex]?.city}
                        </span>
                      </div>
                      {/* Dots */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {eapCarouselMembers.map((_, idx) => (
                          <div
                            key={idx}
                            className={`rounded-full transition-all duration-300 ${
                              idx === currentEapIndex ? 'bg-white w-3 h-1.5' : 'bg-white/40 w-1.5 h-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : member.id === 'seminaristes' ? (
                    // Icon placeholder for seminaristes
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center shadow-inner">
                        <GraduationCap className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium tracking-wide">Photo à venir</span>
                    </div>
                  ) : member.images ? (
                    // Multiple photos grid (fallback)
                    <div className="grid grid-cols-3 gap-0.5 bg-slate-100">
                      {member.images.map((img, idx) => (
                        <div key={idx} className="aspect-square overflow-hidden">
                          <img loading="lazy" 
                            src={img} 
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Single photo
                    <div className="aspect-square overflow-hidden">
                      <img loading="lazy" 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-gold text-xs font-medium mb-1 uppercase tracking-wide">{member.role}</span>
                    <h3 className="font-serif text-base text-slate-deep dark:text-slate-100 mb-1 group-hover:text-gold transition-colors">
                      {member.title}
                    </h3>
                    <p className="text-slate-500 text-xs mb-2 line-clamp-2">{member.description}</p>
                    
                    <div className="mt-auto flex items-center text-gold text-xs font-medium group-hover:text-gold-dark transition-colors">
                      <span>Découvrir</span>
                      <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </CardWrapper>
            );
          })}
        </div>

        {/* Mot de bienvenue du Père Daniel */}
        <div className="mt-12 mb-4 bg-white rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Photo gauche */}
            <div className="md:w-64 lg:w-72 flex-shrink-0 relative">
              <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_church-community-16/artifacts/qxrgws2a_Bienvenue.png"
                alt="Bienvenue dans notre paroisse"
                className="w-full h-56 md:h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10"></div>
            </div>
            {/* Texte */}
            <div className="flex-1 px-8 py-10 md:py-12 flex flex-col justify-center">
              {/* En-tête */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-[#d0ada6] to-[#c49a93] rounded-full"></div>
                <div>
                  <p className="text-[#d0ada6] text-xs font-semibold uppercase tracking-widest mb-0.5">Mot du curé</p>
                  <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 leading-tight">Bienvenue dans notre ensemble paroissial</h2>
                </div>
              </div>

              {/* Citation d'ouverture */}
              <blockquote className="font-serif text-lg text-[#d0ada6] italic mb-5 leading-relaxed">
                « Venez et vous verrez ! »
                <span className="font-sans text-sm not-italic text-slate-400 ml-2">(Jn 1, 39)</span>
              </blockquote>

              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-[1.8] max-w-3xl">
                <p>
                  Telle est l'invitation que Jésus lance aux premiers « curieux » qui s'intéressent à Lui. En quête de sens et de vérité, croyants en chemin, ils deviendront ses premiers disciples.
                </p>
                <p>
                  Telle est l'invitation que lance la communauté de l'ensemble paroissial Notre Dame d'Autan aux habitants de nos quartiers, de nos villages, à tous ceux également qui en ont franchi la porte intentionnellement ou par hasard, aux visiteurs de notre église, à tous les chercheurs de Dieu… à ceux qui pour la première fois visiteront ce nouveau site !
                </p>
                <p>
                  <span className="font-medium text-slate-deep dark:text-slate-100 dark:text-slate-100">Pourquoi venir ? Qui verrons-nous ?</span><br />
                  Jésus, la joie d'une communauté qui vit et témoigne de son amour, qui célèbre l'eucharistie, prie, annonce l'Évangile, prend soin des plus vulnérables, crée des liens entre tous…
                </p>
                <p className="font-serif text-base text-slate-deep dark:text-slate-100 dark:text-slate-100">
                  Soyez les bienvenus !
                </p>
                <p className="text-slate-500 text-xs">
                  Amis/visiteurs, ces quelques mots, écrits pour vous, témoignent de notre désir de poursuivre l'aventure de la rencontre et de la Foi avec vous.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d0ada6]/30">
                  <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp"
                    alt="Père Daniel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-slate-deep dark:text-slate-100 text-sm">Père Daniel Brouard-Derval</p>
                  <p className="text-[#d0ada6] text-xs">Curé de Notre Dame d'Autan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 text-center">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Contacter l'équipe pastorale</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Pour toute question ou demande, n'hésitez pas à nous contacter via le secrétariat paroissial.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Citation biblique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Comme le Père m'a envoyé, moi aussi, je vous envoie."
          </blockquote>
          <p className="text-gold font-medium">Jean 20, 21</p>
        </div>
      </div>

      {/* Modal Curé */}
      <Dialog open={modalOpen && modalType === 'cure'} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden [&>button]:hidden">
          <DialogHeader className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4 flex flex-row items-center justify-between">
            <DialogTitle className="font-serif text-xl text-white">Le Curé</DialogTitle>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-40 h-40 flex-shrink-0">
                  <img loading="lazy" 
                    src={cureData.image} 
                    alt={cureData.name}
                    className="w-full h-full object-cover rounded-full border-4 border-[#93B5B7]/20"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium mb-3">
                    Curé de la paroisse
                  </span>
                  <h3 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-2">{cureData.name}</h3>
                  <p className="text-[#93B5B7] font-medium">{cureData.role}</p>
                </div>
              </div>

              <div className="space-y-4">
                {cureData.description.split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pour contacter le Père Daniel, vous pouvez passer par le secrétariat paroissial.
                </p>
                <Link
                  to="/secretariat"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter le secrétariat
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Prêtres */}
      <Dialog open={modalOpen && modalType === 'pretres'} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden [&>button]:hidden">
          <DialogHeader className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4 flex flex-row items-center justify-between">
            <DialogTitle className="font-serif text-xl text-white">Les Prêtres</DialogTitle>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {pretresData.intro}
              </p>

              <div className="space-y-5">
                {pretresData.priests.map((priest, idx) => (
                  <div key={idx} className="flex gap-5 p-4 bg-slate-50 rounded-xl items-center">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img loading="lazy" 
                        src={priest.image} 
                        alt={priest.name}
                        className="w-full h-full object-cover rounded-full border-4 border-[#93B5B7]/20"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2">{priest.name}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {priest.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pour contacter nos prêtres, vous pouvez passer par le secrétariat paroissial.
                </p>
                <Link
                  to="/secretariat"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter le secrétariat
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Diacres */}
      <Dialog open={modalOpen && modalType === 'diacres'} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden [&>button]:hidden">
          <DialogHeader className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4 flex flex-row items-center justify-between">
            <DialogTitle className="font-serif text-xl text-white">Les Diacres</DialogTitle>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {diacresData.intro}
              </p>

              <div className="space-y-5">
                {diacresData.deacons.map((deacon, idx) => (
                  <div key={idx} className="flex gap-5 p-4 bg-slate-50 rounded-xl items-center">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img loading="lazy" 
                        src={deacon.image} 
                        alt={deacon.name}
                        className="w-full h-full object-cover rounded-full border-4 border-[#93B5B7]/20"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2">{deacon.name}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {deacon.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pour contacter nos diacres, vous pouvez passer par le secrétariat paroissial.
                </p>
                <Link
                  to="/secretariat"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter le secrétariat
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal EAP */}
      <Dialog open={modalOpen && modalType === 'eap'} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden [&>button]:hidden">
          <DialogHeader className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4 flex flex-row items-center justify-between">
            <DialogTitle className="font-serif text-xl text-white">L'Équipe d'Animation Pastorale</DialogTitle>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {eapData.intro}
              </p>

              {/* Secteur Castanet */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#93B5B7]"></div>
                  <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 dark:text-slate-100">{eapData.castanet.title}</h3>
                </div>
                {eapData.castanet.members.map((member, idx) => (
                  <div key={idx} className="flex gap-5 p-4 bg-slate-50 rounded-xl items-center">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                loading="lazy"
                src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full border-4 border-[#93B5B7]/20"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-1">{member.name}</h4>
                      <p className="text-slate-500 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secteur Saint-Orens */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#d0ada6]"></div>
                  <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 dark:text-slate-100">{eapData.saintOrens.title}</h3>
                </div>
                {eapData.saintOrens.members.map((member, idx) => (
                  <div key={idx} className="flex gap-5 p-4 bg-slate-50 rounded-xl items-center">
                    <div className="w-32 h-32 flex-shrink-0">
                      {member.image ? (
                        <img
                loading="lazy"
                src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full border-4 border-[#d0ada6]/20"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                          <Users className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-1">{member.name}</h4>
                      <p className="text-slate-500 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pour contacter l'EAP, vous pouvez passer par le secrétariat paroissial.
                </p>
                <Link
                  to="/secretariat"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter le secrétariat
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Séminaristes */}
      <Dialog open={modalOpen && modalType === 'seminaristes'} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden [&>button]:hidden">
          <DialogHeader className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4 flex flex-row items-center justify-between">
            <DialogTitle className="font-serif text-xl text-white">Les Séminaristes</DialogTitle>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Notre paroisse a la joie d'accompagner des séminaristes dans leur cheminement vers le sacerdoce. Leur présence est une grâce et un signe d'espérance pour notre communauté.
              </p>

              <div className="space-y-4">
                {[
                  { prenom: 'Valentin', description: 'Séminariste accompagné par notre communauté paroissiale dans sa vocation.' },
                  { prenom: 'Paul', description: 'Séminariste accompagné par notre communauté paroissiale dans sa vocation.' }
                ].map((seminariste, idx) => (
                  <div key={idx} className="flex gap-5 p-4 bg-slate-50 rounded-xl items-center">
                    <div className="w-32 h-32 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-[#93B5B7]/20 flex flex-col items-center justify-center gap-1">
                        <GraduationCap className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                        <span className="text-[9px] text-slate-400 font-medium">Photo à venir</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-1">{seminariste.prenom}</h4>
                      <span className="inline-block bg-[#93B5B7]/10 text-[#93B5B7] px-3 py-0.5 rounded-full text-xs font-medium mb-2">Séminariste</span>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{seminariste.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pour en savoir plus, vous pouvez contacter le secrétariat paroissial.
                </p>
                <Link
                  to="/secretariat"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contacter le secrétariat
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EquipePastoralePage;
