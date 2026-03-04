import { Link } from 'react-router-dom';
import { Heart, Droplets, Sparkles, HandHeart } from 'lucide-react';
import ChristianCross from '../components/ChristianCross';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sections = [
  {
    id: 'bapteme',
    title: 'Baptême',
    subtitle: 'Devenir enfant de Dieu',
    description: 'Premier sacrement de l\'initiation chrétienne',
    icon: Droplets,
    image: 'https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/gj75c74d_Bapteme.png',
    path: '/sacrements/bapteme',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'premiere-communion',
    title: 'Première Communion',
    subtitle: 'Recevoir le Corps du Christ',
    description: 'Recevoir pour la première fois l\'Eucharistie',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/jrek2lhj_Premiere-communion.png',
    path: '/sacrements/premiere-communion',
    color: 'from-gold to-amber-600'
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    subtitle: 'Recevoir l\'Esprit Saint',
    description: 'Sacrement de la maturité chrétienne',
    icon: Sparkles,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/e13l6wpl_Confirmation.png',
    path: '/sacrements/confirmation',
    color: 'from-red-400 to-orange-500'
  },
  {
    id: 'reconciliation',
    title: 'Réconciliation',
    subtitle: 'Le pardon de Dieu',
    description: 'Recevoir le pardon et se réconcilier avec Dieu',
    icon: HandHeart,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/qhnerpwc_Reconciliation-confession.png',
    path: '/sacrements/reconciliation',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'mariage',
    title: 'Mariage',
    subtitle: 'S\'unir dans l\'amour du Christ',
    description: 'S\'engager dans l\'amour et la fidélité',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/5tik9jhg_Mariage.png',
    path: '/sacrements/mariage',
    color: 'from-pink-400 to-rose-500',
    imageStyle: { objectPosition: 'left bottom' }
  },
  {
    id: 'malades',
    title: 'Sacrement des Malades',
    subtitle: 'Force et réconfort',
    description: 'Réconfort pour les personnes malades ou âgées',
    icon: ChristianCross,
    image: 'https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/3dt57dtp_Sacreement-des-malades.png',
    path: '/sacrements/malades',
    color: 'from-green-400 to-emerald-600'
  }
];

const VieSpirituelePage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900 py-20" data-testid="vie-spirituelle-page">
      <SEO title="Vie Spirituelle et Sacrements" description="Les sacrements de la paroisse Notre Dame d'Autan - Bapt\u00eame, communion, confirmation, mariage, sacrement des malades." />
      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-slate-deep dark:text-slate-100 mb-4">
            Vie Spirituelle & Sacrements
          </h1>
          <p className="text-gold font-medium mb-4">Les grandes étapes de la vie chrétienne</p>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Recevoir les sacrements et vivre la liturgie en communauté
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={section.id}
                to={section.path}
                className="group"
                data-testid={`section-card-${section.id}`}
              >
                <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full border border-slate-100 dark:border-slate-700 flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                loading="lazy"
                src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={section.imageStyle || {}}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${section.color} opacity-60`}></div>
                    <div className="absolute inset-0 flex items-start justify-end p-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-gold text-sm font-medium mb-1">{section.subtitle}</span>
                    <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-2 group-hover:text-gold transition-colors">
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
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Horaires */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 text-center">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Horaires des célébrations</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Retrouvez les horaires des messes et des permanences de confession
          </p>
          <Link
            to="/horaires-messes"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Voir les horaires
          </Link>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default VieSpirituelePage;
