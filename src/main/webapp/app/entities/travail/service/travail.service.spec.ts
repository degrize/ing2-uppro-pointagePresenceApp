import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITravail } from '../travail.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../travail.test-samples';

import { TravailService, RestTravail } from './travail.service';

const requireRestSample: RestTravail = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.toJSON(),
};

describe('Travail Service', () => {
  let service: TravailService;
  let httpMock: HttpTestingController;
  let expectedResult: ITravail | ITravail[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TravailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Travail', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const travail = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(travail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Travail', () => {
      const travail = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(travail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Travail', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Travail', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Travail', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTravailToCollectionIfMissing', () => {
      it('should add a Travail to an empty array', () => {
        const travail: ITravail = sampleWithRequiredData;
        expectedResult = service.addTravailToCollectionIfMissing([], travail);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(travail);
      });

      it('should not add a Travail to an array that contains it', () => {
        const travail: ITravail = sampleWithRequiredData;
        const travailCollection: ITravail[] = [
          {
            ...travail,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTravailToCollectionIfMissing(travailCollection, travail);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Travail to an array that doesn't contain it", () => {
        const travail: ITravail = sampleWithRequiredData;
        const travailCollection: ITravail[] = [sampleWithPartialData];
        expectedResult = service.addTravailToCollectionIfMissing(travailCollection, travail);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(travail);
      });

      it('should add only unique Travail to an array', () => {
        const travailArray: ITravail[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const travailCollection: ITravail[] = [sampleWithRequiredData];
        expectedResult = service.addTravailToCollectionIfMissing(travailCollection, ...travailArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const travail: ITravail = sampleWithRequiredData;
        const travail2: ITravail = sampleWithPartialData;
        expectedResult = service.addTravailToCollectionIfMissing([], travail, travail2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(travail);
        expect(expectedResult).toContain(travail2);
      });

      it('should accept null and undefined values', () => {
        const travail: ITravail = sampleWithRequiredData;
        expectedResult = service.addTravailToCollectionIfMissing([], null, travail, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(travail);
      });

      it('should return initial array if no Travail is added', () => {
        const travailCollection: ITravail[] = [sampleWithRequiredData];
        expectedResult = service.addTravailToCollectionIfMissing(travailCollection, undefined, null);
        expect(expectedResult).toEqual(travailCollection);
      });
    });

    describe('compareTravail', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTravail(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTravail(entity1, entity2);
        const compareResult2 = service.compareTravail(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTravail(entity1, entity2);
        const compareResult2 = service.compareTravail(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTravail(entity1, entity2);
        const compareResult2 = service.compareTravail(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
