import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Music, BookOpen, Users, HandHeart, Flower2, BookMarked, Church,
  Baby, Mic, UserCheck, PartyPopper, UtensilsCrossed, Palette,
  Package, Camera, ArrowRight, ArrowLeft, RotateCcw, Sparkles
} from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import ChristianCross from '../components/ChristianCross';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const regularServices = [
  { title: 'Chorale paroissiale', description: 'Rejoignez la chorale pour animer les messes et célébrations par le chant.', icon: Music, path: '/liturgie-musique', color: 'bg-violet-100 text-violet-600' },
  { title: 'Lecteurs', description: 'Proclamez la Parole de Dieu lors des célébrations liturgiques.', icon: BookMarked, path: '/liturgie-musique', color: 'bg-sky-100 text-sky-600' },
  { title: 'Art Floral', description: "Fleurissez l'église et embellissez nos célébrations.", icon: Flower2, path: '/liturgie-musique', color: 'bg-rose-100 text-rose-600' },
  { title: "Servants d'autel", description: 'Servez lors des messes et apprenez les gestes de la liturgie.', icon: Church, path: '/servants-vocations', color: 'bg-amber-100 text-amber-600' },
  { title: 'Catéchisme', description: 'Accompagnez les enfants dans leur découverte de la foi.', icon: Baby, path: '/catechisme', color: 'bg-emerald-100 text-emerald-600' },
  { title: 'Aumônerie', description: 'Encadrez les jeunes collégiens et lycéens dans leur cheminement.', icon: Users, path: '/aumonerie', color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Éveil à la Foi', description: 'Animez des rencontres pour les tout-petits (3-7 ans) et leurs parents.', icon: Heart, path: '/eveil-foi', color: 'bg-pink-100 text-pink-600' },
  { title: 'Parcours Alpha', description: 'Accueillez et accompagnez les personnes qui découvrent la foi.', icon: BookOpen, path: '/alpha-catechumenat', color: 'bg-teal-100 text-teal-600' },
  { title: "Service d'écoute", description: 'Offrez une écoute bienveillante aux personnes traversant des épreuves.', icon: UserCheck, path: '/service-ecoute', color: 'bg-cyan-100 text-cyan-600' },
  { title: 'Visite des malades (SEM)', description: 'Rendez visite aux personnes isolées, malades ou en EHPAD.', icon: HandHeart, path: '/visite-malades', color: 'bg-orange-100 text-orange-600' },
  { title: 'Secours Catholique', description: "Participez aux actions de solidarité et d'entraide.", icon: HandHeart, path: '/entraide', color: 'bg-red-100 text-red-600' },
  { title: 'Équipe funérailles', description: 'Accompagnez les familles endeuillées dans la préparation des obsèques.', icon: ChristianCross, path: '/funerailles', color: 'bg-slate-100 text-slate-600' },
  { title: 'Service Accueil', description: 'Accueillez les visiteurs et paroissiens lors des messes et événements.', icon: Mic, path: '/services-transverses', color: 'bg-lime-100 text-lime-600' },
];

const occasionalServices = [
  { title: "Préparation d'événements", description: "Aidez à organiser les temps forts : kermesse, fête paroissiale, concerts, journées portes ouvertes.", icon: PartyPopper, color: 'bg-fuchsia-100 text-fuchsia-600' },
  { title: 'Mise en place & rangement', description: "Installez les salles, les chaises, la sono, les décorations avant et après les événements.", icon: Package, color: 'bg-yellow-100 text-yellow-600' },
  { title: "Service apéritif & repas", description: "Préparez et servez lors des repas partagés, pots de l'amitié et apéritifs paroissiaux.", icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-600' },
  { title: 'Décoration & scénographie', description: "Décorez les salles et l'église pour les fêtes, les temps liturgiques forts et les événements.", icon: Palette, color: 'bg-purple-100 text-purple-600' },
  { title: 'Photos & communication', description: "Photographiez les événements et aidez à la communication sur les réseaux sociaux.", icon: Camera, color: 'bg-blue-100 text-blue-600' },
];

const allServicesByName = {};
[...regularServices, ...occasionalServices].forEach(s => { allServicesByName[s.title] = s; });

const quizQuestions = [
  {
    id: 'q1',
    question: 'De quel temps disposez-vous ?',
    options: [
      { label: "J'aime la régularité (une mission hebdomadaire ou mensuelle).", value: 'regular' },
      { label: "Je préfère donner des coups de main ponctuels lors des grands événements.", value: 'ponctuel' },
      { label: "Je suis disponible selon les besoins urgents ou imprévus.", value: 'urgent' },
    ],
  },
  {
    id: 'q2',
    question: "Qu'est-ce qui vous anime le plus ?",
    options: [
      { label: "Transmettre : partager ma foi et accompagner les autres.", value: 'transmettre' },
      { label: "Célébrer : participer à la beauté de la liturgie et de la prière.", value: 'celebrer' },
      { label: "Écouter & Soutenir : aller vers les personnes fragiles ou isolées.", value: 'ecouter' },
      { label: "Organiser & Agir : être dans le concret (logistique, accueil, technique).", value: 'organiser' },
    ],
  },
  {
    id: 'q3',
    question: 'Quel est votre "petit plus" ou votre talent ?',
    options: [
      { label: "J'ai un bon contact avec les enfants et les jeunes.", value: 'enfants' },
      { label: "J'aime chanter, lire en public ou l'art floral.", value: 'artistique' },
      { label: "Je sais écouter avec patience et bienveillance.", value: 'empathie' },
      { label: "J'ai le sens de l'accueil et j'aime créer du lien.", value: 'accueil' },
      { label: "Je suis manuel(le), j'aime la photo, la com' ou la logistique.", value: 'manuel' },
    ],
  },
  {
    id: 'q4',
    question: 'Vers quel public vous sentez-vous le plus appelé ?',
    options: [
      { label: "Les enfants, collégiens et lycéens.", value: 'jeunes' },
      { label: "Les personnes malades, âgées ou en difficulté.", value: 'fragiles' },
      { label: "La communauté paroissiale dans son ensemble (tous âges).", value: 'communaute' },
    ],
  },
  {
    id: 'q5',
    question: "Dans quelle tranche d'âge vous situez-vous ?",
    options: [
      { label: "Moins de 18 ans (Enfant / Ado).", value: 'jeune' },
      { label: "Étudiant ou Jeune Professionnel.", value: 'etudiant' },
      { label: "Adulte actif.", value: 'actif' },
      { label: "Retraité(e).", value: 'retraite' },
    ],
  },
];

const getRecommendations = (a) => {
  const results = new Set();

  // Q2-A (Transmettre) + Q3-A (Enfants) → Catéchisme, Aumônerie, Éveil à la Foi
  if (a.q2 === 'transmettre' && a.q3 === 'enfants') {
    results.add('Catéchisme');
    results.add('Aumônerie');
    results.add('Éveil à la Foi');
  }

  // Q2-A (Transmettre) + Q3-D (Accueil) → Parcours Alpha
  if (a.q2 === 'transmettre' && a.q3 === 'accueil') {
    results.add('Parcours Alpha');
  }

  // Q2-B (Célébrer) + Q3-B (Chant/Lecture) → Chorale, Lecteurs
  if (a.q2 === 'celebrer' && a.q3 === 'artistique') {
    results.add('Chorale paroissiale');
    results.add('Lecteurs');
  }

  // Q2-B (Célébrer) + Q5-A (Jeune) → Servants d'autel
  if (a.q2 === 'celebrer' && a.q5 === 'jeune') {
    results.add("Servants d'autel");
  }

  // Q2-B (Célébrer) + Q3-E (Manuel) → Art Floral, Décoration
  if (a.q2 === 'celebrer' && a.q3 === 'manuel') {
    results.add('Art Floral');
    results.add('Décoration & scénographie');
  }

  // Q2-C (Écouter) + Q3-C (Empathie) → Écoute, Visite malades, Funérailles
  if (a.q2 === 'ecouter' && a.q3 === 'empathie') {
    results.add("Service d'écoute");
    results.add('Visite des malades (SEM)');
    results.add('Équipe funérailles');
  }

  // Q2-D (Action) + Q4-B (Fragiles) → Secours Catholique
  if (a.q2 === 'organiser' && a.q4 === 'fragiles') {
    results.add('Secours Catholique');
  }

  // Q2-D (Action) + Q3-D (Accueil) → Service Accueil, Apéritif
  if (a.q2 === 'organiser' && a.q3 === 'accueil') {
    results.add('Service Accueil');
    results.add('Service apéritif & repas');
  }

  // Q1-B (Ponctuel) + Q2-D (Action) → Préparation, Mise en place
  if (a.q1 === 'ponctuel' && a.q2 === 'organiser') {
    results.add("Préparation d'événements");
    results.add('Mise en place & rangement');
  }

  // Q3-E (Technique) + Q5-B/C (Étudiant/Actif) → Photos & communication
  if (a.q3 === 'manuel' && (a.q5 === 'etudiant' || a.q5 === 'actif')) {
    results.add('Photos & communication');
  }

  // Q1-B (Ponctuel) → Coups de main ponctuels (general)
  if (a.q1 === 'ponctuel') {
    results.add("Préparation d'événements");
    results.add('Mise en place & rangement');
    results.add('Service apéritif & repas');
  }

  // Fallback: broader matching if no rules matched
  if (results.size === 0) {
    if (a.q2 === 'transmettre') { results.add('Catéchisme'); results.add('Parcours Alpha'); results.add('Éveil à la Foi'); }
    if (a.q2 === 'celebrer') { results.add('Chorale paroissiale'); results.add('Lecteurs'); results.add('Art Floral'); }
    if (a.q2 === 'ecouter') { results.add("Service d'écoute"); results.add('Visite des malades (SEM)'); results.add('Équipe funérailles'); }
    if (a.q2 === 'organiser') { results.add('Service Accueil'); results.add("Préparation d'événements"); results.add('Secours Catholique'); }
  }

  return [...results].map(name => allServicesByName[name]).filter(Boolean);
};

const ServiceCard = ({ service, testIdPrefix = 'service' }) => {
  const IconComp = service.icon;
  return (
    <Link
      to={service.path || '/servir'}
      className="group block bg-white rounded-xl border border-slate-100 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full"
      data-testid={`${testIdPrefix}-card-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
        <IconComp className="w-6 h-6" />
      </div>
      <h3 className="font-medium text-slate-900 dark:text-slate-100 text-lg mb-2 group-hover:text-gold transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.description}</p>
    </Link>
  );
};

const ServirPage = () => {
  const [quizStep, setQuizStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setResults(getRecommendations(newAnswers));
    }
  };

  const resetQuiz = () => {
    setQuizStep(-1);
    setAnswers({});
    setResults(null);
  };

  return (
    <div data-testid="servir-page">
      <SEO
        title="Servir"
        description="Découvrez tous les services à rejoindre dans la paroisse Notre Dame d'Autan. Chorale, catéchisme, solidarité, accueil... il y a une place pour chacun !"
      />

      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/54f2vm3r_Eglise-Castanet-Tolosan.jpg"
            alt="Vue de l'église de Castanet-Tolosan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>
        <SocialIcons />
        <div className="relative z-10 text-center text-white px-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4" data-testid="servir-title">
            Servir dans la paroisse
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Il y a une place pour chacun !
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Chaque service est une manière de vivre sa foi concrètement et de contribuer à la vie de notre communauté.
            </p>
          </div>
        </FadeIn>

        {/* Regular Services */}
        <FadeIn>
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-gold rounded-full"></span>
            Services réguliers
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {regularServices.map((service) => (
            <FadeIn key={service.title}>
              <ServiceCard service={service} testIdPrefix="regular" />
            </FadeIn>
          ))}
        </div>

        {/* Occasional Services */}
        <FadeIn>
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-2 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-gold rounded-full"></span>
            Coups de main ponctuels
          </h2>
          <p className="text-slate-500 text-sm mb-6 ml-11">
            Pas besoin de s'engager sur la durée, chaque coup de main compte !
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {occasionalServices.map((service) => (
            <FadeIn key={service.title}>
              <ServiceCard service={service} testIdPrefix="occasional" />
            </FadeIn>
          ))}
        </div>

        {/* Quiz Section */}
        <FadeIn>
          <div className="bg-gradient-to-br from-slate-50 to-gold/5 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 md:p-10 mb-16" data-testid="quiz-section">
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
              <h2 className="font-serif text-2xl md:text-3xl text-slate-deep dark:text-slate-100 mb-2">
                Quel service est fait pour vous ?
              </h2>
              <p className="text-slate-500 text-sm">
                5 questions pour trouver votre place
              </p>
            </div>

            {/* Not started */}
            {quizStep === -1 && !results && (
              <div className="text-center">
                <button
                  onClick={() => setQuizStep(0)}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
                  data-testid="quiz-start-button"
                >
                  C'est parti
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Questions */}
            {quizStep >= 0 && !results && (
              <div className="max-w-xl mx-auto">
                {/* Progress bar */}
                <div className="flex gap-1.5 mb-8">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i <= quizStep ? 'bg-gold' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-400 text-center mb-2">
                  Question {quizStep + 1} sur {quizQuestions.length}
                </p>
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 text-center mb-6" data-testid="quiz-question">
                  {quizQuestions[quizStep].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(quizQuestions[quizStep].id, opt.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-gold hover:shadow-sm ${
                        answers[quizQuestions[quizStep].id] === opt.value
                          ? 'border-gold bg-gold/5'
                          : 'border-slate-200 dark:border-slate-700 bg-white'
                      }`}
                      data-testid={`quiz-option-${opt.value}`}
                    >
                      <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {quizStep > 0 && (
                  <button
                    onClick={() => setQuizStep(quizStep - 1)}
                    className="mt-6 text-sm text-slate-400 hover:text-slate-600 dark:text-slate-400 flex items-center gap-1 mx-auto transition-colors"
                    data-testid="quiz-back-button"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Question précédente
                  </button>
                )}
              </div>
            )}

            {/* Results */}
            {results && (
              <div data-testid="quiz-results">
                <p className="text-center text-slate-700 dark:text-slate-300 font-medium mb-6">
                  Merci pour votre participation ! D'après vos réponses, voici les services où vous pourriez vous épanouir :
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {results.map((service) => {
                    const IconComp = service.icon;
                    return (
                      <Link
                        key={service.title}
                        to={service.path || '/servir'}
                        className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 dark:border-slate-700 p-4 hover:shadow-md transition-all group"
                        data-testid={`quiz-result-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-gold transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-slate-500 text-sm mt-0.5">{service.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold transition-colors"
                    data-testid="quiz-restart-button"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Recommencer le questionnaire
                  </button>
                  <Link
                    to="/secretariat"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                    data-testid="quiz-contact-button"
                  >
                    Nous contacter pour s'engager
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
            <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-3">Envie de vous engager ?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
              Contactez le secrétariat pour être orienté vers le service qui vous correspond.
            </p>
            <Link
              to="/secretariat"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
              data-testid="servir-contact-cta"
            >
              Nous contacter
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ServirPage;
