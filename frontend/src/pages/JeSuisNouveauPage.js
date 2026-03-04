import { Link } from 'react-router-dom';
import { Heart, Users, HandHeart, Sparkles, Church, Calendar } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const sections = [
  {
    id: 'alpha',
    title: 'Parcours Alpha',
    subtitle: 'Découvrir la foi chrétienne',
    description: 'Un parcours convivial pour explorer les grandes questions de la vie et de la foi, autour d\'un repas et d\'échanges.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
    path: '/alpha-catechumenat',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'catechumenat',
    title: 'Catéchuménat',
    subtitle: 'Devenir chrétien',
    description: 'Un chemin de préparation au baptême pour les adultes qui souhaitent devenir chrétiens.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=600',
    path: '/alpha-catechumenat',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'groupes',
    title: 'Groupes de Partage',
    subtitle: 'Grandir ensemble dans la foi',
    description: 'Rejoignez un petit groupe pour partager, prier et approfondir votre foi dans un cadre fraternel.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600',
    path: '/groupes-partage',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 'entraide',
    title: 'Entraide',
    subtitle: 'Solidarité & service',
    description: 'Découvrez comment donner de votre temps ou recevoir de l\'aide au sein de notre communauté.',
    icon: HandHeart,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    path: '/entraide',
    color: 'from-rose-400 to-pink-500'
  }
];

const JeSuisNouveauPage = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="je-suis-nouveau-page">
      <SEO title="Je suis nouveau" description="Bienvenue dans la paroisse Notre Dame d'Autan - Toutes les informations pour les nouveaux arrivants et les personnes souhaitant d\u00e9couvrir la communaut\u00e9." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/4pgv62xu_Nouveau.png"
            alt="Bienvenue aux nouveaux arrivants de la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content - with padding to avoid search button overlap */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Church className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
            Bienvenue parmi nous !
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Vous êtes nouveau ? Vous êtes chez vous.</p>
          <div className="text-base md:text-lg text-white/90 max-w-2xl mx-auto space-y-1">
            <p>Notre communauté vous accueille à bras ouverts, quelle que soit votre histoire.</p>
            <p>Ici, chacun trouve sa place et peut cheminer à son rythme.</p>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-4">Une communauté qui vous attend</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Notre Dame d'Autan est une paroisse vivante et chaleureuse. Que vous souhaitiez simplement 
                assister à une messe, poser des questions sur la foi, ou vous engager dans la vie paroissiale, 
                vous trouverez ici des personnes prêtes à vous accompagner.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                N'hésitez pas à venir nous rencontrer, à participer à nos événements ou à contacter 
                le secrétariat pour tout renseignement. La porte est toujours ouverte !
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                to="/horaires-messes"
                className="flex items-center bg-gold/10 hover:bg-gold/20 rounded-xl p-4 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-deep dark:text-slate-100 group-hover:text-gold transition-colors">Horaires des messes</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Venez nous rejoindre pour une célébration</p>
                </div>
              </Link>
              <Link
                to="/secretariat"
                className="flex items-center bg-gold/10 hover:bg-gold/20 rounded-xl p-4 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-deep dark:text-slate-100 group-hover:text-gold transition-colors">Nous contacter</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Notre équipe est là pour vous accueillir</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-4">Pour faire vos premiers pas</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Voici quelques propositions pour découvrir notre communauté et cheminer dans la foi
          </p>
        </div>

        {/* Cards Grid - 4 colonnes sans photos */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* FAQ Section */}
        <div className="mt-16 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-6 text-center">Questions fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-medium text-slate-deep dark:text-slate-100 mb-2">Dois-je être baptisé pour venir à la messe ?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Non, tout le monde est le bienvenu à la messe ! Vous pouvez venir observer, prier et participer 
                à votre rythme. Seule la communion est réservée aux baptisés.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-medium text-slate-deep dark:text-slate-100 mb-2">Je ne connais personne, comment m'intégrer ?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Venez vous présenter au secrétariat ou restez après la messe pour un café ! 
                Le parcours Alpha est aussi une excellente façon de rencontrer d'autres personnes.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-medium text-slate-deep dark:text-slate-100 mb-2">Comment puis-je me faire baptiser adulte ?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Le catéchuménat accompagne les adultes vers le baptême. Contactez-nous pour en savoir plus 
                sur ce beau chemin qui dure généralement deux ans.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="font-medium text-slate-deep dark:text-slate-100 mb-2">Y a-t-il des activités pour les jeunes ?</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Oui ! Aumônerie pour les collégiens et lycéens, groupes scouts, MEJ, patronage... 
                Consultez la section "Familles & Jeunesse" pour découvrir toutes nos propositions.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
            Vous avez d'autres questions ? N'hésitez pas à nous contacter !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/secretariat"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Contacter le secrétariat
            </Link>
            <Link
              to="/equipe-pastorale"
              className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-full font-medium transition-colors border border-slate-200 dark:border-slate-700 dark:border-slate-700"
            >
              Rencontrer l'équipe pastorale
            </Link>
          </div>
        </div>
      </div>

      {/* Citation biblique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "N'oubliez pas l'hospitalité : elle a permis à certains, sans le savoir, de recevoir chez eux des anges."
          </blockquote>
          <p className="text-gold font-medium">Hébreux 13, 2</p>
        </div>
      </div>
    </div>
  );
};

export default JeSuisNouveauPage;
