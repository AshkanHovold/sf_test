import { Person, Address, Phone, Family, LineType, Line, Section } from '../types/types';

export class RandomDataGenerator {

  generateRandomData(numPersons: number): string {
    const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];

    const getRandomElement = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

    const randomPerson = (): string => {
      const firstname = getRandomElement(firstNames);
      const lastname = getRandomElement(lastNames);
      return `P|${firstname}|${lastname}`;
    };

    const randomPhone = (): string => {
      const mobile = `07${Math.floor(Math.random() * 10)}-${Math.floor(100000 + Math.random() * 900000)}`;
      const landline = `0${Math.floor(2 + Math.random() * 8)}-${Math.floor(100000 + Math.random() * 900000)}`;
      return Math.random() < 0.7 ? `T|${mobile}|${landline}` : '';
    };

    const randomAddress = (): string => {
      const streets = ['Main St', 'Elm St', 'Maple St', 'Oak St', 'Pine St'];
      const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
      const street = getRandomElement(streets);
      const city = getRandomElement(cities);
      const zipcode = `${Math.floor(10000 + Math.random() * 90000)}`;
      return Math.random() < 0.7 ? `A|${street}|${city}|${zipcode}` : '';
    };

    const randomFamily = (): string => {
      const name = getRandomElement(firstNames);
      const born = `${Math.floor(1980 + Math.random() * 30)}`;
      const familyLine = `F|${name}|${born}`;
      const addressLine = randomAddress();
      const phoneLine = randomPhone();

      let familyData = familyLine;
      if (addressLine) familyData += `\n${addressLine}`;
      if (phoneLine) familyData += `\n${phoneLine}`;

      return familyData;
    };

    let data = '';
    for (let i = 0; i < numPersons; i++) {
      const personLine = randomPerson();
      const phoneLine = randomPhone();
      const addressLine = randomAddress();
      const numFamilies = Math.floor(Math.random() * 3);

      let personData = personLine;
      if (phoneLine) personData += `\n${phoneLine}`;
      if (addressLine) personData += `\n${addressLine}`;

      for (let j = 0; j < numFamilies; j++) {
        personData += `\n${randomFamily()}`;
      }

      data += personData + '\n';
    }

    return data;
  }
}
