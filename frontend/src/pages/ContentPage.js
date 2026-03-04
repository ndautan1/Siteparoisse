import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Users, Heart, BookOpen, Church, GraduationCap, Baby, MessagesSquare, 
  Flower2, HandHeart, Stethoscope, Building2, Sparkles, Music, Coffee, 
  Compass, Tent, Star, BookMarked, Radio, Tv, Globe, Home, Phone,
  HeartHandshake, Glasses, Landmark, CalendarHeart, UserCircle, Shield,
  Palmtree, Smile, Mic, PenTool, DoorOpen, FileText, Wallet, Gift, 
  CircleDollarSign, Wrench, Megaphone, UserPlus, Lightbulb, MessageCircle,
  ExternalLink, MapPin, Clock
} from 'lucide-react';
import FuneralsAgenda from '@/components/FuneralsAgenda';
import { SocialIcons } from '@/components/SocialIcons';
import ResourceModal from '@/components/ResourceModal';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';
import ChristianCross from '@/components/ChristianCross';

// Citations bibliques pour chaque section
const biblicalQuotes = {
  services: { quote: "Il y a diversité de services, mais c'est le même Seigneur.", reference: "1 Corinthiens 12, 5" },
  eveil: { quote: "Laissez les enfants venir à moi.", reference: "Marc 10, 14" },
  catechisme: { quote: "Je t'ai gravé sur les paumes de mes mains.", reference: "Isaïe 49, 16" },
  aumonerie: { quote: "Que personne ne méprise ta jeunesse, mais sois un modèle pour les fidèles.", reference: "1 Timothée 4, 12" },
  mouvements: { quote: "Soyez toujours prêts à répondre à quiconque vous demande raison de l'espérance qui est en vous.", reference: "1 Pierre 3, 15" },
  servants: { quote: "Moi et ma maison, nous servirons le Seigneur.", reference: "Josué 24, 15" },
  liturgie: { quote: "Chantez au Seigneur un chant nouveau, car il a fait des merveilles.", reference: "Psaume 97, 1" },
  funerailles: { quote: "Je suis la résurrection et la vie. Celui qui croit en moi vivra.", reference: "Jean 11, 25" },
  alpha: { quote: "Venez et voyez.", reference: "Jean 1, 39" },
  groupes: { quote: "Là où deux ou trois sont rassemblés en mon nom, je suis au milieu d'eux.", reference: "Matthieu 18, 20" },
  meditation: { quote: "Le Seigneur est proche de tous ceux qui l'invoquent avec vérité.", reference: "Psaume 144, 18" },
  ressources: { quote: "Ta parole est une lampe à mes pieds, une lumière sur mon sentier.", reference: "Psaume 118, 105" },
  ecoute: { quote: "Consolez, consolez mon peuple.", reference: "Isaïe 40, 1" },
  malades: { quote: "J'étais malade, et vous m'avez visité.", reference: "Matthieu 25, 36" },
  entraide: { quote: "Portez les fardeaux les uns des autres.", reference: "Galates 6, 2" },
};

