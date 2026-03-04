import { Link } from 'react-router-dom';
import { BookOpen, MessagesSquare, Users, Sparkles, Radio } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sections = [
  {
    id: 'alpha',
    title: 'Parcours Alpha & Catéchuménat',
    subtitle: 'Découvrir la foi',
    description: 'Découvrir ou redécouvrir la foi chrétienne dans un esprit de partage et de convivialité',
    icon: MessagesSquare,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    path: '/alpha-catechumenat'
  },
  {
    id: 'groupes',
    title: 'Groupes de Partage et de Prière',
    subtitle: 'Fraternités & groupes',
    description: 'Échanger, prier et grandir ensemble autour de la Parole de Dieu',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
    path: '/groupes-partage'
  },
  {
    id: 'meditation',
    title: 'Méditation Chrétienne',
    subtitle: 'Silence & prière',
    description: 'Entrer dans le silence et la prière contemplative',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600',
    path: '/meditation'
  },
  {
    id: 'ressources',
    title: 'Ressources',
    subtitle: 'Livres, médias, liens',
    description: 'Livres, médias et outils pour nourrir votre vie spirituelle',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    path: '/ressources'
  }
];

const GrandirFoiPage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="grandir-foi-page">
      <SEO title="Grandir dans la Foi" description="Parcours Alpha, cat\u00e9chum\u00e9nat, groupes de partage, m\u00e9ditation et ressources spirituelles de la paroisse Notre Dame d'Autan." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/b4t8pij3_Grandir-foi.png"
            alt="Section Grandir dans la Foi de la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Grandir dans la Foi
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Cheminer ensemble</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Parcours de formation et groupes de partage pour approfondir sa foi à tout âge
          </p>
        </div>
      </section>

      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Sections Grid - 4 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Citation */}
        <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Je suis le chemin, la vérité et la vie"
          </blockquote>
          <p className="text-gold font-medium">Jean 14, 6</p>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default GrandirFoiPage;
