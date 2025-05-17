// utils/cardBrandLogos.js
import defaultCardLogo from '../assets/default_card.svg'


export const getCardLogo = (brand) => {
    switch (brand) {
        case 'visa':
            return 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png';
        case 'mastercard':
            return 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg';
        case 'american-express':
            return 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg';
        case 'discover':
            return 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Discover_Card_logo.svg';
        default:
            return defaultCardLogo;
    }
};