// Configuration des sections avec vignettes
const contentConfig = {
  economique: {
    title: 'Vie Économique',
    subtitle: 'Gestion financière et matérielle',
    description: 'Une gestion transparente et responsable au service de notre mission.',
    icon: Building2,
    heroImage: 'https://customer-assets.emergentagent.com/job_parish-site-1/artifacts/wkjxpnzz_Vie-economique.png',
    items: [
      { title: 'Conseil des Finances', description: 'Gestion financière de la paroisse', icon: Wallet },
      { title: 'Commission des Travaux', description: 'Entretien de nos églises', icon: Wrench },
      { title: 'Denier de l\'Église', description: 'Soutenir la mission de l\'Église', icon: CircleDollarSign },
      { title: 'Legs et Donations', description: 'Soutenir durablement notre communauté', icon: Gift },
    ]
  },
  services: {
    title: 'Services Transverses',
    subtitle: 'Communication & accueil',
    description: 'Des équipes au service de la communication et de l\'accueil.',
    icon: Sparkles,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/k5e6s4rg_Services-transverses.png',
    items: [
      { title: 'Service Communication', description: 'Site web, réseaux sociaux, bulletin', icon: Megaphone },
      { title: 'Service Accueil', description: 'Accueil chaleureux des visiteurs', icon: DoorOpen },
      { title: 'Secrétariat', description: 'Gestion administrative', icon: FileText },
    ]
  },
  eveil: {
    title: 'Éveil à la Foi',
    subtitle: '3-7 ans',
    description: 'Premiers pas dans la foi chrétienne pour les tout-petits et leurs familles.',
    icon: Baby,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/6dnxwubq_Eveil-foi.png',
    items: [
      { title: 'Rencontres mensuelles', description: 'Le dimanche après la messe', icon: CalendarHeart },
      { title: 'Contes et histoires', description: 'Découvrir la Bible en s\'amusant', icon: BookOpen },
      { title: 'Chants et prières', description: 'Apprendre à prier ensemble', icon: Music },
      { title: 'Activités manuelles', description: 'Créations et bricolages', icon: PenTool },
    ],
    // Contenu détaillé affiché directement sur la page
    detailedContent: {
      intro: 'L\'Éveil à la Foi s\'adresse aux enfants de 3 à 7 ans et à leurs parents. Il a pour but de découvrir l\'amour de Dieu dans nos vies et d\'apprendre à connaître Jésus, la prière et la vie en Église.',
      paragraphes: [
        'Nous travaillons pour que cette première expérience de Dieu soit ressentie comme une source de joie et un appel à grandir. Ainsi, nos chants et prières sont accompagnés de gestes et les lectures bibliques sont souvent « animées » afin de rendre la parole plus vivante aux enfants.',
        'La séance se termine toujours par une activité manuelle ou un mime lié au thème traité puis une prière.'
      ],
      contact: 'Pour tout renseignement, merci de vous adresser au secrétariat.',
      lieux: [
        {
          ville: 'Castanet',
          horaire: 'Un samedi par mois entre 10h15 et 11h30',
          adresse: 'Maison de la Fraternité, 10 avenue de Toulouse',
          dates: '11/10, 15/11, 13/12, 14/02, 28/03 et 30/05'
        },
        {
          ville: 'Saint-Orens',
          horaire: 'Un dimanche par mois entre 9h30 et 10h15',
          adresse: 'Centre paroissial, place du Souvenir',
          dates: '23/11, 11/01, 8/02, 15/03 et 12/04'
        },
        {
          ville: 'Escalquens',
          horaire: 'Un mercredi par mois entre 18h00 et 18h45',
          adresse: 'Presbytère, chemin des églises',
          dates: '15/10, 19/11, 17/12, 21/01, 18/02, 18/03, 15/04 et 27/05'
        }
      ]
    }
  },
  catechisme: {
    title: 'Catéchisme',
    subtitle: 'CE2 à 6ème',
    description: 'Découvrir Jésus et grandir dans la foi en communauté.',
    icon: BookOpen,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/fd1bsyn9_Catechisme.png',
    items: [
      { title: 'CE2', description: 'Découverte de Jésus', icon: Star },
      { title: 'CM1', description: 'Préparation à la communion', icon: Heart },
      { title: 'CM2', description: 'Approfondissement', icon: BookMarked },
      { title: '6ème', description: 'Profession de foi', icon: ChristianCross },
    ]
  },
  aumonerie: {
    title: 'Aumônerie',
    subtitle: 'Collégiens & lycéens',
    description: 'Un lieu pour les jeunes de grandir ensemble dans la foi.',
    icon: GraduationCap,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/z84pw136_Aumonerie.png',
    items: [
      { title: 'Aumônerie Collège', description: '5ème - 3ème', icon: Users },
      { title: 'Aumônerie Lycée', description: 'Seconde - Terminale', icon: GraduationCap },
      { title: 'Camps et retraites', description: 'Temps forts et activités', icon: Tent },
      { title: 'Confirmation', description: 'Préparation au sacrement', icon: Sparkles },
    ]
  },
  mouvements: {
    title: 'Mouvements de Jeunesse',
    subtitle: 'Scouts, MEJ, Patronage',
    description: 'Activités, partage et service dans un esprit chrétien.',
    icon: Compass,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/4ufmdwhr_Mouvements.png',
    items: [
      { title: 'Scouts et Guides de France', description: 'Activités de plein air, camps, service', icon: Tent },
      { 
        title: 'MEJ', 
        description: 'Mouvement Eucharistique des Jeunes', 
        icon: Heart,
        modalTitle: 'Mouvement Eucharistique des Jeunes',
        modalDescription: 'Pour chaque jeune, le MEJ se propose comme un chemin de croissance humaine et spirituelle. Au fil des ans, chacun peut développer petit à petit ses capacités à faire équipe, à apprendre à mieux écouter et mieux s\'exprimer, à découvrir la vie ensemble avec ses richesses et ses difficultés.',
        mejContent: {
          paragraphes: [
            'En équipe et à partir du thème d\'année commun à tous les âges, les jeunes apprennent à découvrir et « goûter Dieu en toute chose » (comme le dit Saint Ignace). Ils cheminent avec leur accompagnateur en apprenant à « relire leur vie pour la relier au Christ ».'
          ],
          tranches: {
            titre: 'Le MEJ invite les jeunes de 10 à 18 ans',
            groupes: [
              { nom: 'Jeunes Témoins (JT)', age: '10-13 ans' },
              { nom: 'Témoins Aujourd\'hui (TA)', age: '13-15 ans' },
              { nom: 'Équipes Espérance (ES)', age: '15-18 ans' }
            ]
          },
          lienExterne: {
            texte: 'Pour en savoir plus sur le mouvement',
            url: 'https://www.mej.fr'
          }
        }
      },
      { title: 'Patronage', description: 'Activités ludiques et sportives', icon: Smile },
    ]
  },
  servants: {
    title: 'Servants d\'autel & Vocations',
    subtitle: 'Service liturgique',
    description: 'Se mettre au service de la liturgie et répondre à l\'appel.',
    icon: ChristianCross,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/vz77gtcm_Servants-vocations.png',
    items: [
      { title: 'Servants d\'autel', description: 'Service à l\'autel pendant la messe', icon: Star },
      { title: 'Formation', description: 'Apprentissage du service liturgique', icon: BookOpen },
      { title: 'Accompagnement vocations', description: 'Discernement et accompagnement', icon: Lightbulb },
    ]
  },
  mariage: {
    title: 'Le Mariage',
    subtitle: 'Préparation & célébration',
    description: 'S\'engager dans l\'amour et la fidélité, soutenu par la grâce de Dieu.',
    icon: Heart,
    items: [
      { title: 'Préparation au mariage', description: 'Parcours avec couples accompagnateurs', icon: HeartHandshake },
      { title: 'Équipes Notre-Dame', description: 'Spiritualité conjugale', icon: Users },
      { title: 'Cana', description: 'Formation à la vie de couple', icon: Heart },
      { title: 'Session CPM', description: 'Centre de Préparation au Mariage', icon: CalendarHeart },
    ]
  },
  liturgie: {
    title: 'Liturgie & Musique',
    subtitle: 'Chorale, Art Floral, Sacristains',
    description: 'Embellir les célébrations par le chant, la musique et l\'art floral.',
    icon: Music,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/svoox7vw_Liturgie-musique.png',
    items: [
      { title: 'Chorale paroissiale', description: 'Chants et musique liturgique', icon: Mic },
      { title: 'Art Floral', description: 'Fleurir l\'église avec beauté', icon: Flower2 },
      { title: 'Sacristains', description: 'Service discret et essentiel', icon: ChristianCross },
      { title: 'Lecteurs', description: 'Proclamer la Parole de Dieu', icon: BookOpen },
    ]
  },
  funerailles: {
    title: 'Funérailles',
    subtitle: 'Accompagnement des familles',
    description: 'Accompagner les familles en deuil avec compassion et espérance.',
    icon: ChristianCross,
    heroImage: 'https://customer-assets.emergentagent.com/job_scroll-donate-pages/artifacts/m6yxyydm_Funerailles.png',
    items: [
      { title: 'Équipe funérailles', description: 'Préparation de la célébration', icon: Users },
      { title: 'Accompagnement du deuil', description: 'Soutien et écoute', icon: Heart },
      { title: 'Messes anniversaire', description: 'Se souvenir des défunts', icon: CalendarHeart },
    ],
    detailedContent: {
      intro: `Les obsèques ne sont pas un sacrement. Mais c'est un moment fort de prière avec la famille et les amis de la personne décédée. Il est des circonstances d'âge, de souffrances, de situations particulières de décès qui pèsent durement sur l'entourage du défunt.

L'animation de la célébration est assurée par des membres de la Communauté chrétienne catholique. Cela suppose aussi une formation des personnes. Cette formation existe au niveau diocésain. Merci à toutes les personnes du Secteur de Saint-Orens qui ont suivi et continuent à suivre cette formation.

Dans la célébration d'obsèques, nous faisons mémoire de toute la vie de la personne décédée pour laquelle nous sommes rassemblés. Nous nous unissons profondément à la douleur de toute la famille et des proches par la prière de toute l'Église.

Dans la foi en la résurrection du Christ, nous exprimons notre espérance de partager un jour, en plénitude, la vie du Christ mort et ressuscité.`,
      contact: `La famille est invitée à prendre contact, le plus tôt possible, avec l'équipe des funérailles de son secteur (numéro de mobile ci-dessous) ou indirectement par les pompes funèbres. Ainsi le jour et l'heure possibles pour la célébration à l'église pourront être fixés en concertation. Si la famille souhaite une eucharistie, elle est invitée à prendre contact très rapidement avec le prêtre.`,
      equipeTitle: 'L\'équipe liturgique se charge…',
      equipeTasks: [
        'de visiter la famille pour une prière à la maison',
        'de retracer les faits importants de la vie familiale, professionnelle ou associative du défunt (normalement au cours de la visite préalable)',
        'de préparer les grandes lignes de la célébration',
        'd\'inviter expressément la famille dans tous les cas à rejoindre la communauté paroissiale du secteur, pour la messe mensuelle célébrée dans une prière commune pour les défunts du mois, le premier samedi du mois suivant, à 9 h à Saint-Orens'
      ],
      important: `Pour qu'il n'y ait pas de surprise et de malentendu sur l'horaire de la célébration, il est important que la famille ou les pompes funèbres ne fixent pas le jour et l'heure des obsèques religieuses sans concertation avec l'équipe des funérailles et le prêtre.`,
      contacts: [
        { sector: 'Secteur Saint-Orens', phone: '06 04 04 15 77' },
        { sector: 'Secteur Castanet-Tolosan', phone: '06 71 15 55 14' }
      ],
      contactNote: 'Nous vous conseillons d\'utiliser ces numéros plutôt que celui du presbytère où le prêtre ne sera pas forcément présent.',
      offrande: 'Il faut prévoir une offrande à la paroisse de 180 € pour la célébration des funérailles.'
    }
  },
  alpha: {
    title: 'Parcours Alpha & Catéchuménat',
    subtitle: 'Découvrir la foi',
    description: 'Découvrir ou redécouvrir la foi chrétienne dans un esprit de partage.',
    icon: MessagesSquare,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/epf9qipp_Alpha-catechumenat.png',
    heroPosition: 'object-top',
    items: [
      { 
        title: 'Parcours Alpha', 
        description: 'Repas, vidéo, échanges conviviaux', 
        icon: MessageCircle,
        modalTitle: 'Le Parcours Alpha',
        modalDescription: 'Le Parcours Alpha est une série de rencontres conviviales pour explorer les bases de la foi chrétienne. Chaque soirée commence par un repas partagé, suivi d\'une courte vidéo abordant une question fondamentale : Qui est Jésus ? Pourquoi prier ? Comment lire la Bible ?',
        alphaContent: {
          format: 'Après la vidéo, place aux échanges en petits groupes dans un climat de confiance et de respect. Aucune question n\'est taboue, aucune réponse n\'est imposée. C\'est un espace libre pour chercher, douter, questionner.',
          pour_qui: 'Alpha s\'adresse à tous : curieux, en recherche spirituelle, ou simplement désireux de rencontrer d\'autres personnes. Un week-end permet d\'approfondir la découverte de l\'Esprit Saint.',
          contact: 'Les prochaines sessions démarrent en janvier et septembre. Contactez le secrétariat pour vous inscrire.'
        }
      },
      { 
        title: 'Catéchuménat', 
        description: 'Pour adultes souhaitant le baptême', 
        icon: ChristianCross,
        modalTitle: 'Le Catéchuménat des Adultes',
        modalDescription: 'Le catéchuménat accompagne les adultes qui désirent recevoir le baptême, la confirmation ou l\'eucharistie. C\'est un cheminement personnel et communautaire qui s\'étend généralement sur deux années, au rythme de chacun.',
        alphaContent: {
          format: 'Le parcours comprend des temps de formation sur la foi chrétienne, des rencontres régulières avec un accompagnateur, et une participation progressive à la vie de la communauté paroissiale. Les grandes étapes sont célébrées lors des messes dominicales.',
          pour_qui: 'Vous n\'avez jamais été baptisé ? Vous souhaitez confirmer votre foi d\'adulte ? Le catéchuménat vous accueille avec joie, quels que soient votre âge et votre histoire. Les sacrements sont généralement célébrés lors de la Vigile Pascale.',
          contact: 'Prenez contact avec le secrétariat ou le Père curé pour un premier entretien sans engagement.'
        }
      },
      { 
        title: 'Recommençants', 
        description: 'Renouer avec la foi', 
        icon: Heart,
        modalTitle: 'Les Recommençants',
        modalDescription: 'Vous avez été baptisé enfant mais vous vous êtes éloigné de l\'Église ? La vie vous a conduit sur d\'autres chemins et aujourd\'hui vous ressentez l\'appel de revenir ? Le groupe des Recommençants est fait pour vous.',
        alphaContent: {
          format: 'Dans un climat fraternel et sans jugement, nous proposons des rencontres régulières pour redécouvrir les fondements de la foi, échanger sur vos questions et vos doutes, et retrouver le chemin de la prière et des sacrements.',
          pour_qui: 'Ce parcours s\'adresse aux adultes baptisés qui souhaitent renouer avec leur foi, qu\'ils aient reçu ou non leur première communion et leur confirmation. C\'est aussi l\'occasion de préparer ces sacrements si vous ne les avez pas encore reçus.',
          contact: 'Chaque parcours est personnalisé selon votre histoire. N\'hésitez pas à contacter le secrétariat pour en parler.'
        }
      },
    ]
  },
  groupes: {
    title: 'Groupes de Partage et de Prière',
    subtitle: 'Fraternités & groupes de prière',
    description: 'Échanger, prier et grandir ensemble autour de la Parole.',
    icon: Users,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/i4j1hof6_Groupes-partage.png',
    items: [
      { 
        title: 'Fraternités', 
        description: 'Partage de la Parole et de la vie', 
        icon: Users,
        linkTo: '/entraide#content'
      },
      { 
        title: 'Croire Aujourd\'hui ?', 
        description: 'Échanger sur la foi et nos questions', 
        icon: MessageCircle,
        modalTitle: 'Croire en Dieu aujourd\'hui ?',
        modalDescription: 'Notre société vit des temps de questionnements profonds. Est-il réaliste de croire en Dieu aujourd\'hui ? Comment, si Dieu existe, permet-il toutes les horreurs commises en son nom ?',
        groupeContent: {
          description: 'Ces questions (et beaucoup d\'autres) sont légitimes et doivent être explorées. C\'est pourquoi un petit groupe de chrétiens locaux invite les personnes que la réalité de Dieu interroge à échanger pour chercher des réponses.',
          invitation: 'Partageons avec vous nos points de vue, nos expériences, notre espérance. Il n\'y aucun autre prérequis, ni d\'âge ni de baptême, que celui de vouloir s\'interroger sur Dieu.',
          horaires: [
            'Nous nous réunissons dans l\'église de Deyme, le premier jeudi du mois (20h-22h)'
          ],
          contact: 'croireaujourdhui@gmail.com'
        }
      },
      { 
        title: 'Veillées de Louange', 
        description: 'À la Miséricorde Divine', 
        icon: Music,
        modalTitle: 'Veillées de Louange à la Miséricorde Divine',
        modalDescription: '« Je bénirai le Seigneur en tout temps, sa louange sans cesse à mes lèvres »',
        groupeContent: {
          description: 'Un groupe de paroissiens organise depuis 2022 des veillées de prière et de louange sur notre paroisse, quelques samedis soir par an, à 20h30 à l\'église de Labège.',
          spiritualite: 'Toujours en lien avec la Miséricorde divine et le message du Christ délivré à Ste Faustine (1905-1938), ces veillées sont pour tous l\'occasion :',
          points: [
            'De faire l\'expérience de la rencontre personnelle avec le Christ',
            'De prier',
            'De manifester notre foi dans la joie, à travers la louange, les chants et la musique, l\'écoute de la Parole sous l\'inspiration de l\'Esprit Saint !'
          ],
          mission: 'Ouvertes à tous sans limite d\'âge, venez, voyez … et repartez vivifiés !',
          paragraphes: [
            'Des intentions de prières peuvent être déposées à chaque veillée en toute confidentialité. Elles sont ensuite confiées aux sœurs Clarisses de Toulouse qui les portent dans leurs prières les jours suivants.',
            'Un prêtre est également présent pour proposer le sacrement de réconciliation (qui permet d\'expérimenter pleinement la Miséricorde du Seigneur), ou simplement pour un temps d\'échange personnalisé.'
          ],
          invitation: 'Si par ailleurs vous souhaitez vous joindre à nous pour animer ces veillées, pour un soir ou davantage, vous êtes les bienvenus !! (musiciens, chanteurs, techniciens sons et lumière …) Nous vous accueillerons avec joie, dans la simplicité et la fraternité, le tout sans engagement !',
          contact: 'louange.notredamedautan@gmail.com',
          citations: [
            '« Je ne suis qu\'Amour et Miséricorde (…) L\'âme qui fait confiance à ma Miséricorde est la plus heureuse car je prends Moi-même soin d\'elle. »',
            '« Qu\'aucune âme n\'ait peur de s\'approcher de Moi, même si ses péchés sont comme l\'écarlate » — Petit Journal, Message de Jésus à Ste Faustine'
          ]
        }
      },
      { 
        title: 'Prière des Mères', 
        description: 'Prier ensemble pour nos enfants', 
        icon: Heart,
        modalTitle: 'La Prière des Mères',
        modalDescription: 'Lancée en 1995, la Prière des Mères s\'adresse et soutient toutes les mères qui désirent prier ensemble pour leurs enfants, petits-enfants et tous les enfants du monde.',
        groupeContent: {
          description: 'Depuis le mouvement de la Prière des Mères a fait des émules. Dans le monde entier, des groupes de mamans se réunissent, une fois par semaine, pour prier pour leurs enfants et ceux du monde.',
          spiritualite: 'Cette prière est basée sur la certitude que Dieu nous aime et sur notre confiance en Lui et en son action dans nos vies. Sa spiritualité est celle de l\'abandon et du lâcher prise.',
          citation: 'Demandez et vous recevrez ! Les prières sont toutes simples mais les grâces nombreuses !',
          horaires: [
            'Le mardi à 9h30 à la Maison de la Fraternité à Castanet',
            'Le lundi à 10h30 chez une paroissienne'
          ]
        }
      },
      { 
        title: 'La Prière du Chapelet', 
        description: 'Une prière simple à l\'école de Marie', 
        icon: Star,
        modalTitle: 'La Prière du Chapelet',
        modalDescription: 'Le chapelet, une prière toute simple à l\'école de Marie : En contemplant, avec Marie, les moments de la vie de Jésus, ce que nous appelons « les mystères », nous comprenons mieux ce que Dieu fait pour nous. Nous y associons des intentions de prière que nous confions à Marie.',
        groupeContent: {
          citation: '« Accrochez-vous au chapelet comme la plante grimpante s\'accroche à l\'arbre. Sans Notre-Dame, nous ne pouvons pas tenir ! » — Sainte Teresa de Calcutta',
          mysteres: [
            { titre: 'Les 5 mystères joyeux', contenu: 'L\'annonciation, la visitation, la nativité, la présentation au temple, le recouvrement au temple.' },
            { titre: 'Les 5 mystères lumineux', contenu: 'Le baptême de Jésus, les noces de Cana, l\'annonce du royaume, la transfiguration, la cène.' },
            { titre: 'Les 5 mystères douloureux', contenu: 'L\'agonie de Jésus, la flagellation, le couronnement d\'épines, le portement de la croix, la crucifixion.' },
            { titre: 'Les 5 mystères glorieux', contenu: 'La résurrection, l\'ascension, la pentecôte, l\'assomption, le couronnement de Marie.' }
          ],
          explication: 'Un chapelet comporte 5 « dizaines » correspondant à une série de mystères. Le rosaire est un ensemble de chapelets regroupant 20 mystères.',
          rejoindre: 'Concrètement, vous pouvez rejoindre celles et ceux qui se retrouvent pour prier le chapelet :',
          antennes: [
            'Antenne Castanet',
            'Antenne Saint-Orens'
          ]
        }
      },
      { 
        title: 'Les Équipes du Rosaire', 
        description: 'Un mouvement missionnaire autour de chez soi', 
        icon: Users,
        modalTitle: 'Les Équipes du Rosaire',
        modalDescription: 'Créées en 1955, les équipes du Rosaire sont un Mouvement d\'Apostolat des Laïcs reconnu en 1967 par les évêques de France et en 1972 par l\'Ordre des Prêcheurs (Dominicains).',
        groupeContent: {
          principe: 'Leur principe est simple : regrouper des personnes pour former une équipe de prière. Chaque équipe a pour champ d\'action son quartier, sa rue, son immeuble ou son village.',
          mission: 'C\'est donc un mouvement missionnaire… autour de chez soi ! Un mouvement pour vivre l\'Évangile avec Marie !',
          temps_priere: [
            { titre: 'Chaque mois', contenu: 'La prière ensemble "à la maison", chez l\'un ou l\'autre des membres de l\'équipe, pour méditer la Parole de Dieu en s\'appuyant sur le feuillet mensuel "Le Rosaire en équipe".' },
            { titre: 'Chaque jour', contenu: 'La prière personnelle, méditation d\'un mystère de la vie de Jésus-Christ en lien avec les autres membres des équipes, grâce au "Livret de Prière Quotidienne".' }
          ],
          antennes: [
            'Antenne Saint-Orens',
            'Antenne Castanet'
          ],
          url: 'https://equipes-rosaire.org/'
        }
      },
    ]
  },
  meditation: {
    title: 'Méditation Chrétienne',
    subtitle: 'Silence & prière',
    description: 'Entrer dans le silence et la prière contemplative.',
    icon: Sparkles,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/v8c5x8z1_Meditation.png',
    items: [
      { 
        title: 'Méditation silencieuse', 
        description: 'Temps de silence hebdomadaire', 
        icon: Sparkles,
        modalTitle: 'Le Silence en Partage : Un Espace pour Soi',
        modalDescription: 'Dans le tourbillon de nos vies quotidiennes, où trouver un refuge pour simplement respirer ? Notre église vous ouvre ses portes pour une parenthèse de paix : une invitation à la méditation silencieuse.',
        meditationContent: {
          paragraphes: [
            'Ici, sous les voûtes séculaires, loin du bruit de la ville et du flux des notifications, le temps semble s\'arrêter. Ce n\'est ni un office, ni une activité dirigée, mais une proposition de liberté. Que vous soyez habitué à la prière, en quête de sérénité ou simplement désireux de faire une pause dans votre journée, cet espace est le vôtre.',
            'Venez comme vous êtes, sans attente ni jugement. Laissez le silence de la pierre et la lumière des vitraux vous envelopper. Dans ce face-à-face avec vous-même, le calme devient un chemin vers l\'essentiel et, pour ceux qui le désirent, un espace de rencontre intérieure.'
          ],
          conclusion: 'Poussez la porte, installez-vous quelques minutes ou une heure, et retrouvez le goût du silence.',
          boutonClochers: true
        }
      },
      { 
        title: 'Lectio Divina', 
        description: 'Méditation de la Parole', 
        icon: BookOpen,
        modalTitle: 'La Lectio Divina',
        modalDescription: 'La Lectio Divina (littéralement « lecture divine » ou « lecture sainte ») est une pratique ancestrale de lecture méditative de la Bible. Elle ne consiste pas à étudier le texte de manière intellectuelle ou historique, mais à l\'écouter comme une parole vivante adressée personnellement au lecteur.',
        meditationContent: {
          intro: 'Popularisée par les moines (notamment l\'ordre des Bénédictins), elle se décompose traditionnellement en quatre étapes clés.',
          piliers: {
            titre: 'Les 4 piliers de la Lectio Divina',
            sousTitre: 'Imaginez ces étapes comme les phases d\'un repas spirituel :',
            etapes: [
              { nom: 'Lectio (La lecture)', description: 'Vous lisez le passage biblique lentement, plusieurs fois. On cherche ici à comprendre ce que le texte dit en lui-même. C\'est le moment de « mordre » dans le texte.' },
              { nom: 'Meditatio (La méditation)', description: 'Vous ruminez une phrase ou un mot qui a retenu votre attention. Pourquoi cela résonne-t-il en vous aujourd\'hui ? C\'est le moment de la « mastication ».' },
              { nom: 'Oratio (La prière)', description: 'Le texte devient un dialogue. Vous répondez à ce que vous avez entendu par une prière spontanée : merci, pardon, s\'il te plaît... C\'est le moment de « savourer ».' },
              { nom: 'Contemplatio (La contemplation)', description: 'Vous restez simplement dans le silence et la présence de Dieu, au-delà des mots. C\'est la « digestion » et le repos.' }
            ]
          },
          pourquoi: {
            titre: 'Pourquoi la pratiquer ?',
            description: 'Contrairement à une lecture rapide de l\'actualité ou d\'un roman, la Lectio Divina vise à :',
            points: [
              'Ralentir le rythme dans un monde ultra-connecté.',
              'Trouver un sens personnel dans des textes anciens.',
              'Développer l\'intériorité et l\'écoute de soi.'
            ]
          },
          anecdote: 'Au XIIe siècle, un moine nommé Guigues le Chartreux a comparé ces quatre étapes à une échelle montant de la terre vers le ciel.',
          commencer: {
            titre: 'Comment commencer ?',
            description: 'Pas besoin d\'être un expert en théologie. Voici une méthode simple pour essayer :',
            conseils: [
              'Choisissez un texte court (un Psaume ou un passage des Évangiles).',
              'Trouvez un endroit calme et fixez un temps (10 à 15 minutes suffisent).',
              'Gardez un carnet pour noter le mot ou la phrase qui vous a "mordu" le cœur.'
            ]
          }
        }
      },
      { 
        title: 'Adoration', 
        description: 'Temps devant le Saint-Sacrement', 
        icon: Star,
        modalTitle: 'L\'Adoration Eucharistique',
        modalDescription: '« Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos… car je suis doux et humble de cœur, et vous trouverez le repos pour votre âme. » (Mt 11, 28-29)',
        meditationContent: {
          paragraphes: [
            'C\'est ce que le Seigneur nous invite à vivre dans l\'adoration eucharistique.',
            'Prolongement de la célébration de la messe dans laquelle elle s\'enracine, l\'adoration eucharistique devient dialogue intime avec le Christ Jésus qui nous a promis : « Moi, je suis avec vous jusqu\'à la fin des temps ! »',
            'L\'Eucharistie est un signe de cette présence. Exposée sur l\'autel, cette présence eucharistique est offerte à notre adoration.',
            'Cette rencontre avec Jésus Eucharistie est source de nombreuses grâces pour nous, nos familles, notre paroisse…'
          ],
          horaires: [
            { lieu: 'À Castanet - Église St Gervais et Saint Protais', horaire: 'Le vendredi de 19h à 20h (après la messe de 18h30)' },
            { lieu: 'À Saint-Orens - Église St Orens', horaire: 'Du lundi au jeudi de 11h à 12h (avant la messe de midi) et le vendredi de 19h à 20h (après la messe de 18h30)' }
          ]
        }
      },
    ]
  },
  ressources: {
    title: 'Ressources Spirituelles',
    subtitle: 'Pour nourrir sa foi',
    description: 'Livres, médias et outils pour approfondir votre vie spirituelle.',
    icon: BookOpen,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/h90bs88d_Ressources.png',
    items: [
      { 
        title: 'Librairie religieuse', 
        description: 'Livres, chapelets, icônes', 
        icon: BookOpen,
        modalTitle: 'Siloë-Carmel : Le nouveau souffle de la librairie chrétienne',
        modalDescription: 'Bonne nouvelle pour Toulouse ! La librairie Siloë-Carmel comble enfin le manque d\'un lieu dédié à la culture catholique et chrétienne dans notre ville. Plus qu\'une simple boutique, c\'est un véritable espace de mission et d\'échange au service de tous.',
        features: [
          { title: 'Un lieu de débat', description: 'Des ouvrages variés en phase avec les orientations pastorales de notre diocèse.' },
          { title: 'Un partenaire vivant', description: 'Présence d\'auteurs, conférences et participation aux temps forts (comme le prochain rassemblement de la Pentecôte).' },
          { title: 'Une offre complémentaire', description: 'En lien fraternel avec la Maison Mathieu et l\'Artisanat Monastique pour enrichir la culture locale.' }
        ],
        quote: 'Un lieu de culture et de foi pour faire rayonner l\'Évangile au cœur de la cité.',
        horaires: 'Du mardi au vendredi de 10h à 12h30 et de 14h à 19h • Samedi de 9h à 12h30 et de 14h à 18h',
        url: 'https://librairiesiloecarmeltoulouse.com/'
      },
      { 
        title: 'Médiathèque', 
        description: 'Films, séries, revues', 
        icon: Tv,
        modalTitle: 'Médiathèque - Films, Séries & Documentaires',
        modalDescription: 'Découvrez notre sélection de films, séries et documentaires pour nourrir votre foi et votre réflexion spirituelle.',
        sections: [
          {
            title: 'Séries incontournables',
            icon: 'tv',
            items: [
              { name: 'The Chosen (Saison 5)', description: 'La série phénomène sur la vie de Jésus continue. La saison 5, centrée sur la Semaine Sainte à Jérusalem, est sortie fin 2025 et arrive sur les écrans français (CSTAR, DVD). C\'est l\'outil d\'évangélisation n°1 actuel.' },
              { name: 'Testament : L\'histoire de Moïse', description: 'Netflix, 2024 - Une mini-série documentaire et dramatique qui retrace la vie du prophète avec un regard historique et spirituel.' },
              { name: 'House of David', description: '2025 - Une nouvelle série épique retraçant l\'ascension du roi David, produite par Jon Erwin.' }
            ]
          },
          {
            title: 'Films récents & à venir (2025-2026)',
            icon: 'film',
            items: [
              { name: 'David', description: 'Sortie France : 18 mars 2026 - Un film d\'animation épique d\'Angel Studios (ceux qui ont fait The Chosen). Un projet magnifique sur la vie du jeune berger devenu roi.' },
              { name: 'Je suis l\'Immaculée Conception', description: 'Sortie : 8 décembre 2025 - Un film de Saje Distribution parfait pour les fêtes de fin d\'année, revenant sur le message de Lourdes.' },
              { name: 'Nefarious', description: 'Sortie France : 28 mars 2025 - Un thriller spirituel percutant sur le combat entre le bien et le mal, sous la forme d\'un face-à-face entre un psychiatre et un condamné à mort possédé.' },
              { name: 'Sacré Cœur', description: '2025 - Un film dédié à la dévotion au Cœur de Jésus, actuellement mis en avant dans les réseaux de distribution chrétiens.' }
            ]
          },
          {
            title: 'Documentaires & Cinéma d\'auteur',
            icon: 'award',
            items: [
              { name: 'Les 21 : La puissance de la foi', description: 'Prix Père Jacques Hamel 2025 - Un documentaire bouleversant sur le courage des 21 martyrs coptes en Libye.' },
              { name: 'Sacerdoce', description: '2023/2024 - Un documentaire magnifique de Damien Boyer qui suit cinq prêtres dans leur quotidien. Idéal pour parler des vocations.' },
              { name: 'L\'Évangile de la Révolution', description: 'Prix "Croire au cinéma" 2026 - Une œuvre remarquée pour son approche humaniste et spirituelle.' }
            ]
          }
        ]
      },
      { 
        title: 'Sites recommandés', 
        description: 'Ressources en ligne', 
        icon: Globe,
        modalDescription: 'Une sélection de sites web de qualité pour accompagner votre cheminement spirituel et celui de votre famille.',
        items: [
          {
            name: 'Théobule',
            subtitle: 'Le chouchou des enfants (et des parents)',
            concept: 'Des vidéos courtes où des enfants commentent la Parole de Dieu, complétées par des dessins animés sur les textes bibliques.',
            why: 'C\'est très bien produit, joyeux, et visuellement très propre. C\'est parfait pour l\'éveil à la foi et le primaire.',
            url: 'https://www.theobule.org'
          },
          {
            name: 'KT42',
            subtitle: 'La "caverne d\'Alibaba" des catéchistes',
            concept: 'Un blog immense qui répertorie des milliers de ressources (jeux, montages vidéo, textes, bricolages).',
            why: 'C\'est ultra-complet. C\'est la boîte à outils idéale pour les animateurs de Catéchisme et d\'Aumônerie.',
            url: 'https://www.kt42.fr'
          },
          {
            name: 'Idées-KT',
            subtitle: 'L\'approche ludique et créative',
            concept: 'Des propositions très concrètes pour "faire" du KT autrement : jeux de l\'oie bibliques, escape games spi, bricolages.',
            why: 'Très utile pour les Mouvements de jeunesse ou le Patronage.',
            url: 'https://www.idees-kt.fr'
          },
          {
            name: 'SNCC',
            subtitle: 'La référence officielle',
            concept: 'Le site du Service National de la Catéchèse et du Catéchuménat de la Conférence des Évêques de France.',
            why: 'Pour le Catéchuménat des adultes. C\'est ici que vous trouverez les orientations officielles et des articles de fond très sérieux.',
            url: 'https://catechese.catholique.fr'
          },
          {
            name: 'ThéoDom',
            subtitle: 'Pour les ados et adultes (Format vidéo)',
            concept: 'Des mini-séries de vidéos de 5 minutes pour expliquer les grands concepts de la foi (Le Credo, les Sacrements, la Bible).',
            why: 'C\'est moderne, percutant et très bien monté. Idéal pour approfondir sa foi.',
            url: 'https://www.theodom.org'
          }
        ]
      },
      { 
        title: 'Podcasts', 
        description: 'Émissions spirituelles', 
        icon: Radio,
        modalTitle: 'Podcasts Spirituels',
        modalDescription: 'Écoutez des podcasts spirituels pour nourrir votre foi au quotidien.',
        podcasts: [
          {
            name: 'La Bible en un an',
            description: 'Le Frère Paul Adrien vous fait découvrir la Bible chaque jour.',
            url: 'https://open.spotify.com/show/0y98FVWtmiUFDw5eOMw5hI?si=fff43db9eff94ab4'
          },
          {
            name: 'PadreBlog',
            description: '3 prêtres pour vous aider à trouver la vraie vie.',
            url: 'https://open.spotify.com/show/5HOEUv0F3rc4ONsOsQ0N51?si=87c3a253304a4ef1'
          }
        ]
      },
    ]
  },
  ecoute: {
    title: 'Service d\'Écoute Louis et Zélie',
    subtitle: 'Présence bienveillante',
    description: 'Une présence bienveillante pour ceux qui traversent une épreuve.',
    icon: Heart,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/ges0bdnn_Service-ecoute.png',
    items: [
      { title: 'Écoute individuelle', description: 'Rendez-vous confidentiels', icon: UserCircle },
      { title: 'Accompagnement', description: 'Soutien dans les épreuves', icon: HeartHandshake },
      { title: 'Orientation', description: 'Vers des professionnels si besoin', icon: Compass },
    ]
  },
  malades: {
    title: 'Visite des Malades (SEM)',
    subtitle: 'Service évangélique',
    description: 'Porter la présence du Christ auprès des personnes malades et âgées.',
    icon: Stethoscope,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/b1uzu3oc_Visite-malades.png',
    semContent: {
      intro: 'Le Service Évangélique des Malades (SEM) a pour vocation de visiter et accompagner les personnes malades ou âgées qui sont à leur domicile ou en maison de retraite. Il est au service de toutes les personnes malades qui le désirent, quels que soient leur âge, leur maladie ou leur handicap, leur foi.',
      engagements: {
        title: 'Les membres des équipes du SEM s\'engagent à :',
        items: [
          'Visiter et accompagner les personnes malades régulièrement pour leur apporter le réconfort d\'une présence amicale, d\'une écoute bienveillante.',
          'Un soutien pour vivre les difficultés de la maladie, de la souffrance, de la solitude...',
          'Les maintenir en lien avec ce qui se passe dans le monde, la cité, la paroisse...',
          'Les amener, avec tact et respect de leur liberté, à s\'ouvrir au Seigneur, à cheminer avec Lui dans la prière et, s\'ils le demandent, à Le recevoir dans les sacrements.',
          'Rendre attentive la communauté chrétienne à la présence des personnes malades, être « éveilleurs » pour rendre d\'autres membres attentifs aux malades.'
        ]
      },
      contacts: [
        { lieu: 'Castanet', phone: '07 68 88 92 11' },
        { lieu: 'Saint-Orens', phone: '06 87 43 72 30' }
      ],
      aumoneries: {
        title: 'Aumôneries des cliniques et des hôpitaux',
        description: 'Voir toutes les coordonnées sur le site du diocèse de Toulouse',
        url: 'https://toulouse.catholique.fr/diocese/services/diaconie/aumoneries-hopitaux/'
      }
    },
    items: [
      { title: 'Visites à domicile', description: 'Auprès des personnes isolées', icon: Home },
      { title: 'Visites en EHPAD', description: 'Présence en maison de retraite', icon: Building2 },
      { title: 'Communion aux malades', description: 'Porter l\'Eucharistie', icon: Heart },
      { title: 'Sacrement des malades', description: 'Sur demande', icon: ChristianCross },
    ]
  },
  entraide: {
    title: 'Entraide et Solidarité',
    subtitle: 'Vivre la charité',
    description: 'Vivre la charité du Christ au service des plus fragiles.',
    icon: HandHeart,
    heroImage: 'https://customer-assets.emergentagent.com/job_5e9a982a-920d-4533-b39d-5b30481bb0da/artifacts/qcuurzop_Entraide.png',
    heroPosition: 'object-top',
    items: [
      { 
        title: 'Secours Catholique', 
        description: 'Aide matérielle et accompagnement', 
        icon: HandHeart,
        modalTitle: 'Secours Catholique',
        modalDescription: 'Le Secours Catholique, service d\'Eglise, a pour mission d\'accueillir, d\'écouter et de soutenir les personnes en fragilité et de proposer à tous une relation fraternelle.',
        entraideContent: {
          intro: 'Deux équipes sont présentes sur notre secteur paroissial. Elles travaillent en étroite collaboration avec les services sociaux pour des aides d\'urgence et répondent aux diverses demandes d\'écoute et d\'accompagnement sur rendez-vous.',
          teams: [
            {
              name: 'Équipe de Castanet',
              description: 'Anime le vendredi après-midi, de 14h à 17h30 à la Maison de la Fraternité, un temps d\'accueil, d\'échange, de partage, autour de diverses activités : jeux de société, tricot, chant, bavardage… pour tous ceux qui veulent vivre un moment convivial et rompre leur solitude.',
              phone: '06 70 45 31 25',
              responsables: 'Agnès DESPLAS, Danièle AGUILAR'
            },
            {
              name: 'Équipe de Saint-Orens',
              description: 'Propose un accueil social sur rendez-vous, puis, au cas par cas, des aides aux familles, du soutien scolaire pour les enfants et adolescents, de l\'apprentissage du français pour adultes, ouvrant sur des ateliers d\'échanges culturels (visites, cuisine du monde, coutumes, rites…). L\'équipe propose aussi des temps conviviaux et des temps forts avec la paroisse.',
              phone: '06 78 69 92 42'
            }
          ],
          delegation: {
            name: 'Délégation Ariège-Garonne du Secours Catholique',
            address: '56 rue de Périole 31500 Toulouse',
            phone: '05 34 25 67 40'
          }
        }
      },
      { 
        title: 'Café Amitié', 
        description: 'Lieu de rencontre convivial', 
        icon: Coffee,
        modalTitle: 'Café Amitié',
        modalDescription: 'Ouvert à tous sans distinction aucune, le Café Amitié est un lieu d\'accueil, de dialogue et d\'écoute gratuite et désintéressée. Au-delà d\'une boisson offerte, chacun peut y être écouté et partager un moment d\'amitié. Une quinzaine d\'accueillant(e)s se relaie en binôme pour assurer les permanences.',
        quote: 'Au Café Amitié, tout ce qui s\'y passe nous dépasse. Au-delà des efforts et de la bonne volonté, c\'est vraiment l\'amitié au sens évangélique qui circule et qui produit du fruit jour après jour.',
        entraideContent: {
          lieu: 'Maison de la Fraternité, 10 avenue de Toulouse à Castanet-Tolosan',
          permanences: [
            'Mardi de 9h45 à 11h30',
            'Jeudi de 9h45 à 11h30'
          ],
          contact: 'Mireille Pellerin & Hélène Echavidre'
        }
      },
      { 
        title: 'Hospitalité de Lourdes', 
        description: 'Pèlerinages pour personnes malades', 
        icon: Palmtree,
        modalTitle: 'L\'Hospitalité de Lourdes',
        modalDescription: 'L\'Hospitalité diocésaine de Toulouse est un groupement de bénévoles chrétiens engagés dans l\'accueil et l\'accompagnement à Lourdes, de pèlerins âgés ou souffrant de handicap.',
        entraideContent: {
          mission: 'Ces personnes, appelées "hospitaliers" se veulent accueillantes, tout simplement, afin de permettre aux pèlerins du sanctuaire de vivre dans les meilleures conditions leur pèlerinage à la rencontre de Marie, dans les pas de Bernadette.',
          temoignage: 'Chaque année, tous reviennent heureux et enrichis de ces contacts : « On a beaucoup à apprendre de chaque personne que l\'on rencontre », rapporte une hospitalière. Alors pourquoi pas vous ?',
          contact: 'Si vous souhaitez les rejoindre contactez Bénédicte Picauron ou Brigitte Collet de l\'antenne de Castanet-Tolosan.',
          url: 'https://hospidetoulouse.wixsite.com/tlse'
        }
      },
      { 
        title: 'Famille Bartimée', 
        description: 'Fraternité avec les personnes en précarité', 
        icon: HeartHandshake,
        modalTitle: '"Bartimée" : Un nouveau chemin de fraternité',
        modalDescription: 'La Famille Bartimée est un service de l\'ensemble paroissial Notre Dame d\'Autan. Tirant son nom de la rencontre du Christ avec l\'aveugle Bartimée (St Marc 10,48), il rassemble des personnes seules ou en familles, qui ont connu ou qui connaissent encore exclusion, précarité, solitude.',
        entraideContent: {
          intro: 'Ouvert à tous, il accueille croyants et non croyants. D\'autres personnes cheminent à leurs côtés appelés « compagnons ». Il s\'inspire de la pensée du P. Wresinski, fondateur du mouvement ATD Quart Monde.',
          projet: {
            title: 'Notre projet ?',
            description: 'Vivre la fraternité : au cœur de la communauté paroissiale, avec elle, en lien avec le Café Amitié, le Secours Catholique et les services paroissiaux.',
            objectifs: [
              'Rompre avec la solitude et la « culture du rejet »',
              'Nous Rassembler, sortir de la honte, vivre l\'amitié, le respect, la tolérance',
              'Être attentif et soucieux du plus blessé par la vie, être à sa recherche',
              'Retrouver sa place et sa dignité à travers le partage',
              'Réaliser des projets avec et à partir des plus fragilisés, apprendre d\'eux',
              'Nous laisser transformer et grandir ensemble dans la foi',
              'Être un espace de vie fraternelle pour ceux et celles en demande de sacrements',
              'Entendre leur parole et agir pour qu\'elle soit prise en compte dans l\'Église et dans la société',
              'Participer à la vie de notre paroisse, de l\'Église, de nos villes'
            ]
          },
          temoignage: '« Quand je vais au dimanche de Bartimée, je me ressource, je me sens bien, je vois d\'autres gens, ils m\'apaisent, ça m\'a enlevé une partie de ma timidité, ça m\'a ouvert aux autres, et ça me donne de la confiance envers les autres. » EB',
          comment: {
            title: 'Comment ?',
            activites: [
              { nom: 'Le Dimanche de Bartimée', description: '1 fois/mois : Messe dominicale, repas partagé, échanges autour de textes, ou de la Parole de Dieu, ateliers' },
              { nom: 'Groupe « J\'ai pas compris »', description: 'De 17h à 19h en semaine, avec un partage autour d\'une phrase de la Bible proposée par Bartimée ouvert à tous' },
              { nom: 'Se ressourcer et être en fête', description: 'Sorties culturelles, marche, journées de détente, séjour l\'été. Rencontres d\'autres groupes en France, pèlerinages avec le Réseau St Laurent' }
            ]
          },
          contacts: [
            { nom: 'Martine', phone: '06 89 15 42 03', description: 'Pour vous informer, connaître la Famille Bartimée, participer' },
            { nom: 'Hélène', phone: '06 81 43 70 56', description: 'Pour soutenir financièrement (association "Les Amis de Bartimée")' }
          ],
          url: 'https://www.helloasso.com/associations/les-amis-de-bartimee',
          citationEveque: '« Les plus petits, les plus pauvres, les plus handicapés, sont rarement mis en avant. Il me semble important qu\'ils acquièrent une visibilité, qu\'ils aient une vraie place dans la communauté. J\'encourage toutes les paroisses et autres communautés chrétiennes à faire de la place aux plus petits, aux marginaux, aux « sans-voix ». Les pauvres ou les étrangers nous dérangent, mais c\'est un heureux dérangement évangélique. » - Mgr Guy de Kerimel, archevêque de Toulouse, 2023'
        }
      },
      { 
        title: 'Lourdes Cancer Espérance', 
        description: 'Soutien aux malades du cancer', 
        icon: Heart,
        modalTitle: 'Lourdes Cancer Espérance',
        modalDescription: 'Lourdes Cancer Espérance s\'adresse aux personnes concernées par la maladie, à travers leur histoire personnelle ou celle d\'un proche. Les délégués œuvrent pour rompre l\'isolement des malades et de leurs familles. Le temps fort de l\'association est le rassemblement annuel de septembre à Lourdes.',
        entraideContent: {
          actions: 'Les journées d\'amitié, les contacts téléphoniques, les visites en milieu hospitalier et à domicile, les courriers… sont autant de gestes qui permettent de construire cette « grande famille » de LCE. Tout au long de l\'année, la fraternité et la foi aident à cultiver l\'espérance.',
          aide: 'Tout au long de l\'année, l\'association apporte une aide matérielle spécifique aux personnes en difficulté. De la même manière, tout est mis en œuvre pour répondre aux demandes des pèlerins, et les frais de transport et d\'hébergement peuvent être pris en charge par l\'association afin d\'aider les personnes dans le besoin.',
          revue: 'Une revue trimestrielle permet de rendre compte de la vie de l\'association, et plusieurs délégations ont leur propre bulletin de liaison.',
          temoignage: '« LCE est un soleil dans la vie des malades. »',
          contact: 'Responsable pour l\'ensemble paroissial Saint-Orens : Geneviève Gamel'
        }
      },
    ]
  },
  'equipe-detail': {
    title: 'Détail membre',
    subtitle: '',
    description: '',
    icon: Users,
    items: []
  },
  'clocher-detail': {
    title: 'Détail clocher',
    subtitle: '',
    description: '',
    icon: Church,
    items: []
  }
};

