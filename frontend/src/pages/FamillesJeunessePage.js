import { Link } from 'react-router-dom';
import { Baby, BookOpen, GraduationCap, Users, Heart } from 'lucide-react';
import ChristianCross from '../components/ChristianCross';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sections = [
  {
    id: 'eveil-foi',
    title: 'Éveil à la Foi',
    subtitle: '3-7 ans',
    description: 'Premiers pas dans la foi chrétienne pour les tout-petits et leurs familles',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
    path: '/eveil-foi'
  },
  {
    id: 'catechisme',
    title: 'Catéchisme',
    subtitle: 'CE2 à 6ème',
    description: 'Découvrir Jésus et grandir dans la foi en communauté',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    path: '/catechisme'
  },
  {
    id: 'aumonerie',
    title: 'Aumônerie',
    subtitle: 'Collégiens & Lycéens',
    description: 'Un lieu pour les jeunes de grandir ensemble dans la foi',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1529390079861-591f8a9a9688?w=600',
    path: '/aumonerie'
  },
  {
    id: 'mouvements',
    title: 'Mouvements de Jeunesse',
    subtitle: 'Scouts, MEJ, Patronage',
    description: 'Activités, partage et service dans un esprit chrétien',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    path: '/mouvements'
  },
  {
    id: 'servants',
    title: "Servants d'autel & Vocations",
    subtitle: 'Service liturgique',
    description: 'Se mettre au service de la liturgie et répondre à l\'appel',
    icon: ChristianCross,
    image: 'https://images.unsplash.com/photo-1445367585008-b8a4c4640c5f?w=600',
    path: '/servants-vocations'
  }
];

const FamillesJeunessePage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="familles-jeunesse-page">
      <SEO title="Familles et Jeunesse" description="Activit\u00e9s pour les familles et les jeunes de la paroisse Notre Dame d'Autan - \u00c9veil \u00e0 la foi, cat\u00e9chisme, aum\u00f4nerie, mouvements de jeunesse." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/mjvy6496_Familles-jeunesse.png"
            alt="Section Familles et Jeunesse de la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Familles & Jeunesse
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Pôle éducation et formation</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Accompagnement des enfants et des jeunes dans leur cheminement de foi, de l'éveil à la foi jusqu'à l'aumônerie
          </p>
        </div>
      </section>

      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Sections Grid - 5 colonnes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
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
                  <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2 group-hover:text-gold transition-colors">
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

        {/* Contact */}
        <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center mb-16">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Inscriptions</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Les inscriptions au catéchisme et à l'aumônerie ont lieu en septembre. 
            Contactez le secrétariat pour plus d'informations.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Contacter le secrétariat
          </Link>
        </div>

        {/* Citation */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Laissez les enfants venir à moi, ne les empêchez pas."
          </blockquote>
          <p className="text-gold font-medium">Marc 10, 14</p>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default FamillesJeunessePage;
