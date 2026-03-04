import { Link } from 'react-router-dom';
import { Heart, CreditCard, Landmark, FileText, HandHeart, Church, BookOpen, Users, Phone, Mail, Gift } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const taxTable = [
  { don: '50', cout: '17' },
  { don: '100', cout: '34' },
  { don: '500', cout: '170' },
];

const usages = [
  { title: 'La Mission', description: "Financer le catéchisme, l'aumônerie et les parcours de foi (Alpha, etc.).", icon: BookOpen, color: 'bg-emerald-100 text-emerald-600' },
  { title: 'Le Patrimoine', description: "Entretenir, chauffer et fleurir notre église et nos salles de rencontre.", icon: Church, color: 'bg-amber-100 text-amber-600' },
  { title: 'La Charité', description: "Soutenir les actions de solidarité auprès des plus démunis et des malades.", icon: HandHeart, color: 'bg-rose-100 text-rose-600' },
  { title: 'La Vie des Prêtres', description: "Assurer leur formation et leur quotidien.", icon: Users, color: 'bg-sky-100 text-sky-600' },
];

const LegsEtDonsPage = () => {
  return (
    <div data-testid="legs-dons-page">
      <SEO
        title="Soutenir la paroisse - Dons, Legs et Donations"
        description="Soutenez la paroisse Notre Dame d'Autan par vos dons, legs et donations. Réduction fiscale de 66%. Don en ligne, chèque, virement. Legs et assurance-vie."
      />

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[45vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_parish-site-1/artifacts/wkjxpnzz_Vie-economique.png"
            alt="Soutenir la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>
        <SocialIcons />
        <div className="relative z-10 text-center text-white px-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4" data-testid="legs-dons-title">
            Soutenir notre Paroisse
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Un geste de foi, un acte d'espérance
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Citation */}
        <FadeIn>
          <blockquote className="text-center mb-16" data-testid="citation">
            <p className="font-serif text-xl md:text-2xl text-slate-deep dark:text-slate-100 italic leading-relaxed mb-3">
              "Chacun doit donner comme il a décidé dans son cœur, sans regret et sans contrainte, car Dieu aime celui qui donne avec joie."
            </p>
            <cite className="text-gold font-medium not-italic">2 Co 9, 7</cite>
          </blockquote>
        </FadeIn>

        <FadeIn>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-center max-w-3xl mx-auto mb-16">
            La vitalité de notre paroisse, l'entretien de notre patrimoine et le rayonnement de nos missions dépendent exclusivement de votre générosité. Que ce soit pour un soutien immédiat ou pour transmettre un héritage, votre don est une pierre vivante apportée à notre communauté.
          </p>
        </FadeIn>

        {/* ===== Section 1: Don du vivant ===== */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white font-bold text-lg">1</span>
              Agir aujourd'hui : Le don du vivant
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed ml-[52px] mb-8">
              Soutenir la paroisse de son vivant permet de financer nos actions quotidiennes : accueil, catéchisme, chauffage de l'église, solidarité et vie de nos prêtres.
            </p>

            {/* Tax deduction */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-8">
              <h3 className="font-medium text-emerald-800 text-lg mb-3">
                Votre don déduit de vos impôts à 66 %
              </h3>
              <p className="text-emerald-700 text-sm mb-4">
                En donnant à la paroisse, vous bénéficiez d'une réduction d'impôt sur le revenu égale à 66 % de votre don, dans la limite de 20 % de votre revenu imposable.
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
                <table className="w-full" data-testid="tax-table">
                  <thead>
                    <tr className="bg-emerald-100/50">
                      <th className="text-left px-5 py-3 text-sm font-medium text-emerald-800">Si vous donnez...</th>
                      <th className="text-left px-5 py-3 text-sm font-medium text-emerald-800">Votre don vous coûte réellement...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxTable.map((row) => (
                      <tr key={row.don} className="border-t border-emerald-100/50">
                        <td className="px-5 py-3 text-slate-700 dark:text-slate-300 font-medium">{row.don} &euro;</td>
                        <td className="px-5 py-3 text-emerald-700 font-bold">{row.cout} &euro;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment methods */}
            <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-6">Comment donner ?</h3>

            <div className="space-y-5">
              {/* Option 1: Carte bancaire */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Option 1 : Par Carte Bancaire (Sécurisé)</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      C'est le moyen le plus simple et le plus rapide. Cliquez sur le bouton ci-dessous pour accéder à notre plateforme de paiement sécurisée.
                    </p>
                    <a
                      href="https://donner.catholique.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
                      data-testid="don-en-ligne-button"
                    >
                      Faire un don en ligne
                    </a>
                    <p className="text-slate-400 text-xs mt-3">
                      Votre reçu fiscal vous sera envoyé automatiquement par e-mail.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 2: Chèque */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Option 2 : Par Chèque</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      Libellez votre chèque à l'ordre de : <strong>Association Diocésaine de Toulouse — Paroisse Notre Dame d'Autan</strong>.
                    </p>
                    <p className="text-slate-500 text-sm">
                      Vous pouvez l'envoyer par courrier ou le déposer à l'accueil du secrétariat paroissial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 3: Virement */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Option 3 : Par Virement Bancaire</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                      Pour un don ponctuel ou régulier, vous pouvez effectuer un virement direct.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-1">
                      <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400"><span className="font-medium text-slate-700 dark:text-slate-300 dark:text-slate-300">IBAN :</span> À demander au secrétariat</p>
                      <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400"><span className="font-medium text-slate-700 dark:text-slate-300 dark:text-slate-300">BIC :</span> À demander au secrétariat</p>
                      <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400"><span className="font-medium text-slate-700 dark:text-slate-300 dark:text-slate-300">Libellé à préciser :</span> "Don Paroisse Notre Dame d'Autan"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ===== Section 2: Legs et Donations ===== */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white font-bold text-lg">2</span>
              Transmettre demain : Legs et Donations
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed ml-[52px] mb-8">
              Préparer sa succession en faveur de la paroisse est une manière de prolonger son engagement de foi et de veiller sur les générations futures.
            </p>

            <div className="space-y-5">
              {/* Legs */}
              <div className="bg-gradient-to-r from-gold/5 to-gold/10 rounded-xl border border-gold/20 p-6">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-gold" />
                  Le Legs (via testament)
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  Vous pouvez transmettre par testament tout ou partie de vos biens (argent, biens immobiliers, bijoux, etc.).
                </p>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gold/10">
                  <p className="text-sm text-slate-700 dark:text-slate-300 dark:text-slate-300">
                    <strong className="text-gold">Exonération totale :</strong> L'Association Diocésaine est totalement exonérée de droits de succession. L'intégralité de votre legs profite donc à la paroisse.
                  </p>
                </div>
              </div>

              {/* Donation */}
              <div className="bg-gradient-to-r from-gold/5 to-gold/10 rounded-xl border border-gold/20 p-6">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-3 flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-gold" />
                  La Donation
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  À la différence du legs, la donation se fait de votre vivant devant notaire. Elle permet de transmettre immédiatement un bien pour soutenir un projet majeur (ex: rénovation de l'église).
                </p>
              </div>

              {/* Assurance-vie */}
              <div className="bg-gradient-to-r from-gold/5 to-gold/10 rounded-xl border border-gold/20 p-6">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gold" />
                  L'Assurance-vie
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Vous pouvez désigner la paroisse comme bénéficiaire de votre contrat d'assurance-vie. C'est une démarche simple qui ne nécessite pas de testament.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ===== Section 3: À quoi servira votre don ? ===== */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-2 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white font-bold text-lg">3</span>
              À quoi servira votre don ?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed ml-[52px] mb-8">
              Votre générosité est gérée dans la plus grande transparence pour :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {usages.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.title} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
                    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ===== Contact Section ===== */}
        <FadeIn>
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center" data-testid="don-contact-section">
            <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-3">Un conseil personnalisé et discret</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Une question sur la fiscalité ? Vous souhaitez discuter d'un projet de legs ou de donation en toute confidentialité ? Nous sommes à votre écoute pour vous accompagner dans votre réflexion, sans aucun engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href="tel:0561005169"
                className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-gold transition-colors"
                data-testid="don-contact-phone"
              >
                <Phone className="w-4 h-4" />
                <span>05 61 00 51 69</span>
              </a>
              <a
                href="mailto:contact@notredamedautan.fr"
                className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-gold transition-colors"
                data-testid="don-contact-email"
              >
                <Mail className="w-4 h-4" />
                <span>contact@notredamedautan.fr</span>
              </a>
            </div>
            <Link
              to="/secretariat"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
              data-testid="don-contact-cta"
            >
              Nous contacter
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default LegsEtDonsPage;
