/* eslint-disable prettier/prettier */
import { createClient } from 'pexels';

const client = createClient('563492ad6f917000010000018135dbca386645158942a38f6fbf57a4');
const query = 'Nature';

client.photos.search({ query, per_page: 1 }).then(photos => {});
