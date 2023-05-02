import { flatMap } from 'rxjs';
import { People } from '../types/types';
import { InputHandler } from './input-handler';

describe('InputHandler', () => {
  it('should create an instance', () => {
    expect(new InputHandler()).toBeTruthy();
  });

  it('should parse entire example string completly', () => {
    const inputHandler = new InputHandler();
    const inputString = `
    P|Victoria|Bernadotte
    T|070-0101010|0459-123456
    A|Haga Slott|Stockholm|101
    F|Estelle|2012
    A|Solliden|Öland|10002
    F|Oscar|2016
    T|0702-020202|02-202020
    P|Joe|Biden
    A|White House|Washington, D.C
    `;
    const expectedOutput: People = {
      person: [
        {
          firstname: 'Victoria',
          lastname: 'Bernadotte',
          address: {
            street: 'Haga Slott',
            city: 'Stockholm',
            zipcode: '101',
          },
          phone: { mobile: '070-0101010', landline: '0459-123456' },
          family: [
            {
              name: 'Estelle',
              born: 2012,
              address: { street: 'Solliden', city: 'Öland', zipcode: '10002' },
              phone: null,
            },
            {
              name: 'Oscar',
              born: 2016,
              address: null,
              phone: { mobile: '0702-020202', landline: '02-202020' },
            },
          ],
        },
        {
          firstname: 'Joe',
          lastname: 'Biden',
          address: {
            street: 'White House',
            city: 'Washington, D.C',
            zipcode: null,
          },
          phone: null,
          family: null,
        },
      ],
    };

    const actualOutput = inputHandler.processString(inputString);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should parse first person without T correctly', () => {
    const inputHandler = new InputHandler();
    const inputString = `
    P|Victoria|Bernadotte
    A|Haga Slott|Stockholm|101
    F|Estelle|2012
    A|Solliden|Öland|10002
    F|Oscar|2016
    T|0702-020202|02-202020
    P|Joe|Biden
    A|White House|Washington, D.C
    `;
    const expectedOutput: People = {
      person: [
        {
          firstname: 'Victoria',
          lastname: 'Bernadotte',
          address: {
            street: 'Haga Slott',
            city: 'Stockholm',
            zipcode: '101',
          },
          phone: null,
          family: [
            {
              name: 'Estelle',
              born: 2012,
              address: { street: 'Solliden', city: 'Öland', zipcode: '10002' },
              phone: null,
            },
            {
              name: 'Oscar',
              born: 2016,
              address: null,
              phone: { mobile: '0702-020202', landline: '02-202020' },
            },
          ],
        },
        {
          firstname: 'Joe',
          lastname: 'Biden',
          address: {
            street: 'White House',
            city: 'Washington, D.C',
            zipcode: null,
          },
          phone: null,
          family: null,
        },
      ],
    };

    const actualOutput = inputHandler.processString(inputString);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should parse first person with one family that has A and T', () => {
    const inputHandler = new InputHandler();
    const inputString = `
    P|Victoria|Bernadotte
    A|Haga Slott|Stockholm|101
    T|070-0101010|0459-123456
    F|Estelle|2012
    A|Solliden|Öland|10002
    T|0702-020202|02-202020
    P|Joe|Biden
    A|White House|Washington, D.C
    `;
    const expectedOutput: People = {
      person: [
        {
          firstname: 'Victoria',
          lastname: 'Bernadotte',
          address: {
            street: 'Haga Slott',
            city: 'Stockholm',
            zipcode: '101',
          },
          phone: { mobile: '070-0101010', landline: '0459-123456' },
          family: [
            {
              name: 'Estelle',
              born: 2012,
              address: { street: 'Solliden', city: 'Öland', zipcode: '10002' },
              phone: { mobile: '0702-020202', landline: '02-202020' },
            },
          ],
        },
        {
          firstname: 'Joe',
          lastname: 'Biden',
          address: {
            street: 'White House',
            city: 'Washington, D.C',
            zipcode: null,
          },
          phone: null,
          family: null,
        },
      ],
    };

    const actualOutput = inputHandler.processString(inputString);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should parse two person with A, none has F', () => {
    const inputHandler = new InputHandler();
    const inputString = `
    P|Victoria|Bernadotte
    A|Haga Slott|Stockholm|101
    P|Joe|Biden
    A|White House|Washington, D.C
    `;
    const expectedOutput: People = {
      person: [
        {
          firstname: 'Victoria',
          lastname: 'Bernadotte',
          address: {
            street: 'Haga Slott',
            city: 'Stockholm',
            zipcode: '101',
          },
          phone: null,
          family: null,
        },
        {
          firstname: 'Joe',
          lastname: 'Biden',
          address: {
            street: 'White House',
            city: 'Washington, D.C',
            zipcode: null,
          },
          phone: null,
          family: null,
        },
      ],
    };

    const actualOutput = inputHandler.processString(inputString);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
