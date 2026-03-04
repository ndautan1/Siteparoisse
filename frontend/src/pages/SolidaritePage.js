import { Link } from 'react-router-dom';
import { HandHeart, Heart, Stethoscope, Users, Coffee } from 'lucide-react';
import ChristianCross from '../components/ChristianCross';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sections = [
  {
    id: 'ecoute',
    title: "Service d'Écoute Louis et Zélie",
    subtitle: 'Présence bienveillante',
    description: 'Une présence bienveillante pour ceux qui traversent une épreuve',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600',
    path: '/service-ecoute'
  },
  {
    id: 'malades',
    title: 'Visite des Malades (SEM)',
    subtitle: 'Service évangélique',
    description: 'Porter la présence du Christ auprès des personnes malades et âgées',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
    path: '/visite-malades'
  },
  {
    id: 'entraide',
    title: 'Entraide et Solidarité',
    subtitle: 'Secours Catholique & plus',
    description: 'Vivre la charité du Christ au service des plus fragiles',
    icon: HandHeart,
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600',
    path: '/entraide'
  }
];

const subActions = [
  {
    title: 'Secours Catholique',
    description: 'Aide matérielle et accompagnement',
    icon: HandHeart
  },
  {
    title: 'Café Amitié',
    description: 'Lieu de rencontre convivial',
    icon: Coffee
  },
  {
    title: 'Hospitalité de Lourdes',
    description: 'Pèlerinages pour personnes malades',
    icon: ChristianCross
  },
  {
    title: 'Lourdes Cancer Espérance',
    description: 'Soutien aux malades du cancer',
    icon: Heart
  }
];

const SolidaritePage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="solidarite-page">
      <SEO title="Solidarit\u00e9 et \u00c9coute" description="Services de solidarit\u00e9 de la paroisse Notre Dame d'Autan - Service d'\u00e9coute, visite des malades, entraide, Secours Catholique." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/rz1a62v8_Solidarite.png"
            alt="Section Solidarit\u00e9 et \u00c9coute de la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <HandHeart className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Solidarité & Écoute
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Vivre la charité</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Services d'accompagnement et actions de solidarité au service des plus fragiles
          </p>
        </div>
      </section>

      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Sections Grid - 3 colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {sections.map((section, index) => {
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
                  <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-3 group-hover:text-gold transition-colors">
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

        {/* Sub-actions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 dark:border-slate-700">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-6 text-center">Nos actions de solidarité</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-7 h-7 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-medium text-slate-deep dark:text-slate-100 mb-1">{action.title}</h3>
                  <p className="text-slate-500 text-sm">{action.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center mb-16">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Rejoindre une équipe</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Vous souhaitez vous engager au service des autres ? Rejoignez une de nos équipes de bénévoles.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Nous contacter
          </Link>
        </div>

        {/* Citation */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Tout ce que vous avez fait à l'un de ces plus petits, c'est à moi que vous l'avez fait."
          </blockquote>
          <p className="text-gold font-medium">Matthieu 25, 40</p>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default SolidaritePage;