const ContentPage = ({ section }) => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const config = contentConfig[section];

  if (!config) {
    return (
      <div className="min-h-screen bg-paper dark:bg-slate-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-4">Page en construction</h1>
          <Link to="/" className="text-gold hover:text-gold-dark">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid={`content-page-${section}`}>
      <SEO title={config.title} description={`${config.title} - ${config.description} | Paroisse Notre Dame d'Autan`} />
      {/* Hero Section - if heroImage exists */}
      {config.heroImage && (
        <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
                loading="lazy"
                src={config.heroImage}
              alt={config.title}
              className={`w-full h-full object-cover ${config.heroPosition || 'object-center'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
          </div>

          {/* Content - with padding to avoid search button overlap */}
          <div className="relative z-10 text-center text-white px-4 pt-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4">
              {config.title}
            </h1>
            {config.subtitle && (
              <p className="text-gold-light font-medium mb-4 text-lg">{config.subtitle}</p>
            )}
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              {config.description}
            </p>
          </div>

        <SocialIcons />
      </section>
      )}

      {/* Scroll to Agenda Button - Only for funerailles */}
      {section === 'funerailles' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-20">
          <div className="flex justify-center">
            <button
              onClick={() => {
                const agendaSection = document.getElementById('funerals-agenda');
                if (agendaSection) {
                  agendaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <CalendarHeart className="w-5 h-5 mr-2" />
              Voir l'agenda des cérémonies
            </button>
          </div>
        </div>
      )}

      <FadeIn>
      <div id="content" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${section === 'funerailles' ? 'py-8' : 'py-16'}`}>
        {/* Header - only if no hero image */}
        {!config.heroImage && (
          <div className="text-center mb-14">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-lg">
              <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-slate-deep dark:text-slate-100 mb-3">
            {config.title}
          </h1>
          {config.subtitle && (
            <p className="text-gold font-medium mb-4">{config.subtitle}</p>
          )}
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>
        )}

        {/* SEM Content - Only for malades page */}
        {section === 'malades' && config.semContent && (
          <div className="mb-12 flex flex-col" style={{ gap: '3rem' }}>
            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {config.semContent.intro}
              </p>
            </div>

            {/* Engagements */}
            {config.semContent.engagements && (
              <div className="bg-gold/5 rounded-2xl p-8 border border-gold/20">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-4">
                  {config.semContent.engagements.title}
                </h3>
                <ul className="space-y-3">
                  {config.semContent.engagements.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-slate-600 dark:text-slate-400 dark:text-slate-400">
                      <span className="text-gold mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contacts bénévoles */}
            {config.semContent.contacts && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-6">
                  Contacter nos bénévoles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.semContent.contacts.map((contact, idx) => (
                    <div key={idx} className="flex items-center space-x-3 bg-slate-50 rounded-xl p-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-deep dark:text-slate-100 dark:text-slate-100">À {contact.lieu}</p>
                        <p className="text-gold font-medium">{contact.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aumôneries */}
            {config.semContent.aumoneries && (
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-3">
                  {config.semContent.aumoneries.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{config.semContent.aumoneries.description}</p>
                <a
                  href={config.semContent.aumoneries.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Voir les coordonnées
                </a>
              </div>
            )}
          </div>
        )}

        {/* Items Grid - Vignettes avec icônes */}
        {config.items && config.items.length > 0 && (
          <>
            {/* Special layout for entraide section (5 items: 2+2+1 on mobile, 3+2 on desktop) */}
            {section === 'entraide' ? (
              <div className="flex flex-wrap justify-center gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 mb-12">
                {config.items.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedResource(item);
                        setIsModalOpen(true);
                      }}
                      className="w-[calc(50%-0.75rem)] sm:w-auto group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 hover:border-gold/30 transition-all duration-300 text-left cursor-pointer"
                      data-testid={`item-card-${index}`}
                    >
                      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors mb-3 sm:mb-0">
                          <ItemIcon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base sm:text-lg text-slate-deep dark:text-slate-100 mb-1 group-hover:text-gold transition-colors break-words">
                            {item.title}
                          </h3>
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed break-words">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Standard layout for other sections */
              <div className={`flex flex-wrap justify-center gap-6 sm:grid ${
                ['liturgie', 'eveil', 'catechisme', 'aumonerie', 'ressources', 'malades'].includes(section) 
                  ? 'sm:grid-cols-2 lg:grid-cols-4' 
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              } mb-12`}>
            {config.items.map((item, index) => {
              const ItemIcon = item.icon;
              const isClickable = section === 'ressources' || section === 'alpha' || section === 'groupes' || section === 'meditation' || section === 'mouvements' || item.mejContent;
              const hasLink = item.linkTo;
              
              const cardContent = (
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors mb-3 sm:mb-0">
                    <ItemIcon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg text-slate-deep dark:text-slate-100 mb-1 group-hover:text-gold transition-colors break-words">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              );

              // If item has a link to another page
              if (hasLink) {
                return (
                  <Link
                    key={index}
                    to={item.linkTo}
                    className="w-[calc(50%-0.75rem)] sm:w-auto group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 hover:border-gold/30 transition-all duration-300 h-full"
                    data-testid={`item-card-${index}`}
                  >
                    {cardContent}
                  </Link>
                );
              }

              if (isClickable) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedResource(item);
                      setIsModalOpen(true);
                    }}
                    className="w-[calc(50%-0.75rem)] sm:w-auto group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 hover:border-gold/30 transition-all duration-300 text-left cursor-pointer h-full"
                    data-testid={`item-card-${index}`}
                  >
                    {cardContent}
                  </button>
                );
              }

              return (
                <div
                  key={index}
                  className="w-[calc(50%-0.75rem)] sm:w-auto group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 hover:border-gold/30 transition-all duration-300 h-full"
                  data-testid={`item-card-${index}`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
            )}
          </>
        )}

        {/* Detailed Content Section - for pages with detailed content like funerailles */}
        {config.detailedContent && section === 'funerailles' && (
          <div className="flex flex-col gap-10 mb-12">
            
            {/* Infos Utiles - Contacts & Offrande */}
            {(config.detailedContent.contacts || config.detailedContent.offrande) && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-[#93B5B7] to-[#7da4a6]">
                  <h2 className="font-serif text-xl text-white">Infos utiles</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {config.detailedContent.contacts && config.detailedContent.contacts.map((contact, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl p-5 text-center">
                        <p className="text-sm text-slate-500 mb-1">{contact.sector}</p>
                        <a 
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="text-slate-deep dark:text-slate-100 font-semibold text-lg flex items-center justify-center gap-2 hover:text-gold transition-colors"
                        >
                          <Phone className="w-5 h-5 text-gold" />
                          {contact.phone}
                        </a>
                      </div>
                    ))}
                    {config.detailedContent.offrande && (
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 text-center border border-slate-100 dark:border-slate-700 dark:border-slate-700">
                        <p className="text-sm text-slate-500 mb-1">Offrande à la paroisse</p>
                        <p className="text-2xl font-serif text-slate-deep dark:text-slate-100 dark:text-slate-100">180 €</p>
                      </div>
                    )}
                  </div>
                  {config.detailedContent.contactNote && (
                    <p className="text-slate-500 text-sm text-center mt-4 italic">
                      {config.detailedContent.contactNote}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Introduction */}
            {config.detailedContent.intro && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-[#93B5B7] to-[#7da4a6]">
                  <h2 className="font-serif text-xl text-white">Les obsèques à l'église</h2>
                </div>
                <div className="p-6">
                  {config.detailedContent.intro.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {config.detailedContent.contact && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-[#93B5B7] to-[#7da4a6]">
                  <h2 className="font-serif text-xl text-white">Prendre contact</h2>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {config.detailedContent.contact}
                  </p>
                </div>
              </div>
            )}

            {/* Equipe Tasks */}
            {config.detailedContent.equipeTitle && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-[#93B5B7] to-[#7da4a6]">
                  <h2 className="font-serif text-xl text-white">{config.detailedContent.equipeTitle}</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {config.detailedContent.equipeTasks.map((task, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gold mr-3 mt-1">•</span>
                        <span className="text-slate-600 dark:text-slate-400 dark:text-slate-400">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Important Notice */}
            {config.detailedContent.important && (
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start">
                  <span className="text-amber-600 text-xl mr-3">⚠️</span>
                  <p className="text-amber-800 leading-relaxed">
                    {config.detailedContent.important}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed Content Section - for other pages like eveil */}
        {config.detailedContent && section !== 'funerailles' && (
          <div className="mb-12 flex flex-col" style={{ gap: '3rem' }}>
            {/* Phone Contacts - First */}
            {config.detailedContent.contacts && (
              <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl p-8 border border-gold/20">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-6 text-center">
                  Numéros de contact pour les obsèques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {config.detailedContent.contacts.map((contact, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow-sm">
                      <p className="font-medium text-slate-deep dark:text-slate-100 mb-2">{contact.sector}</p>
                      <a 
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="text-gold hover:text-gold-dark text-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
                {config.detailedContent.contactNote && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm text-center italic">
                    {config.detailedContent.contactNote}
                  </p>
                )}
              </div>
            )}

            {/* Offrande - After contacts */}
            {config.detailedContent.offrande && (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {config.detailedContent.offrande}
                </p>
              </div>
            )}

            {/* Introduction */}
            {config.detailedContent.intro && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <div className="prose prose-slate max-w-none">
                  {config.detailedContent.intro.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {config.detailedContent.contact && (
              <div className="bg-gold/5 rounded-xl p-8 border border-gold/20">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {config.detailedContent.contact}
                </p>
              </div>
            )}

            {/* Equipe Tasks */}
            {config.detailedContent.equipeTitle && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-4">
                  {config.detailedContent.equipeTitle}
                </h3>
                <ul className="space-y-3">
                  {config.detailedContent.equipeTasks.map((task, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gold mr-3 mt-1">•</span>
                      <span className="text-slate-600 dark:text-slate-400 dark:text-slate-400">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Notice */}
            {config.detailedContent.important && (
              <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
                <div className="flex items-start">
                  <span className="text-amber-600 text-xl mr-3">⚠️</span>
                  <p className="text-amber-800 leading-relaxed">
                    {config.detailedContent.important}
                  </p>
                </div>
              </div>
            )}

            {/* Paragraphes descriptifs - pour Éveil à la Foi */}
            {config.detailedContent.paragraphes && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
                {config.detailedContent.paragraphes.map((para, idx) => (
                  <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Lieux et horaires - pour Éveil à la Foi */}
            {config.detailedContent.lieux && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-slate-deep dark:text-slate-100 text-center">
                  Rencontres 2025-2026
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {config.detailedContent.lieux.map((lieu, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] px-6 py-4">
                        <h4 className="font-serif text-lg text-white flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          À {lieu.ville}
                        </h4>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-start space-x-3">
                          <Clock className="w-5 h-5 text-[#93B5B7] mt-0.5 flex-shrink-0" />
                          <p className="text-slate-600 dark:text-slate-400 text-sm">{lieu.horaire}</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-[#93B5B7] mt-0.5 flex-shrink-0" />
                          <p className="text-slate-600 dark:text-slate-400 text-sm">{lieu.adresse}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 dark:border-slate-700">
                          <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">Dates</p>
                          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{lieu.dates}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Funerals Agenda - Only for funerailles section */}
        {section === 'funerailles' && (
          <div className="mb-16">
            <h2 id="funerals-agenda" className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-6 text-center scroll-mt-40">Agenda des célébrations</h2>
            <FuneralsAgenda />
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center mb-16">
          <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-4">Vous souhaitez en savoir plus ?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
            Contactez le secrétariat paroissial pour toute information complémentaire ou pour rejoindre une équipe.
          </p>
          <Link
            to="/secretariat"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contacter le secrétariat
          </Link>
        </div>

        {/* Citation biblique */}
        {biblicalQuotes[section] && (
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
            <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
              "{biblicalQuotes[section].quote}"
            </blockquote>
            <p className="text-gold font-medium">{biblicalQuotes[section].reference}</p>
          </div>
        )}
      </div>
      </FadeIn>

      {/* Resource Modal */}
      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedResource(null);
        }}
        resource={selectedResource}
      />
    </div>
  );
};

export default ContentPage;
