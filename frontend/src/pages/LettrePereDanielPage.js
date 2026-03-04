import { useEffect, useState } from 'react';
import { Mail, Calendar, FileText, Check, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CURE_IMG = 'https://customer-assets.emergentagent.com/job_513c9844-285f-4857-a7dc-ddd6dae9e1cf/artifacts/izar22oi_pere-daniel.webp';

const LettrePereDanielPage = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/letters`);
        setLetters(res.data);
      } catch (err) {
        console.error('Error fetching letters:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLetters();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await axios.post(`${BACKEND_URL}/api/subscribers`, { email });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Error subscribing:', err);
    } finally {
      setSubscribing(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), 'd MMMM yyyy', { locale: fr });
    } catch {
      return dateStr;
    }
  };

  return (
    <div data-testid="lettre-pere-daniel-page">
      <SEO
        title="La Lettre du Père Daniel"
        description="Retrouvez toutes les lettres du Père Daniel Brouard-Derval, curé de Notre Dame d'Autan. Inscrivez-vous pour recevoir la newsletter paroissiale."
      />

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[45vh] flex items-center justify-center">
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
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4" data-testid="lettre-title">
            La Lettre du Père Daniel
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Les nouvelles et réflexions de notre curé
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Subscription */}
        <FadeIn>
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 mb-12" data-testid="newsletter-subscribe-section">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                <img loading="lazy" src={CURE_IMG} alt="Père Daniel Brouard-Derval" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-1">Recevez la Lettre par email</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Inscrivez-vous pour recevoir les lettres du Père Daniel directement dans votre boîte mail.
                </p>
              </div>
              <div className="w-full md:w-auto">
                {subscribed ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-medium" data-testid="newsletter-subscribed-confirmation">
                    <Check className="w-5 h-5" />
                    <span>Merci pour votre inscription !</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex" data-testid="newsletter-subscribe-form">
                    <input
                      type="email"
                      required
                      placeholder="Votre adresse email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 min-w-0 md:w-64 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-l-lg text-sm focus:outline-none focus:border-gold"
                      data-testid="newsletter-email-input"
                    />
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-r-lg text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50"
                      data-testid="newsletter-subscribe-btn"
                    >
                      {subscribing ? '...' : "S'inscrire"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Letters List */}
        <FadeIn>
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-8 flex items-center gap-3">
            <FileText className="w-6 h-6 text-gold" />
            Toutes les lettres
          </h2>
        </FadeIn>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : letters.length === 0 ? (
          <FadeIn>
            <div className="text-center py-16" data-testid="no-letters">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Aucune lettre publiée pour le moment.</p>
              <p className="text-slate-400 text-sm mt-2">Revenez bientôt !</p>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-4">
            {letters.map((letter) => (
              <FadeIn key={letter.id}>
                <button
                  onClick={() => setSelectedLetter(selectedLetter?.id === letter.id ? null : letter)}
                  className="w-full text-left bg-white rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 overflow-hidden"
                  data-testid={`letter-card-${letter.id}`}
                >
                  <div className="p-5 flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-gold leading-none">
                        {format(parseISO(letter.date), 'd')}
                      </span>
                      <span className="text-[9px] text-gold/70 uppercase font-medium">
                        {format(parseISO(letter.date), 'MMM', { locale: fr })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 leading-tight">{letter.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(letter.date)}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${selectedLetter?.id === letter.id ? 'rotate-90' : ''}`} />
                  </div>

                  {selectedLetter?.id === letter.id && (
                    <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4" onClick={(e) => e.stopPropagation()}>
                      <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed prose prose-sm max-w-none break-words overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: letter.content }}
                      />
                      <p className="text-right text-slate-500 text-sm italic mt-4">
                        Père Daniel Brouard-Derval
                      </p>
                    </div>
                  )}
                </button>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LettrePereDanielPage;
