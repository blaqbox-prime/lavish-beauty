import every_occation from '../public/assets/images/every-occasion.jpg';
import bridal_service from '../public/assets/images/bridal_service.jpg';
import complements from '../public/assets/images/Complements.jpeg'
import instagram from '../public/assets/images/instagram.png';
import facebook from '../public/assets/images/facebook.png';
import tiktok from '../public/assets/images/tiktok.png';
import palesa from '../public/assets/images/palesa.jpg'
import makeupBanner from '../public/assets/images/hero-banner-removebg.png'
import womenInACircle from '../public/assets/images/women.jpg'
import avatar from '../public/assets/images/palesa_avatar.jpg'
import homebg from '../public/assets/images/homebg.jpg';
 import gallery1 from '../public/assets/images/gallery/1.jpg';
import gallery2 from     '../public/assets/images/gallery/2.jpg';
import gallery3 from     '../public/assets/images/gallery/3.jpg';
import gallery4 from     '../public/assets/images/gallery/4.jpg';
import gallery5 from '../public/assets/images/gallery/5.jpg';
import gallery6 from '../public/assets/images/gallery/6.jpg';
import gallery7 from '../public/assets/images/gallery/7.jpg';
import gallery8 from '../public/assets/images/gallery/8.jpg';
import gallery9 from '../public/assets/images/gallery/9.jpg';
import gallery10 from '../public/assets/images/gallery/10.jpg';
import gallery11 from '../public/assets/images/gallery/11.jpg';
import gallery12 from '../public/assets/images/gallery/12.jpg';
import gallery13 from '../public/assets/images/gallery/13.jpg';
import gallery14 from '../public/assets/images/gallery/14.jpg';
import { BASE_URL } from './lib/utils';

export const images = {
    "everyOccation":every_occation,
    "bridal": bridal_service,
    "complements": complements,
    "palesa": palesa,
    "makeupBanner": makeupBanner,
    "womenBg": womenInACircle,
    "avatar": avatar,
    "homebg": homebg,
}

export const icons = {
    "instagram": instagram,
    "facebook": facebook,
    "tiktok": tiktok,
}

export const galleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
    gallery13,
    gallery14
]

export const ROUTES = {
    CLIENTS: {INDEX: `${BASE_URL}/clients`},
    BOOKINGS: {INDEX: `${BASE_URL}/bookings`},
    SERVICE: {INDEX: `${BASE_URL}/services`},
}