/**
 * Données centralisées des BD et chapitres
 */

export const comicsData = {
  bd1: {
    id: 'bd1',
    title: 'Détenu 278',
    author: 'FÉNIX',
    genre: 'Action',
    cover: '/assets/img/cover/detenu278-cover.jpg',
    description: '',
    chapters: {
      1: {
        title: 'Détenu 278',
        pages: [
          '/assets/pages/detenu278/001.jpg',
          '/assets/pages/detenu278/002.jpg',
          '/assets/pages/detenu278/003.jpg',
          '/assets/pages/detenu278/004.jpg',
          '/assets/pages/detenu278/005.jpg',
          '/assets/pages/detenu278/006.jpg',
          '/assets/pages/detenu278/007.jpg',
          '/assets/pages/detenu278/008.jpg',
          '/assets/pages/detenu278/009.jpg',
          '/assets/pages/detenu278/010.jpg',
          '/assets/pages/detenu278/011.jpg',
          '/assets/pages/detenu278/012.jpg',
          '/assets/pages/detenu278/013.jpg',
          '/assets/pages/detenu278/014.jpg',
          '/assets/pages/detenu278/015.jpg',
          '/assets/pages/detenu278/016.jpg',
          '/assets/pages/detenu278/017.jpg',
          '/assets/pages/detenu278/018.jpg',
          '/assets/pages/detenu278/019.jpg'
        ]
      }
    }
  },

  bd2: {
    id: 'bd2',
    title: 'Figé dans l\'acier',
    author: 'FÉNIX',
    genre: 'Science-fiction',
    cover: '/assets/img/cover/fige_dans_lacier-cover.jpg',
    description: '',
    chapters: {
      1: {
        title: 'Prologue',
        pages: [
          '/assets/pages/fige_dans_lacier/001.png',
          '/assets/pages/fige_dans_lacier/002.png',
          '/assets/pages/fige_dans_lacier/003.png',
          '/assets/pages/fige_dans_lacier/004.png',
          '/assets/pages/fige_dans_lacier/005.png',
          '/assets/pages/fige_dans_lacier/006.png',
          '/assets/pages/fige_dans_lacier/007.png',
          '/assets/pages/fige_dans_lacier/008.png',
          '/assets/pages/fige_dans_lacier/009.png',
          '/assets/pages/fige_dans_lacier/010.png',
          '/assets/pages/fige_dans_lacier/011.png',
          '/assets/pages/fige_dans_lacier/012.png',
          '/assets/pages/fige_dans_lacier/013.png',
          '/assets/pages/fige_dans_lacier/014.png',
          '/assets/pages/fige_dans_lacier/015.png'
        ]
      }
    }
  }
};

export const shopProducts = [
  {
    id: 1,
    title: 'Atomic Maid',
    price: 25.00,
    image: '/assets/img/produits/atomic_maid.jpg',
    link: 'https://starbord.shop/products/tenace?variant=55400992637252'
  },
  {
    id: 2,
    title: 'Bloody Maid',
    price: 25.00,
    image: '/assets/img/produits/bloody_maid.jpg',
    link: 'https://starbord.shop/products/vaincre?variant=55400980480324'
  },
  {
    id: 3,
    title: 'Détenu 278',
    price: 25.00,
    image: '/assets/img/produits/detenu_278.jpg',
    link: 'https://starbord.shop/products/detenu-278?variant=56241279467844'
  },
  {
    id: 4,
    title: 'Figé dans l\'acier',
    price: 25.00,
    image: '/assets/img/produits/fige_dans_lacier.jpg',
    link: 'https://starbord.shop/products/fige-dans-lacier?variant=56241295884612'
  },
  {
    id: 5,
    title: 'Pensez Grand',
    price: 25.00,
    image: '/assets/img/produits/pensez_grand.jpg',
    link: 'https://starbord.shop/products/relever-un-defi-chaque-jour?variant=55683308749124'
  },
  {
    id: 6,
    title: 'Fonce !',
    price: 25.00,
    image: '/assets/img/produits/fonce.jpg',
    link: 'https://starbord.shop/products/fonce-et-crois-en-toi-2?variant=55400979202372'
  },
  {
    id: 7,
    title: 'Rêve, Vise, Fonce !',
    price: 25.00,
    image: '/assets/img/produits/reve_vise_fonce.jpg',
    link: 'https://starbord.shop/products/reve-vise-fonce?variant=55451843952964'
  },
  {
    id: 8,
    title: 'Fonce ! Et crois en toi',
    price: 25.00,
    image: '/assets/img/produits/fonce_crois_en_toi.jpg',
    link: 'https://starbord.shop/products/fonce-et-crois-en-toi-1?variant=55400941846852'
  }
];

/**
 * Retourne le nombre total de chapitres d'une BD
 */
export function getChapterCount(comicId) {
  const comic = comicsData[comicId];
  return comic && comic.chapters ? Object.keys(comic.chapters).length : 0;
}

/**
 * Retourne les pages d'un chapitre
 */
export function getChapterPages(comicId, chapterId) {
  const comic = comicsData[comicId];
  if (!comic || !comic.chapters || !comic.chapters[chapterId]) return [];
  return comic.chapters[chapterId].pages || [];
}

/**
 * Retourne une BD par ID
 */
export function getComic(comicId) {
  return comicsData[comicId] || null;
}

/**
 * Retourne toutes les BDs
 */
export function getAllComics() {
  return Object.values(comicsData);
}
