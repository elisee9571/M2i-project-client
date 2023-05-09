import { faker } from '@faker-js/faker/locale/fr';
import { sample } from 'lodash';

const users = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
    pseudo: faker.internet.userName(),
    email: faker.internet.email(),
    role: sample([
        'ROLE_USER',
        'ROLE_ADMIN',
    ]),
}));

export default users;