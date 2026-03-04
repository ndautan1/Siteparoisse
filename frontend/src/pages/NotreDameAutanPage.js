import { Link } from 'react-router-dom';
import { Building2, Users, Wallet, Church, Sparkles, Music, Mail } from 'lucide-react';
import ChristianCross from '../components/ChristianCross';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sections = [
  {
    id: 'secretariat',
    title: 'Secrétariat',
    subtitle: 'Contact et informations',
    description: 'Votre premier contact avec la paroisse',
    icon: Building2,
    path: '/secretariat'
  },
  {
    id: 'equipe-pastorale',
    title: 'Équipe Pastorale',
    subtitle: 'Au service de la communauté',
    description: 'Prêtres, diacres et laïcs engagés',
    icon: Users,
    path: '/equipe-pastorale'
  },
  {
    id: 'vie-economique',
    title: 'Vie Économique',
    subtitle: 'Transparence et responsabilité',
    description: 'Gestion financière de la paroisse',
    icon: Wallet,
    path: '/vie-economique'
  },
  {
    id: 'nos-clochers',
    title: 'Nos Clochers',
    subtitle: '16 églises',
    description: 'Un patrimoine riche et diversifié',
    icon: Church,
    path: '/nos-clochers'
  },
  {
    id: 'services-transverses',
    title: 'Services Transverses',
    subtitle: 'Communication et accueil',
    description: 'Au service de tous',
    icon: Sparkles,
    path: '/services-transverses'
  },
  {
    id: 'lettre-pere-daniel',
    title: 'La Lettre du Père Daniel',
    subtitle: 'Newsletter paroissiale',
    description: 'Les nouvelles et réflexions du curé',
    icon: Mail,
    path: '/lettre-pere-daniel'
  },
  {
    id: 'liturgie-musique',
    title: 'Liturgie et Musique',
    subtitle: 'Célébrer dans la beauté',
    description: 'Chants, chorale et orgue',
    icon: Music,
    path: '/liturgie-musique'
  },
  {
    id: 'funerailles',
    title: 'Service Funérailles',
    subtitle: 'Accompagnement du deuil',
    description: 'Soutien et célébration',
    icon: ChristianCross,
    path: '/funerailles'
  }
];

const NotreDameAutanPage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="notre-dame-autan-page">
      <SEO title="Notre Dame d'Autan" description="D\u00e9couvrez l'organisation et la vie de la paroisse Notre Dame d'Autan - Secr\u00e9tariat, \u00e9quipe pastorale, clochers et services." />
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg"
            alt="Vue de l'église de Castanet-Tolosan, paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Building2 className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Notre Dame d'Autan
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Une paroisse, une communauté</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez l'organisation et la vie de notre paroisse
          </p>
        </div>
      </section>

      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Sections Grid - Première ligne: 4 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {sections.slice(0, 4).map((section, index) => {
            const IconComponent = section.icon;
            const isEven = index % 2 === 0;
            return (
              <Link
                key={section.id}
                to={section.path}
                className="group"
                data-testid={`section-card-${section.id}`}
              >
                <article className={`${isEven ? 'bg-white' : 'bg-gold/5'} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 h-full border ${isEven ? 'border-slate-100' : 'border-gold/20'} flex flex-col hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-gold" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <span className="text-gold text-sm font-medium mb-1">{section.subtitle}</span>
                  <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2 group-hover:text-gold transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {section.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:text-gold-dark transition-colors">
                    <span>Découvrir</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
        
        {/* Deuxième ligne: 4 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sections.slice(4, 8).map((section, idx) => {
            const index = idx + 4;
            const IconComponent = section.icon;
            const isEven = index % 2 === 0;
            return (
              <Link
                key={section.id}
                to={section.path}
                className="group"
                data-testid={`section-card-${section.id}`}
              >
                <article className={`${isEven ? 'bg-white' : 'bg-gold/5'} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 h-full border ${isEven ? 'border-slate-100' : 'border-gold/20'} flex flex-col hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-gold" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <span className="text-gold text-sm font-medium mb-1">{section.subtitle}</span>
                  <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2 group-hover:text-gold transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {section.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:text-gold-dark transition-colors">
                    <span>Découvrir</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Une paroisse vivante</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                La paroisse Notre Dame d'Autan regroupe 16 clochers et une communauté vivante et accueillante. 
                Notre mission est d'annoncer l'Évangile et d'accompagner chacun dans sa vie de foi.
              </p>
            </div>
            <div className="text-center md:text-right">
              <Link
                to="/horaires-messes"
                className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Horaires des messes
              </Link>
            </div>
          </div>
        </div>

        {/* Citation */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Comme des pierres vivantes, entrez dans la construction de la demeure de Dieu."
          </blockquote>
          <p className="text-gold font-medium">1 Pierre 2, 5</p>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default NotreDameAutanPage;