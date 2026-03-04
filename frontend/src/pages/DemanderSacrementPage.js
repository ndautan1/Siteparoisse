import { Link } from 'react-router-dom';
import { Heart, Droplets, Sparkles, BookOpen, HandHeart } from 'lucide-react';
import ChristianCross from '../components/ChristianCross';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sacrements = [
  {
    id: 'bapteme',
    title: 'Baptême',
    subtitle: 'Devenir enfant de Dieu',
    description: 'Premier sacrement de l\'initiation chrétienne, le baptême fait entrer dans la famille des enfants de Dieu.',
    icon: Droplets,
    image: 'https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/gj75c74d_Bapteme.png',
    path: '/sacrements/bapteme',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'premiere-communion',
    title: 'Première Communion',
    subtitle: 'Recevoir le Corps du Christ',
    description: 'Recevoir pour la première fois l\'Eucharistie, source et sommet de la vie chrétienne.',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/jrek2lhj_Premiere-communion.png',
    path: '/sacrements/premiere-communion',
    color: 'from-gold to-amber-600'
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    subtitle: 'Recevoir l\'Esprit Saint',
    description: 'Sacrement de la maturité chrétienne qui achève l\'initiation commencée au baptême.',
    icon: Sparkles,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/e13l6wpl_Confirmation.png',
    path: '/sacrements/confirmation',
    color: 'from-red-400 to-orange-500'
  },
  {
    id: 'reconciliation',
    title: 'Réconciliation',
    subtitle: 'Le pardon de Dieu',
    description: 'Sacrement de la miséricorde pour recevoir le pardon de Dieu et se réconcilier avec l\'Église.',
    icon: HandHeart,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/qhnerpwc_Reconciliation-confession.png',
    path: '/sacrements/reconciliation',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'mariage',
    title: 'Mariage',
    subtitle: 'S\'unir dans l\'amour du Christ',
    description: 'S\'engager dans l\'amour et la fidélité, soutenu par la grâce de Dieu.',
    icon: Heart,
    image: 'https://customer-assets.emergentagent.com/job_957f9676-dd26-4dee-97f5-494fc015f420/artifacts/5tik9jhg_Mariage.png',
    path: '/sacrements/mariage',
    color: 'from-pink-400 to-rose-500',
    imageStyle: { objectPosition: 'left bottom' }
  },
  {
    id: 'sacrement-malades',
    title: 'Sacrement des Malades',
    subtitle: 'Force et réconfort',
    description: 'Pour les personnes gravement malades, âgées ou en fin de vie, ce sacrement apporte réconfort et paix.',
    icon: ChristianCross,
    image: 'https://customer-assets.emergentagent.com/job_c9a89358-b983-4f0b-8ec4-b48d0db621c4/artifacts/3dt57dtp_Sacreement-des-malades.png',
    path: '/sacrements/malades',
    color: 'from-green-400 to-emerald-600'
  }
];

const DemanderSacrementPage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="demander-sacrement-page">
      <SEO title="Demander un Sacrement" description="Demandez un sacrement \u00e0 la paroisse Notre Dame d'Autan - Bapt\u00eame, premi\u00e8re communion, confirmation, mariage et sacrement des malades." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/b0vmxtgf_Demander-sacrement.png"
            alt="Demander un sacrement \u00e0 la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Demander un Sacrement
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Les grandes étapes de la vie chrétienne</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Les sacrements sont des signes visibles de la grâce de Dieu. Découvrez chaque sacrement et faites votre demande.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Sacrements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sacrements.map((sacrement) => {
            const IconComponent = sacrement.icon;
            return (
              <Link
                key={sacrement.id}
                to={sacrement.path}
                className="group"
                data-testid={`sacrement-card-${sacrement.id}`}
              >
                <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full border border-slate-100 dark:border-slate-700 flex flex-col">
                  {/* Image with overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                loading="lazy"
                src={sacrement.image}
                      alt={sacrement.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={sacrement.imageStyle || {}}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${sacrement.color} opacity-60`}></div>
                    <div className={`absolute inset-0 flex items-start justify-end p-4`}>
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-1 group-hover:text-gold transition-colors">
                      {sacrement.title}
                    </h3>
                    <p className="text-gold font-medium text-sm mb-3">{sacrement.subtitle}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                      {sacrement.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-gold text-sm font-medium group-hover:text-gold-dark transition-colors">
                      <span>En savoir plus</span>
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

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 mb-16">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Comment faire une demande ?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Pour toute demande de sacrement, nous vous invitons à contacter le secrétariat paroissial. 
              Notre équipe vous orientera vers la préparation adaptée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/secretariat"
                className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Contacter le secrétariat
              </Link>
              <Link
                to="/horaires-messes"
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-full font-medium transition-colors border border-slate-200 dark:border-slate-700 dark:border-slate-700"
              >
                Horaires des messes
              </Link>
            </div>
          </div>
        </div>

        {/* Citation */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Si tu savais le don de Dieu..."
          </blockquote>
          <p className="text-gold font-medium">Jean 4, 10</p>
        </div>
      </div>
    </div>
  );
};

export default DemanderSacrementPage;
