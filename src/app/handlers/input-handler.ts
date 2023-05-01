import {
  Address,
  Family,
  Line,
  LineType,
  People,
  Person,
  Section,
  Phone,
} from '../types/types';

export class InputHandler {
  processString(inpStr: string): People {
    let lines = inpStr.split('\n');
    return this.getPeople(lines);
  }
  getPeople(lines: string[]): People {
    let checkedLines: string[] = this.checkLines(lines);
    let toReturn: People = {
      person: this.getPersons(checkedLines),
    };
    return toReturn;
  }
  checkLines(lines: string[]): string[] {
    let toReturn: string[] = [];
    for (const line of lines) {
      if (line.trim() === '') {
        continue;
      }
      toReturn.push(line.trim());
    }
    return toReturn;
  }
  getPersons(lines: string[]): Person[] {
    let toReturn: Person[] = [];
    let processedLines: Line[] = this.getSplitLines(lines);
    let personSections: Section[] = this.getPersonSections(processedLines);
    toReturn = this.getPersonFromPersonSections(personSections);
    return toReturn;
  }
  getPersonFromPersonSections(personSections: Section[]): Person[] {
    let toReturn: Person[] = [];
    for (const section of personSections) {
      let toPush: Person = {
        firstname: this.getFirstName(section),
        lastname: this.getLastName(section),
        address: this.getAddress(section),
        phone: this.getPhone(section),
        family: this.getFamily(section),
      };
      toReturn.push(toPush);
    }
    return toReturn;
  }
  getFamily(section: Section): Family[] | null {
    let toReturn: Family[] | null = null;
    let familySections: Section[] = [];
    let currentSection: Section | null = null;

    for (const line of section.lines) {
      if (line.lineType === 'F') {
        currentSection = { lines: [] };
        familySections.push(currentSection);
      }

      if (currentSection !== null) {
        currentSection.lines.push(line);
      }
    }
    if (familySections.length > 0) {
      toReturn = [];
      for (const family of familySections) {
        let toPush: Family = {
          name: this.getNameFamily(family),
          born: this.getBornFamily(family),
          address: this.getAddress(family),
          phone: this.getPhone(family),
        };
        toReturn.push(toPush);
      }
    }

    return toReturn;
  }
  getPhone(section: Section): Phone | null {
    let phoneLine = section.lines.find((l) => l.lineType === 'T');
    let toReturn: Phone | null = null;
    if (phoneLine) {
      toReturn = {
        mobile: phoneLine.section1,
        landline: phoneLine.section2,
      };
    }
    return toReturn;
  }
  getAddress(section: Section): Address | null {
    let addressLine = section.lines.find((l) => l.lineType === 'A');
    let toReturn: Address | null = null;
    if (addressLine) {
      toReturn = {
        street: addressLine.section1,
        city: addressLine.section2,
        zipcode: addressLine.section3,
      };
    }
    return toReturn;
  }
  getLastName(section: Section): string {
    let personLine = section.lines.find((l) => l.lineType === 'P');
    return personLine?.section2 || '';
  }
  getFirstName(section: Section): string {
    let personLine = section.lines.find((l) => l.lineType === 'P');
    return personLine?.section1 || '';
  }
  getNameFamily(section: Section): string {
    let familyLine = section.lines.find((l) => l.lineType === 'F');
    return familyLine?.section1 || '';
  }
  getBornFamily(section: Section): number {
    let familyLine = section.lines.find((l) => l.lineType === 'F');
    let born = parseInt(familyLine?.section2 || '0');
    return born;
  }

  getPersonSections(processedLines: Line[]): Section[] {
    let toReturn: Section[] = [];
    let currentSection: Section | null = null;

    for (const line of processedLines) {
      if (line.lineType === 'P') {
        currentSection = { lines: [] };
        toReturn.push(currentSection);
      }

      if (currentSection !== null) {
        currentSection.lines.push(line);
      }
    }

    return toReturn;
  }
  getSplitLines(lines: string[]): Line[] {
    let toReturn: Line[] = [];
    for (const line of lines) {
      let lineDetails = line.split('|');
      let lineDetailsOk: boolean = this.checkLineDetails(lineDetails);
      if (lineDetailsOk) {
        toReturn.push(this.getLine(lineDetails));
      }
    }
    return toReturn;
  }
  getLine(lineDetails: string[]): Line {
    let lineType: LineType = lineDetails[0] as LineType;
    switch (lineType) {
      case 'P':
        return this.getOnePersonLine(lineDetails);
      case 'A':
        return this.getOneAddressLine(lineDetails);
      case 'F':
        return this.getOneFamilyLine(lineDetails);
      case 'T':
        return this.getOnePhoneLine(lineDetails);
    }
  }
  getOnePhoneLine(lineDetails: string[]): Line {
    //T|0702-020202|02-202020
    return {
      lineType: 'T',
      section1: lineDetails[1],
      section2: lineDetails[2],
      section3: null,
    };
  }
  getOneFamilyLine(lineDetails: string[]): Line {
    //F|Estelle|2012
    return {
      lineType: 'F',
      section1: lineDetails[1],
      section2: lineDetails[2],
      section3: null,
    };
  }
  getOneAddressLine(lineDetails: string[]): Line {
    //A|Haga Slott|Stockholm|101
    //A|White House|Washington, D.C
    let streetNr: string | null = null;
    if (3 in lineDetails) {
      streetNr = lineDetails[3];
    }
    return {
      lineType: 'A',
      section1: lineDetails[1],
      section2: lineDetails[2],
      section3: streetNr,
    };
  }
  getOnePersonLine(lineDetails: string[]): Line {
    //P|Victoria|Bernadotte
    return {
      lineType: 'P',
      section1: lineDetails[1],
      section2: lineDetails[2],
      section3: null,
    };
  }
  checkLineDetails(lineDetails: string[]): boolean {
    if (lineDetails.length === 0) {
      return false;
    }
    if (lineDetails.length < 3) {
      return false;
    }
    if (lineDetails.length > 4) {
      return false;
    }
    return true;
  }
}
