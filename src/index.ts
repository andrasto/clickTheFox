import { ClickTheFox } from './app';
import {
	fetchCatImageUrls,
	fetchFoxImageUrl,
	fetchDogImageUrls,
} from './requests';

new ClickTheFox({
	cat: fetchCatImageUrls,
	dog: fetchDogImageUrls,
	fox: fetchFoxImageUrl,
});
