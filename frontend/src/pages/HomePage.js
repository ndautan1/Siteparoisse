import { Hero } from '@/components/Hero';
import { NewsSection } from '@/components/NewsSection';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const BIENVENUE_IMG = 'https://customer-assets.emergentagent.com/job_church-community-16/artifacts/qxrgws2a_Bienvenue.png';
const CURE_IMG = 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp';

const HomePage = () => {
  return (
    <div data-testid="home-page">
      <SEO title="Accueil" description="Paroisse Notre Dame d'Autan - Communauté paroissiale vivante et accueillante au service de la foi et de la fraternité. Castanet-Tolosan, Saint-Orens et environs." />
      <Hero />
      <FadeIn>
        <NewsSection />
      </FadeIn>

      <FadeIn>
        <UpcomingEvents />
      </FadeIn>

      {/* Mot de bienvenue du Père Daniel */}
      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Photo gauche */}
            <div className="md:w-64 lg:w-72 flex-shrink-0 relative">
              <img
                src={BIENVENUE_IMG}
                alt="Photo de bienvenue de la paroisse Notre Dame d'Autan"
                loading="lazy"
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
                    src={CURE_IMG}
                    alt="P\u00e8re Daniel Brouard-Derval, cur\u00e9 de Notre Dame d'Autan"
                    loading="lazy"
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
      </div>
      </FadeIn>

      {/* Citation biblique */}
      <FadeIn>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Ma maison sera appelée une maison de prière pour tous les peuples."
          </blockquote>
          <p className="text-gold font-medium">Isaïe 56, 7</p>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default HomePage;
